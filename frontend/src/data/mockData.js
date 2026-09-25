// ============================================================================
// AI-Based Chocolate Paan Sales Prediction System - Mock & Model Data
// ============================================================================
// This file is decoupled from UI components.
// It holds all ML evaluation metrics, model coefficients (from Week 4),
// sales timeline series, scatter plot coordinates, and the prediction handler.
//
// To integrate your real backend later, simply update the `predictSales` function!
// ============================================================================

// 1. Exact Linear Regression Parameters (from Week 4 model evaluation)
export const MODEL_CONFIG = {
  modelName: "Multiple Linear Regression",
  targetVariable: "Boxes_Sold",
  intercept: 118.0467,
  coefficients: {
    Temperature: -0.0068,
    Price: -0.8053,
    Discount_Percentage: 1.9808,
    Marketing_Budget: 0.0050,
    Instagram_Reel: 18.1488,
    YouTube_Video: 14.8690,
    Facebook_Ads: 9.6430,
    Returning_Customers: 0.4010,
    New_Customers: 0.4935,
    Online_Orders: 0.3051,
    Offline_Orders: 0.2036,
    Customer_Rating: 0.2222,
    Festival: 60.2768,
    Weekend: 25.0976,
  },
};

// 2. Week 4 Evaluation Metrics
export const MODEL_METRICS = {
  mae: 7.71,
  mse: 79.72,
  rmse: 8.93,
  r2Score: 0.9449,
  trainScore: 0.9402,
  testScore: 0.9449,
  difference: 0.0047,
  fitStatus: "Well Fitted",
  r2Explanation:
    "R² (Coefficient of Determination) indicates how well the model explains variation in Chocolate Paan sales. An R² of 0.9449 means approximately 94.5% of sales variance is explained by the business, marketing, and environmental features.",
};

// 3. Feature Insights / Coefficients for Visualization
export const FEATURE_COEFFICIENTS = [
  { feature: "Festival", key: "Festival", coef: 60.28, type: "Marketing & Occasion", unit: "Yes/No", positive: true },
  { feature: "Weekend", key: "Weekend", coef: 25.10, type: "Environment", unit: "Yes/No", positive: true },
  { feature: "Instagram Reel", key: "Instagram_Reel", coef: 18.15, type: "Marketing", unit: "Yes/No", positive: true },
  { feature: "YouTube Video", key: "YouTube_Video", coef: 14.87, type: "Marketing", unit: "Yes/No", positive: true },
  { feature: "Facebook Ads", key: "Facebook_Ads", coef: 9.64, type: "Marketing", unit: "Yes/No", positive: true },
  { feature: "Discount %", key: "Discount_Percentage", coef: 1.98, type: "Pricing", unit: "%", positive: true },
  { feature: "New Customers", key: "New_Customers", coef: 0.49, type: "Customer", unit: "Headcount", positive: true },
  { feature: "Returning Customers", key: "Returning_Customers", coef: 0.40, type: "Customer", unit: "Headcount", positive: true },
  { feature: "Online Orders", key: "Online_Orders", coef: 0.31, type: "Orders", unit: "Orders", positive: true },
  { feature: "Customer Rating", key: "Customer_Rating", coef: 0.22, type: "Customer", unit: "Score (1-5)", positive: true },
  { feature: "Offline Orders", key: "Offline_Orders", coef: 0.20, type: "Orders", unit: "Orders", positive: true },
  { feature: "Marketing Budget", key: "Marketing_Budget", coef: 0.005, type: "Marketing", unit: "₹", positive: true },
  { feature: "Temperature", key: "Temperature", coef: -0.007, type: "Environment", unit: "°C", positive: false },
  { feature: "Price", key: "Price", coef: -0.81, type: "Pricing", unit: "₹", positive: false },
];

// 4. Historical Sales Overview Data (30-day timeline)
export const MOCK_SALES_OVERVIEW = [
  { date: "01 Sep", actual: 160, predicted: 158 },
  { date: "02 Sep", actual: 172, predicted: 169 },
  { date: "03 Sep", actual: 181, predicted: 184 },
  { date: "04 Sep", actual: 237, predicted: 232 },
  { date: "05 Sep", actual: 170, predicted: 173 },
  { date: "06 Sep", actual: 195, predicted: 192 },
  { date: "07 Sep", actual: 260, predicted: 254 }, // Weekend surge
  { date: "08 Sep", actual: 275, predicted: 270 }, // Weekend surge
  { date: "09 Sep", actual: 145, predicted: 149 },
  { date: "10 Sep", actual: 155, predicted: 152 },
  { date: "11 Sep", actual: 168, predicted: 165 },
  { date: "12 Sep", actual: 174, predicted: 178 },
  { date: "13 Sep", actual: 190, predicted: 186 },
  { date: "14 Sep", actual: 285, predicted: 290 }, // Festival
  { date: "15 Sep", actual: 298, predicted: 295 }, // Festival
  { date: "16 Sep", actual: 162, predicted: 159 },
  { date: "17 Sep", actual: 158, predicted: 163 },
  { date: "18 Sep", actual: 171, predicted: 168 },
  { date: "19 Sep", actual: 180, predicted: 182 },
  { date: "20 Sep", actual: 192, predicted: 189 },
  { date: "21 Sep", actual: 265, predicted: 262 },
  { date: "22 Sep", actual: 270, predicted: 275 },
  { date: "23 Sep", actual: 150, predicted: 153 },
  { date: "24 Sep", actual: 157, predicted: 155 },
  { date: "25 Sep", actual: 169, predicted: 166 },
  { date: "26 Sep", actual: 178, predicted: 181 },
  { date: "27 Sep", actual: 188, predicted: 185 },
  { date: "28 Sep", actual: 255, predicted: 252 },
  { date: "29 Sep", actual: 268, predicted: 264 },
  { date: "30 Sep", actual: 182, predicted: 179 },
];

