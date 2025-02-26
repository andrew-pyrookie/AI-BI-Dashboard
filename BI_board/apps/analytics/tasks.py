import pandas as pd
from celery import shared_task
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.cluster import KMeans
from statsmodels.tsa.arima.model import ARIMA
import numpy as np
from .models import AnalysisResults, ProcessedData

@shared_task
def run_analytics(processed_data_id):
    processed_data = ProcessedData.objects.get(id=processed_data_id)
    df = pd.read_json(processed_data.processed_json)

    summary = {}

    # 1. Sales Forecasting (Time Series - ARIMA)
    if 'date' in df.columns and 'sales' in df.columns:
        try:
            df['date'] = pd.to_datetime(df['date'])
            ts_data = df.set_index('date')['sales'].sort_index()
            model = ARIMA(ts_data, order=(1, 1, 1))  # Simple ARIMA config
            results = model.fit()
            forecast = results.forecast(steps=5).to_dict()
            summary['sales_forecast'] = {'next_5_periods': forecast}
        except Exception as e:
            summary['sales_forecast'] = {'error': str(e)}

    # 2. Credit Risk Detection (Classification)
    if 'credit_score' in df.columns and 'default' in df.columns:
        try:
            X = df[['credit_score']].values
            y = df['default'].values
            model = LogisticRegression()
            model.fit(X, y)
            risk_prob = model.predict_proba(X)[:, 1].mean()  # Average risk probability
            summary['credit_risk'] = {'avg_risk_probability': float(risk_prob)}
        except Exception as e:
            summary['credit_risk'] = {'error': str(e)}

    # 3. Customer Segmentation (Clustering)
    if len(df.columns) >= 2:  # Need at least 2 features
        try:
            X = df.select_dtypes(include=[np.number]).values
            kmeans = KMeans(n_clusters=3, random_state=42)
            clusters = kmeans.fit_predict(X)
            summary['customer_segments'] = {'cluster_counts': pd.Series(clusters).value_counts().to_dict()}
        except Exception as e:
            summary['customer_segments'] = {'error': str(e)}

    # 4. Product Performance (Regression)
    if 'price' in df.columns and 'revenue' in df.columns:
        try:
            X = df[['price']].values
            y = df['revenue'].values
            model = LinearRegression()
            model.fit(X, y)
            summary['product_performance'] = {'price_impact': float(model.coef_[0])}
        except Exception as e:
            summary['product_performance'] = {'error': str(e)}

    # Save results
    AnalysisResults.objects.create(
        processed_data=processed_data,
        summary=str(summary)  # Store as string for now, could use JSONField later
    )