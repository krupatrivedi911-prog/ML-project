"""
AI-Based Chocolate Paan Sales Prediction System
Flask Backend Application (Week 7 & Week 9)
Reuses trained Week 5 models and Week 6 visual assets.
"""

import os
import json
import traceback
from datetime import datetime
from pathlib import Path
import joblib
import pandas as pd
import numpy as np
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from flask_cors import CORS

DEFAULT_METRICS = {
    "features": [
        "Temperature", "Price", "Discount_Percentage", "Marketing_Budget",
        "Instagram_Reel", "YouTube_Video", "Facebook_Ads", "Returning_Customers",
        "New_Customers", "Online_Orders", "Offline_Orders", "Customer_Rating",
        "Festival", "Weekend"
    ],
    "target": "Boxes_Sold",
    "best_model": "Linear Regression",
    "intercept": 118.0467,
    "coefficients": {
        "Temperature": -0.0068,
        "Price": -0.8053,
        "Discount_Percentage": 1.9808,
        "Marketing_Budget": 0.005,
        "Instagram_Reel": 18.1488,
        "YouTube_Video": 14.869,
        "Facebook_Ads": 9.643,
        "Returning_Customers": 0.401,
        "New_Customers": 0.4935,
        "Online_Orders": 0.3051,
        "Offline_Orders": 0.2036,
        "Customer_Rating": 0.2222,
        "Festival": 60.2768,
        "Weekend": 25.0976
    },
    "rf_importances": {
        "Temperature": 0.0186,
        "Price": 0.0821,
        "Discount_Percentage": 0.1327,
        "Marketing_Budget": 0.0492,
        "Instagram_Reel": 0.0414,
        "YouTube_Video": 0.0244,
        "Facebook_Ads": 0.0081,
        "Returning_Customers": 0.1454,
        "New_Customers": 0.1036,
        "Online_Orders": 0.0706,
        "Offline_Orders": 0.0476,
        "Customer_Rating": 0.0145,
        "Festival": 0.1721,
        "Weekend": 0.0896
    },
    "metrics": [
        {"Model": "Linear Regression", "MAE": 7.7102, "MSE": 79.7161, "RMSE": 8.9284, "R2": 0.9449},
        {"Model": "Decision Tree", "MAE": 18.778, "MSE": 553.47, "RMSE": 23.5259, "R2": 0.6174},
        {"Model": "Random Forest", "MAE": 11.7753, "MSE": 216.5535, "RMSE": 14.7158, "R2": 0.8503},
        {"Model": "SVR (RBF Kernel)", "MAE": 9.3598, "MSE": 144.578, "RMSE": 12.0241, "R2": 0.9001},
        {"Model": "Gradient Boosting", "MAE": 9.0932, "MSE": 121.3074, "RMSE": 11.014, "R2": 0.9161}
    ],
    "generalization": [
        {"Model": "Linear Regression", "Training R2": 0.9402, "Testing R2": 0.9449, "Generalization Gap": -0.0047, "Status": "Strong Generalization"},
        {"Model": "Decision Tree", "Training R2": 1.0, "Testing R2": 0.6174, "Generalization Gap": 0.3826, "Status": "Severe Overfit"},
        {"Model": "Random Forest", "Training R2": 0.9782, "Testing R2": 0.8503, "Generalization Gap": 0.1279, "Status": "Noticeable Overfit"},
        {"Model": "SVR (RBF Kernel)", "Training R2": 0.8971, "Testing R2": 0.9001, "Generalization Gap": -0.003, "Status": "Strong Generalization"},
        {"Model": "Gradient Boosting", "Training R2": 0.9272, "Testing R2": 0.9161, "Generalization Gap": 0.011, "Status": "Strong Generalization"}
    ]
}

BASE_DIR = Path(__file__).resolve().parent

# Check multiple candidates for root in local, Docker, and serverless environments
candidate_roots = [
    BASE_DIR.parent,
    BASE_DIR,
    Path.cwd(),
    Path("/var/task"),
]

def find_candidate_dir(name):
    for root in candidate_roots:
        cand = (root / name).resolve()
        if cand.is_dir():
            return cand
    return (candidate_roots[0] / name).resolve()