// 5. Initial Prediction History
export const INITIAL_PREDICTIONS_HISTORY = [
  {
    id: "pred-101",
    date: "10 Sep 2026",
    temperature: 30.0,
    price: 80,
    discountPercentage: 10,
    marketingBudget: 3500,
    predictedBoxes: 428,
    status: "High",
    confidence: "94.5% R² Fit",
  },
  {
    id: "pred-102",
    date: "09 Sep 2026",
    temperature: 28.5,
    price: 110,
    discountPercentage: 15,
    marketingBudget: 2200,
    predictedBoxes: 198,
    status: "Medium",
    confidence: "94.5% R² Fit",
  },
  {
    id: "pred-103",
    date: "08 Sep 2026",
    temperature: 34.0,
    price: 130,
    discountPercentage: 5,
    marketingBudget: 1200,
    predictedBoxes: 115,
    status: "Low",
    confidence: "94.5% R² Fit",
  },
  {
    id: "pred-104",
    date: "07 Sep 2026",
    temperature: 25.2,
    price: 100,
    discountPercentage: 20,
    marketingBudget: 4000,
    predictedBoxes: 285,
    status: "High",
    confidence: "94.5% R² Fit",
  },
  {
    id: "pred-105",
    date: "06 Sep 2026",
    temperature: 27.8,
    price: 120,
    discountPercentage: 10,
    marketingBudget: 2500,
    predictedBoxes: 172,
    status: "Medium",
    confidence: "94.5% R² Fit",
  },
  {
    id: "pred-106",
    date: "05 Sep 2026",
    temperature: 31.5,
    price: 140,
    discountPercentage: 0,
    marketingBudget: 800,
    predictedBoxes: 98,
    status: "Low",
    confidence: "94.5% R² Fit",
  },
];

// 6. Actual vs Predicted Sample Points (from Week 4 test set)
export const ACTUAL_VS_PREDICTED_SCATTER = [
  { x: 174, y: 188.24 },
  { x: 117, y: 124.39 },
  { x: 146, y: 152.52 },
  { x: 181, y: 185.53 },
  { x: 102, y: 98.84 },
  { x: 115, y: 113.30 },
  { x: 166, y: 161.17 },
  { x: 101, y: 88.99 },
  { x: 167, y: 152.36 },
  { x: 156, y: 160.88 },
  { x: 237, y: 232.10 },
  { x: 215, y: 221.40 },
  { x: 198, y: 195.80 },
  { x: 120, y: 127.30 },
  { x: 135, y: 138.90 },
  { x: 280, y: 274.50 },
  { x: 260, y: 258.10 },
  { x: 92, y: 95.40 },
  { x: 188, y: 182.70 },
  { x: 142, y: 149.20 },
  { x: 160, y: 157.90 },
  { x: 205, y: 211.30 },
  { x: 125, y: 121.60 },
  { x: 245, y: 249.80 },
  { x: 175, y: 170.20 },
  { x: 150, y: 147.50 },
  { x: 220, y: 216.90 },
  { x: 110, y: 116.40 },
  { x: 190, y: 193.10 },
  { x: 165, y: 168.40 },
];

// 7. Residual Data (Predicted Sales vs Residuals = y_test - y_pred)
export const RESIDUAL_ANALYSIS_DATA = ACTUAL_VS_PREDICTED_SCATTER.map(pt => ({
  x: Number(pt.y.toFixed(1)), // Predicted Sales
  y: Number((pt.x - pt.y).toFixed(2)), // Residual = Actual - Predicted
}));

// 8. Demand Classifier Helper
export function classifyDemand(boxes) {
  if (boxes >= 220) return { label: "High", badgeClass: "badge-high" };
  if (boxes >= 140) return { label: "Medium", badgeClass: "badge-medium" };
  return { label: "Low", badgeClass: "badge-low" };
}

