"""
Risk Calculator Module
Synthesizes all pillars and military analysis into comprehensive risk assessment

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Tuple
import logging
from datetime import datetime, timedelta
import json

from models.event_predictor import EventPredictor
from models.narrative_analyzer import NarrativeAnalyzer
from models.network_analyzer import NetworkAnalyzer
from models.military_analyzer import MilitaryPowerAnalyzer

class RiskCalculator:
    """
    Synthesizes analysis from all pillars to calculate comprehensive geopolitical risk scores
    """
    
    def __init__(self):
        """Initialize the Risk Calculator"""
        self.event_predictor = EventPredictor()
        self.narrative_analyzer = NarrativeAnalyzer()
        self.network_analyzer = NetworkAnalyzer()
        self.military_analyzer = MilitaryPowerAnalyzer()
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Risk weights for different components
        self.risk_weights = {
            'events': 0.25,           # Pillar 1: Historical events and patterns
            'narratives': 0.20,       # Pillar 2: Rhetoric and tension analysis
            'networks': 0.15,         # Pillar 3: Alliance and trade networks
            'military': 0.25,         # Military capabilities and balance
            'escalation': 0.15        # Escalation potential
        }
        
        # Scenario-specific multipliers
        self.scenario_multipliers = {
            'nuclear_involved': 1.5,
            'superpower_conflict': 1.4,
            'multiple_fronts': 1.3,
            'alliance_fracture': 1.2,
            'economic_disruption': 1.1
        }
    
    def calculate_comprehensive_risk(self, 
                                   countries: List[str],
                                   event_data: Optional[pd.DataFrame] = None,
                                   narrative_texts: Optional[List[str]] = None,
                                   narrative_sources: Optional[List[str]] = None,
                                   alliance_data: Optional[pd.DataFrame] = None,
                                   trade_data: Optional[pd.DataFrame] = None) -> Dict:
        """
        Calculate comprehensive geopolitical risk assessment
        
        Args:
            countries (List[str]): Countries involved in analysis
            event_data (Optional[pd.DataFrame]): Historical conflict data
            narrative_texts (Optional[List[str]]): Recent news/statements
            narrative_sources (Optional[List[str]]): Source types for narratives
            alliance_data (Optional[pd.DataFrame]): Alliance relationship data
            trade_data (Optional[pd.DataFrame]): Trade relationship data
            
        Returns:
            Dict: Comprehensive risk assessment
        """
        self.logger.info(f"Calculating comprehensive risk for countries: {countries}")
        
        risk_assessment = {
            'countries': countries,
            'timestamp': datetime.now().isoformat(),
            'pillar_scores': {},
            'risk_factors': {},
            'scenarios': {},
            'recommendations': []
        }
        
        # Pillar 1: Event-based risk (if data available)
        if event_data is not None and not event_data.empty:
            try:
                # Train model and predict
                self.event_predictor.train(event_data)
                recent_data = event_data.tail(len(countries))
                event_predictions = self.event_predictor.predict_risk_level(recent_data)
                
                # Convert risk levels to scores
                risk_level_scores = {'Low': 25, 'Medium': 50, 'High': 75, 'Critical': 100}
                event_score = np.mean([risk_level_scores.get(level, 50) for level in event_predictions])
                
                risk_assessment['pillar_scores']['events'] = {
                    'score': event_score,
                    'predictions': event_predictions,
                    'confidence': 0.8  # Placeholder
                }
            except Exception as e:
                self.logger.warning(f"Event analysis failed: {e}")
                risk_assessment['pillar_scores']['events'] = {'score': 50, 'confidence': 0.3}
        else:
            risk_assessment['pillar_scores']['events'] = {'score': 50, 'confidence': 0.3}
        
        # Pillar 2: Narrative analysis (if texts available)
        if narrative_texts and len(narrative_texts) > 0:
            try:
                narrative_results = self.narrative_analyzer.analyze_geopolitical_texts(
                    narrative_texts, narrative_sources
                )
                
                # Convert GTI score (-100 to +100) to risk score (0 to 100)
                gti_score = narrative_results['gti_analysis']['gti_score']
                narrative_risk_score = max(0, min(100, 50 - gti_score/2))  # More negative = higher risk
                
                risk_assessment['pillar_scores']['narratives'] = {
                    'score': narrative_risk_score,
                    'gti_score': gti_score,
                    'confidence': narrative_results['gti_analysis']['confidence'],
                    'tension_level': self.narrative_analyzer.get_tension_level_description(gti_score)
                }
            except Exception as e:
                self.logger.warning(f"Narrative analysis failed: {e}")
                risk_assessment['pillar_scores']['narratives'] = {'score': 50, 'confidence': 0.3}
        else:
            risk_assessment['pillar_scores']['narratives'] = {'score': 50, 'confidence': 0.3}
        
        # Pillar 3: Network analysis (if data available)
        if alliance_data is not None or trade_data is not None:
            try:
                if alliance_data is not None:
                    self.network_analyzer.load_alliance_data(alliance_data, 'dataframe')
                if trade_data is not None:
                    self.network_analyzer.load_trade_data(trade_data, 'dataframe')
                
                # Calculate network vulnerabilities
                network_vulnerabilities = []
                for country in countries:
                    vulnerability = self.network_analyzer.calculate_country_vulnerability(country)
                    network_vulnerabilities.append(vulnerability['vulnerability_score'])
                
                # Higher vulnerability = higher risk
                network_risk_score = np.mean(network_vulnerabilities) * 100
                
                # Simulate conflict impact
                conflict_impact = self.network_analyzer.simulate_conflict_impact(countries)
                systemic_risk = conflict_impact['systemic_risk_score'] * 50  # Scale to 0-100
                
                network_score = (network_risk_score + systemic_risk) / 2
                
                risk_assessment['pillar_scores']['networks'] = {
                    'score': network_score,
                    'vulnerability_scores': network_vulnerabilities,
                    'systemic_risk': systemic_risk,
                    'confidence': 0.7
                }
            except Exception as e:
                self.logger.warning(f"Network analysis failed: {e}")
                risk_assessment['pillar_scores']['networks'] = {'score': 50, 'confidence': 0.3}
        else:
            risk_assessment['pillar_scores']['networks'] = {'score': 50, 'confidence': 0.3}
        
        # Military analysis
        try:
            military_analyses = []
            for country in countries:
                military_analysis = self.military_analyzer.calculate_military_power_index(country)
                military_analyses.append(military_analysis)
            
            # Calculate military imbalance risk
            if len(countries) >= 2:
                power_indices = [analysis['military_power_index'] for analysis in military_analyses]
                power_variance = np.var(power_indices)
                max_power = max(power_indices)
                
                # Higher variance and higher max power = higher risk
                military_risk_score = min(100, (power_variance/100 + max_power/2))
            else:
                military_risk_score = military_analyses[0]['military_power_index'] / 2
            
            # Escalation risk
            escalation_analysis = self.military_analyzer.calculate_escalation_risk(countries)
            escalation_score = escalation_analysis['escalation_score']
            
            risk_assessment['pillar_scores']['military'] = {
                'score': military_risk_score,
                'military_analyses': military_analyses,
                'confidence': 0.9
            }
            
            risk_assessment['pillar_scores']['escalation'] = {
                'score': escalation_score,
                'escalation_analysis': escalation_analysis,
                'confidence': 0.8
            }
            
        except Exception as e:
            self.logger.warning(f"Military analysis failed: {e}")
            risk_assessment['pillar_scores']['military'] = {'score': 50, 'confidence': 0.3}
            risk_assessment['pillar_scores']['escalation'] = {'score': 50, 'confidence': 0.3}
        
        # Calculate overall risk score
        overall_risk = self._calculate_weighted_risk(risk_assessment['pillar_scores'])
        risk_assessment['overall_risk'] = overall_risk
        
        # Identify risk factors
        risk_assessment['risk_factors'] = self._identify_risk_factors(risk_assessment, countries)
        
        # Generate scenarios
        risk_assessment['scenarios'] = self._generate_risk_scenarios(risk_assessment, countries)
        
        # Generate recommendations
        risk_assessment['recommendations'] = self._generate_recommendations(risk_assessment, countries)
        
        return risk_assessment
    
    def _calculate_weighted_risk(self, pillar_scores: Dict) -> Dict:
        """Calculate weighted overall risk score"""
        total_score = 0
        total_weight = 0
        confidence_scores = []
        
        for pillar, weight in self.risk_weights.items():
            if pillar in pillar_scores:
                score = pillar_scores[pillar].get('score', 50)
                confidence = pillar_scores[pillar].get('confidence', 0.5)
                
                total_score += score * weight * confidence  # Weight by confidence
                total_weight += weight * confidence
                confidence_scores.append(confidence)
        
        if total_weight > 0:
            weighted_score = total_score / total_weight
        else:
            weighted_score = 50  # Default moderate risk
        
        overall_confidence = np.mean(confidence_scores) if confidence_scores else 0.5
        
        # Determine risk level
        if weighted_score >= 80:
            risk_level = 'Critical'
        elif weighted_score >= 65:
            risk_level = 'High'
        elif weighted_score >= 50:
            risk_level = 'Moderate'
        elif weighted_score >= 35:
            risk_level = 'Low'
        else:
            risk_level = 'Very Low'
        
        return {
            'score': weighted_score,
            'level': risk_level,
            'confidence': overall_confidence
        }
    
    def _identify_risk_factors(self, risk_assessment: Dict, countries: List[str]) -> Dict:
        """Identify key risk factors from the analysis"""
        risk_factors = {
            'high_priority': [],
            'medium_priority': [],
            'low_priority': []
        }
        
        pillar_scores = risk_assessment['pillar_scores']
        
        # Check for high-risk pillars
        for pillar, data in pillar_scores.items():
            score = data.get('score', 50)
            if score >= 75:
                risk_factors['high_priority'].append(f"High {pillar} risk (score: {score:.1f})")
            elif score >= 60:
                risk_factors['medium_priority'].append(f"Elevated {pillar} risk (score: {score:.1f})")
        
        # Check for nuclear involvement
        if 'escalation' in pillar_scores:
            escalation_data = pillar_scores['escalation'].get('escalation_analysis', {})
            nuclear_countries = escalation_data.get('nuclear_countries', [])
            if nuclear_countries:
                risk_factors['high_priority'].append(f"Nuclear weapons involved: {nuclear_countries}")
        
        # Check for superpower involvement
        if 'military' in pillar_scores:
            military_analyses = pillar_scores['military'].get('military_analyses', [])
            superpowers = [analysis['country'] for analysis in military_analyses 
                          if analysis.get('power_classification') == 'Superpower']
            if superpowers:
                risk_factors['high_priority'].append(f"Superpower involvement: {superpowers}")
        
        # Check narrative tension
        if 'narratives' in pillar_scores:
            gti_score = pillar_scores['narratives'].get('gti_score', 0)
            if gti_score <= -50:
                risk_factors['high_priority'].append(f"Critical narrative tension (GTI: {gti_score:.1f})")
            elif gti_score <= -25:
                risk_factors['medium_priority'].append(f"High narrative tension (GTI: {gti_score:.1f})")
        
        return risk_factors
    
    def _generate_risk_scenarios(self, risk_assessment: Dict, countries: List[str]) -> Dict:
        """Generate potential risk scenarios"""
        scenarios = {}
        overall_risk = risk_assessment['overall_risk']['score']
        
        # Base scenario probabilities on overall risk
        if overall_risk >= 80:
            scenarios['immediate_conflict'] = {
                'probability': 'High (60-80%)',
                'timeframe': '1-3 months',
                'description': 'High probability of immediate military confrontation'
            }
        elif overall_risk >= 65:
            scenarios['escalating_crisis'] = {
                'probability': 'Moderate-High (40-60%)',
                'timeframe': '3-6 months', 
                'description': 'Crisis likely to escalate without intervention'
            }
        elif overall_risk >= 50:
            scenarios['diplomatic_tension'] = {
                'probability': 'Moderate (20-40%)',
                'timeframe': '6-12 months',
                'description': 'Sustained diplomatic tensions with risk of escalation'
            }
        else:
            scenarios['stable_competition'] = {
                'probability': 'Low (5-20%)',
                'timeframe': '12+ months',
                'description': 'Competitive but stable relationship'
            }
        
        # Add nuclear escalation scenario if applicable
        if 'escalation' in risk_assessment['pillar_scores']:
            escalation_data = risk_assessment['pillar_scores']['escalation']
            if escalation_data.get('score', 0) >= 60:
                scenarios['nuclear_escalation'] = {
                    'probability': 'Low but catastrophic (1-5%)',
                    'timeframe': 'During any conflict',
                    'description': 'Risk of nuclear weapon use if conventional conflict occurs'
                }
        
        return scenarios
    
    def _generate_recommendations(self, risk_assessment: Dict, countries: List[str]) -> List[str]:
        """Generate actionable recommendations based on risk assessment"""
        recommendations = []
        overall_risk = risk_assessment['overall_risk']['score']
        risk_factors = risk_assessment['risk_factors']
        
        # High-level recommendations based on overall risk
        if overall_risk >= 80:
            recommendations.extend([
                "URGENT: Activate crisis management protocols",
                "Establish direct communication channels between leadership",
                "Deploy diplomatic mediation efforts immediately",
                "Prepare humanitarian response capabilities"
            ])
        elif overall_risk >= 65:
            recommendations.extend([
                "Increase diplomatic engagement and dialogue",
                "Enhance intelligence monitoring and early warning systems",
                "Prepare contingency plans for various escalation scenarios",
                "Coordinate with allies and international organizations"
            ])
        elif overall_risk >= 50:
            recommendations.extend([
                "Maintain regular diplomatic contact",
                "Monitor situation closely for changes",
                "Strengthen conflict prevention mechanisms",
                "Address underlying grievances through dialogue"
            ])
        
        # Specific recommendations based on risk factors
        if any('nuclear' in factor.lower() for factor in risk_factors['high_priority']):
            recommendations.append("Establish nuclear risk reduction measures and hotlines")
        
        if any('narrative' in factor.lower() for factor in risk_factors['high_priority']):
            recommendations.append("Counter inflammatory rhetoric through strategic communication")
        
        if any('network' in factor.lower() for factor in risk_factors['medium_priority']):
            recommendations.append("Strengthen economic interdependencies to raise conflict costs")
        
        return recommendations
    
    def generate_risk_report(self, risk_assessment: Dict, filepath: str):
        """Generate comprehensive risk report"""
        try:
            report_data = {
                'executive_summary': {
                    'overall_risk_level': risk_assessment['overall_risk']['level'],
                    'risk_score': risk_assessment['overall_risk']['score'],
                    'confidence': risk_assessment['overall_risk']['confidence'],
                    'countries_analyzed': risk_assessment['countries'],
                    'analysis_timestamp': risk_assessment['timestamp']
                },
                'pillar_analysis': risk_assessment['pillar_scores'],
                'risk_factors': risk_assessment['risk_factors'],
                'scenarios': risk_assessment['scenarios'],
                'recommendations': risk_assessment['recommendations']
            }
            
            # Save as JSON for detailed analysis
            with open(filepath.replace('.csv', '.json'), 'w') as f:
                json.dump(report_data, f, indent=2, default=str)
            
            # Create summary CSV
            summary_data = []
            for country in risk_assessment['countries']:
                summary_data.append({
                    'country': country,
                    'overall_risk_score': risk_assessment['overall_risk']['score'],
                    'risk_level': risk_assessment['overall_risk']['level'],
                    'confidence': risk_assessment['overall_risk']['confidence'],
                    'timestamp': risk_assessment['timestamp']
                })
            
            summary_df = pd.DataFrame(summary_data)
            summary_df.to_csv(filepath, index=False)
            
            self.logger.info(f"Risk report generated: {filepath}")
            
        except Exception as e:
            self.logger.error(f"Failed to generate risk report: {e}")
    
    def monitor_risk_changes(self, previous_assessment: Dict, current_assessment: Dict) -> Dict:
        """Monitor changes in risk levels over time"""
        changes = {
            'timestamp': datetime.now().isoformat(),
            'overall_change': {},
            'pillar_changes': {},
            'new_risk_factors': [],
            'alerts': []
        }
        
        # Overall risk change
        prev_score = previous_assessment['overall_risk']['score']
        curr_score = current_assessment['overall_risk']['score']
        score_change = curr_score - prev_score
        
        changes['overall_change'] = {
            'previous_score': prev_score,
            'current_score': curr_score,
            'change': score_change,
            'trend': 'Increasing' if score_change > 5 else 'Decreasing' if score_change < -5 else 'Stable'
        }
        
        # Pillar-level changes
        for pillar in current_assessment['pillar_scores']:
            if pillar in previous_assessment['pillar_scores']:
                prev_pillar_score = previous_assessment['pillar_scores'][pillar]['score']
                curr_pillar_score = current_assessment['pillar_scores'][pillar]['score']
                pillar_change = curr_pillar_score - prev_pillar_score
                
                changes['pillar_changes'][pillar] = {
                    'previous': prev_pillar_score,
                    'current': curr_pillar_score,
                    'change': pillar_change
                }
                
                # Generate alerts for significant changes
                if abs(pillar_change) > 15:
                    changes['alerts'].append(f"Significant change in {pillar}: {pillar_change:+.1f} points")
        
        return changes


# Example usage and testing
if __name__ == "__main__":
    # Initialize risk calculator
    calculator = RiskCalculator()
    
    # Example scenario: Israel-Iran tensions
    countries = ['ISR', 'IRN']
    
    # Sample narrative texts (simulating recent news)
    narrative_texts = [
        "Military exercises conducted near border region amid rising tensions",
        "Diplomatic talks suspended following controversial statement",
        "International community calls for restraint and dialogue",
        "Defense systems activated in response to security threats"
    ]
    
    narrative_sources = ['official', 'high_press', 'official', 'medium_press']
    
    # Sample alliance data
    alliance_data = pd.DataFrame({
        'country1_iso': ['USA', 'USA', 'ISR'],
        'country2_iso': ['ISR', 'SAU', 'USA'],
        'alliance_type': ['defense', 'cooperation', 'defense']
    })
    
    # Sample trade data
    trade_data = pd.DataFrame({
        'reporter_iso': ['ISR', 'IRN', 'USA'],
        'partner_iso': ['USA', 'CHN', 'ISR'],
        'trade_value_usd': [15000000000, 25000000000, 12000000000]
    })
    
    print("\n=== COMPREHENSIVE GEOPOLITICAL RISK ASSESSMENT ===")
    print(f"Analyzing: {countries}")
    
    # Calculate comprehensive risk
    risk_assessment = calculator.calculate_comprehensive_risk(
        countries=countries,
        narrative_texts=narrative_texts,
        narrative_sources=narrative_sources,
        alliance_data=alliance_data,
        trade_data=trade_data
    )
    
    # Display results
    print(f"\nOVERALL RISK ASSESSMENT:")
    print(f"Risk Level: {risk_assessment['overall_risk']['level']}")
    print(f"Risk Score: {risk_assessment['overall_risk']['score']:.1f}/100")
    print(f"Confidence: {risk_assessment['overall_risk']['confidence']:.2f}")
    
    print(f"\nPILLAR SCORES:")
    for pillar, data in risk_assessment['pillar_scores'].items():
        print(f"  {pillar.title()}: {data['score']:.1f}/100")
    
    print(f"\nHIGH PRIORITY RISK FACTORS:")
    for factor in risk_assessment['risk_factors']['high_priority']:
        print(f"  • {factor}")
    
    print(f"\nKEY SCENARIOS:")
    for scenario, details in risk_assessment['scenarios'].items():
        print(f"  {scenario.replace('_', ' ').title()}: {details['probability']}")
    
    print(f"\nRECOMMENDATIONS:")
    for i, rec in enumerate(risk_assessment['recommendations'][:5], 1):
        print(f"  {i}. {rec}")
    
    # Generate report
    calculator.generate_risk_report(
        risk_assessment, 
        "/home/ubuntu/geopolitical-risk-analyzer/examples/comprehensive_risk_assessment.csv"
    )