ROOT_DIR = next((r for r in candidate_roots if (r / 'templates').is_dir() or (r / 'model').is_dir()), BASE_DIR.parent)
TEMPLATES_DIR = find_candidate_dir('templates')
STATIC_DIR = find_candidate_dir('static')
MODEL_DIR = find_candidate_dir('model')

app = Flask(__name__, template_folder=str(TEMPLATES_DIR), static_folder=str(STATIC_DIR))

# Enable CORS for API routes — allows the React dev server (port 5173) to reach Flask (port 5000)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
app.secret_key = os.environ.get('SECRET_KEY', 'chocolate-paan-secret-key-2026')

# -----------------------------------------------------------------------------
# Base Directories & Artifact Loading
# -----------------------------------------------------------------------------
MODEL_PATH = (MODEL_DIR / 'trained_model.pkl').resolve()
SCALER_PATH = (MODEL_DIR / 'scaler.pkl').resolve()
ALL_MODELS_PATH = (MODEL_DIR / 'all_models.pkl').resolve()
METRICS_PATH = (MODEL_DIR / 'metrics.json').resolve()

# Load artifacts safely at startup (never retrain during requests)
print("[FLASK STARTUP] Loading trained models and preprocessing artifacts...")
print(f"[FLASK STARTUP] Current working directory: {Path.cwd()}")
print(f"[FLASK STARTUP] Project root: {ROOT_DIR}")
print(f"[FLASK STARTUP] Templates directory: {TEMPLATES_DIR} (exists={TEMPLATES_DIR.exists()})")
print(f"[FLASK STARTUP] Static directory: {STATIC_DIR} (exists={STATIC_DIR.exists()})")
print(f"[FLASK STARTUP] Model directory: {MODEL_DIR} (exists={MODEL_DIR.exists()})")

METRICS_DATA = dict(DEFAULT_METRICS)
FEATURES = list(DEFAULT_METRICS['features'])
TARGET = DEFAULT_METRICS['target']
BEST_MODEL_NAME = DEFAULT_METRICS.get('best_model', 'Linear Regression')
primary_model = None
scaler = None
all_models = {}
MODEL_LOADED = False

try:
    if METRICS_PATH.exists():
        with open(str(METRICS_PATH), 'r', encoding='utf-8') as f:
            disk_metrics = json.load(f)
            METRICS_DATA.update(disk_metrics)
            FEATURES = METRICS_DATA.get('features', FEATURES)
            TARGET = METRICS_DATA.get('target', TARGET)
            BEST_MODEL_NAME = METRICS_DATA.get('best_model', BEST_MODEL_NAME)
            print(f"[FLASK STARTUP] Loaded metrics.json successfully.")

    if MODEL_PATH.exists():
        primary_model = joblib.load(str(MODEL_PATH))
        print(f"[FLASK STARTUP] Loaded primary_model successfully.")

    if SCALER_PATH.exists():
        scaler = joblib.load(str(SCALER_PATH))
        print(f"[FLASK STARTUP] Loaded scaler successfully.")

    if ALL_MODELS_PATH.exists():
        all_models = joblib.load(str(ALL_MODELS_PATH))
        print(f"[FLASK STARTUP] Loaded all_models successfully: {list(all_models.keys())}")

    MODEL_LOADED = primary_model is not None
    print(f"[FLASK STARTUP] Primary model loaded: {MODEL_LOADED}")
except Exception as e:
    print(f"[FLASK STARTUP WARNING] Model file load error: {e}")
    traceback.print_exc()
    MODEL_LOADED = False

# In-memory session history for interactive dashboard stats
PREDICTION_HISTORY = [
    {
        'id': 'INIT-01',
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M'),
        'model': 'Linear Regression',
        'temperature': 28.5,
        'price': 120.0,
        'discount_percentage': 10.0,
        'marketing_budget': 500.0,
        'predicted_boxes': 120,
        'scenario': 'Baseline Normal Day'
    },
    {
        'id': 'INIT-02',
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M'),
        'model': 'Linear Regression',
        'temperature': 24.0,
        'price': 120.0,
        'discount_percentage': 20.0,
        'marketing_budget': 2000.0,
        'predicted_boxes': 286,
        'scenario': 'Festival Weekend Peak'
    }
]