// 9. Prediction Function (Formulated to match Week 4 Linear Regression model)
//
// ----------------------------------------------------------------------------
// BACKEND INTEGRATION NOTE:
// To connect to a live backend in the future, replace the local formula with:
//
//   const response = await fetch('/api/predict', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(features)
//   });
//   const data = await response.json();
//   return data.Boxes_Sold;
// ----------------------------------------------------------------------------
export async function predictSales(features) {
  try {
    // In dev mode, Vite proxy forwards /api/* to Flask (port 5000).
    // In production, Flask serves the app directly, so /api/predict works as-is.
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Temperature: Number(features.Temperature || 0),
        Price: Number(features.Price || 0),
        Discount_Percentage: Number(features.Discount_Percentage || 0),
        Marketing_Budget: Number(features.Marketing_Budget || 0),
        Instagram_Reel: features.Instagram_Reel ? 1 : 0,
        YouTube_Video: features.YouTube_Video ? 1 : 0,
        Facebook_Ads: features.Facebook_Ads ? 1 : 0,
        Returning_Customers: Number(features.Returning_Customers || 0),
        New_Customers: Number(features.New_Customers || 0),
        Online_Orders: Number(features.Online_Orders || 0),
        Offline_Orders: Number(features.Offline_Orders || 0),
        Customer_Rating: Number(features.Customer_Rating || 0),
        Festival: features.Festival ? 1 : 0,
        Weekend: features.Weekend ? 1 : 0,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && typeof data.predicted_boxes === 'number') {
        return data.predicted_boxes;
      }
    }

    // If backend returned an error response, try to parse it
    const errorData = await response.json().catch(() => null);
    console.warn('Backend returned error:', errorData?.error || response.statusText);
  } catch (err) {
    console.warn('Flask backend /api/predict not reachable, using local regression fallback:', err.message);
  }

  // Fallback: exact trained formula
  const c = MODEL_CONFIG.coefficients;
  const intercept = MODEL_CONFIG.intercept;

  let pred =
    intercept +
    c.Temperature * Number(features.Temperature || 0) +
    c.Price * Number(features.Price || 0) +
    c.Discount_Percentage * Number(features.Discount_Percentage || 0) +
    c.Marketing_Budget * Number(features.Marketing_Budget || 0) +
    c.Instagram_Reel * Number(features.Instagram_Reel || 0) +
    c.YouTube_Video * Number(features.YouTube_Video || 0) +
    c.Facebook_Ads * Number(features.Facebook_Ads || 0) +
    c.Returning_Customers * Number(features.Returning_Customers || 0) +
    c.New_Customers * Number(features.New_Customers || 0) +
    c.Online_Orders * Number(features.Online_Orders || 0) +
    c.Offline_Orders * Number(features.Offline_Orders || 0) +
    c.Customer_Rating * Number(features.Customer_Rating || 0) +
    c.Festival * (features.Festival ? 1 : 0) +
    c.Weekend * (features.Weekend ? 1 : 0);

  return Math.max(0, Math.round(pred));
}


// ============================================================================
// WEEK 5 - MULTIPLE MACHINE LEARNING MODELS BENCHMARK DATA
// ============================================================================
export const WEEK5_MODELS = [
  {
    "id": "linear",
    "name": "Linear Regression",
    "family": "Parametric Linear",
    "mae": 7.7102,
    "mse": 79.7161,
    "rmse": 8.9284,
    "r2Score": 0.9449,
    "trainScore": 0.9402,
    "difference": -0.0047,
    "status": "Strong Generalization",
    "badge": "Top Performer",
    "rank": 1,
    "isBest": true
  },
  {
    "id": "gb",
    "name": "Gradient Boosting",
    "family": "Boosting Ensemble",
    "mae": 9.0932,
    "mse": 121.3074,
    "rmse": 11.014,
    "r2Score": 0.9161,
    "trainScore": 0.9272,
    "difference": 0.0111,
    "status": "Strong Generalization",
    "badge": "2nd Best",
    "rank": 2,
    "isBest": false
  },
  {
    "id": "svr",
    "name": "SVR (RBF Kernel)",
    "family": "Distance / Kernel",
    "mae": 9.3598,
    "mse": 144.578,
    "rmse": 12.0241,
    "r2Score": 0.9001,
    "trainScore": 0.8971,
    "difference": -0.003,
    "status": "Strong Generalization",
    "badge": "3rd Best",
    "rank": 3,
    "isBest": false
  },
  {
    "id": "rf",
    "name": "Random Forest",
    "family": "Bagging Ensemble",
    "mae": 11.7753,
    "mse": 216.5535,
    "rmse": 14.7158,
    "r2Score": 0.8503,
    "trainScore": 0.9782,
    "difference": 0.1279,
    "status": "Noticeable Overfit",
    "badge": "4th",
    "rank": 4,
    "isBest": false
  },
  {
    "id": "tree",
    "name": "Decision Tree",
    "family": "Single Tree",
    "mae": 18.778,
    "mse": 553.47,
    "rmse": 23.5259,
    "r2Score": 0.6174,
    "trainScore": 1.0,
    "difference": 0.3826,
    "status": "Severe Overfit",
    "badge": "Overfitting",
    "rank": 5,
    "isBest": false
  }
];

