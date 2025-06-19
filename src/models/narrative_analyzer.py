"""
Narrative Analyzer Module (Simplified)
Implements Pillar 2: Geopolitical Tension Index (GTI) using basic NLP

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
import requests
import re
from datetime import datetime, timedelta
import logging
from typing import List, Dict, Optional
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

class NarrativeAnalyzer:
    """
    Analyzes geopolitical narratives and rhetoric to generate 
    Geopolitical Tension Index (GTI) scores using basic NLP.
    """
    
    def __init__(self):
        """Initialize the Narrative Analyzer with basic NLP tools"""
        self.logger = logging.getLogger(__name__)
        
        # Tension keywords for basic sentiment analysis
        self.tension_keywords = {
            'high_tension': [
                'war', 'conflict', 'attack', 'invasion', 'threat', 'nuclear',
                'military', 'sanctions', 'crisis', 'escalation', 'hostility',
                'aggression', 'retaliation', 'strike', 'missile', 'bomb'
            ],
            'moderate_tension': [
                'tension', 'dispute', 'disagreement', 'concern', 'warning',
                'pressure', 'opposition', 'criticism', 'protest', 'standoff'
            ],
            'diplomatic': [
                'negotiation', 'dialogue', 'cooperation', 'agreement', 'peace',
                'diplomacy', 'talks', 'summit', 'treaty', 'partnership'
            ]
        }
        
        # Initialize basic classifier
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self.classifier = MultinomialNB()
        self.is_trained = False
        
    def analyze_narrative_sentiment(self, text: str) -> Dict:
        """
        Analyze sentiment and tension level of a text using keyword matching
        
        Args:
            text (str): Text to analyze
            
        Returns:
            Dict: Sentiment analysis results
        """
        text_lower = text.lower()
        
        # Count tension keywords
        high_tension_count = sum(1 for word in self.tension_keywords['high_tension'] if word in text_lower)
        moderate_tension_count = sum(1 for word in self.tension_keywords['moderate_tension'] if word in text_lower)
        diplomatic_count = sum(1 for word in self.tension_keywords['diplomatic'] if word in text_lower)
        
        total_words = len(text.split())
        
        # Calculate tension score (0-100)
        tension_score = min(100, (high_tension_count * 10 + moderate_tension_count * 5 - diplomatic_count * 3) * (100 / max(1, total_words)) * 10)
        tension_score = max(0, tension_score)
        
        # Determine sentiment
        if tension_score > 70:
            sentiment = 'very_negative'
        elif tension_score > 50:
            sentiment = 'negative'
        elif tension_score > 30:
            sentiment = 'neutral'
        elif tension_score > 10:
            sentiment = 'positive'
        else:
            sentiment = 'very_positive'
            
        return {
            'tension_score': tension_score,
            'sentiment': sentiment,
            'high_tension_keywords': high_tension_count,
            'moderate_tension_keywords': moderate_tension_count,
            'diplomatic_keywords': diplomatic_count,
            'confidence': min(100, (high_tension_count + moderate_tension_count + diplomatic_count) * 10)
        }
    
    def calculate_gti_score(self, narratives: List[str], sources: List[str] = None) -> Dict:
        """
        Calculate Geopolitical Tension Index from multiple narratives
        
        Args:
            narratives (List[str]): List of narrative texts
            sources (List[str]): List of source types
            
        Returns:
            Dict: GTI calculation results
        """
        if not narratives:
            return {'gti_score': 50, 'confidence': 0, 'analysis': []}
        
        analyses = []
        total_tension = 0
        total_confidence = 0
        
        for i, narrative in enumerate(narratives):
            analysis = self.analyze_narrative_sentiment(narrative)
            
            # Apply source weighting
            source_weight = 1.0
            if sources and i < len(sources):
                source_weights = {
                    'official': 1.5,
                    'media': 1.0,
                    'social': 0.7,
                    'academic': 1.2
                }
                source_weight = source_weights.get(sources[i], 1.0)
            
            weighted_tension = analysis['tension_score'] * source_weight
            weighted_confidence = analysis['confidence'] * source_weight
            
            total_tension += weighted_tension
            total_confidence += weighted_confidence
            
            analysis['source_weight'] = source_weight
            analysis['weighted_tension'] = weighted_tension
            analyses.append(analysis)
        
        # Calculate final GTI score
        gti_score = total_tension / len(narratives) if narratives else 50
        avg_confidence = total_confidence / len(narratives) if narratives else 0
        
        # Determine GTI level
        if gti_score > 80:
            gti_level = 'Critical'
        elif gti_score > 65:
            gti_level = 'High'
        elif gti_score > 50:
            gti_level = 'Moderate'
        elif gti_score > 35:
            gti_level = 'Low'
        else:
            gti_level = 'Very Low'
        
        return {
            'gti_score': round(gti_score, 2),
            'gti_level': gti_level,
            'confidence': round(avg_confidence, 2),
            'narrative_count': len(narratives),
            'analysis': analyses,
            'timestamp': datetime.now().isoformat()
        }
    
    def analyze_country_narratives(self, country_code: str, narratives: List[str]) -> Dict:
        """
        Analyze narratives specific to a country
        
        Args:
            country_code (str): ISO country code
            narratives (List[str]): Country-specific narratives
            
        Returns:
            Dict: Country narrative analysis
        """
        gti_result = self.calculate_gti_score(narratives)
        
        # Add country-specific analysis
        country_analysis = {
            'country': country_code,
            'gti_score': gti_result['gti_score'],
            'gti_level': gti_result['gti_level'],
            'confidence': gti_result['confidence'],
            'narrative_analysis': gti_result['analysis'],
            'risk_factors': self._identify_risk_factors(narratives),
            'timestamp': datetime.now().isoformat()
        }
        
        return country_analysis
    
    def _identify_risk_factors(self, narratives: List[str]) -> List[str]:
        """Identify specific risk factors from narratives"""
        risk_factors = []
        combined_text = ' '.join(narratives).lower()
        
        risk_patterns = {
            'Nuclear Threats': ['nuclear', 'atomic', 'warhead', 'missile'],
            'Military Mobilization': ['military', 'troops', 'deployment', 'mobilization'],
            'Economic Sanctions': ['sanctions', 'embargo', 'trade war', 'economic pressure'],
            'Diplomatic Crisis': ['ambassador', 'embassy', 'diplomatic', 'expulsion'],
            'Cyber Warfare': ['cyber', 'hacking', 'digital', 'infrastructure attack'],
            'Territorial Disputes': ['territory', 'border', 'sovereignty', 'occupation'],
            'Alliance Tensions': ['nato', 'alliance', 'coalition', 'partnership'],
            'Energy Security': ['oil', 'gas', 'energy', 'pipeline', 'supply']
        }
        
        for factor, keywords in risk_patterns.items():
            if any(keyword in combined_text for keyword in keywords):
                risk_factors.append(factor)
        
        return risk_factors
    
    def generate_narrative_report(self, country_analyses: List[Dict]) -> Dict:
        """
        Generate comprehensive narrative analysis report
        
        Args:
            country_analyses (List[Dict]): List of country analyses
            
        Returns:
            Dict: Comprehensive report
        """
        if not country_analyses:
            return {'error': 'No country analyses provided'}
        
        # Calculate global metrics
        global_gti = np.mean([analysis['gti_score'] for analysis in country_analyses])
        max_gti = max([analysis['gti_score'] for analysis in country_analyses])
        min_gti = min([analysis['gti_score'] for analysis in country_analyses])
        
        # Identify hotspots
        hotspots = [
            analysis for analysis in country_analyses 
            if analysis['gti_score'] > 70
        ]
        
        # Aggregate risk factors
        all_risk_factors = []
        for analysis in country_analyses:
            all_risk_factors.extend(analysis.get('risk_factors', []))
        
        risk_factor_counts = {}
        for factor in all_risk_factors:
            risk_factor_counts[factor] = risk_factor_counts.get(factor, 0) + 1
        
        top_risk_factors = sorted(
            risk_factor_counts.items(), 
            key=lambda x: x[1], 
            reverse=True
        )[:5]
        
        report = {
            'global_metrics': {
                'global_gti_score': round(global_gti, 2),
                'max_gti_score': round(max_gti, 2),
                'min_gti_score': round(min_gti, 2),
                'countries_analyzed': len(country_analyses),
                'hotspot_count': len(hotspots)
            },
            'hotspots': hotspots,
            'top_risk_factors': top_risk_factors,
            'country_analyses': country_analyses,
            'report_timestamp': datetime.now().isoformat(),
            'methodology': 'Basic NLP with keyword-based sentiment analysis'
        }
        
        return report


# Example usage and testing
if __name__ == "__main__":
    # Initialize analyzer
    analyzer = NarrativeAnalyzer()
    
    # Test narratives
    test_narratives = [
        "Military tensions escalate as nuclear threats are issued",
        "Diplomatic talks continue despite ongoing disagreements",
        "Economic sanctions imposed following territorial disputes",
        "Peace negotiations show promising signs of cooperation"
    ]
    
    print("=== NARRATIVE ANALYSIS TEST ===")
    
    # Test individual narrative analysis
    for i, narrative in enumerate(test_narratives):
        result = analyzer.analyze_narrative_sentiment(narrative)
        print(f"\nNarrative {i+1}: {narrative}")
        print(f"Tension Score: {result['tension_score']}")
        print(f"Sentiment: {result['sentiment']}")
        print(f"Confidence: {result['confidence']}")
    
    # Test GTI calculation
    print(f"\n=== GTI CALCULATION ===")
    gti_result = analyzer.calculate_gti_score(test_narratives)
    print(f"GTI Score: {gti_result['gti_score']}")
    print(f"GTI Level: {gti_result['gti_level']}")
    print(f"Confidence: {gti_result['confidence']}")
    
    # Test country analysis
    print(f"\n=== COUNTRY ANALYSIS ===")
    country_result = analyzer.analyze_country_narratives('USA', test_narratives[:2])
    print(f"Country: {country_result['country']}")
    print(f"GTI Score: {country_result['gti_score']}")
    print(f"Risk Factors: {country_result['risk_factors']}")