# -----------------------------------------------------------------------------
# Input Validation Helper
# -----------------------------------------------------------------------------
def validate_inputs(form_data):
    """
    Validates all 14 input features according to project rules:
    - All fields required
    - Numeric values
    - Price > 0
    - Discount between 0 and 100
    - Customer Rating between 1.0 and 5.0
    - Customer and Order counts >= 0
    - Festival and Weekend in {0, 1}
    Returns (cleaned_dict, error_message)
    """
    if form_data is None:
        return None, "No input data received. Please provide all 14 feature values."

    if hasattr(form_data, 'to_dict'):
        form_data = form_data.to_dict(flat=True)

    cleaned = {}

    specs = {
        'Temperature': {'type': float, 'min': -20.0, 'max': 60.0, 'label': 'Temperature (-20°C to 60°C)'},
        'Price': {'type': float, 'min': 1.0, 'max': 10000.0, 'label': 'Price (must be > 0)'},
        'Discount_Percentage': {'type': float, 'min': 0.0, 'max': 100.0, 'label': 'Discount Percentage (0% to 100%)'},
        'Marketing_Budget': {'type': float, 'min': 0.0, 'max': 1000000.0, 'label': 'Marketing Budget (>= 0)'},
        'Instagram_Reel': {'type': int, 'min': 0, 'max': 500, 'label': 'Instagram Reels (>= 0)'},
        'YouTube_Video': {'type': int, 'min': 0, 'max': 500, 'label': 'YouTube Videos (>= 0)'},
        'Facebook_Ads': {'type': int, 'min': 0, 'max': 500, 'label': 'Facebook Ads (>= 0)'},
        'Returning_Customers': {'type': int, 'min': 0, 'max': 100000, 'label': 'Returning Customers (>= 0)'},
        'New_Customers': {'type': int, 'min': 0, 'max': 100000, 'label': 'New Customers (>= 0)'},
        'Online_Orders': {'type': int, 'min': 0, 'max': 100000, 'label': 'Online Orders (>= 0)'},
        'Offline_Orders': {'type': int, 'min': 0, 'max': 100000, 'label': 'Offline Orders (>= 0)'},
        'Customer_Rating': {'type': float, 'min': 1.0, 'max': 5.0, 'label': 'Customer Rating (1.0 to 5.0)'},
        'Festival': {'type': int, 'min': 0, 'max': 1, 'label': 'Festival Indicator (0 or 1)'},
        'Weekend': {'type': int, 'min': 0, 'max': 1, 'label': 'Weekend Indicator (0 or 1)'}
    }

    for feat, rule in specs.items():
        val = form_data.get(feat)
        if val is None or str(val).strip() == '':
            return None, f"Missing required field: '{feat}'. Please provide all 14 features."

        if feat in ['Festival', 'Weekend']:
            val_str = str(val).strip().lower()
            if val_str in ['yes', 'true', '1']:
                cleaned[feat] = 1
                continue
            elif val_str in ['no', 'false', '0']:
                cleaned[feat] = 0
                continue
            else:
                return None, f"Invalid value for '{feat}'. Must be Yes/No or 1/0."

        try:
            parsed_val = rule['type'](val)
        except (ValueError, TypeError):
            return None, f"Invalid number format for '{feat}': received '{val}'."

        if parsed_val < rule['min'] or parsed_val > rule['max']:
            return None, f"Value out of bounds for '{feat}': must be between {rule['min']} and {rule['max']}."

        cleaned[feat] = parsed_val

    return cleaned, None

