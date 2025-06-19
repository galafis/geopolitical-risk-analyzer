"""
Data Ingestion Module
Handles data collection from multiple geopolitical data sources

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
import requests
import json
import time
from typing import Dict, List, Optional, Tuple
import logging
from datetime import datetime, timedelta
import os

class DataIngestionPipeline:
    """
    Comprehensive data ingestion pipeline for geopolitical analysis
    """
    
    def __init__(self, config: Optional[Dict] = None):
        """
        Initialize the data ingestion pipeline
        
        Args:
            config (Optional[Dict]): Configuration dictionary with API keys and settings
        """
        self.config = config or {}
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Data storage paths
        self.raw_data_dir = self.config.get('raw_data_dir', '../data/raw/')
        self.processed_data_dir = self.config.get('processed_data_dir', '../data/processed/')
        
        # Create directories if they don't exist
        os.makedirs(self.raw_data_dir, exist_ok=True)
        os.makedirs(self.processed_data_dir, exist_ok=True)
        
        # API endpoints and keys
        self.api_keys = {
            'acled': self.config.get('acled_api_key'),
            'acled_email': self.config.get('acled_email'),
            'world_bank': self.config.get('world_bank_api_key'),  # Usually not required
            'gdelt': None  # GDELT is free
        }
        
        # Country mappings
        self.country_mappings = self._load_country_mappings()
    
    def _load_country_mappings(self) -> Dict:
        """Load country code mappings (ISO2, ISO3, names)"""
        # Simplified mapping - in production, load from comprehensive dataset
        return {
            'USA': {'iso2': 'US', 'name': 'United States', 'iso_num': 840},
            'CHN': {'iso2': 'CN', 'name': 'China', 'iso_num': 156},
            'RUS': {'iso2': 'RU', 'name': 'Russia', 'iso_num': 643},
            'GBR': {'iso2': 'GB', 'name': 'United Kingdom', 'iso_num': 826},
            'FRA': {'iso2': 'FR', 'name': 'France', 'iso_num': 250},
            'DEU': {'iso2': 'DE', 'name': 'Germany', 'iso_num': 276},
            'JPN': {'iso2': 'JP', 'name': 'Japan', 'iso_num': 392},
            'IND': {'iso2': 'IN', 'name': 'India', 'iso_num': 356},
            'BRA': {'iso2': 'BR', 'name': 'Brazil', 'iso_num': 76},
            'IRN': {'iso2': 'IR', 'name': 'Iran', 'iso_num': 364},
            'ISR': {'iso2': 'IL', 'name': 'Israel', 'iso_num': 376},
            'SAU': {'iso2': 'SA', 'name': 'Saudi Arabia', 'iso_num': 682},
            'TUR': {'iso2': 'TR', 'name': 'Turkey', 'iso_num': 792},
            'UKR': {'iso2': 'UA', 'name': 'Ukraine', 'iso_num': 804},
            'PRK': {'iso2': 'KP', 'name': 'North Korea', 'iso_num': 408},
            'KOR': {'iso2': 'KR', 'name': 'South Korea', 'iso_num': 410},
            'EGY': {'iso2': 'EG', 'name': 'Egypt', 'iso_num': 818},
            'PAK': {'iso2': 'PK', 'name': 'Pakistan', 'iso_num': 586},
            'IDN': {'iso2': 'ID', 'name': 'Indonesia', 'iso_num': 360}
        }
    
    def fetch_acled_data(self, 
                        countries: List[str], 
                        start_date: str, 
                        end_date: str,
                        event_types: Optional[List[str]] = None) -> pd.DataFrame:
        """
        Fetch conflict event data from ACLED API
        
        Args:
            countries (List[str]): List of ISO3 country codes
            start_date (str): Start date in YYYY-MM-DD format
            end_date (str): End date in YYYY-MM-DD format
            event_types (Optional[List[str]]): Specific event types to filter
            
        Returns:
            pd.DataFrame: ACLED conflict data
        """
        if not self.api_keys['acled'] or not self.api_keys['acled_email']:
            self.logger.warning("ACLED API credentials not provided, using sample data")
            return self._generate_sample_acled_data(countries, start_date, end_date)
        
        self.logger.info(f"Fetching ACLED data for {countries} from {start_date} to {end_date}")
        
        all_data = []
        
        for country in countries:
            try:
                # Convert ISO3 to country name for ACLED API
                country_name = self.country_mappings.get(country, {}).get('name', country)
                
                # ACLED API endpoint
                url = "https://api.acleddata.com/acled/read"
                params = {
                    'key': self.api_keys['acled'],
                    'email': self.api_keys['acled_email'],
                    'country': country_name,
                    'event_date': f"{start_date}|{end_date}",
                    'format': 'json'
                }
                
                if event_types:
                    params['event_type'] = '|'.join(event_types)
                
                response = requests.get(url, params=params)
                response.raise_for_status()
                
                data = response.json()
                if 'data' in data:
                    country_df = pd.DataFrame(data['data'])
                    country_df['country_iso'] = country
                    all_data.append(country_df)
                
                # Rate limiting
                time.sleep(1)
                
            except Exception as e:
                self.logger.error(f"Failed to fetch ACLED data for {country}: {e}")
                continue
        
        if all_data:
            combined_df = pd.concat(all_data, ignore_index=True)
            
            # Save raw data
            filepath = f"{self.raw_data_dir}acled_data_{start_date}_{end_date}.csv"
            combined_df.to_csv(filepath, index=False)
            self.logger.info(f"ACLED data saved to {filepath}")
            
            return combined_df
        else:
            return pd.DataFrame()
    
    def fetch_world_bank_data(self, 
                             countries: List[str], 
                             indicators: List[str],
                             start_year: int = 2010,
                             end_year: int = 2023) -> pd.DataFrame:
        """
        Fetch economic and development indicators from World Bank API
        
        Args:
            countries (List[str]): List of ISO3 country codes
            indicators (List[str]): World Bank indicator codes
            start_year (int): Start year
            end_year (int): End year
            
        Returns:
            pd.DataFrame: World Bank indicator data
        """
        self.logger.info(f"Fetching World Bank data for {len(countries)} countries")
        
        all_data = []
        
        # Common World Bank indicators
        indicator_mapping = {
            'GDP_PER_CAPITA': 'NY.GDP.PCAP.CD',
            'MILITARY_EXPENDITURE': 'MS.MIL.XPND.GD.ZS',
            'POPULATION': 'SP.POP.TOTL',
            'UNEMPLOYMENT': 'SL.UEM.TOTL.ZS',
            'INFLATION': 'FP.CPI.TOTL.ZG',
            'TRADE_GDP': 'NE.TRD.GNFS.ZS'
        }
        
        for country in countries:
            try:
                # Convert to ISO2 for World Bank API
                iso2_code = self.country_mappings.get(country, {}).get('iso2', country[:2])
                
                for indicator_name in indicators:
                    indicator_code = indicator_mapping.get(indicator_name, indicator_name)
                    
                    # World Bank API endpoint
                    url = f"https://api.worldbank.org/v2/country/{iso2_code}/indicator/{indicator_code}"
                    params = {
                        'date': f"{start_year}:{end_year}",
                        'format': 'json',
                        'per_page': 1000
                    }
                    
                    response = requests.get(url, params=params)
                    response.raise_for_status()
                    
                    data = response.json()
                    if len(data) > 1 and data[1]:  # World Bank returns [metadata, data]
                        for record in data[1]:
                            all_data.append({
                                'country_iso': country,
                                'country_name': record.get('country', {}).get('value'),
                                'indicator_name': indicator_name,
                                'indicator_code': indicator_code,
                                'year': record.get('date'),
                                'value': record.get('value')
                            })
                    
                    # Rate limiting
                    time.sleep(0.5)
                    
            except Exception as e:
                self.logger.error(f"Failed to fetch World Bank data for {country}: {e}")
                continue
        
        if all_data:
            df = pd.DataFrame(all_data)
            
            # Save raw data
            filepath = f"{self.raw_data_dir}world_bank_data_{start_year}_{end_year}.csv"
            df.to_csv(filepath, index=False)
            self.logger.info(f"World Bank data saved to {filepath}")
            
            return df
        else:
            return pd.DataFrame()
    
    def fetch_gdelt_data(self, 
                        countries: List[str], 
                        start_date: str, 
                        end_date: str) -> pd.DataFrame:
        """
        Fetch event data from GDELT (simplified version)
        
        Args:
            countries (List[str]): List of ISO3 country codes
            start_date (str): Start date in YYYY-MM-DD format
            end_date (str): End date in YYYY-MM-DD format
            
        Returns:
            pd.DataFrame: GDELT event data
        """
        self.logger.info("Generating sample GDELT data (full implementation requires BigQuery)")
        
        # In production, this would query GDELT BigQuery tables
        # For now, generate representative sample data
        return self._generate_sample_gdelt_data(countries, start_date, end_date)
    
    def load_static_datasets(self) -> Dict[str, pd.DataFrame]:
        """
        Load static datasets (alliances, historical data, etc.)
        
        Returns:
            Dict[str, pd.DataFrame]: Dictionary of static datasets
        """
        self.logger.info("Loading static datasets")
        
        datasets = {}
        
        # Generate sample alliance data (Correlates of War style)
        datasets['alliances'] = self._generate_sample_alliance_data()
        
        # Generate sample trade data
        datasets['trade'] = self._generate_sample_trade_data()
        
        # Generate sample military spending data
        datasets['military_spending'] = self._generate_sample_military_data()
        
        # Save static datasets
        for name, df in datasets.items():
            filepath = f"{self.processed_data_dir}{name}_data.csv"
            df.to_csv(filepath, index=False)
            self.logger.info(f"Static dataset '{name}' saved to {filepath}")
        
        return datasets
    
    def _generate_sample_acled_data(self, countries: List[str], start_date: str, end_date: str) -> pd.DataFrame:
        """Generate sample ACLED-style conflict data"""
        np.random.seed(42)  # For reproducible results
        
        data = []
        date_range = pd.date_range(start=start_date, end=end_date, freq='D')
        
        # Event type probabilities (higher for certain countries)
        event_types = ['Battles', 'Violence against civilians', 'Protests', 'Riots', 'Strategic developments']
        
        for country in countries:
            # Adjust event frequency based on country
            if country in ['UKR', 'SYR', 'AFG']:
                event_prob = 0.3  # High conflict countries
            elif country in ['IRN', 'ISR', 'TUR']:
                event_prob = 0.1  # Medium tension countries
            else:
                event_prob = 0.05  # Lower conflict probability
            
            for date in date_range:
                if np.random.random() < event_prob:
                    event_type = np.random.choice(event_types)
                    fatalities = np.random.poisson(5) if event_type == 'Battles' else np.random.poisson(1)
                    
                    data.append({
                        'event_date': date.strftime('%Y-%m-%d'),
                        'country': self.country_mappings.get(country, {}).get('name', country),
                        'country_iso': country,
                        'event_type': event_type,
                        'fatalities': fatalities,
                        'latitude': np.random.uniform(-60, 60),
                        'longitude': np.random.uniform(-180, 180),
                        'notes': f"Sample {event_type.lower()} event"
                    })
        
        return pd.DataFrame(data)
    
    def _generate_sample_gdelt_data(self, countries: List[str], start_date: str, end_date: str) -> pd.DataFrame:
        """Generate sample GDELT-style event data"""
        np.random.seed(42)
        
        data = []
        date_range = pd.date_range(start=start_date, end=end_date, freq='D')
        
        for country in countries:
            for date in date_range:
                # Generate 1-5 events per day per country
                num_events = np.random.poisson(2)
                
                for _ in range(num_events):
                    # Goldstein scale: -10 (most negative) to +10 (most positive)
                    goldstein_score = np.random.normal(0, 3)
                    goldstein_score = max(-10, min(10, goldstein_score))
                    
                    # Tone: -100 (most negative) to +100 (most positive)
                    tone = np.random.normal(0, 30)
                    tone = max(-100, min(100, tone))
                    
                    data.append({
                        'date': date.strftime('%Y%m%d'),
                        'actor1_country': country,
                        'actor2_country': np.random.choice(countries),
                        'goldstein_scale': goldstein_score,
                        'avg_tone': tone,
                        'num_mentions': np.random.poisson(10),
                        'num_sources': np.random.poisson(3),
                        'event_geography_country': country
                    })
        
        return pd.DataFrame(data)
    
    def _generate_sample_alliance_data(self) -> pd.DataFrame:
        """Generate sample military alliance data"""
        alliances = [
            # NATO members
            ('USA', 'GBR', 'defense', 1949, None),
            ('USA', 'FRA', 'defense', 1949, None),
            ('USA', 'DEU', 'defense', 1955, None),
            ('USA', 'TUR', 'defense', 1952, None),
            ('GBR', 'FRA', 'defense', 1949, None),
            
            # Other alliances
            ('USA', 'JPN', 'defense', 1951, None),
            ('USA', 'KOR', 'defense', 1953, None),
            ('USA', 'ISR', 'cooperation', 1987, None),
            ('RUS', 'CHN', 'cooperation', 2001, None),
            ('RUS', 'IRN', 'cooperation', 2000, None),
            ('CHN', 'PAK', 'cooperation', 1963, None),
            
            # Regional partnerships
            ('SAU', 'USA', 'cooperation', 1945, None),
            ('EGY', 'USA', 'cooperation', 1979, None),
            ('IND', 'RUS', 'cooperation', 1971, None)
        ]
        
        data = []
        for country1, country2, alliance_type, start_year, end_year in alliances:
            data.append({
                'country1_iso': country1,
                'country2_iso': country2,
                'alliance_type': alliance_type,
                'start_year': start_year,
                'end_year': end_year,
                'active': end_year is None
            })
        
        return pd.DataFrame(data)
    
    def _generate_sample_trade_data(self) -> pd.DataFrame:
        """Generate sample bilateral trade data"""
        np.random.seed(42)
        
        major_economies = ['USA', 'CHN', 'DEU', 'JPN', 'GBR', 'FRA', 'IND', 'BRA']
        data = []
        
        for reporter in major_economies:
            for partner in major_economies:
                if reporter != partner:
                    # Generate realistic trade values (in millions USD)
                    if (reporter, partner) in [('USA', 'CHN'), ('CHN', 'USA')]:
                        trade_value = np.random.normal(500000, 50000)  # High trade
                    elif reporter in ['USA', 'CHN', 'DEU'] or partner in ['USA', 'CHN', 'DEU']:
                        trade_value = np.random.normal(100000, 20000)  # Medium trade
                    else:
                        trade_value = np.random.normal(20000, 5000)   # Lower trade
                    
                    trade_value = max(1000, trade_value)  # Minimum trade
                    
                    data.append({
                        'reporter_iso': reporter,
                        'partner_iso': partner,
                        'trade_value_usd': trade_value * 1000000,  # Convert to USD
                        'year': 2023
                    })
        
        return pd.DataFrame(data)
    
    def _generate_sample_military_data(self) -> pd.DataFrame:
        """Generate sample military expenditure data"""
        # Based on real 2023 estimates (in billions USD)
        military_data = {
            'USA': 816.0, 'CHN': 296.0, 'RUS': 109.0, 'IND': 76.6, 'SAU': 75.0,
            'GBR': 68.4, 'DEU': 56.0, 'UKR': 44.0, 'FRA': 43.9, 'JPN': 42.0,
            'KOR': 31.4, 'ITA': 28.9, 'ISR': 27.5, 'CAN': 22.8, 'TUR': 17.5,
            'BRA': 16.7, 'IRN': 15.8, 'PAK': 12.0, 'EGY': 4.8, 'IDN': 9.3
        }
        
        data = []
        for country, spending in military_data.items():
            data.append({
                'country_iso': country,
                'military_expenditure_billions': spending,
                'year': 2023,
                'gdp_percentage': np.random.uniform(1.0, 4.0)  # Typical range
            })
        
        return pd.DataFrame(data)
    
    def create_master_dataset(self, 
                             countries: List[str],
                             start_date: str = "2020-01-01",
                             end_date: str = "2024-01-01") -> pd.DataFrame:
        """
        Create master dataset combining all data sources
        
        Args:
            countries (List[str]): Countries to include
            start_date (str): Start date for data collection
            end_date (str): End date for data collection
            
        Returns:
            pd.DataFrame: Master dataset for analysis
        """
        self.logger.info("Creating master dataset")
        
        # Fetch all data sources
        acled_data = self.fetch_acled_data(countries, start_date, end_date)
        
        wb_indicators = ['GDP_PER_CAPITA', 'MILITARY_EXPENDITURE', 'POPULATION', 'UNEMPLOYMENT']
        wb_data = self.fetch_world_bank_data(countries, wb_indicators, 2020, 2023)
        
        static_datasets = self.load_static_datasets()
        
        # Process and combine data
        master_data = []
        
        for country in countries:
            # Get country-specific data
            country_acled = acled_data[acled_data['country_iso'] == country] if not acled_data.empty else pd.DataFrame()
            country_wb = wb_data[wb_data['country_iso'] == country] if not wb_data.empty else pd.DataFrame()
            
            # Aggregate ACLED data by month
            if not country_acled.empty:
                country_acled['event_date'] = pd.to_datetime(country_acled['event_date'])
                country_acled['year_month'] = country_acled['event_date'].dt.to_period('M')
                
                monthly_conflicts = country_acled.groupby('year_month').agg({
                    'fatalities': 'sum',
                    'event_type': 'count'
                }).rename(columns={'event_type': 'event_count'}).reset_index()
            else:
                # Create empty monthly data
                date_range = pd.period_range(start=start_date, end=end_date, freq='M')
                monthly_conflicts = pd.DataFrame({
                    'year_month': date_range,
                    'fatalities': 0,
                    'event_count': 0
                })
            
            # Add World Bank indicators
            for _, period in monthly_conflicts.iterrows():
                year = period['year_month'].year
                
                row_data = {
                    'country_iso': country,
                    'year_month': str(period['year_month']),
                    'year': year,
                    'fatalities': period['fatalities'],
                    'event_count': period['event_count']
                }
                
                # Add World Bank indicators (use most recent available)
                if not country_wb.empty:
                    for indicator in wb_indicators:
                        indicator_data = country_wb[
                            (country_wb['indicator_name'] == indicator) & 
                            (country_wb['year'].astype(int) <= year)
                        ].sort_values('year')
                        
                        if not indicator_data.empty:
                            row_data[indicator.lower()] = indicator_data.iloc[-1]['value']
                        else:
                            row_data[indicator.lower()] = None
                
                # Add network metrics (simplified)
                alliance_count = len(static_datasets['alliances'][
                    (static_datasets['alliances']['country1_iso'] == country) |
                    (static_datasets['alliances']['country2_iso'] == country)
                ])
                row_data['alliance_count'] = alliance_count
                
                trade_partners = len(static_datasets['trade'][
                    static_datasets['trade']['reporter_iso'] == country
                ])
                row_data['trade_partners'] = trade_partners
                
                master_data.append(row_data)
        
        master_df = pd.DataFrame(master_data)
        
        # Save master dataset
        filepath = f"{self.processed_data_dir}master_dataset_{start_date}_{end_date}.csv"
        master_df.to_csv(filepath, index=False)
        self.logger.info(f"Master dataset saved to {filepath}")
        
        return master_df


# Example usage and testing
if __name__ == "__main__":
    # Initialize data pipeline
    config = {
        'raw_data_dir': '/home/ubuntu/geopolitical-risk-analyzer/data/raw/',
        'processed_data_dir': '/home/ubuntu/geopolitical-risk-analyzer/data/processed/',
        # Add your API keys here
        # 'acled_api_key': 'your_acled_key',
        # 'acled_email': 'your_email@example.com'
    }
    
    pipeline = DataIngestionPipeline(config)
    
    # Test countries
    test_countries = ['USA', 'CHN', 'RUS', 'IRN', 'ISR', 'UKR']
    
    print("\n=== DATA INGESTION PIPELINE TEST ===")
    
    # Create master dataset
    master_df = pipeline.create_master_dataset(
        countries=test_countries,
        start_date="2022-01-01",
        end_date="2024-01-01"
    )
    
    print(f"\nMaster dataset created:")
    print(f"Shape: {master_df.shape}")
    print(f"Countries: {master_df['country_iso'].unique()}")
    print(f"Date range: {master_df['year_month'].min()} to {master_df['year_month'].max()}")
    
    print(f"\nSample data:")
    print(master_df.head())
    
    print(f"\nData summary:")
    print(master_df.describe())

