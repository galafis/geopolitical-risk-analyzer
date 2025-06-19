"""
Basic Unit Tests for Geopolitical Risk Analyzer
Tests core functionality and World War risk assessment

Author: Gabriel Demetrios Lafis
"""

import unittest
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

import pandas as pd
import numpy as np
from main import GeopoliticalRiskAnalyzer
from analysis.world_war_analyzer import WorldWarRiskAnalyzer
from models.military_analyzer import MilitaryPowerAnalyzer

class TestGeopoliticalRiskAnalyzer(unittest.TestCase):
    """Test cases for the main risk analyzer"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.analyzer = GeopoliticalRiskAnalyzer()
        self.test_countries = ['USA', 'CHN', 'RUS']
        self.test_narratives = [
            "Military tensions rising in the region",
            "Diplomatic talks have been suspended",
            "International community expresses concern"
        ]
    
    def test_analyzer_initialization(self):
        """Test that analyzer initializes correctly"""
        self.assertIsNotNone(self.analyzer)
        self.assertIsNotNone(self.analyzer.risk_calculator)
        self.assertIsNotNone(self.analyzer.military_analyzer)
    
    def test_scenario_analysis(self):
        """Test basic scenario analysis functionality"""
        result = self.analyzer.analyze_scenario(
            scenario_name="Test Scenario",
            countries=self.test_countries,
            narrative_texts=self.test_narratives
        )
        
        # Check result structure
        self.assertIn('risk_assessment', result)
        self.assertIn('overall_risk', result['risk_assessment'])
        self.assertIn('score', result['risk_assessment']['overall_risk'])
        self.assertIn('level', result['risk_assessment']['overall_risk'])
        
        # Check score is valid
        score = result['risk_assessment']['overall_risk']['score']
        self.assertGreaterEqual(score, 0)
        self.assertLessEqual(score, 100)
    
    def test_predefined_scenarios(self):
        """Test predefined scenario analysis"""
        results = self.analyzer.analyze_predefined_scenarios()
        
        self.assertIn('individual_scenarios', results)
        self.assertIn('comparative_analysis', results)
        
        # Check that scenarios were analyzed
        scenarios = results['individual_scenarios']
        self.assertGreater(len(scenarios), 0)
        
        # Check each scenario has required fields
        for scenario_id, scenario_result in scenarios.items():
            self.assertIn('risk_assessment', scenario_result)
            self.assertIn('countries_analyzed', scenario_result)

class TestWorldWarRiskAnalyzer(unittest.TestCase):
    """Test cases for World War risk assessment"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.ww_analyzer = WorldWarRiskAnalyzer()
        self.sample_assessment = {
            'overall_risk': {'score': 75, 'level': 'High'},
            'escalation_analysis': {'escalation_score': 80}
        }
        self.test_countries = ['USA', 'CHN', 'RUS']
    
    def test_ww_analyzer_initialization(self):
        """Test World War analyzer initialization"""
        self.assertIsNotNone(self.ww_analyzer)
        self.assertIn('USA', self.ww_analyzer.superpowers)
        self.assertIn('CHN', self.ww_analyzer.superpowers)
        self.assertIn('RUS', self.ww_analyzer.superpowers)
    
    def test_world_war_risk_assessment(self):
        """Test World War risk assessment"""
        ww_risk = self.ww_analyzer.assess_world_war_risk(
            self.sample_assessment,
            self.test_countries,
            ['Pacific', 'Europe']
        )
        
        # Check result structure
        self.assertIn('world_war_risk_score', ww_risk)
        self.assertIn('world_war_probability', ww_risk)
        self.assertIn('escalation_pathways', ww_risk)
        self.assertIn('critical_thresholds', ww_risk)
        
        # Check score is valid
        score = ww_risk['world_war_risk_score']
        self.assertGreaterEqual(score, 0)
        self.assertLessEqual(score, 100)
        
        # Check pathways exist
        self.assertGreater(len(ww_risk['escalation_pathways']), 0)
    
    def test_superpower_involvement_assessment(self):
        """Test superpower involvement scoring"""
        # No superpowers
        score1 = self.ww_analyzer._assess_superpower_involvement(['DEU', 'FRA'])
        
        # One superpower
        score2 = self.ww_analyzer._assess_superpower_involvement(['USA', 'DEU'])
        
        # Two superpowers
        score3 = self.ww_analyzer._assess_superpower_involvement(['USA', 'CHN'])
        
        # Scores should increase with more superpower involvement
        self.assertLess(score1, score2)
        self.assertLess(score2, score3)
    
    def test_nuclear_escalation_assessment(self):
        """Test nuclear escalation risk assessment"""
        # No nuclear powers
        score1 = self.ww_analyzer._assess_nuclear_escalation_risk(
            self.sample_assessment, ['DEU', 'JPN']
        )
        
        # Nuclear powers involved
        score2 = self.ww_analyzer._assess_nuclear_escalation_risk(
            self.sample_assessment, ['USA', 'RUS']
        )
        
        # Nuclear powers should have higher risk
        self.assertLess(score1, score2)
    
    def test_alliance_cascade_assessment(self):
        """Test alliance cascade risk assessment"""
        # NATO members
        nato_score = self.ww_analyzer._assess_alliance_cascade_risk(['USA', 'DEU', 'FRA'])
        
        # Non-alliance members
        non_alliance_score = self.ww_analyzer._assess_alliance_cascade_risk(['BRA', 'ARG'])
        
        # Alliance involvement should increase risk
        self.assertGreater(nato_score, non_alliance_score)