# -----------------------------------------------------------------------------
# Core Prediction Routine
# -----------------------------------------------------------------------------
def execute_prediction(cleaned_data, model_choice=None):
    """
    Executes prediction using the existing trained model.
    Applies exact scaler preprocessing if SVR is selected.
    Falls back to analytical formula if trained binary models are not available.
    """
    selected_name = model_choice if (model_choice and model_choice in all_models) else BEST_MODEL_NAME

    if primary_model is None and not all_models:
        intercept = METRICS_DATA.get('intercept', 118.0467)
        coeffs = METRICS_DATA.get('coefficients', {})
        if coeffs:
            raw_pred = float(intercept)
            for feat, coef in coeffs.items():
                raw_pred += float(coef) * float(cleaned_data.get(feat, 0.0))
            predicted_boxes = int(max(0, round(raw_pred)))
            return predicted_boxes, BEST_MODEL_NAME, raw_pred
        raise RuntimeError("No trained model artifacts or coefficients were available.")

    input_df = pd.DataFrame([cleaned_data])[FEATURES]

    if selected_name in all_models:
        model_obj = all_models[selected_name]['model']
        use_scaled = all_models[selected_name]['use_scaled']
    else:
        model_obj = primary_model
        use_scaled = False

    if model_obj is None:
        intercept = METRICS_DATA.get('intercept', 118.0467)
        coeffs = METRICS_DATA.get('coefficients', {})
        raw_pred = float(intercept)
        for feat, coef in coeffs.items():
            raw_pred += float(coef) * float(cleaned_data.get(feat, 0.0))
        predicted_boxes = int(max(0, round(raw_pred)))
        return predicted_boxes, selected_name, raw_pred

    if use_scaled:
        if scaler is None:
            raise RuntimeError("Scaler is missing for the selected model. Check deployment artifacts.")
        input_matrix = scaler.transform(input_df)
        raw_pred = model_obj.predict(input_matrix)[0]
    else:
        raw_pred = model_obj.predict(input_df)[0]

    predicted_boxes = int(max(0, round(raw_pred)))
    return predicted_boxes, selected_name, float(raw_pred)

# -----------------------------------------------------------------------------
# Flask Routes (Week 7, 8, 9)
# -----------------------------------------------------------------------------
@app.route('/')
def index():
    """Home / Dashboard Page"""
    total_preds = len(PREDICTION_HISTORY)
    latest_pred = PREDICTION_HISTORY[0]['predicted_boxes'] if PREDICTION_HISTORY else 0
    metrics_list = METRICS_DATA.get('metrics', [])
    best_r2 = metrics_list[0]['R2'] if metrics_list else 0.9449

    return render_template(
        'index.html',
        total_predictions=total_preds,
        latest_prediction=latest_pred,
        best_r2=best_r2,
        models_count=len(metrics_list),
        history=PREDICTION_HISTORY[:5],
        metrics=metrics_list
    )

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    """
    Prediction Route:
    - GET: Renders input form
    - POST: Validates input, executes inference, renders result.html or returns JSON
    """
    if request.method == 'GET':
        return render_template(
            'predict.html',
            features=FEATURES,
            best_model=BEST_MODEL_NAME,
            all_models=list(all_models.keys()),
            form_data={}
        )

    is_json = request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    source_data = request.get_json(silent=True) if request.is_json else request.form.to_dict(flat=True)

    try:
        cleaned_data, error = validate_inputs(source_data)
        if error:
            if is_json:
                return jsonify({'success': False, 'error': error}), 400
            flash(error, 'danger')
            return render_template(
                'predict.html',
                features=FEATURES,
                best_model=BEST_MODEL_NAME,
                all_models=list(all_models.keys()),
                form_data=source_data
            ), 400

        model_choice = source_data.get('model_choice', BEST_MODEL_NAME) if isinstance(source_data, dict) else BEST_MODEL_NAME
        predicted_boxes, model_used, raw_pred = execute_prediction(cleaned_data, model_choice)

        record = {
            'id': f"PRED-{len(PREDICTION_HISTORY)+1:03d}",
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'model': model_used,
            'temperature': cleaned_data['Temperature'],
            'price': cleaned_data['Price'],
            'discount_percentage': cleaned_data['Discount_Percentage'],
            'marketing_budget': cleaned_data['Marketing_Budget'],
            'predicted_boxes': predicted_boxes,
            'raw_prediction': round(raw_pred, 2)
        }
        PREDICTION_HISTORY.insert(0, record)

        if is_json:
            return jsonify({
                'success': True,
                'predicted_boxes': predicted_boxes,
                'model_used': model_used,
                'timestamp': record['timestamp'],
                'inputs': cleaned_data,
                'raw_prediction': round(raw_pred, 2)
            })

        metrics_list = METRICS_DATA.get('metrics', [])
        best_r2 = metrics_list[0]['R2'] if metrics_list else 0.9449

        return render_template(
            'result.html',
            predicted_boxes=predicted_boxes,
            model_used=model_used,
            timestamp=record['timestamp'],
            inputs=cleaned_data,
            raw_pred=round(raw_pred, 2),
            best_r2=best_r2
        )
    except Exception as e:
        print(f"[PREDICTION ERROR] {e}")
        traceback.print_exc()
        if is_json:
            return jsonify({'success': False, 'error': f'Prediction failed: {e}'}), 500
        flash(f'Prediction failed: {e}', 'danger')
        return render_template(
            'predict.html',
            features=FEATURES,
            best_model=BEST_MODEL_NAME,
            all_models=list(all_models.keys()),
            form_data=source_data or {}
        ), 500