export const WEEK5_DIAGNOSTICS = {
  "linear": {
    "scatter": [
      {
        "x": 174,
        "y": 188.24
      },
      {
        "x": 142,
        "y": 129.94
      },
      {
        "x": 192,
        "y": 206.54
      },
      {
        "x": 237,
        "y": 229.18
      },
      {
        "x": 225,
        "y": 212.8
      },
      {
        "x": 151,
        "y": 155.48
      },
      {
        "x": 143,
        "y": 140.73
      },
      {
        "x": 135,
        "y": 126.54
      },
      {
        "x": 148,
        "y": 154.35
      },
      {
        "x": 221,
        "y": 216.07
      },
      {
        "x": 190,
        "y": 198.46
      },
      {
        "x": 100,
        "y": 114.51
      },
      {
        "x": 140,
        "y": 147.75
      },
      {
        "x": 208,
        "y": 203.77
      },
      {
        "x": 170,
        "y": 164.27
      },
      {
        "x": 147,
        "y": 155.77
      },
      {
        "x": 148,
        "y": 135.29
      },
      {
        "x": 232,
        "y": 246.56
      },
      {
        "x": 227,
        "y": 224.57
      },
      {
        "x": 107,
        "y": 116.45
      },
      {
        "x": 143,
        "y": 143.99
      },
      {
        "x": 180,
        "y": 174.65
      },
      {
        "x": 175,
        "y": 179.59
      },
      {
        "x": 146,
        "y": 145.87
      },
      {
        "x": 171,
        "y": 157.68
      },
      {
        "x": 163,
        "y": 158.93
      },
      {
        "x": 103,
        "y": 109.35
      },
      {
        "x": 177,
        "y": 188.77
      },
      {
        "x": 134,
        "y": 132.3
      },
      {
        "x": 162,
        "y": 159.42
      }
    ],
    "residuals": [
      {
        "x": 188.24,
        "y": -14.24
      },
      {
        "x": 129.94,
        "y": 12.06
      },
      {
        "x": 206.54,
        "y": -14.54
      },
      {
        "x": 229.18,
        "y": 7.82
      },
      {
        "x": 212.8,
        "y": 12.2
      },
      {
        "x": 155.48,
        "y": -4.48
      },
      {
        "x": 140.73,
        "y": 2.27
      },
      {
        "x": 126.54,
        "y": 8.46
      },
      {
        "x": 154.35,
        "y": -6.35
      },
      {
        "x": 216.07,
        "y": 4.93
      },
      {
        "x": 198.46,
        "y": -8.46
      },
      {
        "x": 114.51,
        "y": -14.51
      },
      {
        "x": 147.75,
        "y": -7.75
      },
      {
        "x": 203.77,
        "y": 4.23
      },
      {
        "x": 164.27,
        "y": 5.73
      },
      {
        "x": 155.77,
        "y": -8.77
      },
      {
        "x": 135.29,
        "y": 12.71
      },
      {
        "x": 246.56,
        "y": -14.56
      },
      {
        "x": 224.57,
        "y": 2.43
      },
      {
        "x": 116.45,
        "y": -9.45
      },
      {
        "x": 143.99,
        "y": -0.99
      },
      {
        "x": 174.65,
        "y": 5.35
      },
      {
        "x": 179.59,
        "y": -4.59
      },
      {
        "x": 145.87,
        "y": 0.13
      },
      {
        "x": 157.68,
        "y": 13.32
      },
      {
        "x": 158.93,
        "y": 4.07
      },
      {
        "x": 109.35,
        "y": -6.35
      },
      {
        "x": 188.77,
        "y": -11.77
      },
      {
        "x": 132.3,
        "y": 1.7
      },
      {
        "x": 159.42,
        "y": 2.58
      }
    ]
  },
  "gb": {
    "scatter": [
      {
        "x": 174,
        "y": 182.59
      },
      {
        "x": 142,
        "y": 132.27
      },
      {
        "x": 192,
        "y": 200.71
      },
      {
        "x": 237,
        "y": 217.23
      },
      {
        "x": 225,
        "y": 210.09
      },
      {
        "x": 151,
        "y": 159.5
      },
      {
        "x": 143,
        "y": 143.8
      },
      {
        "x": 135,
        "y": 121.03
      },
      {
        "x": 148,
        "y": 152.46
      },
      {
        "x": 221,
        "y": 205.73
      },
      {
        "x": 190,
        "y": 191.35
      },
      {
        "x": 100,
        "y": 118.59
      },
      {
        "x": 140,
        "y": 156.26
      },
      {
        "x": 208,
        "y": 197.51
      },
      {
        "x": 170,
        "y": 164.94
      },
      {
        "x": 147,
        "y": 151.81
      },
      {
        "x": 148,
        "y": 138.95
      },
      {
        "x": 232,
        "y": 233.06
      },
      {
        "x": 227,
        "y": 208.09
      },
      {
        "x": 107,
        "y": 120.92
      },
      {
        "x": 143,
        "y": 148.72
      },
      {
        "x": 180,
        "y": 177.35
      },
      {
        "x": 175,
        "y": 171.87
      },
      {
        "x": 146,
        "y": 149.15
      },
      {
        "x": 171,
        "y": 161.28
      },
      {
        "x": 163,
        "y": 162.15
      },
      {
        "x": 103,
        "y": 119.41
      },
      {
        "x": 177,
        "y": 185.21
      },
      {
        "x": 134,
        "y": 133.6
      },
      {
        "x": 162,
        "y": 162.62
      }
    ],
    "residuals": [
      {
        "x": 182.59,
        "y": -8.59
      },
      {
        "x": 132.27,
        "y": 9.73
      },
      {
        "x": 200.71,
        "y": -8.71
      },
      {
        "x": 217.23,
        "y": 19.77
      },
      {
        "x": 210.09,
        "y": 14.91
      },
      {
        "x": 159.5,
        "y": -8.5
      },
      {
        "x": 143.8,
        "y": -0.8
      },
      {
        "x": 121.03,
        "y": 13.97
      },
      {
        "x": 152.46,
        "y": -4.46
      },
      {
        "x": 205.73,
        "y": 15.27
      },
      {
        "x": 191.35,
        "y": -1.35
      },
      {
        "x": 118.59,
        "y": -18.59
      },
      {
        "x": 156.26,
        "y": -16.26
      },
      {
        "x": 197.51,
        "y": 10.49
      },
      {
        "x": 164.94,
        "y": 5.06
      },
      {
        "x": 151.81,
        "y": -4.81
      },
      {
        "x": 138.95,
        "y": 9.05
      },
      {
        "x": 233.06,
        "y": -1.06
      },
      {
        "x": 208.09,
        "y": 18.91
      },
      {
        "x": 120.92,
        "y": -13.92
      },
      {
        "x": 148.72,
        "y": -5.72
      },
      {
        "x": 177.35,
        "y": 2.65
      },
      {
        "x": 171.87,
        "y": 3.13
      },
      {
        "x": 149.15,
        "y": -3.15
      },
      {
        "x": 161.28,
        "y": 9.72
      },
      {
        "x": 162.15,
        "y": 0.85
      },
      {
        "x": 119.41,
        "y": -16.41
      },
      {
        "x": 185.21,
        "y": -8.21
      },
      {
        "x": 133.6,
        "y": 0.4
      },
      {
        "x": 162.62,
        "y": -0.62
      }
    ]
  },
  "svr": {
    "scatter": [
      {
        "x": 174,
        "y": 183.88
      },
      {
        "x": 142,
        "y": 131.62
      },
      {
        "x": 192,
        "y": 191.59
      },
      {
        "x": 237,
        "y": 219.49
      },
      {
        "x": 225,
        "y": 213.7
      },
      {
        "x": 151,
        "y": 159.43
      },
      {
        "x": 143,
        "y": 150.7
      },
      {
        "x": 135,
        "y": 126.86
      },
      {
        "x": 148,
        "y": 153.6
      },
      {
        "x": 221,
        "y": 217.09
      },
      {
        "x": 190,
        "y": 193.15
      },
      {
        "x": 100,
        "y": 123.73
      },
      {
        "x": 140,
        "y": 153.33
      },
      {
        "x": 208,
        "y": 199.24
      },
      {
        "x": 170,
        "y": 164.93
      },
      {
        "x": 147,
        "y": 156.6
      },
      {
        "x": 148,
        "y": 137.6
      },
      {
        "x": 232,
        "y": 220.64
      },
      {
        "x": 227,
        "y": 214.34
      },
      {
        "x": 107,
        "y": 124.99
      },
      {
        "x": 143,
        "y": 141.39
      },
      {
        "x": 180,
        "y": 178.13
      },
      {
        "x": 175,
        "y": 180.63
      },
      {
        "x": 146,
        "y": 150.46
      },
      {
        "x": 171,
        "y": 158.01
      },
      {
        "x": 163,
        "y": 161.17
      },
      {
        "x": 103,
        "y": 115.23
      },
      {
        "x": 177,
        "y": 191.98
      },
      {
        "x": 134,
        "y": 140.11
      },
      {
        "x": 162,
        "y": 161.55
      }
    ],
    "residuals": [
      {
        "x": 183.88,
        "y": -9.88
      },
      {
        "x": 131.62,
        "y": 10.38
      },
      {
        "x": 191.59,
        "y": 0.41
      },
      {
        "x": 219.49,
        "y": 17.51
      },
      {
        "x": 213.7,
        "y": 11.3
      },
      {
        "x": 159.43,
        "y": -8.43
      },
      {
        "x": 150.7,
        "y": -7.7
      },
      {
        "x": 126.86,
        "y": 8.14
      },
      {
        "x": 153.6,
        "y": -5.6
      },
      {
        "x": 217.09,
        "y": 3.91
      },
      {
        "x": 193.15,
        "y": -3.15
      },
      {
        "x": 123.73,
        "y": -23.73
      },
      {
        "x": 153.33,
        "y": -13.33
      },
      {
        "x": 199.24,
        "y": 8.76
      },
      {
        "x": 164.93,
        "y": 5.07
      },
      {
        "x": 156.6,
        "y": -9.6
      },
      {
        "x": 137.6,
        "y": 10.4
      },
      {
        "x": 220.64,
        "y": 11.36
      },
      {
        "x": 214.34,
        "y": 12.66
      },
      {
        "x": 124.99,
        "y": -17.99
      },
      {
        "x": 141.39,
        "y": 1.61
      },
      {
        "x": 178.13,
        "y": 1.87
      },
      {
        "x": 180.63,
        "y": -5.63
      },
      {
        "x": 150.46,
        "y": -4.46
      },
      {
        "x": 158.01,
        "y": 12.99
      },
      {
        "x": 161.17,
        "y": 1.83
      },
      {
        "x": 115.23,
        "y": -12.23
      },
      {
        "x": 191.98,
        "y": -14.98
      },
      {
        "x": 140.11,
        "y": -6.11
      },
      {
        "x": 161.55,
        "y": 0.45
      }
    ]
  },
  "rf": {
    "scatter": [
      {
        "x": 174,
        "y": 182.97
      },
      {
        "x": 142,
        "y": 137.42
      },
      {
        "x": 192,
        "y": 193.57
      },
      {
        "x": 237,
        "y": 205.06
      },
      {
        "x": 225,
        "y": 211.81
      },
      {
        "x": 151,
        "y": 159.94
      },
      {
        "x": 143,
        "y": 145.74
      },
      {
        "x": 135,
        "y": 115.73
      },
      {
        "x": 148,
        "y": 142.62
      },
      {
        "x": 221,
        "y": 199.37
      },
      {
        "x": 190,
        "y": 198.03
      },
      {
        "x": 100,
        "y": 121.89
      },
      {
        "x": 140,
        "y": 173.99
      },
      {
        "x": 208,
        "y": 197.19
      },
      {
        "x": 170,
        "y": 172.55
      },
      {
        "x": 147,
        "y": 143.34
      },
      {
        "x": 148,
        "y": 135.71
      },
      {
        "x": 232,
        "y": 228.71
      },
      {
        "x": 227,
        "y": 216.84
      },
      {
        "x": 107,
        "y": 115.66
      },
      {
        "x": 143,
        "y": 142.18
      },
      {
        "x": 180,
        "y": 187.65
      },
      {
        "x": 175,
        "y": 173.26
      },
      {
        "x": 146,
        "y": 142.17
      },
      {
        "x": 171,
        "y": 149.36
      },
      {
        "x": 163,
        "y": 152.8
      },
      {
        "x": 103,
        "y": 115.31
      },
      {
        "x": 177,
        "y": 183.81
      },
      {
        "x": 134,
        "y": 133.95
      },
      {
        "x": 162,
        "y": 154.22
      }
    ],
    "residuals": [
      {
        "x": 182.97,
        "y": -8.97
      },
      {
        "x": 137.42,
        "y": 4.58
      },
      {
        "x": 193.57,
        "y": -1.57
      },
      {
        "x": 205.06,
        "y": 31.94
      },
      {
        "x": 211.81,
        "y": 13.19
      },
      {
        "x": 159.94,
        "y": -8.94
      },
      {
        "x": 145.74,
        "y": -2.74
      },
      {
        "x": 115.73,
        "y": 19.27
      },
      {
        "x": 142.62,
        "y": 5.38
      },
      {
        "x": 199.37,
        "y": 21.63
      },
      {
        "x": 198.03,
        "y": -8.03
      },
      {
        "x": 121.89,
        "y": -21.89
      },
      {
        "x": 173.99,
        "y": -33.99
      },
      {
        "x": 197.19,
        "y": 10.81
      },
      {
        "x": 172.55,
        "y": -2.55
      },
      {
        "x": 143.34,
        "y": 3.66
      },
      {
        "x": 135.71,
        "y": 12.29
      },
      {
        "x": 228.71,
        "y": 3.29
      },
      {
        "x": 216.84,
        "y": 10.16
      },
      {
        "x": 115.66,
        "y": -8.66
      },
      {
        "x": 142.18,
        "y": 0.82
      },
      {
        "x": 187.65,
        "y": -7.65
      },
      {
        "x": 173.26,
        "y": 1.74
      },
      {
        "x": 142.17,
        "y": 3.83
      },
      {
        "x": 149.36,
        "y": 21.64
      },
      {
        "x": 152.8,
        "y": 10.2
      },
      {
        "x": 115.31,
        "y": -12.31
      },
      {
        "x": 183.81,
        "y": -6.81
      },
      {
        "x": 133.95,
        "y": 0.05
      },
      {
        "x": 154.22,
        "y": 7.78
      }
    ]
  },
  "tree": {
    "scatter": [
      {
        "x": 174,
        "y": 163.0
      },
      {
        "x": 142,
        "y": 118.0
      },
      {
        "x": 192,
        "y": 205.0
      },
      {
        "x": 237,
        "y": 223.0
      },
      {
        "x": 225,
        "y": 224.0
      },
      {
        "x": 151,
        "y": 144.0
      },
      {
        "x": 143,
        "y": 144.0
      },
      {
        "x": 135,
        "y": 84.0
      },
      {
        "x": 148,
        "y": 156.0
      },
      {
        "x": 221,
        "y": 205.0
      },
      {
        "x": 190,
        "y": 208.0
      },
      {
        "x": 100,
        "y": 113.0
      },
      {
        "x": 140,
        "y": 186.0
      },
      {
        "x": 208,
        "y": 216.0
      },
      {
        "x": 170,
        "y": 157.0
      },
      {
        "x": 147,
        "y": 134.0
      },
      {
        "x": 148,
        "y": 154.0
      },
      {
        "x": 232,
        "y": 212.0
      },
      {
        "x": 227,
        "y": 250.0
      },
      {
        "x": 107,
        "y": 128.0
      },
      {
        "x": 143,
        "y": 143.0
      },
      {
        "x": 180,
        "y": 179.0
      },
      {
        "x": 175,
        "y": 143.0
      },
      {
        "x": 146,
        "y": 127.0
      },
      {
        "x": 171,
        "y": 153.0
      },
      {
        "x": 163,
        "y": 162.0
      },
      {
        "x": 103,
        "y": 105.0
      },
      {
        "x": 177,
        "y": 162.0
      },
      {
        "x": 134,
        "y": 121.0
      },
      {
        "x": 162,
        "y": 152.0
      }
    ],
    "residuals": [
      {
        "x": 163.0,
        "y": 11.0
      },
      {
        "x": 118.0,
        "y": 24.0
      },
      {
        "x": 205.0,
        "y": -13.0
      },
      {
        "x": 223.0,
        "y": 14.0
      },
      {
        "x": 224.0,
        "y": 1.0
      },
      {
        "x": 144.0,
        "y": 7.0
      },
      {
        "x": 144.0,
        "y": -1.0
      },
      {
        "x": 84.0,
        "y": 51.0
      },
      {
        "x": 156.0,
        "y": -8.0
      },
      {
        "x": 205.0,
        "y": 16.0
      },
      {
        "x": 208.0,
        "y": -18.0
      },
      {
        "x": 113.0,
        "y": -13.0
      },
      {
        "x": 186.0,
        "y": -46.0
      },
      {
        "x": 216.0,
        "y": -8.0
      },
      {
        "x": 157.0,
        "y": 13.0
      },
      {
        "x": 134.0,
        "y": 13.0
      },
      {
        "x": 154.0,
        "y": -6.0
      },
      {
        "x": 212.0,
        "y": 20.0
      },
      {
        "x": 250.0,
        "y": -23.0
      },
      {
        "x": 128.0,
        "y": -21.0
      },
      {
        "x": 143.0,
        "y": 0.0
      },
      {
        "x": 179.0,
        "y": 1.0
      },
      {
        "x": 143.0,
        "y": 32.0
      },
      {
        "x": 127.0,
        "y": 19.0
      },
      {
        "x": 153.0,
        "y": 18.0
      },
      {
        "x": 162.0,
        "y": 1.0
      },
      {
        "x": 105.0,
        "y": -2.0
      },
      {
        "x": 162.0,
        "y": 15.0
      },
      {
        "x": 121.0,
        "y": 13.0
      },
      {
        "x": 152.0,
        "y": 10.0
      }
    ]
  }
};