class TestMilitaryAnalyzer(unittest.TestCase):
    """Test cases for military capabilities analysis"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.military_analyzer = MilitaryPowerAnalyzer()
    
    def test_military_analyzer_initialization(self):
        """Test military analyzer initialization"""
        self.assertIsNotNone(self.military_analyzer)
        self.assertIn('USA', self.military_analyzer.nuclear_weapon_states)
    
    def test_military_power_calculation(self):
        """Test military power index calculation"""
        usa_power = self.military_analyzer.calculate_military_power_index('USA')
        small_country_power = self.military_analyzer.calculate_military_power_index('LUX')
        
        # USA should have higher military power than Luxembourg
        self.assertGreater(usa_power['military_power_index'], 
                          small_country_power['military_power_index'])
    
    def test_nuclear_capability_scoring(self):
        """Test nuclear capability assessment"""
        usa_nuclear = self.military_analyzer.calculate_nuclear_capability_score('USA')
        non_nuclear = self.military_analyzer.calculate_nuclear_capability_score('DEU')
        
        # Nuclear state should have higher score
        self.assertGreater(usa_nuclear, non_nuclear)
    
    def test_escalation_risk_calculation(self):
        """Test escalation risk calculation"""
        escalation_risk = self.military_analyzer.calculate_escalation_risk(['USA', 'CHN', 'RUS'])
        
        # Check result structure
        self.assertIn('escalation_score', escalation_risk)
        self.assertIn('escalation_risk_level', escalation_risk)
        self.assertIn('nuclear_countries', escalation_risk)
        
        # Check score is valid
        score = escalation_risk['escalation_score']
        self.assertGreaterEqual(score, 0)
        self.assertLessEqual(score, 100)
    
    def test_military_balance_analysis(self):
        """Test military balance comparison"""
        balance = self.military_analyzer.analyze_military_balance('USA', 'CHN')
        
        # Check result structure
        self.assertIn('country1_power', balance)
        self.assertIn('country2_power', balance)
        self.assertIn('military_balance', balance)
        self.assertIn('power_ratio', balance)

class TestDataIntegration(unittest.TestCase):
    """Test data integration and processing"""
    
    def test_sample_data_generation(self):
        """Test that sample data can be generated"""
        from data_ingestion.data_pipeline import DataIngestionPipeline
        
        pipeline = DataIngestionPipeline()
        
        # Test alliance data generation
        alliance_data = pipeline._generate_sample_alliance_data()
        self.assertIsInstance(alliance_data, pd.DataFrame)
        self.assertGreater(len(alliance_data), 0)
        
        # Test trade data generation
        trade_data = pipeline._generate_sample_trade_data()
        self.assertIsInstance(trade_data, pd.DataFrame)
        self.assertGreater(len(trade_data), 0)
    
    def test_country_mappings(self):
        """Test country code mappings"""
        from data_ingestion.data_pipeline import DataIngestionPipeline
        
        pipeline = DataIngestionPipeline()
        mappings = pipeline.country_mappings
        
        # Check key countries exist
        self.assertIn('USA', mappings)
        self.assertIn('CHN', mappings)
        self.assertIn('RUS', mappings)
        
        # Check mapping structure
        for country, mapping in mappings.items():
            self.assertIn('iso2', mapping)
            self.assertIn('name', mapping)
            self.assertIn('iso_num', mapping)

def run_tests():
    """Run all tests and display results"""
    print("🧪 RUNNING GEOPOLITICAL RISK ANALYZER TESTS")
    print("=" * 60)
    
    # Create test suite
    test_suite = unittest.TestSuite()
    
    # Add test cases
    test_suite.addTest(unittest.makeSuite(TestGeopoliticalRiskAnalyzer))
    test_suite.addTest(unittest.makeSuite(TestWorldWarRiskAnalyzer))
    test_suite.addTest(unittest.makeSuite(TestMilitaryAnalyzer))
    test_suite.addTest(unittest.makeSuite(TestDataIntegration))
    
    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    
    # Display summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print(f"Tests run: {result.testsRun}")
    print(f"Failures: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    
    if result.failures:
        print("\n❌ FAILURES:")
        for test, traceback in result.failures:
            print(f"  • {test}: {traceback}")
    
    if result.errors:
        print("\n🚨 ERRORS:")
        for test, traceback in result.errors:
            print(f"  • {test}: {traceback}")
    
    if result.wasSuccessful():
        print("\n✅ ALL TESTS PASSED!")
        print("🎯 Framework is ready for geopolitical risk analysis")
    else:
        print("\n⚠️ SOME TESTS FAILED")
        print("🔧 Please review and fix issues before deployment")
    
    return result.wasSuccessful()

if __name__ == "__main__":
    success = run_tests()
    exit(0 if success else 1)

