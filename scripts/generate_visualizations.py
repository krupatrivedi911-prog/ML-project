"""
Generate Visualizations (Week 6)
AI-Based Chocolate Paan Sales Prediction System
Generates high-resolution performance and interpretation graphs into static/images/
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

def setup_style():
    plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['axes.edgecolor'] = '#D1C7BD'
    plt.rcParams['axes.linewidth'] = 1.0
    plt.rcParams['grid.color'] = '#EAE4DC'
    plt.rcParams['grid.linestyle'] = '--'
    plt.rcParams['grid.alpha'] = 0.7

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    img_dir = os.path.join(base_dir, 'static', 'images')
    model_dir = os.path.join(base_dir, 'model')
    os.makedirs(img_dir, exist_ok=True)

    setup_style()

    print("=" * 70)
    print(" GENERATING WEEK 6 MODEL PERFORMANCE VISUALIZATIONS ")
    print("=" * 70)

    # Load metrics JSON
    with open(os.path.join(model_dir, 'metrics.json'), 'r') as f:
        meta = json.load(f)

    # Load dataset for scatter & residual plots
    dataset_path = os.path.join(base_dir, 'Chocolate_Paan_Sales_Dataset_10000.xlsx')
    df = pd.read_excel(dataset_path)
    features = meta['features']
    target = meta['target']

    X = df[features]
    Y = df[target]

    X_train, X_test, Y_train, Y_test = train_test_split(
        X, Y, test_size=0.20, random_state=42
    )

    # Load trained model
    lr_model = joblib.load(os.path.join(model_dir, 'trained_model.pkl'))
    y_pred_test = lr_model.predict(X_test)
    residuals = Y_test.values - y_pred_test

    # Palette
    color_primary = '#3B1F1F'
    color_accent = '#D99A3D'
    color_secondary = '#5A2D22'
    color_light = '#FAF5EF'
    color_success = '#2E7D32'
    color_danger = '#C62828'
    bar_colors = ['#2E7D32', '#1565C0', '#D99A3D', '#6A1B9A', '#C62828']

    models_df = pd.DataFrame(meta['metrics']).sort_values(by='R2', ascending=False)
    gen_df = pd.DataFrame(meta['generalization']).set_index('Model').loc[models_df['Model']].reset_index()

    # -------------------------------------------------------------
    # 1. R² Comparison Graph
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(9, 5.5), facecolor='#FFFFFF')
    bars = ax.bar(models_df['Model'], models_df['R2'], color=bar_colors, width=0.55, edgecolor='#3B1F1F', linewidth=1.2)
    ax.set_title('Model Comparison — R² Score (Higher is Better)', fontsize=14, fontweight='bold', color=color_primary, pad=15)
    ax.set_ylabel('R² Score (Coefficient of Determination)', fontsize=11, fontweight='bold', color=color_primary)
    ax.set_ylim(0, 1.08)
    ax.grid(axis='y', alpha=0.7)
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height:.4f}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 5), textcoords="offset points",
                    ha='center', va='bottom', fontsize=10, fontweight='bold', color=color_primary)
    plt.xticks(rotation=15, ha='right', fontsize=10, fontweight='bold')
    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'r2_comparison.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: r2_comparison.png")

    # -------------------------------------------------------------
    # 2. MAE Comparison Graph
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(9, 5.5), facecolor='#FFFFFF')
    models_df_mae = models_df.sort_values(by='MAE')
    bars = ax.bar(models_df_mae['Model'], models_df_mae['MAE'], color=bar_colors, width=0.55, edgecolor='#3B1F1F', linewidth=1.2)
    ax.set_title('Mean Absolute Error (MAE) Comparison (Lower is Better)', fontsize=14, fontweight='bold', color=color_primary, pad=15)
    ax.set_ylabel('MAE (Boxes Sold)', fontsize=11, fontweight='bold', color=color_primary)
    ax.set_ylim(0, max(models_df['MAE']) * 1.18)
    ax.grid(axis='y', alpha=0.7)
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height:.2f}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 5), textcoords="offset points",
                    ha='center', va='bottom', fontsize=10, fontweight='bold', color=color_primary)
    plt.xticks(rotation=15, ha='right', fontsize=10, fontweight='bold')
    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'mae_comparison.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: mae_comparison.png")

    # -------------------------------------------------------------
    # 3. RMSE Comparison Graph
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(9, 5.5), facecolor='#FFFFFF')
    models_df_rmse = models_df.sort_values(by='RMSE')
    bars = ax.bar(models_df_rmse['Model'], models_df_rmse['RMSE'], color=bar_colors, width=0.55, edgecolor='#3B1F1F', linewidth=1.2)
    ax.set_title('Root Mean Squared Error (RMSE) Comparison (Lower is Better)', fontsize=14, fontweight='bold', color=color_primary, pad=15)
    ax.set_ylabel('RMSE (Boxes Sold)', fontsize=11, fontweight='bold', color=color_primary)
    ax.set_ylim(0, max(models_df['RMSE']) * 1.18)
    ax.grid(axis='y', alpha=0.7)
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height:.2f}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 5), textcoords="offset points",
                    ha='center', va='bottom', fontsize=10, fontweight='bold', color=color_primary)
    plt.xticks(rotation=15, ha='right', fontsize=10, fontweight='bold')
    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'rmse_comparison.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: rmse_comparison.png")

    # -------------------------------------------------------------
    # 4. Training vs Testing R² Grouped Bar Chart
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(10, 5.8), facecolor='#FFFFFF')
    x = np.arange(len(gen_df['Model']))
    width = 0.35

    rects1 = ax.bar(x - width/2, gen_df['Training R2'], width, label='Training R²', color='#5A2D22', edgecolor='#3B1F1F')
    rects2 = ax.bar(x + width/2, gen_df['Testing R2'], width, label='Testing R²', color='#D99A3D', edgecolor='#3B1F1F')

    ax.set_title('Training vs Testing R² — Generalization & Overfitting Diagnosis', fontsize=14, fontweight='bold', color=color_primary, pad=15)
    ax.set_ylabel('R² Score', fontsize=11, fontweight='bold', color=color_primary)
    ax.set_xticks(x)
    ax.set_xticklabels(gen_df['Model'], rotation=15, ha='right', fontsize=10, fontweight='bold')
    ax.set_ylim(0, 1.18)
    ax.legend(frameon=True, facecolor=color_light, edgecolor='#D1C7BD', loc='upper right', fontsize=10)
    ax.grid(axis='y', alpha=0.7)

    for r in rects1:
        h = r.get_height()
        ax.annotate(f'{h:.2f}', xy=(r.get_x() + r.get_width()/2, h), xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=8.5, fontweight='bold')
    for r in rects2:
        h = r.get_height()
        ax.annotate(f'{h:.2f}', xy=(r.get_x() + r.get_width()/2, h), xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=8.5, fontweight='bold')

    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'train_vs_test_r2.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: train_vs_test_r2.png")

    # -------------------------------------------------------------
    # 5. Actual vs Predicted Graph (with y = x line)
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(8, 7), facecolor='#FFFFFF')
    # Sample 400 test points for clean visualization
    sample_indices = np.random.RandomState(42).choice(len(Y_test), size=400, replace=False)
    y_test_samp = Y_test.values[sample_indices]
    y_pred_samp = y_pred_test[sample_indices]

    ax.scatter(y_test_samp, y_pred_samp, alpha=0.55, color='#D99A3D', edgecolors='#5A2D22', s=38, label='Test Observations')
    min_val = min(y_test_samp.min(), y_pred_samp.min()) - 10
    max_val = max(y_test_samp.max(), y_pred_samp.max()) + 10
    ax.plot([min_val, max_val], [min_val, max_val], color='#C62828', linestyle='--', linewidth=2, label='Ideal Reference (y = x)')

    ax.set_title('Actual vs Predicted Boxes Sold (Linear Regression, R² = 0.9449)', fontsize=13, fontweight='bold', color=color_primary, pad=15)
    ax.set_xlabel('Actual Boxes Sold', fontsize=11, fontweight='bold', color=color_primary)
    ax.set_ylabel('Predicted Boxes Sold', fontsize=11, fontweight='bold', color=color_primary)
    ax.set_xlim(min_val, max_val)
    ax.set_ylim(min_val, max_val)
    ax.grid(True, alpha=0.7)
    ax.legend(frameon=True, facecolor=color_light, edgecolor='#D1C7BD', loc='upper left')

    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'actual_vs_predicted.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: actual_vs_predicted.png")

    # -------------------------------------------------------------
    # 6. Residual Plot
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(9, 5.5), facecolor='#FFFFFF')
    res_samp = residuals[sample_indices]
    ax.scatter(y_pred_samp, res_samp, alpha=0.55, color='#5A2D22', edgecolors='#3B1F1F', s=38)
    ax.axhline(0, color='#C62828', linestyle='--', linewidth=2, label='Zero Residual Baseline (y = 0)')
    ax.set_title('Residual Plot — Predicted Values vs Residuals (Actual - Predicted)', fontsize=13, fontweight='bold', color=color_primary, pad=15)
    ax.set_xlabel('Predicted Boxes Sold', fontsize=11, fontweight='bold', color=color_primary)
    ax.set_ylabel('Residuals (Actual - Predicted)', fontsize=11, fontweight='bold', color=color_primary)
    ax.grid(True, alpha=0.7)
    ax.legend(frameon=True, facecolor=color_light, edgecolor='#D1C7BD', loc='upper right')

    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'residual_plot.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: residual_plot.png")

    # -------------------------------------------------------------
    # 7. Linear Regression Coefficients
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(9, 6.5), facecolor='#FFFFFF')
    coef_series = pd.Series(meta['coefficients']).sort_values()
    colors = ['#C62828' if c < 0 else '#2E7D32' for c in coef_series.values]
    bars = ax.barh(coef_series.index, coef_series.values, color=colors, edgecolor='#3B1F1F', height=0.6)
    ax.axvline(0, color='#3B1F1F', linewidth=1)
    ax.set_title(f'Linear Regression Feature Coefficients (Intercept = {meta["intercept"]:.2f})', fontsize=13, fontweight='bold', color=color_primary, pad=15)
    ax.set_xlabel('Coefficient Value (Change in Boxes Sold per unit increase)', fontsize=10.5, fontweight='bold', color=color_primary)
    ax.grid(axis='x', alpha=0.7)

    for bar in bars:
        w = bar.get_width()
        xpos = w + (1 if w >= 0 else -1)
        ha = 'left' if w >= 0 else 'right'
        ax.annotate(f'{w:+.2f}', xy=(w, bar.get_y() + bar.get_height()/2),
                    xytext=(5 if w >= 0 else -5, 0), textcoords="offset points",
                    ha=ha, va='center', fontsize=9, fontweight='bold')

    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'lr_coefficients.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: lr_coefficients.png")

    # -------------------------------------------------------------
    # 8. Random Forest Feature Importance (Displayed Separately!)
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(9, 6.5), facecolor='#FFFFFF')
    rf_series = (pd.Series(meta['rf_importances']) * 100).sort_values()
    bars = ax.barh(rf_series.index, rf_series.values, color='#D99A3D', edgecolor='#5A2D22', height=0.6)
    ax.set_title('Random Forest Feature Importance (% Relative Impurity Contribution)', fontsize=13, fontweight='bold', color=color_primary, pad=15)
    ax.set_xlabel('Relative Importance (%) — Sums to 100%', fontsize=10.5, fontweight='bold', color=color_primary)
    ax.grid(axis='x', alpha=0.7)

    for bar in bars:
        w = bar.get_width()
        ax.annotate(f'{w:.2f}%', xy=(w, bar.get_y() + bar.get_height()/2),
                    xytext=(5, 0), textcoords="offset points",
                    ha='left', va='center', fontsize=9, fontweight='bold', color=color_primary)

    plt.tight_layout()
    fig.savefig(os.path.join(img_dir, 'rf_feature_importance.png'), dpi=300)
    plt.close()
    print("  [OK] Saved: rf_feature_importance.png")

    print("\nAll 8 Week 6 visual assets generated successfully in 'static/images/'!")
    print("=" * 70)

if __name__ == '__main__':
    main()
