"""
Military Power Analyzer Module
Analyzes military capabilities, nuclear arsenals, and defense spending

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional
import logging
from datetime import datetime

class MilitaryPowerAnalyzer:
    """
    Analyzes military capabilities including conventional forces, nuclear weapons,
    defense spending, and strategic capabilities.
    """
    
    def __init__(self):
        """Initialize the Military Power Analyzer"""
        self.military_data = None
        self.nuclear_data = None
        self.defense_spending_data = None
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Nuclear weapon states (as of 2024)
        self.nuclear_weapon_states = {
            'USA': {'warheads': 5550, 'delivery_systems': ['ICBM', 'SLBM', 'Strategic_Bomber'], 'first_test': 1945},
            'RUS': {'warheads': 6257, 'delivery_systems': ['ICBM', 'SLBM', 'Strategic_Bomber'], 'first_test': 1949},
            'CHN': {'warheads': 350, 'delivery_systems': ['ICBM', 'SLBM', 'Strategic_Bomber'], 'first_test': 1964},
            'FRA': {'warheads': 290, 'delivery_systems': ['SLBM', 'Strategic_Bomber'], 'first_test': 1960},
            'GBR': {'warheads': 225, 'delivery_systems': ['SLBM'], 'first_test': 1952},
            'IND': {'warheads': 164, 'delivery_systems': ['IRBM', 'Aircraft'], 'first_test': 1974},
            'PAK': {'warheads': 170, 'delivery_systems': ['IRBM', 'Aircraft'], 'first_test': 1998},
            'ISR': {'warheads': 90, 'delivery_systems': ['IRBM', 'Aircraft'], 'first_test': 1979},  # Estimated
            'PRK': {'warheads': 30, 'delivery_systems': ['IRBM'], 'first_test': 2006}
        }
        
        # Chemical/Biological weapon capabilities (estimated)
        self.cbrn_capabilities = {
            'USA': {'chemical': 'Defensive', 'biological': 'Defensive', 'nuclear': 'Advanced'},
            'RUS': {'chemical': 'Advanced', 'biological': 'Advanced', 'nuclear': 'Advanced'},
            'CHN': {'chemical': 'Advanced', 'biological': 'Moderate', 'nuclear': 'Advanced'},
            'IRN': {'chemical': 'Moderate', 'biological': 'Limited', 'nuclear': 'Developing'},
            'SYR': {'chemical': 'Moderate', 'biological': 'Limited', 'nuclear': 'None'},
            'PRK': {'chemical': 'Advanced', 'biological': 'Moderate', 'nuclear': 'Limited'}
        }
        
        # Military technology tiers
        self.tech_tiers = {
            'Tier_1': ['USA', 'RUS', 'CHN', 'GBR', 'FRA', 'ISR'],  # Most advanced
            'Tier_2': ['DEU', 'JPN', 'IND', 'KOR', 'ITA', 'AUS', 'CAN'],  # Advanced
            'Tier_3': ['TUR', 'BRA', 'IRN', 'SAU', 'EGY', 'PAK', 'IDN'],  # Moderate
            'Tier_4': ['Other']  # Basic capabilities
        }
    
    def load_military_data(self, data_source, data_type='csv'):
        """
        Load military capabilities data
        
        Args:
            data_source: Path to CSV file or DataFrame
            data_type (str): 'csv' or 'dataframe'
        """
        try:
            if data_type == 'csv':
                self.military_data = pd.read_csv(data_source)
            elif data_type == 'dataframe':
                self.military_data = data_source.copy()
            
            self.logger.info(f"Loaded military data: {len(self.military_data)} records")
            
        except Exception as e:
            self.logger.error(f"Failed to load military data: {e}")
    
    def calculate_nuclear_capability_score(self, country_iso: str) -> Dict:
        """
        Calculate nuclear capability score for a country
        
        Args:
            country_iso (str): ISO country code
            
        Returns:
            Dict: Nuclear capability analysis
        """
        if country_iso not in self.nuclear_weapon_states:
            return {
                'country': country_iso,
                'nuclear_status': 'Non-nuclear',
                'warhead_count': 0,
                'delivery_systems': [],
                'nuclear_score': 0.0,
                'nuclear_threat_level': 'None',
                'first_test_year': None
            }
        
        nuke_data = self.nuclear_weapon_states[country_iso]
        warheads = nuke_data['warheads']
        delivery_systems = nuke_data['delivery_systems']
        
        # Calculate nuclear score based on warheads and delivery diversity
        warhead_score = min(100, np.log1p(warheads) * 10)  # Log scale, max 100
        delivery_score = len(delivery_systems) * 20  # 20 points per delivery type
        
        nuclear_score = (warhead_score + delivery_score) / 2
        
        # Determine threat level
        if nuclear_score >= 80:
            threat_level = 'Strategic'
        elif nuclear_score >= 60:
            threat_level = 'Regional'
        elif nuclear_score >= 40:
            threat_level = 'Limited'
        else:
            threat_level = 'Minimal'
        
        return {
            'country': country_iso,
            'nuclear_status': 'Nuclear-armed',
            'warhead_count': warheads,
            'delivery_systems': delivery_systems,
            'nuclear_score': nuclear_score,
            'nuclear_threat_level': threat_level,
            'first_test_year': nuke_data['first_test']
        }
    
    def calculate_cbrn_score(self, country_iso: str) -> Dict:
        """
        Calculate Chemical, Biological, Radiological, Nuclear (CBRN) capabilities
        
        Args:
            country_iso (str): ISO country code
            
        Returns:
            Dict: CBRN capability analysis
        """
        if country_iso not in self.cbrn_capabilities:
            return {
                'country': country_iso,
                'chemical_capability': 'Unknown',
                'biological_capability': 'Unknown',
                'nuclear_capability': 'Unknown',
                'cbrn_score': 0.0,
                'cbrn_threat_level': 'Unknown'
            }
        
        cbrn_data = self.cbrn_capabilities[country_iso]
        
        # Score mapping
        capability_scores = {
            'Advanced': 100,
            'Moderate': 60,
            'Limited': 30,
            'Defensive': 20,
            'Developing': 40,
            'None': 0,
            'Unknown': 0
        }
        
        chemical_score = capability_scores.get(cbrn_data['chemical'], 0)
        biological_score = capability_scores.get(cbrn_data['biological'], 0)
        nuclear_score = capability_scores.get(cbrn_data['nuclear'], 0)
        
        # Weighted average (nuclear weighted more heavily)
        cbrn_score = (chemical_score * 0.3 + biological_score * 0.2 + nuclear_score * 0.5)
        
        # Determine threat level
        if cbrn_score >= 80:
            threat_level = 'Critical'
        elif cbrn_score >= 60:
            threat_level = 'High'
        elif cbrn_score >= 40:
            threat_level = 'Moderate'
        elif cbrn_score >= 20:
            threat_level = 'Low'
        else:
            threat_level = 'Minimal'
        
        return {
            'country': country_iso,
            'chemical_capability': cbrn_data['chemical'],
            'biological_capability': cbrn_data['biological'],
            'nuclear_capability': cbrn_data['nuclear'],
            'cbrn_score': cbrn_score,
            'cbrn_threat_level': threat_level
        }
    
    def get_technology_tier(self, country_iso: str) -> Dict:
        """
        Determine military technology tier for a country
        
        Args:
            country_iso (str): ISO country code
            
        Returns:
            Dict: Technology tier analysis
        """
        for tier, countries in self.tech_tiers.items():
            if country_iso in countries:
                tier_scores = {
                    'Tier_1': 100,
                    'Tier_2': 75,
                    'Tier_3': 50,
                    'Tier_4': 25
                }
                
                return {
                    'country': country_iso,
                    'technology_tier': tier,
                    'tech_score': tier_scores[tier],
                    'capabilities': self._get_tier_capabilities(tier)
                }
        
        # Default to Tier 4
        return {
            'country': country_iso,
            'technology_tier': 'Tier_4',
            'tech_score': 25,
            'capabilities': self._get_tier_capabilities('Tier_4')
        }
    
    def _get_tier_capabilities(self, tier: str) -> List[str]:
        """Get typical capabilities for each technology tier"""
        capabilities = {
            'Tier_1': [
                'Advanced stealth technology',
                'Precision-guided munitions',
                'Advanced ISR systems',
                'Cyber warfare capabilities',
                'Space-based assets',
                'Advanced air defense systems',
                'Nuclear triad'
            ],
            'Tier_2': [
                'Modern fighter aircraft',
                'Advanced naval systems',
                'Precision munitions',
                'Electronic warfare',
                'Satellite communications',
                'Modern air defense'
            ],
            'Tier_3': [
                'Modern conventional forces',
                'Basic precision weapons',
                'Regional air defense',
                'Limited electronic warfare',
                'Ballistic missiles'
            ],
            'Tier_4': [
                'Basic conventional forces',
                'Limited precision capabilities',
                'Basic air defense',
                'Small arms and artillery'
            ]
        }
        
        return capabilities.get(tier, [])
    
    def calculate_military_power_index(self, country_iso: str, defense_spending: Optional[float] = None, 
                                     active_personnel: Optional[int] = None) -> Dict:
        """
        Calculate comprehensive military power index
        
        Args:
            country_iso (str): ISO country code
            defense_spending (Optional[float]): Defense spending in USD billions
            active_personnel (Optional[int]): Active military personnel
            
        Returns:
            Dict: Military power analysis
        """
        # Get component scores
        nuclear_analysis = self.calculate_nuclear_capability_score(country_iso)
        cbrn_analysis = self.calculate_cbrn_score(country_iso)
        tech_analysis = self.get_technology_tier(country_iso)
        
        # Default values if not provided
        if defense_spending is None:
            defense_spending = self._estimate_defense_spending(country_iso)
        if active_personnel is None:
            active_personnel = self._estimate_active_personnel(country_iso)
        
        # Calculate component scores
        nuclear_score = nuclear_analysis['nuclear_score']
        cbrn_score = cbrn_analysis['cbrn_score']
        tech_score = tech_analysis['tech_score']
        
        # Spending score (log scale, normalized)
        spending_score = min(100, np.log1p(defense_spending) * 15) if defense_spending > 0 else 0
        
        # Personnel score (log scale, normalized)
        personnel_score = min(100, np.log1p(active_personnel) * 8) if active_personnel > 0 else 0
        
        # Weighted military power index
        weights = {
            'nuclear': 0.25,
            'cbrn': 0.15,
            'technology': 0.25,
            'spending': 0.20,
            'personnel': 0.15
        }
        
        military_power_index = (
            nuclear_score * weights['nuclear'] +
            cbrn_score * weights['cbrn'] +
            tech_score * weights['technology'] +
            spending_score * weights['spending'] +
            personnel_score * weights['personnel']
        )
        
        # Determine power classification
        if military_power_index >= 85:
            power_class = 'Superpower'
        elif military_power_index >= 70:
            power_class = 'Great Power'
        elif military_power_index >= 55:
            power_class = 'Regional Power'
        elif military_power_index >= 40:
            power_class = 'Middle Power'
        else:
            power_class = 'Small Power'
        
        return {
            'country': country_iso,
            'military_power_index': military_power_index,
            'power_classification': power_class,
            'component_scores': {
                'nuclear_score': nuclear_score,
                'cbrn_score': cbrn_score,
                'technology_score': tech_score,
                'spending_score': spending_score,
                'personnel_score': personnel_score
            },
            'defense_spending_billions': defense_spending,
            'active_personnel': active_personnel,
            'nuclear_status': nuclear_analysis['nuclear_status'],
            'technology_tier': tech_analysis['technology_tier'],
            'timestamp': datetime.now().isoformat()
        }
    
    def _estimate_defense_spending(self, country_iso: str) -> float:
        """Estimate defense spending for major countries (2024 estimates in billions USD)"""
        spending_estimates = {
            'USA': 816.0, 'CHN': 296.0, 'RUS': 109.0, 'IND': 76.6, 'SAU': 75.0,
            'GBR': 68.4, 'DEU': 56.0, 'UKR': 44.0, 'FRA': 43.9, 'JPN': 42.0,
            'KOR': 31.4, 'ITA': 28.9, 'AUS': 27.5, 'ISR': 27.5, 'CAN': 22.8,
            'TUR': 17.5, 'BRA': 16.7, 'IRN': 15.8, 'NLD': 15.6, 'POL': 15.2
        }
        return spending_estimates.get(country_iso, 1.0)  # Default 1 billion for others
    
    def _estimate_active_personnel(self, country_iso: str) -> int:
        """Estimate active military personnel for major countries"""
        personnel_estimates = {
            'CHN': 2035000, 'IND': 1455550, 'USA': 1328000, 'PRK': 1280000, 'RUS': 1014000,
            'PAK': 654000, 'IRN': 610000, 'KOR': 599000, 'VNM': 482000, 'EGY': 438500,
            'TUR': 425000, 'IDN': 400000, 'UKR': 250000, 'BRA': 334500, 'THA': 360850,
            'JPN': 247150, 'SAU': 227000, 'FRA': 203250, 'DEU': 183500, 'GBR': 153290,
            'ITA': 165500, 'ISR': 169500, 'POL': 114050, 'AUS': 58206, 'CAN': 67492
        }
        return personnel_estimates.get(country_iso, 50000)  # Default 50k for others
    
    def analyze_country_military_power(self, country_iso: str) -> Dict:
        """
        Analyze comprehensive military power for a country
        
        Args:
            country_iso (str): ISO country code
            
        Returns:
            Dict: Complete military analysis
        """
        return self.calculate_military_power_index(country_iso)
    
    def analyze_military_balance(self, country1: str, country2: str) -> Dict:
        """
        Compare military capabilities between two countries
        
        Args:
            country1 (str): First country ISO code
            country2 (str): Second country ISO code
            
        Returns:
            Dict: Military balance analysis
        """
        analysis1 = self.calculate_military_power_index(country1)
        analysis2 = self.calculate_military_power_index(country2)
        
        power_diff = analysis1['military_power_index'] - analysis2['military_power_index']
        
        if abs(power_diff) <= 10:
            balance = 'Balanced'
        elif power_diff > 10:
            balance = f'{country1} Advantage'
        else:
            balance = f'{country2} Advantage'
        
        return {
            'country1': country1,
            'country2': country2,
            'country1_power': analysis1['military_power_index'],
            'country2_power': analysis2['military_power_index'],
            'power_difference': power_diff,
            'military_balance': balance,
            'nuclear_balance': {
                'country1_nuclear': analysis1['nuclear_status'],
                'country2_nuclear': analysis2['nuclear_status']
            },
            'technology_balance': {
                'country1_tier': analysis1['technology_tier'],
                'country2_tier': analysis2['technology_tier']
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def calculate_escalation_risk(self, countries: List[str]) -> Dict:
        """
        Calculate escalation risk based on military capabilities
        
        Args:
            countries (List[str]): Countries involved in potential conflict
            
        Returns:
            Dict: Escalation risk analysis
        """
        nuclear_countries = [c for c in countries if c in self.nuclear_weapon_states]
        
        # Calculate aggregate military power
        total_power = 0
        max_power = 0
        nuclear_warheads = 0
        
        for country in countries:
            analysis = self.calculate_military_power_index(country)
            power = analysis['military_power_index']
            total_power += power
            max_power = max(max_power, power)
            
            if country in self.nuclear_weapon_states:
                nuclear_warheads += self.nuclear_weapon_states[country]['warheads']
        
        # Risk factors
        nuclear_risk = len(nuclear_countries) > 0
        superpower_involved = max_power >= 85
        multiple_nuclear = len(nuclear_countries) > 1
        
        # Calculate escalation score
        escalation_score = 0
        if nuclear_risk:
            escalation_score += 40
        if superpower_involved:
            escalation_score += 30
        if multiple_nuclear:
            escalation_score += 20
        if total_power > 200:
            escalation_score += 10
        
        # Determine risk level
        if escalation_score >= 80:
            risk_level = 'Extreme'
        elif escalation_score >= 60:
            risk_level = 'High'
        elif escalation_score >= 40:
            risk_level = 'Moderate'
        elif escalation_score >= 20:
            risk_level = 'Low'
        else:
            risk_level = 'Minimal'
        
        return {
            'countries': countries,
            'escalation_score': escalation_score,
            'escalation_risk_level': risk_level,
            'nuclear_countries': nuclear_countries,
            'total_nuclear_warheads': nuclear_warheads,
            'superpower_involved': superpower_involved,
            'risk_factors': {
                'nuclear_weapons_present': nuclear_risk,
                'multiple_nuclear_powers': multiple_nuclear,
                'superpower_involvement': superpower_involved,
                'high_aggregate_power': total_power > 200
            },
            'timestamp': datetime.now().isoformat()
        }
    
    def export_military_analysis(self, countries: List[str], filepath: str):
        """
        Export comprehensive military analysis for specified countries
        
        Args:
            countries (List[str]): Countries to analyze
            filepath (str): Output file path
        """
        try:
            analysis_results = []
            
            for country in countries:
                military_analysis = self.calculate_military_power_index(country)
                nuclear_analysis = self.calculate_nuclear_capability_score(country)
                cbrn_analysis = self.calculate_cbrn_score(country)
                tech_analysis = self.get_technology_tier(country)
                
                combined_result = {
                    **military_analysis,
                    'nuclear_warheads': nuclear_analysis['warhead_count'],
                    'delivery_systems': ', '.join(nuclear_analysis['delivery_systems']),
                    'chemical_capability': cbrn_analysis['chemical_capability'],
                    'biological_capability': cbrn_analysis['biological_capability'],
                    'military_capabilities': ', '.join(tech_analysis['capabilities'][:3])  # Top 3
                }
                
                analysis_results.append(combined_result)
            
            # Create DataFrame and save
            df = pd.DataFrame(analysis_results)
            df.to_csv(filepath, index=False)
            
            self.logger.info(f"Military analysis exported to {filepath}")
            
        except Exception as e:
            self.logger.error(f"Failed to export military analysis: {e}")


# Example usage and testing
if __name__ == "__main__":
    # Initialize analyzer
    analyzer = MilitaryPowerAnalyzer()
    
    # Test countries
    test_countries = ['USA', 'CHN', 'RUS', 'IRN', 'ISR', 'PRK', 'UKR']
    
    print("\n=== MILITARY POWER ANALYSIS ===")
    
    # Analyze each country
    for country in test_countries:
        analysis = analyzer.calculate_military_power_index(country)
        nuclear = analyzer.calculate_nuclear_capability_score(country)
        
        print(f"\n{country}:")
        print(f"  Military Power Index: {analysis['military_power_index']:.1f}")
        print(f"  Power Classification: {analysis['power_classification']}")
        print(f"  Nuclear Status: {nuclear['nuclear_status']}")
        if nuclear['warhead_count'] > 0:
            print(f"  Nuclear Warheads: {nuclear['warhead_count']}")
        print(f"  Technology Tier: {analysis['technology_tier']}")
    
    # Military balance analysis
    print(f"\n=== MILITARY BALANCE ANALYSIS ===")
    balance_usa_chn = analyzer.analyze_military_balance('USA', 'CHN')
    print(f"USA vs CHN: {balance_usa_chn['military_balance']}")
    print(f"Power Difference: {balance_usa_chn['power_difference']:.1f}")
    
    balance_isr_irn = analyzer.analyze_military_balance('ISR', 'IRN')
    print(f"ISR vs IRN: {balance_isr_irn['military_balance']}")
    print(f"Power Difference: {balance_isr_irn['power_difference']:.1f}")
    
    # Escalation risk analysis
    print(f"\n=== ESCALATION RISK ANALYSIS ===")
    
    # Scenario 1: Israel-Iran conflict
    escalation_isr_irn = analyzer.calculate_escalation_risk(['ISR', 'IRN'])
    print(f"Israel-Iran Scenario:")
    print(f"  Escalation Risk: {escalation_isr_irn['escalation_risk_level']}")
    print(f"  Nuclear Countries: {escalation_isr_irn['nuclear_countries']}")
    
    # Scenario 2: US-China-Russia
    escalation_superpowers = analyzer.calculate_escalation_risk(['USA', 'CHN', 'RUS'])
    print(f"US-China-Russia Scenario:")
    print(f"  Escalation Risk: {escalation_superpowers['escalation_risk_level']}")
    print(f"  Total Nuclear Warheads: {escalation_superpowers['total_nuclear_warheads']}")
    
    # Export results
    analyzer.export_military_analysis(test_countries, "/home/ubuntu/geopolitical-risk-analyzer/examples/military_analysis_example.csv")

