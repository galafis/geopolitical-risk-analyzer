"""
Main Pipeline Orchestrator
Coordinates all analysis components for comprehensive geopolitical risk assessment

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Tuple, Any
import logging
import json
from datetime import datetime, timedelta
import os
import warnings
warnings.filterwarnings('ignore')

# Import analysis components
from data_ingestion.data_pipeline import DataIngestionPipeline
from models.event_predictor import EventPredictor
from models.narrative_analyzer import NarrativeAnalyzer
from models.network_analyzer import NetworkAnalyzer
from models.military_analyzer import MilitaryPowerAnalyzer
from analysis.risk_calculator import RiskCalculator
from analysis.world_war_analyzer import WorldWarRiskAnalyzer

class GeopoliticalRiskAnalyzer:
    """
    Main orchestrator for geopolitical risk analysis
    Coordinates all components to provide comprehensive risk assessment
    """
    
    def __init__(self, config: Dict = None):
        """Initialize the Geopolitical Risk Analyzer"""
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Configuration
        self.config = config or {}
        
        # Initialize components
        self.logger.info("Initializing Geopolitical Risk Analyzer components...")
        
        try:
            self.data_pipeline = DataIngestionPipeline()
            self.event_predictor = EventPredictor()
            self.narrative_analyzer = NarrativeAnalyzer()
            self.network_analyzer = NetworkAnalyzer()
            self.military_analyzer = MilitaryPowerAnalyzer()
            self.risk_calculator = RiskCalculator()
            self.world_war_analyzer = WorldWarRiskAnalyzer()
            
            self.logger.info("Geopolitical Risk Analyzer initialized successfully")
            
        except Exception as e:
            self.logger.error(f"Failed to initialize components: {e}")
            raise
    
    def analyze_scenario(self, scenario_name: str, countries: List[str], 
                        narrative_texts: List[str] = None, 
                        start_date: str = None, end_date: str = None,
                        save_results: bool = True) -> Dict:
        """
        Perform comprehensive geopolitical risk analysis for a given scenario
        
        Args:
            scenario_name (str): Name of the scenario
            countries (List[str]): List of country codes to analyze
            narrative_texts (List[str]): Optional narrative texts for analysis
            start_date (str): Start date for historical data (YYYY-MM-DD)
            end_date (str): End date for historical data (YYYY-MM-DD)
            save_results (bool): Whether to save results to files
            
        Returns:
            Dict: Comprehensive analysis results
        """
        
        self.logger.info(f"Analyzing scenario: {scenario_name}")
        self.logger.info(f"Countries involved: {countries}")
        
        # Set default date range if not provided
        if not end_date:
            end_date = datetime.now().strftime('%Y-%m-%d')
        if not start_date:
            start_date = (datetime.now() - timedelta(days=730)).strftime('%Y-%m-%d')
        
        try:
            # Step 1: Data Collection and Processing
            self.logger.info("Step 1: Collecting and processing data...")
            master_dataset = self.data_pipeline.create_master_dataset(
                countries=countries,
                start_date=start_date,
                end_date=end_date
            )
            
            # Step 2: Comprehensive Risk Analysis
            self.logger.info("Step 2: Performing comprehensive risk analysis...")
            risk_assessment = self.risk_calculator.calculate_comprehensive_risk(
                countries=countries,
                master_dataset=master_dataset,
                narrative_texts=narrative_texts or []
            )
            
            # Step 3: Military Analysis
            self.logger.info("Step 3: Analyzing military capabilities...")
            military_analysis = {}
            for country in countries:
                military_analysis[country] = self.military_analyzer.analyze_country_military_power(country)
            
            # Step 4: Generate Report
            self.logger.info("Step 4: Generating comprehensive report...")
            
            # Compile comprehensive results
            results = {
                'scenario_info': {
                    'name': scenario_name,
                    'countries': countries,
                    'analysis_date': datetime.now().isoformat(),
                    'date_range': {
                        'start': start_date,
                        'end': end_date
                    }
                },
                'risk_assessment': risk_assessment,
                'military_analysis': military_analysis,
                'data_summary': {
                    'total_records': len(master_dataset) if master_dataset is not None else 0,
                    'countries_analyzed': len(countries),
                    'narrative_texts_analyzed': len(narrative_texts) if narrative_texts else 0
                },
                'methodology': {
                    'event_prediction': 'Gradient Boosting with historical conflict data',
                    'narrative_analysis': 'NLP-based Geopolitical Tension Index (GTI)',
                    'network_analysis': 'Graph-based alliance and trade network analysis',
                    'military_analysis': 'Multi-factor military capability assessment',
                    'risk_synthesis': 'Weighted integration of all analysis pillars'
                }
            }
            
            # Save results if requested
            if save_results:
                self._save_results(scenario_name, results)
            
            return results
            
        except Exception as e:
            self.logger.error(f"Scenario analysis failed: {e}")
            raise
    
    def analyze_scenario_lightweight(self, scenario_name: str, countries: List[str], 
                                    narrative_texts: List[str] = None) -> Dict:
        """
        Lightweight scenario analysis for testing purposes
        
        Args:
            scenario_name (str): Name of the scenario
            countries (List[str]): List of country codes
            narrative_texts (List[str]): Optional narrative texts
            
        Returns:
            Dict: Lightweight analysis results
        """
        self.logger.info(f"Performing lightweight analysis for scenario: {scenario_name}")
        
        try:
            # Basic narrative analysis
            narrative_score = 50  # Default
            if narrative_texts:
                narrative_result = self.narrative_analyzer.calculate_gti_score(narrative_texts)
                narrative_score = narrative_result['gti_score']
            
            # Basic military analysis
            military_scores = []
            for country in countries:
                try:
                    mil_result = self.military_analyzer.analyze_country_military_power(country)
                    military_scores.append(mil_result['military_power_index'])
                except:
                    military_scores.append(50)  # Default score
            
            avg_military_score = sum(military_scores) / len(military_scores) if military_scores else 50
            
            # Calculate overall risk
            overall_risk = (narrative_score * 0.4 + avg_military_score * 0.6)
            
            # Determine risk level
            if overall_risk >= 80:
                risk_level = 'Critical'
            elif overall_risk >= 70:
                risk_level = 'High'
            elif overall_risk >= 60:
                risk_level = 'Moderate-High'
            elif overall_risk >= 50:
                risk_level = 'Moderate'
            else:
                risk_level = 'Low'
            
            result = {
                'scenario_name': scenario_name,
                'countries': countries,
                'overall_risk_score': overall_risk,
                'risk_level': risk_level,
                'narrative_score': narrative_score,
                'military_score': avg_military_score,
                'timestamp': datetime.now().isoformat(),
                'analysis_type': 'lightweight'
            }
            
            self.logger.info(f"Lightweight analysis completed - Risk Score: {overall_risk:.1f}")
            return result
            
        except Exception as e:
            self.logger.error(f"Lightweight analysis failed: {e}")
            return {
                'scenario_name': scenario_name,
                'countries': countries,
                'overall_risk_score': 50,
                'risk_level': 'Unknown',
                'error': str(e),
                'analysis_type': 'lightweight'
            }
    
    def analyze_world_war_risk(self, countries: List[str], 
                              current_conflicts: List[Dict] = None) -> Dict:
        """
        Analyze the risk of World War III escalation
        
        Args:
            countries (List[str]): Countries involved in potential escalation
            current_conflicts (List[Dict]): Current conflict information
            
        Returns:
            Dict: World War risk analysis
        """
        
        self.logger.info("Analyzing World War III escalation risk...")
        
        try:
            # Get military capabilities for all countries
            military_data = {}
            for country in countries:
                military_data[country] = self.military_analyzer.analyze_country_military_power(country)
            
            # Analyze world war risk
            ww_risk = self.world_war_analyzer.calculate_world_war_risk(
                countries=countries,
                military_data=military_data,
                current_conflicts=current_conflicts or []
            )
            
            return ww_risk
            
        except Exception as e:
            self.logger.error(f"World War risk analysis failed: {e}")
            return {
                'world_war_probability': 50,
                'risk_level': 'Unknown',
                'error': str(e)
            }
    
    def _save_results(self, scenario_name: str, results: Dict):
        """Save analysis results to files"""
        
        # Create output directory if it doesn't exist
        os.makedirs('./output', exist_ok=True)
        
        # Generate timestamp for filenames
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        scenario_clean = scenario_name.lower().replace(' ', '_').replace('-', '_')
        
        # Save detailed JSON report
        json_filename = f"./output/{scenario_clean}_report_{timestamp}.json"
        with open(json_filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False, default=str)
        
        self.logger.info(f"Scenario report saved: {json_filename}")
        
        # Save summary CSV
        summary_data = {
            'scenario': [scenario_name],
            'countries': [', '.join(results['scenario_info']['countries'])],
            'overall_risk_score': [results['risk_assessment']['overall_risk']['score']],
            'risk_level': [results['risk_assessment']['overall_risk']['level']],
            'analysis_date': [results['scenario_info']['analysis_date']],
            'total_records': [results['data_summary']['total_records']]
        }
        
        summary_df = pd.DataFrame(summary_data)
        csv_filename = f"./output/{scenario_clean}_summary_{timestamp}.csv"
        summary_df.to_csv(csv_filename, index=False)
        
        self.logger.info(f"Summary saved: {csv_filename}")


# Example usage and testing
if __name__ == "__main__":
    # Initialize analyzer
    analyzer = GeopoliticalRiskAnalyzer()
    
    # Example 1: Israel-Iran Conflict Analysis
    print("=== ISRAEL-IRAN CONFLICT ANALYSIS ===")
    israel_iran_result = analyzer.analyze_scenario(
        scenario_name="Israel-Iran Regional Confrontation",
        countries=['ISR', 'IRN'],
        narrative_texts=[
            "Military tensions escalate as nuclear facilities become targets",
            "Regional proxy forces mobilize across multiple fronts",
            "Oil supply routes face significant disruption threats"
        ]
    )
    
    print(f"Overall Risk Score: {israel_iran_result['risk_assessment']['overall_risk']['score']:.1f}")
    print(f"Risk Level: {israel_iran_result['risk_assessment']['overall_risk']['level']}")
    
    # Example 2: North Korea Nuclear Escalation
    print("\n=== NORTH KOREA NUCLEAR ESCALATION ===")
    nk_result = analyzer.analyze_scenario(
        scenario_name="North Korea Nuclear Escalation",
        countries=['PRK', 'KOR', 'USA'],
        narrative_texts=[
            "Nuclear weapons testing reaches unprecedented levels",
            "Military exercises intensify across the peninsula",
            "Diplomatic channels show signs of complete breakdown"
        ]
    )
    
    print(f"Overall Risk Score: {nk_result['risk_assessment']['overall_risk']['score']:.1f}")
    print(f"Risk Level: {nk_result['risk_assessment']['overall_risk']['level']}")
    
    # Example 3: World War III Risk Assessment
    print("\n=== WORLD WAR III RISK ASSESSMENT ===")
    ww3_result = analyzer.analyze_world_war_risk(
        countries=['USA', 'CHN', 'RUS', 'GBR', 'FRA'],
        current_conflicts=[
            {'name': 'Russia-Ukraine War', 'intensity': 'High'},
            {'name': 'Israel-Palestine Conflict', 'intensity': 'High'},
            {'name': 'Taiwan Strait Tensions', 'intensity': 'Moderate'}
        ]
    )
    
    print(f"World War III Probability: {ww3_result['world_war_probability']:.1f}%")
    print(f"Risk Level: {ww3_result['risk_level']}")
    
    print("\n=== ANALYSIS COMPLETE ===")
    print("All results have been saved to the ./output directory")

