"""
World War Risk Assessment Module
Specialized analysis for global conflict escalation scenarios

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Tuple
import logging
from datetime import datetime
import json

class WorldWarRiskAnalyzer:
    """
    Specialized analyzer for assessing World War III escalation risks
    """
    
    def __init__(self):
        """Initialize World War Risk Analyzer"""
        self.logger = logging.getLogger(__name__)
        
        # World War risk thresholds
        self.ww_risk_thresholds = {
            'nuclear_use': 95,           # Any nuclear weapon use
            'superpower_clash': 90,      # Direct US-China/US-Russia conflict
            'alliance_activation': 85,   # NATO Article 5 or equivalent
            'multi_theater': 80,         # Fighting on multiple fronts
            'economic_collapse': 75      # Global economic system breakdown
        }
        
        # Escalation multipliers for World War scenarios
        self.ww_multipliers = {
            'nuclear_threshold_crossed': 2.0,
            'multiple_nuclear_powers': 1.8,
            'alliance_cascade': 1.6,
            'global_supply_disruption': 1.4,
            'cyber_warfare': 1.3,
            'information_warfare': 1.2
        }
        
        # Critical alliance systems
        self.alliance_systems = {
            'NATO': ['USA', 'GBR', 'FRA', 'DEU', 'ITA', 'ESP', 'POL', 'TUR', 'CAN'],
            'CSTO': ['RUS', 'BLR', 'KAZ', 'KGZ', 'TJK', 'ARM'],
            'ANZUS': ['USA', 'AUS', 'NZL'],
            'US_BILATERAL': ['JPN', 'KOR', 'PHL', 'THA'],
            'QUAD': ['USA', 'IND', 'JPN', 'AUS'],
            'AUKUS': ['AUS', 'GBR', 'USA'],
            'SCO': ['CHN', 'RUS', 'IND', 'PAK', 'KAZ', 'KGZ', 'TJK', 'UZB']
        }
        
        # Superpower classifications
        self.superpowers = {
            'USA': {'nuclear': True, 'global_reach': True, 'alliance_leader': True},
            'CHN': {'nuclear': True, 'global_reach': True, 'alliance_leader': False},
            'RUS': {'nuclear': True, 'global_reach': True, 'alliance_leader': True}
        }
    
    def calculate_world_war_risk(self, countries: List[str], 
                                military_data: Dict = None,
                                current_conflicts: List[Dict] = None) -> Dict:
        """
        Calculate World War III risk based on countries and current situation
        
        Args:
            countries (List[str]): Countries involved
            military_data (Dict): Military capability data
            current_conflicts (List[Dict]): Current conflict information
            
        Returns:
            Dict: World War risk assessment
        """
        # Create a mock scenario assessment for compatibility
        mock_scenario = {
            'overall_risk': {'score': 75},  # High base risk
            'countries': countries
        }
        
        return self.assess_world_war_risk(
            scenario_assessment=mock_scenario,
            involved_countries=countries,
            conflict_theaters=['Europe', 'Pacific', 'Middle East']
        )
    
    def assess_world_war_risk(self, 
                             scenario_assessment: Dict,
                             involved_countries: List[str],
                             conflict_theaters: List[str] = None) -> Dict:
        """
        Assess the risk of regional conflict escalating to World War III
        
        Args:
            scenario_assessment (Dict): Base risk assessment from main framework
            involved_countries (List[str]): Countries directly involved in conflict
            conflict_theaters (List[str]): Geographic theaters of conflict
            
        Returns:
            Dict: World War risk assessment
        """
        self.logger.info("Assessing World War III escalation risk")
        
        ww_assessment = {
            'world_war_risk_score': 0,
            'world_war_probability': 'Low',
            'escalation_pathways': [],
            'critical_thresholds': [],
            'prevention_strategies': [],
            'early_warning_indicators': [],
            'timeline_to_global_war': None
        }
        
        base_risk = scenario_assessment.get('overall_risk', {}).get('score', 50)
        
        # Factor 1: Superpower involvement
        superpower_involvement = self._assess_superpower_involvement(involved_countries)
        
        # Factor 2: Nuclear escalation risk
        nuclear_risk = self._assess_nuclear_escalation_risk(scenario_assessment, involved_countries)
        
        # Factor 3: Alliance cascade potential
        alliance_risk = self._assess_alliance_cascade_risk(involved_countries)
        
        # Factor 4: Multi-theater conflict risk
        multi_theater_risk = self._assess_multi_theater_risk(conflict_theaters or ['Single'])
        
        # Factor 5: Economic system disruption
        economic_risk = self._assess_economic_disruption_risk(involved_countries)
        
        # Calculate composite World War risk
        ww_risk_factors = {
            'base_regional_risk': base_risk * 0.2,
            'superpower_involvement': superpower_involvement * 0.25,
            'nuclear_escalation': nuclear_risk * 0.25,
            'alliance_cascade': alliance_risk * 0.15,
            'multi_theater': multi_theater_risk * 0.1,
            'economic_disruption': economic_risk * 0.05
        }
        
        ww_risk_score = sum(ww_risk_factors.values())
        
        # Apply escalation multipliers
        multiplier = 1.0
        escalation_factors = []
        
        if nuclear_risk > 80:
            multiplier *= self.ww_multipliers['nuclear_threshold_crossed']
            escalation_factors.append('Nuclear threshold crossed')
        
        if len([c for c in involved_countries if c in self.superpowers]) >= 2:
            multiplier *= self.ww_multipliers['multiple_nuclear_powers']
            escalation_factors.append('Multiple superpowers involved')
        
        if alliance_risk > 70:
            multiplier *= self.ww_multipliers['alliance_cascade']
            escalation_factors.append('Alliance cascade activated')
        
        # Apply multiplier and cap at 100
        ww_risk_score = min(100, ww_risk_score * multiplier)
        
        ww_assessment['world_war_risk_score'] = ww_risk_score
        ww_assessment['escalation_factors'] = escalation_factors
        ww_assessment['risk_factor_breakdown'] = ww_risk_factors
        
        # Determine probability category
        if ww_risk_score >= 90:
            ww_assessment['world_war_probability'] = 'Extreme (>70%)'
            ww_assessment['timeline_to_global_war'] = '1-4 weeks'
        elif ww_risk_score >= 80:
            ww_assessment['world_war_probability'] = 'High (40-70%)'
            ww_assessment['timeline_to_global_war'] = '1-6 months'
        elif ww_risk_score >= 70:
            ww_assessment['world_war_probability'] = 'Moderate (20-40%)'
            ww_assessment['timeline_to_global_war'] = '6-18 months'
        elif ww_risk_score >= 60:
            ww_assessment['world_war_probability'] = 'Low-Moderate (10-20%)'
            ww_assessment['timeline_to_global_war'] = '1-3 years'
        else:
            ww_assessment['world_war_probability'] = 'Low (<10%)'
            ww_assessment['timeline_to_global_war'] = '>3 years'
        
        # Identify escalation pathways
        ww_assessment['escalation_pathways'] = self._identify_escalation_pathways(
            involved_countries, ww_risk_score
        )
        
        # Identify critical thresholds
        ww_assessment['critical_thresholds'] = self._identify_critical_thresholds(
            involved_countries, ww_risk_score
        )
        
        # Generate prevention strategies
        ww_assessment['prevention_strategies'] = self._generate_prevention_strategies(
            involved_countries, ww_risk_score
        )
        
        # Early warning indicators
        ww_assessment['early_warning_indicators'] = self._generate_early_warning_indicators(
            ww_risk_score
        )
        
        return ww_assessment
    
    def _assess_superpower_involvement(self, countries: List[str]) -> float:
        """Assess risk from superpower involvement"""
        involved_superpowers = [c for c in countries if c in self.superpowers]
        
        if len(involved_superpowers) == 0:
            return 20  # Regional conflict only
        elif len(involved_superpowers) == 1:
            return 50  # One superpower involved
        elif len(involved_superpowers) == 2:
            return 85  # Two superpowers - high escalation risk
        else:
            return 95  # All superpowers involved - extreme risk
    
    def _assess_nuclear_escalation_risk(self, assessment: Dict, countries: List[str]) -> float:
        """Assess nuclear escalation risk"""
        # Check if nuclear powers are involved
        nuclear_powers = ['USA', 'RUS', 'CHN', 'GBR', 'FRA', 'IND', 'PAK', 'ISR', 'PRK']
        involved_nuclear = [c for c in countries if c in nuclear_powers]
        
        if not involved_nuclear:
            return 10  # No nuclear powers
        
        base_nuclear_risk = len(involved_nuclear) * 15  # 15 points per nuclear power
        
        # Check escalation analysis from main assessment
        escalation_data = assessment.get('escalation_analysis', {})
        escalation_score = escalation_data.get('escalation_score', 50)
        
        # Combine factors
        nuclear_risk = (base_nuclear_risk + escalation_score) / 2
        
        # Special cases
        if 'USA' in involved_nuclear and 'RUS' in involved_nuclear:
            nuclear_risk += 20  # US-Russia confrontation
        if 'USA' in involved_nuclear and 'CHN' in involved_nuclear:
            nuclear_risk += 15  # US-China confrontation
        if 'IND' in involved_nuclear and 'PAK' in involved_nuclear:
            nuclear_risk += 10  # India-Pakistan tensions
        
        return min(100, nuclear_risk)
    
    def _assess_alliance_cascade_risk(self, countries: List[str]) -> float:
        """Assess risk of alliance cascade triggering global war"""
        cascade_risk = 0
        
        # Check for alliance involvement
        for alliance_name, members in self.alliance_systems.items():
            involved_members = [c for c in countries if c in members]
            
            if len(involved_members) >= 2:
                # Internal alliance conflict
                cascade_risk += 30
            elif len(involved_members) == 1:
                # Alliance member involved - could trigger Article 5
                if alliance_name == 'NATO':
                    cascade_risk += 25  # NATO Article 5 most dangerous
                else:
                    cascade_risk += 15
        
        # Check for cross-alliance conflicts
        nato_involved = any(c in self.alliance_systems['NATO'] for c in countries)
        csto_involved = any(c in self.alliance_systems['CSTO'] for c in countries)
        
        if nato_involved and csto_involved:
            cascade_risk += 40  # NATO vs CSTO = high escalation
        
        return min(100, cascade_risk)
    
    def _assess_multi_theater_risk(self, theaters: List[str]) -> float:
        """Assess risk from multi-theater conflicts"""
        if len(theaters) == 1:
            return 20  # Single theater
        elif len(theaters) == 2:
            return 50  # Two theaters - stretches resources
        elif len(theaters) == 3:
            return 75  # Three theaters - major strain
        else:
            return 90  # Multiple theaters - extreme overstretch
    
    def _assess_economic_disruption_risk(self, countries: List[str]) -> float:
        """Assess risk from economic system disruption"""
        # Major economic powers
        economic_powers = ['USA', 'CHN', 'DEU', 'JPN', 'GBR', 'FRA', 'IND']
        involved_economic = [c for c in countries if c in economic_powers]
        
        economic_risk = len(involved_economic) * 12  # 12 points per economic power
        
        # Special economic chokepoints
        if 'IRN' in countries:
            economic_risk += 15  # Strait of Hormuz
        if 'EGY' in countries:
            economic_risk += 10  # Suez Canal
        if 'TUR' in countries:
            economic_risk += 8   # Bosphorus Strait
        
        return min(100, economic_risk)
    
    def _identify_escalation_pathways(self, countries: List[str], risk_score: float) -> List[Dict]:
        """Identify specific pathways to World War III"""
        pathways = []
        
        # Nuclear escalation pathway
        nuclear_powers = [c for c in countries if c in ['USA', 'RUS', 'CHN', 'GBR', 'FRA', 'IND', 'PAK', 'ISR', 'PRK']]
        if nuclear_powers:
            pathways.append({
                'pathway': 'Nuclear Escalation',
                'description': 'Tactical nuclear use leads to strategic exchange',
                'probability': 'High' if risk_score > 80 else 'Moderate',
                'timeline': '1-7 days',
                'trigger': 'First nuclear weapon use in conflict'
            })
        
        # Alliance cascade pathway
        if any(c in self.alliance_systems['NATO'] for c in countries):
            pathways.append({
                'pathway': 'NATO Article 5 Cascade',
                'description': 'Attack on NATO member triggers collective defense',
                'probability': 'High' if risk_score > 75 else 'Moderate',
                'timeline': '1-4 weeks',
                'trigger': 'Direct attack on NATO territory'
            })
        
        # Superpower confrontation pathway
        superpowers_involved = [c for c in countries if c in self.superpowers]
        if len(superpowers_involved) >= 2:
            pathways.append({
                'pathway': 'Superpower Direct Confrontation',
                'description': 'Military clash between major powers',
                'probability': 'Very High' if risk_score > 85 else 'High',
                'timeline': '2-8 weeks',
                'trigger': 'Direct military engagement between superpowers'
            })
        
        # Economic warfare pathway
        if 'USA' in countries and 'CHN' in countries:
            pathways.append({
                'pathway': 'Economic Warfare Escalation',
                'description': 'Trade war escalates to military conflict',
                'probability': 'Moderate' if risk_score > 70 else 'Low',
                'timeline': '6-18 months',
                'trigger': 'Complete economic decoupling and sanctions'
            })
        
        return pathways
    
    def _identify_critical_thresholds(self, countries: List[str], risk_score: float) -> List[Dict]:
        """Identify critical thresholds that would trigger World War III"""
        thresholds = []
        
        # Nuclear threshold
        if any(c in ['USA', 'RUS', 'CHN', 'GBR', 'FRA', 'IND', 'PAK', 'ISR', 'PRK'] for c in countries):
            thresholds.append({
                'threshold': 'Nuclear Weapon Use',
                'description': 'Any nuclear weapon detonation in anger',
                'risk_increase': '+30-50 points',
                'probability_ww3': '>90%'
            })
        
        # Alliance activation threshold
        if any(c in self.alliance_systems['NATO'] for c in countries):
            thresholds.append({
                'threshold': 'NATO Article 5 Invocation',
                'description': 'Collective defense clause activated',
                'risk_increase': '+25-40 points',
                'probability_ww3': '70-90%'
            })
        
        # Capital city attack threshold
        thresholds.append({
            'threshold': 'Capital City Attack',
            'description': 'Direct attack on major power capital',
            'risk_increase': '+20-35 points',
            'probability_ww3': '60-80%'
        })
        
        # Critical infrastructure threshold
        thresholds.append({
            'threshold': 'Global Infrastructure Collapse',
            'description': 'Internet, GPS, or financial system disruption',
            'risk_increase': '+15-25 points',
            'probability_ww3': '40-60%'
        })
        
        return thresholds
    
    def _generate_prevention_strategies(self, countries: List[str], risk_score: float) -> List[str]:
        """Generate strategies to prevent World War III escalation"""
        strategies = []
        
        if risk_score > 80:
            strategies.extend([
                "URGENT: Establish direct leader-to-leader communication channels",
                "Deploy immediate international mediation efforts",
                "Activate all available de-escalation mechanisms",
                "Implement emergency economic stabilization measures"
            ])
        
        if any(c in ['USA', 'RUS', 'CHN'] for c in countries):
            strategies.extend([
                "Maintain nuclear hotlines and communication protocols",
                "Avoid military exercises near conflict zones",
                "Establish clear rules of engagement to prevent accidents"
            ])
        
        if any(c in self.alliance_systems['NATO'] for c in countries):
            strategies.extend([
                "Clarify Article 5 thresholds and responses",
                "Coordinate alliance response to avoid escalation",
                "Maintain unity while avoiding provocative actions"
            ])
        
        strategies.extend([
            "Strengthen international institutions and mediation capacity",
            "Maintain economic interdependencies where possible",
            "Invest in early warning systems and crisis management",
            "Prepare humanitarian response capabilities",
            "Establish cyber warfare norms and agreements"
        ])
        
        return strategies
    
    def _generate_early_warning_indicators(self, risk_score: float) -> List[Dict]:
        """Generate early warning indicators for World War III"""
        indicators = []
        
        # Military indicators
        indicators.extend([
            {
                'category': 'Military',
                'indicator': 'Nuclear forces placed on highest alert',
                'timeframe': 'Hours to days',
                'significance': 'Extreme'
            },
            {
                'category': 'Military', 
                'indicator': 'Mass military mobilization and conscription',
                'timeframe': 'Days to weeks',
                'significance': 'High'
            },
            {
                'category': 'Military',
                'indicator': 'Alliance collective defense activation',
                'timeframe': 'Days to weeks', 
                'significance': 'Critical'
            }
        ])
        
        # Economic indicators
        indicators.extend([
            {
                'category': 'Economic',
                'indicator': 'Global financial market collapse',
                'timeframe': 'Hours to days',
                'significance': 'High'
            },
            {
                'category': 'Economic',
                'indicator': 'Critical supply chain breakdown',
                'timeframe': 'Days to weeks',
                'significance': 'High'
            }
        ])
        
        # Diplomatic indicators
        indicators.extend([
            {
                'category': 'Diplomatic',
                'indicator': 'UN Security Council complete paralysis',
                'timeframe': 'Days to weeks',
                'significance': 'High'
            },
            {
                'category': 'Diplomatic',
                'indicator': 'Mass embassy evacuations',
                'timeframe': 'Days to weeks',
                'significance': 'High'
            }
        ])
        
        # Information warfare indicators
        indicators.extend([
            {
                'category': 'Information',
                'indicator': 'Global internet infrastructure attacks',
                'timeframe': 'Hours',
                'significance': 'Extreme'
            },
            {
                'category': 'Information',
                'indicator': 'State media preparing for total war',
                'timeframe': 'Weeks',
                'significance': 'High'
            }
        ])
        
        return indicators


# Example usage and testing
if __name__ == "__main__":
    # Initialize World War risk analyzer
    ww_analyzer = WorldWarRiskAnalyzer()
    
    # Example scenario: Multi-front global crisis
    sample_assessment = {
        'overall_risk': {'score': 85, 'level': 'Critical'},
        'escalation_analysis': {'escalation_score': 90}
    }
    
    involved_countries = ['USA', 'CHN', 'RUS', 'IRN', 'ISR', 'UKR']
    conflict_theaters = ['Pacific', 'Europe', 'Middle East']
    
    print("\n=== WORLD WAR III RISK ASSESSMENT ===")
    
    ww_risk = ww_analyzer.assess_world_war_risk(
        sample_assessment, 
        involved_countries, 
        conflict_theaters
    )
    
    print(f"World War Risk Score: {ww_risk['world_war_risk_score']:.1f}/100")
    print(f"World War Probability: {ww_risk['world_war_probability']}")
    print(f"Timeline to Global War: {ww_risk['timeline_to_global_war']}")
    
    print(f"\nEscalation Factors:")
    for factor in ww_risk['escalation_factors']:
        print(f"  • {factor}")
    
    print(f"\nEscalation Pathways:")
    for pathway in ww_risk['escalation_pathways']:
        print(f"  🔥 {pathway['pathway']}: {pathway['probability']} probability")
        print(f"     Timeline: {pathway['timeline']}")
        print(f"     Trigger: {pathway['trigger']}")
    
    print(f"\nCritical Thresholds:")
    for threshold in ww_risk['critical_thresholds']:
        print(f"  ⚠️  {threshold['threshold']}: {threshold['probability_ww3']} chance of WW3")
    
    print(f"\nPrevention Strategies:")
    for strategy in ww_risk['prevention_strategies'][:5]:
        print(f"  ✅ {strategy}")
    
    print(f"\nEarly Warning Indicators:")
    for indicator in ww_risk['early_warning_indicators'][:5]:
        print(f"  🚨 {indicator['indicator']} ({indicator['significance']} significance)")
        print(f"     Timeframe: {indicator['timeframe']}")

