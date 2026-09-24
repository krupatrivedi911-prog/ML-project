"""
Generate Week_6_Visualization.ipynb
AI-Based Chocolate Paan Sales Prediction System
"""

import nbformat as nbf
import json

def create_notebook():
    nb = nbf.v4.new_notebook()
    cells = []

    # Title
    cells.append(nbf.v4.new_markdown_cell(
        "# Week 6: Visualization of Model Performance Metrics & Interpretation\n"
        "## AI-Based Chocolate Paan Sales Prediction System\n"
        "**Target:** `Boxes_Sold`  \n"
        "**Dataset:** `Chocolate_Paan_Sales_Dataset_10000.xlsx` (10,000 samples)  \n"
        "**Objective:** Visualizing Week 5 model benchmarking metrics, generalization analysis, "
        "actual vs predicted scatter, residual diagnostics, and feature interpretations."
    ))

    # Cell 1: Environment Setup
    cells.append(nbf.v4.new_code_cell(
        "import os\n"
        "import json\n"
        "import joblib\n"
        "import pandas as pd\n"
        "import numpy as np\n"
        "import matplotlib.pyplot as plt\n"
        "from sklearn.model_selection import train_test_split\n\n"
        "# Styling configuration\n"
        "plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')\n"
        "plt.rcParams['font.sans-serif'] = 'DejaVu Sans'\n"
        "plt.rcParams['figure.dpi'] = 150\n\n"
        "print('Week 6 Visualization Environment Initialized Successfully.')"
    ))

    # Cell 2: Load actual Week 5 metrics
    cells.append(nbf.v4.new_markdown_cell(
        "### 1. Load Actual Week 5 Model Evaluation Metrics\n"
        "Retrieving the exact metrics computed in Week 5 benchmark from `model/metrics.json`.\n"
        "**Models evaluated:**\n"
        "1. Linear Regression\n"
        "2. Decision Tree Regressor\n"
        "3. Random Forest Regressor\n"
        "4. Support Vector Regressor (RBF Kernel)\n"
        "5. Gradient Boosting Regressor"
    ))

    cells.append(nbf.v4.new_code_cell(
        "with open('model/metrics.json', 'r') as f:\n"
        "    metrics_meta = json.load(f)\n\n"
        "metrics_df = pd.DataFrame(metrics_meta['metrics']).sort_values(by='R2', ascending=False)\n"
        "gen_df = pd.DataFrame(metrics_meta['generalization']).set_index('Model').loc[metrics_df['Model']].reset_index()\n\n"
        "print('=== WEEK 5 MODEL PERFORMANCE BENCHMARK (TEST SET - 2,000 SAMPLES) ===')\n"
        "display(metrics_df)\n"
        "print('\\n=== GENERALIZATION & OVERFITTING ANALYSIS ===')\n"
        "display(gen_df)"
    ))

    # Cell 3: Comparison Table Markdown
    cells.append(nbf.v4.new_markdown_cell(
        "### 2. Model Performance Comparison Table\n\n"
        "| Model | MAE (Boxes) | MSE | RMSE (Boxes) | R² Score |\n"
        "| :--- | :---: | :---: | :---: | :---: |\n"
        "| **Linear Regression** | **7.7102** | **79.7161** | **8.9284** | **0.9449** |\n"
        "| **Gradient Boosting** | 9.0932 | 121.3074 | 11.0140 | 0.9161 |\n"
        "| **SVR (RBF Kernel)** | 9.3598 | 144.5780 | 12.0241 | 0.9001 |\n"
        "| **Random Forest** | 11.7753 | 216.5535 | 14.7158 | 0.8503 |\n"
        "| **Decision Tree** | 18.7780 | 553.4700 | 23.5259 | 0.6174 |\n\n"
        "> **Key Takeaway:** Linear Regression is the best performing model with the highest R² (0.9449) "
        "and lowest MAE (7.7102 boxes) and RMSE (8.9284 boxes)."
    ))

    # Cell 4: R2 comparison
    cells.append(nbf.v4.new_markdown_cell(
        "### 3. R² Comparison Graph\n"
        "Comparing the coefficient of determination (R²) across all 5 models. Higher is better."
    ))

    cells.append(nbf.v4.new_code_cell(
        "fig, ax = plt.subplots(figsize=(9, 5))\n"
        "bar_colors = ['#2E7D32', '#1565C0', '#D99A3D', '#6A1B9A', '#C62828']\n"
        "bars = ax.bar(metrics_df['Model'], metrics_df['R2'], color=bar_colors, width=0.55, edgecolor='#3B1F1F')\n"
        "ax.set_title('Model Comparison — R² Score (Higher is Better)', fontsize=14, fontweight='bold', color='#3B1F1F', pad=15)\n"
        "ax.set_ylabel('R² Score', fontsize=11, fontweight='bold', color='#3B1F1F')\n"
        "ax.set_ylim(0, 1.08)\n"
        "for bar in bars:\n"
        "    h = bar.get_height()\n"
        "    ax.annotate(f'{h:.4f}', xy=(bar.get_x() + bar.get_width()/2, h), xytext=(0, 4),\n"
        "                textcoords='offset points', ha='center', va='bottom', fontweight='bold', color='#3B1F1F')\n"
        "plt.xticks(rotation=15, ha='right', fontweight='bold')\n"
        "plt.tight_layout()\n"
        "plt.show()"
    ))

    # Cell 5: MAE & RMSE comparisons
    cells.append(nbf.v4.new_markdown_cell(
        "### 4. MAE and RMSE Comparison Graphs\n"
        "Lower error indicates closer predictions to actual sales volume."
    ))

    cells.append(nbf.v4.new_code_cell(
        "fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))\n\n"
        "# MAE Comparison\n"
        "df_mae = metrics_df.sort_values(by='MAE')\n"
        "bars1 = ax1.bar(df_mae['Model'], df_mae['MAE'], color=bar_colors, width=0.55, edgecolor='#3B1F1F')\n"
        "ax1.set_title('Mean Absolute Error (MAE) — Lower is Better', fontsize=12, fontweight='bold', color='#3B1F1F')\n"
        "ax1.set_ylabel('MAE (Boxes Sold)', fontweight='bold')\n"
        "ax1.set_ylim(0, max(df_mae['MAE']) * 1.18)\n"
        "for b in bars1:\n"
        "    h = b.get_height()\n"
        "    ax1.annotate(f'{h:.2f}', xy=(b.get_x() + b.get_width()/2, h), xytext=(0, 3),\n"
        "                 textcoords='offset points', ha='center', va='bottom', fontweight='bold')\n"
        "ax1.set_xticks(range(len(df_mae)))\n"
        "ax1.set_xticklabels(df_mae['Model'], rotation=15, ha='right', fontweight='bold')\n\n"
        "# RMSE Comparison\n"
        "df_rmse = metrics_df.sort_values(by='RMSE')\n"
        "bars2 = ax2.bar(df_rmse['Model'], df_rmse['RMSE'], color=bar_colors, width=0.55, edgecolor='#3B1F1F')\n"
        "ax2.set_title('Root Mean Squared Error (RMSE) — Lower is Better', fontsize=12, fontweight='bold', color='#3B1F1F')\n"
        "ax2.set_ylabel('RMSE (Boxes Sold)', fontweight='bold')\n"
        "ax2.set_ylim(0, max(df_rmse['RMSE']) * 1.18)\n"
        "for b in bars2:\n"
        "    h = b.get_height()\n"
        "    ax2.annotate(f'{h:.2f}', xy=(b.get_x() + b.get_width()/2, h), xytext=(0, 3),\n"
        "                 textcoords='offset points', ha='center', va='bottom', fontweight='bold')\n"
        "ax2.set_xticks(range(len(df_rmse)))\n"
        "ax2.set_xticklabels(df_rmse['Model'], rotation=15, ha='right', fontweight='bold')\n\n"
        "plt.tight_layout()\n"
        "plt.show()"
    ))

    # Cell 6: Train vs Test R2
    cells.append(nbf.v4.new_markdown_cell(
        "### 5. Training vs Testing R² (Generalization & Overfitting Diagnosis)\n"
        "Comparing fit between training set (8,000 rows) and testing set (2,000 rows)."
    ))

    cells.append(nbf.v4.new_code_cell(
        "fig, ax = plt.subplots(figsize=(10, 5.5))\n"
        "x = np.arange(len(gen_df['Model']))\n"
        "width = 0.35\n\n"
        "r1 = ax.bar(x - width/2, gen_df['Training R2'], width, label='Training R²', color='#5A2D22', edgecolor='#3B1F1F')\n"
        "r2 = ax.bar(x + width/2, gen_df['Testing R2'], width, label='Testing R²', color='#D99A3D', edgecolor='#3B1F1F')\n\n"
        "ax.set_title('Training vs Testing R² — Generalization & Overfitting Diagnosis', fontsize=14, fontweight='bold', color='#3B1F1F', pad=15)\n"
        "ax.set_ylabel('R² Score', fontsize=11, fontweight='bold', color='#3B1F1F')\n"
        "ax.set_xticks(x)\n"
        "ax.set_xticklabels(gen_df['Model'], rotation=15, ha='right', fontweight='bold')\n"
        "ax.set_ylim(0, 1.18)\n"
        "ax.legend(loc='upper right', frameon=True)\n\n"
        "for r in r1:\n"
        "    h = r.get_height()\n"
        "    ax.annotate(f'{h:.2f}', xy=(r.get_x() + r.get_width()/2, h), xytext=(0, 3),\n"
        "                textcoords='offset points', ha='center', va='bottom', fontsize=9, fontweight='bold')\n"
        "for r in r2:\n"
        "    h = r.get_height()\n"
        "    ax.annotate(f'{h:.2f}', xy=(r.get_x() + r.get_width()/2, h), xytext=(0, 3),\n"
        "                textcoords='offset points', ha='center', va='bottom', fontsize=9, fontweight='bold')\n\n"
        "plt.tight_layout()\n"
        "plt.show()"
    ))

    # Cell 7: Actual vs Predicted & Residual Plot
    cells.append(nbf.v4.new_markdown_cell(
        "### 6. Actual vs Predicted and Residual Plot for Selected Model (Linear Regression)\n"
        "Evaluating the calibration and residual errors of the production model."
    ))

    cells.append(nbf.v4.new_code_cell(
        "df = pd.read_excel('Chocolate_Paan_Sales_Dataset_10000.xlsx')\n"
        "features = metrics_meta['features']\n"
        "target = metrics_meta['target']\n\n"
        "X_train, X_test, Y_train, Y_test = train_test_split(df[features], df[target], test_size=0.20, random_state=42)\n"
        "lr_model = joblib.load('model/trained_model.pkl')\n"
        "y_pred_test = lr_model.predict(X_test)\n"
        "residuals = Y_test.values - y_pred_test\n\n"
        "fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))\n\n"
        "# Actual vs Predicted\n"
        "np.random.seed(42)\n"
        "idx = np.random.choice(len(Y_test), size=400, replace=False)\n"
        "y_s = Y_test.values[idx]\n"
        "p_s = y_pred_test[idx]\n"
        "r_s = residuals[idx]\n\n"
        "ax1.scatter(y_s, p_s, alpha=0.55, color='#D99A3D', edgecolors='#5A2D22', s=35, label='Test Samples')\n"
        "min_v = min(y_s.min(), p_s.min()) - 10\n"
        "max_v = max(y_s.max(), p_s.max()) + 10\n"
        "ax1.plot([min_v, max_v], [min_v, max_v], color='#C62828', linestyle='--', linewidth=2, label='Ideal Reference (y = x)')\n"
        "ax1.set_title('Actual vs Predicted Boxes Sold (Linear Regression, R² = 0.9449)', fontsize=12, fontweight='bold', color='#3B1F1F')\n"
        "ax1.set_xlabel('Actual Boxes Sold', fontweight='bold')\n"
        "ax1.set_ylabel('Predicted Boxes Sold', fontweight='bold')\n"
        "ax1.legend()\n\n"
        "# Residual Plot\n"
        "ax2.scatter(p_s, r_s, alpha=0.55, color='#5A2D22', edgecolors='#3B1F1F', s=35)\n"
        "ax2.axhline(0, color='#C62828', linestyle='--', linewidth=2, label='Zero Residual Baseline (y = 0)')\n"
        "ax2.set_title('Residual Plot (Predicted vs Residuals)', fontsize=12, fontweight='bold', color='#3B1F1F')\n"
        "ax2.set_xlabel('Predicted Boxes Sold', fontweight='bold')\n"
        "ax2.set_ylabel('Residuals (Actual - Predicted)', fontweight='bold')\n"
        "ax2.legend()\n\n"
        "plt.tight_layout()\n"
        "plt.show()"
    ))

    # Cell 8: Feature Interpretation
    cells.append(nbf.v4.new_markdown_cell(
        "### 7. Feature Interpretation: Linear Regression Coefficients vs Random Forest Feature Importance\n\n"
        "> **Methodological Difference:**\n"
        "> - **Linear Regression Coefficients** have units and sign (+/-). A positive coefficient means an increase "
        "in the feature directly increases `Boxes_Sold`.\n"
        "> - **Random Forest Feature Importance** represents the percentage contribution to impurity reduction "
        "(MDI) across all decision trees. It sums to 100% and does not denote directionality.\n"
        "> They are presented in separate plots below as required by the SOP."
    ))

    cells.append(nbf.v4.new_code_cell(
        "fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 7))\n\n"
        "# Linear Regression Coefficients\n"
        "coef_series = pd.Series(metrics_meta['coefficients']).sort_values()\n"
        "c_colors = ['#C62828' if v < 0 else '#2E7D32' for v in coef_series.values]\n"
        "bars_c = ax1.barh(coef_series.index, coef_series.values, color=c_colors, edgecolor='#3B1F1F', height=0.6)\n"
        "ax1.axvline(0, color='#3B1F1F', linewidth=1)\n"
        "ax1.set_title(f'Linear Regression Coefficients (Intercept = {metrics_meta[\"intercept\"]:.2f})', fontsize=12, fontweight='bold', color='#3B1F1F')\n"
        "ax1.set_xlabel('Coefficient Value (Change in Boxes Sold)', fontweight='bold')\n"
        "for bar in bars_c:\n"
        "    w = bar.get_width()\n"
        "    ha = 'left' if w >= 0 else 'right'\n"
        "    ax1.annotate(f'{w:+.2f}', xy=(w, bar.get_y() + bar.get_height()/2),\n"
        "                 xytext=(5 if w >= 0 else -5, 0), textcoords='offset points',\n"
        "                 ha=ha, va='center', fontsize=9, fontweight='bold')\n\n"
        "# Random Forest Feature Importance\n"
        "rf_series = (pd.Series(metrics_meta['rf_importances']) * 100).sort_values()\n"
        "bars_rf = ax2.barh(rf_series.index, rf_series.values, color='#D99A3D', edgecolor='#5A2D22', height=0.6)\n"
        "ax2.set_title('Random Forest Feature Importance (% Relative Impurity Contribution)', fontsize=12, fontweight='bold', color='#3B1F1F')\n"
        "ax2.set_xlabel('Relative Importance (%)', fontweight='bold')\n"
        "for bar in bars_rf:\n"
        "    w = bar.get_width()\n"
        "    ax2.annotate(f'{w:.2f}%', xy=(w, bar.get_y() + bar.get_height()/2),\n"
        "                 xytext=(5, 0), textcoords='offset points',\n"
        "                 ha='left', va='center', fontsize=9, fontweight='bold')\n\n"
        "plt.tight_layout()\n"
        "plt.show()"
    ))

    nb['cells'] = cells

    with open('Week_6_Visualization.ipynb', 'w', encoding='utf-8') as f:
        nbf.write(nb, f)

    print("Created Week_6_Visualization.ipynb successfully!")

if __name__ == '__main__':
    create_notebook()
