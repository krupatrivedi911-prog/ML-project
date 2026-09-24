"""
Save Models & Preprocessing Pipeline
AI-Based Chocolate Paan Sales Prediction System
Extracts and serializes trained models from Week 5 benchmark into model/
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_dir = os.path.join(base_dir, 'model')
    os.makedirs(model_dir, exist_ok=True)

    print("=" * 70)
    print(" SERIALIZING WEEK 5 TRAINED MODELS & PREPROCESSING ")
    print("=" * 70)

    dataset_path = os.path.join(base_dir, 'Chocolate_Paan_Sales_Dataset_10000.xlsx')
    print(f"Loading dataset from: {dataset_path}")
    df = pd.read_excel(dataset_path)

    features = [
        'Temperature', 'Price', 'Discount_Percentage', 'Marketing_Budget',
        'Instagram_Reel', 'YouTube_Video', 'Facebook_Ads', 'Returning_Customers',
        'New_Customers', 'Online_Orders', 'Offline_Orders', 'Customer_Rating',
        'Festival', 'Weekend'
    ]
    target = 'Boxes_Sold'

    X = df[features]
    Y = df[target]

    # Train-Test Split (80/20, random_state=42)
    X_train, X_test, Y_train, Y_test = train_test_split(
        X, Y, test_size=0.20, random_state=42
    )
    print(f"Train samples: {len(X_train)} | Test samples: {len(X_test)}")

    # Feature Scaling (Fit ONLY on training data to prevent leakage)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Initialize models
    models_def = {
        'Linear Regression': (LinearRegression(), False),
        'Decision Tree': (DecisionTreeRegressor(random_state=42), False),
        'Random Forest': (RandomForestRegressor(n_estimators=100, random_state=42), False),
        'SVR (RBF Kernel)': (SVR(kernel='rbf'), True),
        'Gradient Boosting': (GradientBoostingRegressor(random_state=42), False)
    }

    test_metrics = []
    generalization_records = []
    trained_models = {}

    for name, (model, use_scaled) in models_def.items():
        xtr = X_train_scaled if use_scaled else X_train
        xte = X_test_scaled if use_scaled else X_test

        model.fit(xtr, Y_train)
        trained_models[name] = {
            'model': model,
            'use_scaled': use_scaled
        }

        y_pred_train = model.predict(xtr)
        y_pred_test = model.predict(xte)

        mae = mean_absolute_error(Y_test, y_pred_test)
        mse = mean_squared_error(Y_test, y_pred_test)
        rmse = np.sqrt(mse)
        r2_test = r2_score(Y_test, y_pred_test)
        r2_train = r2_score(Y_train, y_pred_train)
        gap = r2_train - r2_test

        test_metrics.append({
            'Model': name,
            'MAE': round(float(mae), 4),
            'MSE': round(float(mse), 4),
            'RMSE': round(float(rmse), 4),
            'R2': round(float(r2_test), 4)
        })

        generalization_records.append({
            'Model': name,
            'Training R2': round(float(r2_train), 4),
            'Testing R2': round(float(r2_test), 4),
            'Generalization Gap': round(float(gap), 4),
            'Status': 'Severe Overfit' if gap > 0.20 else ('Noticeable Overfit' if gap > 0.08 else 'Strong Generalization')
        })
        print(f"  [OK] Trained {name}")

    # Best model is Linear Regression (R2 = 0.9449)
    best_model_name = 'Linear Regression'
    best_model = trained_models[best_model_name]['model']

    # Extract coefficients
    lr_coefficients = {feat: round(float(c), 4) for feat, c in zip(features, best_model.coef_)}
    lr_intercept = round(float(best_model.intercept_), 4)

    # Extract RF feature importances
    rf_model = trained_models['Random Forest']['model']
    rf_importances = {feat: round(float(imp), 4) for feat, imp in zip(features, rf_model.feature_importances_)}

    # Save to disk
    joblib.dump(best_model, os.path.join(model_dir, 'trained_model.pkl'))
    joblib.dump(scaler, os.path.join(model_dir, 'scaler.pkl'))
    joblib.dump(trained_models, os.path.join(model_dir, 'all_models.pkl'))

    # Save metadata and metrics for easy JSON consumption
    metrics_payload = {
        'features': features,
        'target': target,
        'best_model': best_model_name,
        'intercept': lr_intercept,
        'coefficients': lr_coefficients,
        'rf_importances': rf_importances,
        'metrics': test_metrics,
        'generalization': generalization_records
    }

    with open(os.path.join(model_dir, 'metrics.json'), 'w') as f:
        json.dump(metrics_payload, f, indent=2)

    print("\nModels and metadata saved successfully in 'model/':")
    print(" - model/trained_model.pkl")
    print(" - model/scaler.pkl")
    print(" - model/all_models.pkl")
    print(" - model/metrics.json")
    print("=" * 70)

if __name__ == '__main__':
    main()
