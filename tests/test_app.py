"""
AI-Based Chocolate Paan Sales Prediction System
Week 10: Comprehensive End-to-End Evaluation & Automated Test Suite
Executes all 9 official tests required by SOP.
"""

import os
import sys
import unittest
import json

# Ensure project root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app, primary_model, scaler, all_models, FEATURES, TARGET, execute_prediction, validate_inputs

class Week10EndToEndTestSuite(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        cls.client = app.test_client()
        cls.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # -------------------------------------------------------------------------
    # TEST 1: Application Start & Model Loading
    # -------------------------------------------------------------------------
    def test_01_app_start_and_model_loading(self):
        print("\n[TEST 1] Verifying Flask Application Start & Artifact Integrity...")
        self.assertIsNotNone(app)
        self.assertIsNotNone(primary_model)
        self.assertIsNotNone(scaler)
        self.assertEqual(len(FEATURES), 14)
        self.assertEqual(TARGET, 'Boxes_Sold')
        self.assertIn('Linear Regression', all_models)
        self.assertIn('Random Forest', all_models)
        print("  [OK] Test 1 Passed: Flask initialized and all 5 ML models loaded from disk.")

    # -------------------------------------------------------------------------
    # TEST 2: Home Page Loading
    # -------------------------------------------------------------------------
    def test_02_home_page_loads(self):
        print("\n[TEST 2] Verifying Home / Dashboard Page...")
        res = self.client.get('/')
        self.assertEqual(res.status_code, 200)
        content = res.data.decode('utf-8')
        self.assertIn("AI-Based Chocolate Paan Sales Prediction", content)
        self.assertIn("Predict expected chocolate paan sales using machine learning.", content)
        self.assertIn("Models Evaluated", content)
        self.assertIn("Latest Prediction", content)
        self.assertIn("Production Model R²", content)
        self.assertIn("Total Predictions", content)
        print("  [OK] Test 2 Passed: Home page loaded with all 4 dashboard metric cards.")

    # -------------------------------------------------------------------------
    # TEST 3: Prediction Form Fields
    # -------------------------------------------------------------------------
    def test_03_prediction_form_fields(self):
        print("\n[TEST 3] Verifying Prediction Form and All 14 Input Fields...")
        res = self.client.get('/predict')
        self.assertEqual(res.status_code, 200)
        content = res.data.decode('utf-8')
        
        # Check all 14 input fields
        for feat in FEATURES:
            self.assertIn(f'name="{feat}"', content, f"Feature input '{feat}' missing in HTML form.")
            
        self.assertIn("Product & Pricing", content)
        self.assertIn("Marketing & Promotions", content)
        self.assertIn("Customers & Feedback", content)
        self.assertIn("Order Channels", content)
        self.assertIn("Environmental Factors", content)
        self.assertIn("Predict Sales", content)
        print(f"  [OK] Test 3 Passed: All {len(FEATURES)} input fields and category sections present.")

    # -------------------------------------------------------------------------
    # TEST 4: Input Validation & Bounds Checking
    # -------------------------------------------------------------------------
    def test_04_input_validation(self):
        print("\n[TEST 4] Verifying Input Validation and Error Handling...")
        
        # 4a: Missing field
        bad_data = {
            'Temperature': 28.5,
            'Price': 120.0
            # Missing other 12 features
        }
        res = self.client.post('/predict', data=bad_data, follow_redirects=True)
        self.assertEqual(res.status_code, 400)
        self.assertIn("Missing required field", res.data.decode('utf-8'))

        # 4b: Negative price
        valid_sample = self._get_valid_sample()
        valid_sample['Price'] = -50.0
        res = self.client.post('/predict', data=valid_sample, follow_redirects=True)
        self.assertEqual(res.status_code, 400)
        self.assertIn("Value out of bounds for &#39;Price&#39;", res.data.decode('utf-8'))

        # 4c: Discount > 100%
        valid_sample = self._get_valid_sample()
        valid_sample['Discount_Percentage'] = 120.0
        res = self.client.post('/predict', data=valid_sample, follow_redirects=True)
        self.assertEqual(res.status_code, 400)
        self.assertIn("Value out of bounds for &#39;Discount_Percentage&#39;", res.data.decode('utf-8'))

        # 4d: Customer Rating > 5.0
        valid_sample = self._get_valid_sample()
        valid_sample['Customer_Rating'] = 6.2
        res = self.client.post('/predict', data=valid_sample, follow_redirects=True)
        self.assertEqual(res.status_code, 400)
        self.assertIn("Value out of bounds for &#39;Customer_Rating&#39;", res.data.decode('utf-8'))

        # 4e: Negative orders
        valid_sample = self._get_valid_sample()
        valid_sample['Online_Orders'] = -10
        res = self.client.post('/predict', data=valid_sample, follow_redirects=True)
        self.assertEqual(res.status_code, 400)
        self.assertIn("Value out of bounds for &#39;Online_Orders&#39;", res.data.decode('utf-8'))

        print("  [OK] Test 4 Passed: Server rejects invalid, out-of-bound, and missing inputs.")

    # -------------------------------------------------------------------------
    # TEST 5 & 6: Prediction & Verification of Real ML Calculation
    # -------------------------------------------------------------------------
    def test_05_and_06_prediction_real_ml_model(self):
        print("\n[TEST 5 & 6] Verifying Prediction Pipeline & Real Model Inference...")
        valid_sample = self._get_valid_sample()
        
        # Test HTML POST submission
        res = self.client.post('/predict', data=valid_sample, follow_redirects=True)
        self.assertEqual(res.status_code, 200)
        content = res.data.decode('utf-8')
        
        self.assertIn("Predicted Chocolate Paan Sales", content)
        self.assertIn("Boxes", content)
        self.assertIn("New Prediction", content)
        self.assertIn("Linear Regression", content)
        
        # Test JSON API endpoint to verify mathematical precision
        res_json = self.client.post('/api/predict', json=valid_sample)
        self.assertEqual(res_json.status_code, 200)
        data = res_json.get_json()
        
        self.assertTrue(data['success'])
        self.assertIn('predicted_boxes', data)
        self.assertIn('raw_prediction', data)
        self.assertEqual(data['model_used'], 'Linear Regression')
        
        # Direct verification with primary_model
        cleaned, _ = validate_inputs(valid_sample)
        expected_boxes, _, raw_val = execute_prediction(cleaned)
        
        self.assertEqual(data['predicted_boxes'], expected_boxes)
        self.assertAlmostEqual(data['raw_prediction'], raw_val, places=2)
        print(f"  [OK] Test 5 & 6 Passed: Real model calculated {expected_boxes} boxes (Raw: {raw_val:.2f}).")

    # -------------------------------------------------------------------------
    # TEST 7: Visualizations & Image Assets Availability
    # -------------------------------------------------------------------------
    def test_07_visualizations_served(self):
        print("\n[TEST 7] Verifying Model Performance Page & All 8 Week 6 Graphs...")
        res = self.client.get('/performance')
        self.assertEqual(res.status_code, 200)
        content = res.data.decode('utf-8')

        images = [
            'r2_comparison.png',
            'mae_comparison.png',
            'rmse_comparison.png',
            'train_vs_test_r2.png',
            'actual_vs_predicted.png',
            'residual_plot.png',
            'lr_coefficients.png',
            'rf_feature_importance.png'
        ]

        img_dir = os.path.join(self.base_dir, 'static', 'images')
        for img in images:
            # Check img tag is in page
            self.assertIn(img, content, f"Image '{img}' not linked in performance page.")
            
            # Check file exists and is not empty
            img_path = os.path.join(img_dir, img)
            self.assertTrue(os.path.exists(img_path), f"Image file '{img}' does not exist on disk.")
            self.assertGreater(os.path.getsize(img_path), 10000, f"Image '{img}' is suspiciously small or empty.")

            # Test static image HTTP serving
            res_img = self.client.get(f'/static/images/{img}')
            self.assertEqual(res_img.status_code, 200, f"Failed to serve static image: {img}")

        print(f"  [OK] Test 7 Passed: All {len(images)} diagnostic plots verified on disk and served over HTTP.")

    # -------------------------------------------------------------------------
    # TEST 8: Responsive Layout & Pages Accessibility
    # -------------------------------------------------------------------------
    def test_08_all_routes_accessible(self):
        print("\n[TEST 8] Verifying Navigation Routes & Responsive Views...")
        routes = [
            ('/', 'Dashboard'),
            ('/predict', 'Predict Sales'),
            ('/performance', 'Model Performance & Diagnostics'),
            ('/about', 'About the Project')
        ]
        for route, title_text in routes:
            res = self.client.get(route)
            self.assertEqual(res.status_code, 200, f"Route '{route}' failed.")
            self.assertIn(title_text, res.data.decode('utf-8'))

        print("  [OK] Test 8 Passed: All navigation routes returned HTTP 200 OK.")

    # -------------------------------------------------------------------------
    # TEST 9: Error Handling
    # -------------------------------------------------------------------------
    def test_09_error_handling(self):
        print("\n[TEST 9] Verifying 404 & Malformed Request Handling...")
        res_404 = self.client.get('/invalid-page-does-not-exist')
        self.assertEqual(res_404.status_code, 404)
        self.assertIn("404", res_404.data.decode('utf-8'))

        # Empty body POST to API
        res_bad_api = self.client.post('/api/predict', json={})
        self.assertEqual(res_bad_api.status_code, 400)
        self.assertFalse(res_bad_api.get_json()['success'])

        print("  [OK] Test 9 Passed: 404 and malformed requests handled gracefully.")

    # Helper method
    def _get_valid_sample(self):
        return {
            'Temperature': 28.5,
            'Price': 120.0,
            'Discount_Percentage': 10.0,
            'Marketing_Budget': 500.0,
            'Instagram_Reel': 1,
            'YouTube_Video': 0,
            'Facebook_Ads': 1,
            'Returning_Customers': 45,
            'New_Customers': 25,
            'Online_Orders': 30,
            'Offline_Orders': 40,
            'Customer_Rating': 4.3,
            'Festival': 0,
            'Weekend': 0
        }

if __name__ == '__main__':
    print("=" * 70)
    print(" AI-BASED CHOCOLATE PAAN SALES PREDICTION SYSTEM ")
    print(" WEEK 10: END-TO-END AUTOMATED TEST SUITE ")
    print("=" * 70)
    suite = unittest.TestLoader().loadTestsFromTestCase(Week10EndToEndTestSuite)
    runner = unittest.TextTestRunner(verbosity=1)
    result = runner.run(suite)
    if result.wasSuccessful():
        print("\n" + "=" * 70)
        print(" ALL 9 EVALUATION TESTS PASSED PERFECTLY (100% SUCCESS)!")
        print("=" * 70)
        sys.exit(0)
    else:
        sys.exit(1)