export const WEEK5_SAMPLE_COMPARISONS = [
  {
    "sampleId": "Sample #1",
    "actual": 174,
    "linear": 188.2,
    "gradientBoosting": 182.6,
    "svr": 183.9,
    "randomForest": 183.0,
    "decisionTree": 163.0,
    "closestModel": "Gradient Boosting"
  },
  {
    "sampleId": "Sample #6",
    "actual": 115,
    "linear": 113.3,
    "gradientBoosting": 119.0,
    "svr": 122.4,
    "randomForest": 111.7,
    "decisionTree": 89.0,
    "closestModel": "Linear Regression"
  },
  {
    "sampleId": "Sample #13",
    "actual": 99,
    "linear": 106.3,
    "gradientBoosting": 120.3,
    "svr": 108.8,
    "randomForest": 128.8,
    "decisionTree": 158.0,
    "closestModel": "Linear Regression"
  },
  {
    "sampleId": "Sample #26",
    "actual": 143,
    "linear": 136.1,
    "gradientBoosting": 139.9,
    "svr": 137.8,
    "randomForest": 138.8,
    "decisionTree": 130.0,
    "closestModel": "Gradient Boosting"
  },
  {
    "sampleId": "Sample #41",
    "actual": 203,
    "linear": 210.8,
    "gradientBoosting": 204.3,
    "svr": 199.3,
    "randomForest": 184.8,
    "decisionTree": 180.0,
    "closestModel": "Gradient Boosting"
  },
  {
    "sampleId": "Sample #66",
    "actual": 164,
    "linear": 156.1,
    "gradientBoosting": 154.9,
    "svr": 155.6,
    "randomForest": 162.7,
    "decisionTree": 156.0,
    "closestModel": "Random Forest"
  },
  {
    "sampleId": "Sample #89",
    "actual": 184,
    "linear": 192.7,
    "gradientBoosting": 186.7,
    "svr": 198.9,
    "randomForest": 182.7,
    "decisionTree": 190.0,
    "closestModel": "Random Forest"
  },
  {
    "sampleId": "Sample #111",
    "actual": 119,
    "linear": 132.9,
    "gradientBoosting": 139.6,
    "svr": 125.5,
    "randomForest": 147.7,
    "decisionTree": 141.0,
    "closestModel": "SVR"
  },
  {
    "sampleId": "Sample #146",
    "actual": 159,
    "linear": 165.6,
    "gradientBoosting": 166.5,
    "svr": 166.5,
    "randomForest": 163.6,
    "decisionTree": 146.0,
    "closestModel": "Random Forest"
  },
  {
    "sampleId": "Sample #181",
    "actual": 143,
    "linear": 154.6,
    "gradientBoosting": 153.0,
    "svr": 159.5,
    "randomForest": 148.7,
    "decisionTree": 101.0,
    "closestModel": "Random Forest"
  },
  {
    "sampleId": "Sample #221",
    "actual": 138,
    "linear": 141.2,
    "gradientBoosting": 146.5,
    "svr": 141.9,
    "randomForest": 149.5,
    "decisionTree": 149.0,
    "closestModel": "Linear Regression"
  },
  {
    "sampleId": "Sample #261",
    "actual": 234,
    "linear": 226.0,
    "gradientBoosting": 214.7,
    "svr": 224.7,
    "randomForest": 225.5,
    "decisionTree": 215.0,
    "closestModel": "Linear Regression"
  },
  {
    "sampleId": "Sample #311",
    "actual": 136,
    "linear": 129.9,
    "gradientBoosting": 137.4,
    "svr": 137.8,
    "randomForest": 142.4,
    "decisionTree": 156.0,
    "closestModel": "Gradient Boosting"
  },
  {
    "sampleId": "Sample #351",
    "actual": 135,
    "linear": 140.0,
    "gradientBoosting": 143.7,
    "svr": 139.7,
    "randomForest": 151.9,
    "decisionTree": 152.0,
    "closestModel": "SVR"
  },
  {
    "sampleId": "Sample #401",
    "actual": 171,
    "linear": 156.0,
    "gradientBoosting": 152.8,
    "svr": 154.9,
    "randomForest": 139.1,
    "decisionTree": 136.0,
    "closestModel": "Linear Regression"
  }
];

