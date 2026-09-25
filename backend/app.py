"""
AI-Based Chocolate Paan Sales Prediction System
Flask Backend Application (Week 7 & Week 9)
Reuses trained Week 5 models and Week 6 visual assets.
"""

import os
import json
import traceback
from datetime import datetime
import joblib
import pandas as pd
import numpy as np
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)

app = Flask(__name__, template_folder=os.path.join(ROOT_DIR, 'templates'), static_folder=os.path.join(ROOT_DIR, 'static'))

# Enable CORS for API routes — allows the React dev server (port 5173) to reach Flask (port 5000)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
app.secret_key = os.environ.get('SECRET_KEY', 'chocolate-paan-secret-key-2026')

# -----------------------------------------------------------------------------
# Base Directories & Artifact Loading
# -----------------------------------------------------------------------------
MODEL_DIR = os.path.join(ROOT_DIR, 'model')

# Load Week 5 Trained Model & Preprocessing Pipeline
MODEL_PATH = os.path.join(MODEL_DIR, 'trained_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')
ALL_MODELS_PATH = os.path.join(MODEL_DIR, 'all_models.pkl')
METRICS_PATH = os.path.join(MODEL_DIR, 'metrics.json')

# Load artifacts safely at startup (never retrain during requests)
print("[FLASK STARTUP] Loading trained models and preprocessing artifacts...")

try:
    primary_model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    all_models = joblib.load(ALL_MODELS_PATH) if os.path.exists(ALL_MODELS_PATH) else {}

    with open(METRICS_PATH, 'r') as f:
        METRICS_DATA = json.load(f)

    FEATURES = METRICS_DATA['features']
    TARGET = METRICS_DATA['target']
    BEST_MODEL_NAME = METRICS_DATA.get('best_model', 'Linear Regression')

    MODEL_LOADED = True
    print(f"[FLASK STARTUP] Loaded Primary Model: {BEST_MODEL_NAME}")
    print(f"[FLASK STARTUP] Features ({len(FEATURES)}): {FEATURES}")
    print(f"[FLASK STARTUP] Available Models: {list(all_models.keys())}")
except Exception as e:
    MODEL_LOADED = False
    print(f"[FLASK STARTUP ERROR] Could not load model files: {e}")
    traceback.print_exc()
    primary_model = None
    scaler = None
    all_models = {}
    METRICS_DATA = {}
    FEATURES = []
    TARGET = 'Boxes_Sold'
    BEST_MODEL_NAME = 'Linear Regression'

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
    """
    if primary_model is None and not all_models:
        raise RuntimeError("No trained model artifacts were loaded. Check that model/trained_model.pkl and model/all_models.pkl exist and are readable.")

    selected_name = model_choice if (model_choice and model_choice in all_models) else BEST_MODEL_NAME
    input_df = pd.DataFrame([cleaned_data])[FEATURES]

    if selected_name in all_models:
        model_obj = all_models[selected_name]['model']
        use_scaled = all_models[selected_name]['use_scaled']
    else:
        model_obj = primary_model
        use_scaled = False

    if model_obj is None:
        raise RuntimeError(f"Model '{selected_name}' is unavailable in the current deployment environment.")

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
    best_r2 = METRICS_DATA['metrics'][0]['R2']

    return render_template(
        'index.html',
        total_predictions=total_preds,
        latest_prediction=latest_pred,
        best_r2=best_r2,
        models_count=len(METRICS_DATA['metrics']),
        history=PREDICTION_HISTORY[:5],
        metrics=METRICS_DATA['metrics']
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

        return render_template(
            'result.html',
            predicted_boxes=predicted_boxes,
            model_used=model_used,
            timestamp=record['timestamp'],
            inputs=cleaned_data,
            raw_pred=round(raw_pred, 2),
            best_r2=METRICS_DATA['metrics'][0]['R2']
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
        metrics=METRICS_DATA['metrics'],
        generalization=METRICS_DATA['generalization'],
        coefficients=METRICS_DATA['coefficients'],
        rf_importances=METRICS_DATA['rf_importances'],
        intercept=METRICS_DATA['intercept']
    )

@app.route('/about')
def about():
    """About Project Page: Objective, Features, Methodology, and Viva Talking Points"""
    return render_template(
        'about.html',
        features=FEATURES,
        target=TARGET,
        metrics=METRICS_DATA['metrics']
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
        'model_loaded': MODEL_LOADED,
        'best_model': BEST_MODEL_NAME,
        'features_count': len(FEATURES)
    })

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """Dedicated JSON API endpoint for model predictions"""
    if not MODEL_LOADED:
        return jsonify({
            'success': False,
            'error': 'ML model is not loaded. Please check server logs.'
        }), 503

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
    app.logger.exception("Unhandled server error on %s", request.path)
    return render_template('base.html', page_content="<div class='container text-center py-5'><h2>500 - Server Error</h2><p>An unexpected error occurred during prediction inference.</p><a href='/' class='btn btn-primary'>Return to Dashboard</a></div>"), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"\n==================================================================")
    print(f" [AI-BASED CHOCOLATE PAAN SALES PREDICTION SYSTEM]")
    print(f" Server running at: http://127.0.0.1:{port}")
    print(f" Model: {BEST_MODEL_NAME} (R² = {METRICS_DATA['metrics'][0]['R2']})")
    print(f"==================================================================\n")
    app.run(host='0.0.0.0', port=port, debug=True)