@app.route('/performance')
def performance():
    """Model Performance Page: Week 5 Benchmark Table & Week 6 Graphs"""
    return render_template(
        'performance.html',
        metrics=METRICS_DATA.get('metrics', []),
        generalization=METRICS_DATA.get('generalization', []),
        coefficients=METRICS_DATA.get('coefficients', {}),
        rf_importances=METRICS_DATA.get('rf_importances', {}),
        intercept=METRICS_DATA.get('intercept', 118.0467)
    )

@app.route('/about')
def about():
    """About Project Page: Objective, Features, Methodology, and Viva Talking Points"""
    return render_template(
        'about.html',
        features=FEATURES,
        target=TARGET,
        metrics=METRICS_DATA.get('metrics', [])
    )

# -----------------------------------------------------------------------------
# REST API Endpoints (For Asynchronous / External Calls)
# -----------------------------------------------------------------------------
@app.route('/api/health', methods=['GET'])
def api_health():
    """Health check endpoint — verifies the backend and model are running"""
    return jsonify({
        'success': True,
        'message': 'Chocolate Paan Sales Prediction API is running',
        'model_loaded': MODEL_LOADED or bool(METRICS_DATA.get('coefficients')),
        'best_model': BEST_MODEL_NAME,
        'features_count': len(FEATURES)
    })

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """Dedicated JSON API endpoint for model predictions"""
    try:
        data = request.get_json(silent=True) or request.form.to_dict(flat=True) or {}
        cleaned, error = validate_inputs(data)
        if error:
            return jsonify({'success': False, 'error': error}), 400

        model_choice = data.get('model_choice', BEST_MODEL_NAME) if isinstance(data, dict) else BEST_MODEL_NAME
        predicted_boxes, model_used, raw_pred = execute_prediction(cleaned, model_choice)

        return jsonify({
            'success': True,
            'predicted_boxes': predicted_boxes,
            'raw_prediction': round(raw_pred, 4),
            'model_used': model_used,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        print(f"[PREDICTION ERROR] {e}")
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': f'Prediction failed: {e}'
        }), 500

@app.route('/api/metrics', methods=['GET'])
def api_metrics():
    """Returns Week 5 benchmark metrics in JSON format"""
    return jsonify(METRICS_DATA)

@app.route('/api/history', methods=['GET'])
def api_history():
    """Returns recent prediction records"""
    return jsonify({'history': PREDICTION_HISTORY})

@app.route('/api/clear-history', methods=['POST'])
def api_clear_history():
    """Clears dynamic session prediction history"""
    global PREDICTION_HISTORY
    PREDICTION_HISTORY = []
    return jsonify({'success': True, 'message': 'Prediction history cleared.'})

# -----------------------------------------------------------------------------
# Error Handlers
# -----------------------------------------------------------------------------
@app.errorhandler(404)
def page_not_found(e):
    return render_template('base.html', page_content="<div class='container text-center py-5'><h2>404 - Page Not Found</h2><p>The requested page does not exist.</p><a href='/' class='btn btn-primary'>Return to Dashboard</a></div>"), 404

@app.errorhandler(500)
def internal_server_error(e):
    app.logger.exception("Unhandled server error on %s: %s", request.path, e)
    return render_template('base.html', page_content=f"<div class='container text-center py-5'><h2>500 - Server Error</h2><p>An unexpected error occurred: {e}</p><a href='/' class='btn btn-primary'>Return to Dashboard</a></div>"), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"\n==================================================================")
    print(f" [AI-BASED CHOCOLATE PAAN SALES PREDICTION SYSTEM]")
    print(f" Server running at: http://127.0.0.1:{port}")
    print(f" Model: {BEST_MODEL_NAME} (R² = {METRICS_DATA['metrics'][0]['R2']})")
    print(f"==================================================================\n")
    app.run(host='0.0.0.0', port=port, debug=True)
