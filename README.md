# AI-Based Chocolate Paan Sales Prediction System

> **BTech Machine Learning Project** • Complete Implementation of Official SOP (Weeks 1 to 10)  
> **Target:** `Boxes_Sold` • **Dataset:** `Chocolate_Paan_Sales_Dataset_10000.xlsx` (10,000 Samples, 14 Features)  
> **Production Model:** Linear Regression (**R² = 0.9449**, MAE = 7.71 Boxes, RMSE = 8.93 Boxes)

---

## 📋 Table of Contents
1. [Project Overview & Architecture](#-project-overview--architecture)
2. [SOP Weekly Progression (Weeks 1–10)](#-sop-weekly-progression-weeks-110)
3. [Model Benchmarking Results (Week 5)](#-model-benchmarking-results-week-5)
4. [Visual Diagnostics (Week 6)](#-visual-diagnostics-week-6)
5. [System Directory Structure](#-system-directory-structure)
6. [Quick Start & How to Run](#-quick-start--how-to-run)
7. [API Documentation](#-api-documentation)
8. [Automated Evaluation & Testing (Week 10)](#-automated-evaluation--testing-week-10)
9. [Free Cloud Deployment Guide](#-free-cloud-deployment-guide)
10. [Viva / Defense Talking Points](#-viva--defense-talking-points)

---

## 🌟 Project Overview & Architecture

Fresh confectioneries such as **Chocolate Paan** have perishable ingredients (betel leaves, chocolate fillings, toppings). Underproduction causes stockouts during festivals, while overproduction leads to inventory spoilage. 

This project implements an end-to-end Machine Learning prediction engine to forecast daily `Boxes_Sold` based on 14 operational, marketing, customer behavioral, and environmental indicators.

```text
       USER INPUT (14 Features)
                  │
                  ▼
         FRONTEND WEB UI
     (Vanilla CSS / Jinja Templates)
                  │  HTTP POST /predict
                  ▼
           FLASK BACKEND (app.py)
                  │
                  ▼
       STRICT INPUT VALIDATION
   (Bounds, Non-Negative Checks, Types)
                  │
                  ▼
     PREPROCESSING (StandardScaler)
  (Fitted strictly on X_train to prevent leakage)
                  │
                  ▼
     SAVED ML MODEL (trained_model.pkl)
      (Linear Regression R² = 0.9449)
                  │
                  ▼
        PREDICTED BOXES SOLD
                  │
                  ▼
      OPERATIONAL RECOMMENDATIONS
 (Paan leaves, Chocolate compound, Revenue)
```

---

## 🗓️ SOP Weekly Progression (Weeks 1–10)

| Week | Phase | Description | Status |
| :---: | :--- | :--- | :---: |
| **Week 1** | Problem Formulation & EDA | Dataset collection, feature exploration, target definition | **COMPLETED (Preserved)** |
| **Week 2** | Data Preprocessing | Missing value verification, distributions, normalization | **COMPLETED (Preserved)** |
| **Week 3** | Feature Engineering | Correlation matrix, multi-collinearity checks, train-test split | **COMPLETED (Preserved)** |
| **Week 4** | Baseline Modeling | Single model exploration and initial evaluation metrics | **COMPLETED (Preserved)** |
| **Week 5** | Multi-Model Benchmark | Comparative evaluation of 5 regression architectures | **COMPLETED (Preserved)** |
| **Week 6** | Performance Visualization | 8 diagnostic graphs, residual plots, coefficients & importances | **COMPLETED** |
| **Week 7** | Flask Project Setup | Lightweight server loading saved models without retraining | **COMPLETED** |
| **Week 8** | Frontend Design | Professional Chocolate & Cream UI, responsive forms & cards | **COMPLETED** |
| **Week 9** | Backend & Deployment | Input validation, REST API, requirements.txt, Procfile | **COMPLETED** |
| **Week 10**| Final Evaluation | End-to-end testing suite (all 9 tests passed 100%) | **COMPLETED** |

---

## 📊 Model Benchmarking Results (Week 5)

All models evaluated on **2,000 unseen test samples** (80/20 train-test split, `random_state=42`):

| Model Algorithm | MAE (Boxes) | MSE | RMSE (Boxes) | Test R² | Training R² | Generalization Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Linear Regression** ⭐ | **7.7102** | **79.7161** | **8.9284** | **0.9449** | **0.9402** | **Strong Generalization (Selected)** |
| **Gradient Boosting** | 9.0932 | 121.3074 | 11.0140 | 0.9161 | 0.9272 | Strong Generalization |
| **SVR (RBF Kernel)** | 9.3598 | 144.5780 | 12.0241 | 0.9001 | 0.8971 | Strong Generalization |
| **Random Forest** | 11.7753 | 216.5535 | 14.7158 | 0.8503 | 0.9782 | Noticeable Overfitting |
| **Decision Tree** | 18.7780 | 553.4700 | 23.5259 | 0.6174 | 1.0000 | Severe Overfitting |

---

## 📈 Visual Diagnostics (Week 6)

The 8 generated visual assets are stored in `static/images/` and embedded dynamically into the Flask `/performance` route:
1. `r2_comparison.png`: Bar chart comparing $R^2$ scores across all 5 models.
2. `mae_comparison.png`: Mean Absolute Error comparison (lower is better).
3. `rmse_comparison.png`: Root Mean Squared Error comparison (lower is better).
4. `train_vs_test_r2.png`: Grouped bar chart comparing Training vs. Testing fit to diagnose overfitting.
5. `actual_vs_predicted.png`: Scatter plot for Linear Regression with ideal reference line ($y = x$).
6. `residual_plot.png`: Homoscedasticity plot showing zero-centered residual dispersion.
7. `lr_coefficients.png`: Linear Regression feature coefficients with magnitude and signs (+/-).
8. `rf_feature_importance.png`: Random Forest Mean Decrease in Impurity (MDI %) summing to 100%.

---

## 📁 System Directory Structure

```text
e:/D2D/sem 5/ML/Project/
│
├── Chocolate_Paan_Sales_Dataset_10000.xlsx   # Locked Original Dataset (10,000 rows)
├── ML_SOP_Project.pdf                        # Official Course SOP
├── Week_1.ipynb / week 3.ipynb / week 4.ipynb / week 5.ipynb  # Preserved Week 1–5 Notebooks
├── Week_6_Visualization.ipynb                # Week 6 Visual Diagnostics Notebook
│
├── app.py                                    # Flask Application Server (Weeks 7 & 9)
├── requirements.txt                          # Production Dependencies
├── Procfile                                  # WSGI Gunicorn Launch Specification
├── .gitignore                                # Exclusions for Git
│
├── model/                                    # Serialized Artifacts
│   ├── trained_model.pkl                     # Production Linear Regression Model
│   ├── scaler.pkl                            # Fitted StandardScaler
│   ├── all_models.pkl                        # All 5 Benchmark Models
│   └── metrics.json                          # JSON Metadata of Coefficients & Metrics
│
├── templates/                                # Jinja2 HTML Templates (Week 8)
│   ├── base.html                             # Global Layout & Navigation
│   ├── index.html                            # Dashboard (Stat Cards & Activity)
│   ├── predict.html                          # Prediction Form (14 Inputs & Presets)
│   ├── result.html                           # Prediction Result & Inventory Advice
│   ├── performance.html                      # Benchmark Tables & 8 Week 6 Graphs
│   └── about.html                            # System Scope, Target & Methodology
│
├── static/                                   # Assets
│   ├── css/
│   │   └── style.css                         # Chocolate & Cream Theme Design System
│   ├── js/
│   │   └── main.js                           # Interactive Presets & Client Validation
│   └── images/                               # 8 Generated Week 6 Graph Plots
│
├── scripts/
│   ├── save_models.py                        # Model Serialization Script
│   ├── generate_visualizations.py            # High-Resolution Matplotlib Plotter
│   └── make_week6_notebook.py                # Week 6 Jupyter Notebook Generator
│
├── tests/
│   └── test_app.py                           # Automated Week 10 Test Suite (9 Tests)
│
└── frontend/                                 # Optional React Vite Dashboard
```

---

## 🚀 Quick Start & How to Run

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Start the Flask Application
```bash
python app.py
```
Open your browser and navigate to:
```text
http://127.0.0.1:5000
```

### Step 3: Run the Week 10 Test Suite
```bash
python tests/test_app.py
```

---

## 🔌 API Documentation

### 1. Model Inference Endpoint
- **URL:** `/api/predict`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Payload:**
```json
{
  "Temperature": 28.5,
  "Price": 120.0,
  "Discount_Percentage": 10.0,
  "Marketing_Budget": 500.0,
  "Instagram_Reel": 1,
  "YouTube_Video": 0,
  "Facebook_Ads": 1,
  "Returning_Customers": 45,
  "New_Customers": 25,
  "Online_Orders": 30,
  "Offline_Orders": 40,
  "Customer_Rating": 4.3,
  "Festival": 0,
  "Weekend": 0
}
```
- **Response:**
```json
{
  "success": true,
  "predicted_boxes": 120,
  "raw_prediction": 119.94,
  "model_used": "Linear Regression",
  "timestamp": "2026-09-24T11:28:00"
}
```

### 2. Metrics & Metadata Endpoint
- **URL:** `/api/metrics`
- **Method:** `GET`
- **Response:** JSON containing evaluation metrics, coefficients, and generalization gaps for all 5 models.

---

## 🧪 Automated Evaluation & Testing (Week 10)

The comprehensive test suite `tests/test_app.py` rigorously validates all 9 SOP requirements:
1. **TEST 1 — App Start:** Confirms Flask boots without errors, loading all 5 models.
2. **TEST 2 — Home Page:** Checks status 200 OK and presence of all 4 dashboard cards.
3. **TEST 3 — Form Fields:** Verifies all 14 input fields render correctly.
4. **TEST 4 — Input Validation:** Rejects negative price, out-of-range discount, and missing inputs with status 400.
5. **TEST 5 — Real Inference:** Validates end-to-end form POST inference.
6. **TEST 6 — Mathematical Verification:** Asserts Flask prediction matches raw scikit-learn model calculation.
7. **TEST 7 — Visualization Verification:** Validates that all 8 graph PNGs exist and are served over HTTP.
8. **TEST 8 — Routing:** Confirms all navigation pages (`/`, `/predict`, `/performance`, `/about`) return 200 OK.
9. **TEST 9 — Error Handling:** Verifies graceful custom 404 responses and JSON validation error handling.

---

## ☁️ Free Cloud Deployment Guide

The project is fully prepared for free hosting on platforms such as **Render**, **Railway**, or **PythonAnywhere**.

### Option A: Deploy on Render.com (Recommended)
1. Push this project repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Complete AI Chocolate Paan Sales Prediction System (Weeks 1-10)"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/chocolate-paan-sales-prediction.git
   git push -u origin main
   ```
2. Go to [Render.com](https://render.com) and log in.
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository.
5. Configure the following fields:
   - **Name:** `chocolate-paan-sales-prediction`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Instance Type:** `Free`
6. Click **Deploy Web Service**. Your app will be live with a free HTTPS URL!

### Option B: Deploy on PythonAnywhere.com
1. Create a free account at [PythonAnywhere](https://www.pythonanywhere.com/).
2. Open a Bash console and clone your repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/chocolate-paan-sales-prediction.git
   ```
3. Install requirements into a virtual environment:
   ```bash
   mkvirtualenv --python=/usr/bin/python3.10 paan-env
   pip install -r requirements.txt
   ```
4. In the **Web** tab, configure a manual Flask app, set the working directory, and point the WSGI file to `from app import app as application`.

---

## 🎓 Viva / Defense Talking Points

When presenting this project to examiners, highlight the following:

1. **Why did Linear Regression beat Random Forest and Decision Trees?**
   - The data exhibits a clean, additive linear relationship.
   - Decision Tree achieved a training $R^2 = 1.00$ but dropped to $0.6174$ on the test set, evidencing **severe overfitting** (variance error).
   - Linear Regression maintained $R^2 = 0.9402$ (train) vs $0.9449$ (test), showing near-zero generalization error and superior reliability.

2. **How was Data Leakage Prevented?**
   - `StandardScaler` was fitted strictly on `X_train` (`scaler.fit_transform(X_train)`) and only transformed on `X_test` (`scaler.transform(X_test)`).

3. **Difference Between Feature Coefficients and Feature Importance:**
   - **Linear Regression Coefficients:** Signed numbers indicating the directional increase or decrease in `Boxes_Sold` per unit change in the feature.
   - **Random Forest Feature Importance:** Unsigned percentage measuring Mean Decrease in Impurity (MDI), summing to 100%. They are fundamentally different metrics and displayed in separate graphs.