export const WEEK5_SCENARIOS = [
  {
    "id": "festival_weekend",
    "title": "Festival Weekend Mega Rush",
    "desc": "Diwali/Eid weekend with peak footfall, 20% discount, viral reels & heavy promotions",
    "features": {
      "Temperature": 24.0,
      "Price": 120,
      "Discount_Percentage": 20,
      "Marketing_Budget": 3500,
      "Instagram_Reel": 3,
      "YouTube_Video": 2,
      "Facebook_Ads": 4,
      "Returning_Customers": 120,
      "New_Customers": 85,
      "Online_Orders": 95,
      "Offline_Orders": 110,
      "Customer_Rating": 4.8,
      "Festival": 1,
      "Weekend": 1
    },
    "predictions": {
      "linear": 429,
      "gradientBoosting": 315,
      "svr": 176,
      "randomForest": 276,
      "decisionTree": 281
    }
  },
  {
    "id": "normal_weekday",
    "title": "Standard Regular Weekday",
    "desc": "Normal Wednesday with standard pricing, typical store visits and moderate orders",
    "features": {
      "Temperature": 28.5,
      "Price": 120,
      "Discount_Percentage": 10,
      "Marketing_Budget": 500,
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
    },
    "predictions": {
      "linear": 120,
      "gradientBoosting": 126,
      "svr": 112,
      "randomForest": 120,
      "decisionTree": 108
    }
  },
  {
    "id": "monsoon_rainy",
    "title": "Monsoon Heavy Rain Day",
    "desc": "Cold rainy weather, walk-in offline footfall drops, high surge in online deliveries",
    "features": {
      "Temperature": 22.0,
      "Price": 130,
      "Discount_Percentage": 15,
      "Marketing_Budget": 1200,
      "Instagram_Reel": 1,
      "YouTube_Video": 1,
      "Facebook_Ads": 2,
      "Returning_Customers": 30,
      "New_Customers": 15,
      "Online_Orders": 85,
      "Offline_Orders": 15,
      "Customer_Rating": 4.4,
      "Festival": 0,
      "Weekend": 0
    },
    "predictions": {
      "linear": 151,
      "gradientBoosting": 140,
      "svr": 159,
      "randomForest": 137,
      "decisionTree": 103
    }
  },
  {
    "id": "promotional_sale",
    "title": "Flash Discount Sale Weekend",
    "desc": "Weekend clearance sale with 30% discount, aggressive ad budget, high new customer acquisition",
    "features": {
      "Temperature": 29.0,
      "Price": 99,
      "Discount_Percentage": 30,
      "Marketing_Budget": 2800,
      "Instagram_Reel": 2,
      "YouTube_Video": 1,
      "Facebook_Ads": 3,
      "Returning_Customers": 80,
      "New_Customers": 70,
      "Online_Orders": 75,
      "Offline_Orders": 85,
      "Customer_Rating": 4.6,
      "Festival": 0,
      "Weekend": 1
    },
    "predictions": {
      "linear": 325,
      "gradientBoosting": 259,
      "svr": 188,
      "randomForest": 244,
      "decisionTree": 248
    }
  },
  {
    "id": "hot_summer_low",
    "title": "Scorching Heatwave Weekday",
    "desc": "High 38\u00b0C temperature, no festivals or weekend footfall, low customer willingness to visit",
    "features": {
      "Temperature": 38.0,
      "Price": 140,
      "Discount_Percentage": 0,
      "Marketing_Budget": 300,
      "Instagram_Reel": 0,
      "YouTube_Video": 0,
      "Facebook_Ads": 0,
      "Returning_Customers": 20,
      "New_Customers": 10,
      "Online_Orders": 25,
      "Offline_Orders": 18,
      "Customer_Rating": 4.1,
      "Festival": 0,
      "Weekend": 0
    },
    "predictions": {
      "linear": 32,
      "gradientBoosting": 57,
      "svr": 93,
      "randomForest": 64,
      "decisionTree": 48
    }
  }
];
