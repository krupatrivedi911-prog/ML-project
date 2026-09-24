"""
AI-Based Chocolate Paan Sales Prediction System
Week 5: Multiple Machine Learning Models Benchmarking Script
"""

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
    print("=" * 70)
    print(" AI-BASED CHOCOLATE PAAN SALES PREDICTION SYSTEM ")
    print(" WEEK 5: MULTIPLE MACHINE LEARNING MODELS BENCHMARK ")
    print("=" * 70)

    # 1. Load Dataset
    print("\n[STEP 1] Loading Dataset...")
    dataset_path = 'Chocolate_Paan_Sales_Dataset_10000.xlsx'
    df = pd.read_excel(dataset_path)
    print(f"-> Dataset loaded successfully: {df.shape[0]} rows, {df.shape[1]} columns.")
    print(f"-> Missing values detected: {df.isnull().sum().sum()}")

    # 2. Features and Target
    print("\n[STEP 2] Defining Features and Target...")
    features = [
        'Temperature', 'Price', 'Discount_Percentage', 'Marketing_Budget',
        'Instagram_Reel', 'YouTube_Video', 'Facebook_Ads', 'Returning_Customers',
        'New_Customers', 'Online_Orders', 'Offline_Orders', 'Customer_Rating',
        'Festival', 'Weekend'
    ]
    target = 'Boxes_Sold'

    X = df[features]
    Y = df[target]
    print(f"-> Selected {len(features)} features predicting target: '{target}'.")

    # 3. Train-Test Split (80/20)
    print("\n[STEP 3] Performing Train-Test Split (80% Train, 20% Test, random_state=42)...")
    X_train, X_test, Y_train, Y_test = train_test_split(
        X, Y, test_size=0.20, random_state=42
    )
    print(f"-> Training samples: {X_train.shape[0]} | Testing samples: {X_test.shape[0]}")

    # 4. Feature Scaling (fit only on training data)
    print("\n[STEP 4] Fitting StandardScaler (on X_train only to prevent data leakage)...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    print("-> Features scaled for distance-sensitive models (SVR).")

    # 5. Initialize Models
    print("\n[STEP 5 & 6] Initializing and Training 5 Diverse Regression Models...")
    models = {
        'Linear Regression': (LinearRegression(), False),
        'Decision Tree': (DecisionTreeRegressor(random_state=42), False),
        'Random Forest': (RandomForestRegressor(n_estimators=100, random_state=42), False),
        'SVR (RBF Kernel)': (SVR(kernel='rbf'), True),
        'Gradient Boosting': (GradientBoostingRegressor(random_state=42), False)
    }

    test_metrics = []
    generalization_records = []
    trained_models = {}

    for name, (model, use_scaled) in models.items():
        xtr = X_train_scaled if use_scaled else X_train
        xte = X_test_scaled if use_scaled else X_test
        
        # Train
        model.fit(xtr, Y_train)
        trained_models[name] = (model, use_scaled)
        
        # Predict
        y_pred_train = model.predict(xtr)
        y_pred_test = model.predict(xte)
        
        # Evaluate
        mae = mean_absolute_error(Y_test, y_pred_test)
        mse = mean_squared_error(Y_test, y_pred_test)
        rmse = np.sqrt(mse)
        r2_test = r2_score(Y_test, y_pred_test)
        r2_train = r2_score(Y_train, y_pred_train)
        gap = r2_train - r2_test
        
        test_metrics.append({
            'Model': name,
            'MAE': round(mae, 4),
            'MSE': round(mse, 4),
            'RMSE': round(rmse, 4),
            'R2 Score': round(r2_test, 4)
        })
        
        generalization_records.append({
            'Model': name,
            'Training R2': round(r2_train, 4),
            'Testing R2': round(r2_test, 4),
            'Generalization Gap': round(gap, 4),
            'Status': 'Severe Overfit' if gap > 0.20 else ('Noticeable Overfit' if gap > 0.08 else 'Strong Generalization')
        })
        print(f"  [OK] {name} trained and evaluated.")

    # 7. Print Model Comparison Table
    print("\n" + "=" * 70)
    print(" MODEL PERFORMANCE BENCHMARK (TEST SET - 2,000 SAMPLES)")
    print("=" * 70)
    comparison_df = pd.DataFrame(test_metrics).sort_values(by='R2 Score', ascending=False)
    print(comparison_df.to_string(index=False))

    # 8. Print Generalization & Overfitting Table
    print("\n" + "=" * 70)
    print(" GENERALIZATION & OVERFITTING ANALYSIS")
    print("=" * 70)
    gen_df = pd.DataFrame(generalization_records)
    print(gen_df.to_string(index=False))

    # 9. Linear Regression Coefficients
    lr_model = trained_models['Linear Regression'][0]
    print("\n" + "=" * 70)
    print(f" LINEAR REGRESSION COEFFICIENTS (Intercept = {lr_model.intercept_:.2f})")
    print("=" * 70)
    coef_df = pd.DataFrame({
        'Feature': features,
        'Coefficient': np.round(lr_model.coef_, 4)
    }).sort_values(by='Coefficient', ascending=False)
    print(coef_df.to_string(index=False))

    # 10. Sample Predictions Function Demo
    print("\n" + "=" * 70)
    print(" TESTING PREDICTION FUNCTION: predict_sales(...)")
    print("=" * 70)
    
    def predict_sales(temperature, price, discount_percentage, marketing_budget,
                      instagram_reel, youtube_video, facebook_ads, returning_customers,
                      new_customers, online_orders, offline_orders, customer_rating,
                      festival, weekend):
        sample_df = pd.DataFrame([{
            'Temperature': temperature, 'Price': price, 'Discount_Percentage': discount_percentage,
            'Marketing_Budget': marketing_budget, 'Instagram_Reel': instagram_reel,
            'YouTube_Video': youtube_video, 'Facebook_Ads': facebook_ads,
            'Returning_Customers': returning_customers, 'New_Customers': new_customers,
            'Online_Orders': online_orders, 'Offline_Orders': offline_orders,
            'Customer_Rating': customer_rating, 'Festival': festival, 'Weekend': weekend
        }])
        pred = lr_model.predict(sample_df)[0]
        return int(max(0, round(pred)))

    normal_day = predict_sales(
        temperature=28.5, price=120, discount_percentage=10, marketing_budget=500,
        instagram_reel=1, youtube_video=0, facebook_ads=1, returning_customers=45,
        new_customers=25, online_orders=30, offline_orders=40, customer_rating=4.3,
        festival=0, weekend=0
    )
    festival_day = predict_sales(
        temperature=24.0, price=120, discount_percentage=20, marketing_budget=2000,
        instagram_reel=3, youtube_video=2, facebook_ads=4, returning_customers=120,
        new_customers=85, online_orders=90, offline_orders=110, customer_rating=4.8,
        festival=1, weekend=1
    )

    print(f"Scenario 1: Normal Weekday    -> Predicted Sales: {normal_day} Boxes")
    print(f"Scenario 2: Festival Weekend  -> Predicted Sales: {festival_day} Boxes")
    print("\n" + "=" * 70)
    print(" ALL 5 MODELS EXECUTED AND VALIDATED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == '__main__':
    main()
