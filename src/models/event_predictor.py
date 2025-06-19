"""
Event Predictor Module
Implements Pillar 1: Event-based prediction using probabilistic models

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import logging

class EventPredictor:
    """
    Predicts conflict events and their intensity using historical data
    and structural features.
    """
    
    def __init__(self, model_type='gradient_boosting'):
        """
        Initialize the Event Predictor
        
        Args:
            model_type (str): Type of model to use ('gradient_boosting', 'random_forest')
        """
        self.model_type = model_type
        self.model = None
        self.feature_columns = None
        self.is_trained = False
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
    def prepare_features(self, data):
        """
        Prepare features for model training/prediction
        
        Args:
            data (pd.DataFrame): Raw conflict data
            
        Returns:
            pd.DataFrame: Processed features
        """
        features = data.copy()
        
        # Lagged conflict variables (conflict trap)
        features['conflict_lag_1'] = features.groupby('country')['fatalities'].shift(1).fillna(0)
        features['conflict_lag_2'] = features.groupby('country')['fatalities'].shift(2).fillna(0)
        
        # Regional spillover effects
        features['regional_conflict'] = features.groupby('region')['fatalities'].transform('mean')
        
        # Temporal features
        features['month'] = pd.to_datetime(features['date']).dt.month
        features['year'] = pd.to_datetime(features['date']).dt.year
        
        # Economic stress indicators
        if 'gdp_per_capita' in features.columns:
            features['gdp_growth'] = features.groupby('country')['gdp_per_capita'].pct_change().fillna(0)
        
        # Political stability
        if 'polity_score' in features.columns:
            features['polity_change'] = features.groupby('country')['polity_score'].diff().fillna(0)
        
        return features
    
    def train(self, data, target_column='fatalities', test_size=0.2):
        """
        Train the event prediction model
        
        Args:
            data (pd.DataFrame): Training data
            target_column (str): Target variable column name
            test_size (float): Proportion of data for testing
            
        Returns:
            dict: Training metrics
        """
        self.logger.info("Starting model training...")
        
        # Prepare features
        features = self.prepare_features(data)
        
        # Select feature columns (exclude non-numeric and target)
        numeric_columns = features.select_dtypes(include=[np.number]).columns
        exclude_columns = [target_column, 'country', 'region', 'date']
        self.feature_columns = [col for col in numeric_columns if col not in exclude_columns]
        
        X = features[self.feature_columns].fillna(0)
        y = features[target_column].fillna(0)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42
        )
        
        # Initialize model
        if self.model_type == 'gradient_boosting':
            self.model = GradientBoostingRegressor(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=6,
                random_state=42
            )
        
        # Train model
        self.model.fit(X_train, y_train)
        self.is_trained = True
        
        # Evaluate
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        metrics = {
            'mse': mse,
            'rmse': np.sqrt(mse),
            'r2': r2,
            'feature_importance': dict(zip(self.feature_columns, self.model.feature_importances_))
        }
        
        self.logger.info(f"Training completed. R² Score: {r2:.3f}, RMSE: {np.sqrt(mse):.3f}")
        
        return metrics
    
    def predict(self, data):
        """
        Make predictions on new data
        
        Args:
            data (pd.DataFrame): Data to predict on
            
        Returns:
            np.array: Predictions
        """
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        features = self.prepare_features(data)
        X = features[self.feature_columns].fillna(0)
        
        predictions = self.model.predict(X)
        return predictions
    
    def predict_risk_level(self, data):
        """
        Predict risk levels (Low, Medium, High, Critical)
        
        Args:
            data (pd.DataFrame): Data to predict on
            
        Returns:
            list: Risk level predictions
        """
        predictions = self.predict(data)
        
        risk_levels = []
        for pred in predictions:
            if pred < 10:
                risk_levels.append('Low')
            elif pred < 50:
                risk_levels.append('Medium')
            elif pred < 200:
                risk_levels.append('High')
            else:
                risk_levels.append('Critical')
        
        return risk_levels
    
    def save_model(self, filepath):
        """Save trained model to file"""
        if not self.is_trained:
            raise ValueError("No trained model to save")
        
        model_data = {
            'model': self.model,
            'feature_columns': self.feature_columns,
            'model_type': self.model_type
        }
        
        joblib.dump(model_data, filepath)
        self.logger.info(f"Model saved to {filepath}")
    
    def load_model(self, filepath):
        """Load trained model from file"""
        model_data = joblib.load(filepath)
        
        self.model = model_data['model']
        self.feature_columns = model_data['feature_columns']
        self.model_type = model_data['model_type']
        self.is_trained = True
        
        self.logger.info(f"Model loaded from {filepath}")
    
    def get_feature_importance(self):
        """Get feature importance scores"""
        if not self.is_trained:
            raise ValueError("Model must be trained first")
        
        importance_df = pd.DataFrame({
            'feature': self.feature_columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        return importance_df

