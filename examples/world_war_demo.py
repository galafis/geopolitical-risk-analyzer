#!/usr/bin/env python3
"""
World War Risk Assessment Demo
Demonstrates analysis of global escalation scenarios

Author: Gabriel Demetrios Lafis
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from main import GeopoliticalRiskAnalyzer
from analysis.world_war_analyzer import WorldWarRiskAnalyzer
import json
from datetime import datetime

def main():
    """Demonstrate World War III risk assessment capabilities"""
    
    print("🌍 WORLD WAR III RISK ASSESSMENT DEMONSTRATION")
    print("=" * 60)
    print("Author: Gabriel Demetrios Lafis")
    print("Purpose: Analyze global escalation scenarios")
    print()
    
    # Initialize analyzers
    analyzer = GeopoliticalRiskAnalyzer()
    ww_analyzer = WorldWarRiskAnalyzer()
    
    # Define critical scenarios
    scenarios = {
        "taiwan_crisis": {
            "name": "Taiwan Strait Crisis - World War Risk",
            "countries": ['CHN', 'USA', 'JPN', 'AUS'],
            "theaters": ['Pacific'],
            "narratives": [
                "Chinese forces begin amphibious assault on Taiwan",
                "US Pacific Fleet moves to intercept Chinese naval forces", 
                "Japan activates collective self-defense provisions",
                "Australia deploys naval assets under ANZUS treaty",
                "Global semiconductor supply chain faces complete collapse"
            ]
        },
        
        "multi_front_crisis": {
            "name": "Global Multi-Front Crisis",
            "countries": ['USA', 'CHN', 'RUS', 'IRN', 'ISR', 'UKR'],
            "theaters": ['Pacific', 'Europe', 'Middle East'],
            "narratives": [
                "China invades Taiwan while Russia escalates in Ukraine",
                "Iran closes Strait of Hormuz amid Israeli nuclear threats",
                "US faces strategic overstretch across multiple theaters",
                "NATO Article 5 triggered by Russian attack on Poland",
                "Nuclear weapons placed on highest alert worldwide"
            ]
        },
        
        "nuclear_escalation": {
            "name": "Nuclear Escalation Scenario",
            "countries": ['RUS', 'USA', 'UKR', 'CHN'],
            "theaters": ['Europe', 'Global'],
            "narratives": [
                "Russia detonates tactical nuclear weapon in Ukraine",
                "NATO considers nuclear response options",
                "China forced to choose sides in nuclear crisis",
                "Global nuclear alert status raised to maximum",
                "International order faces complete breakdown"
            ]
        }
    }
    
    results = {}
    
    # Analyze each scenario
    for scenario_id, scenario_config in scenarios.items():
        print(f"🔍 ANALYZING: {scenario_config['name']}")
        print("-" * 50)
        
        # Get base risk assessment
        base_assessment = analyzer.analyze_scenario(
            scenario_name=scenario_config['name'],
            countries=scenario_config['countries'],
            narrative_texts=scenario_config['narratives'],
            narrative_sources=['official'] * len(scenario_config['narratives'])
        )
        
        # Assess World War risk
        ww_risk = ww_analyzer.assess_world_war_risk(
            base_assessment['risk_assessment'],
            scenario_config['countries'],
            scenario_config['theaters']
        )
        
        # Store results
        results[scenario_id] = {
            'base_assessment': base_assessment,
            'world_war_risk': ww_risk
        }
        
        # Display key results
        print(f"📊 Base Risk Score: {base_assessment['risk_assessment']['overall_risk']['score']:.1f}/100")
        print(f"🌍 World War Risk: {ww_risk['world_war_risk_score']:.1f}/100")
        print(f"⚡ WW3 Probability: {ww_risk['world_war_probability']}")
        print(f"⏰ Timeline to Global War: {ww_risk['timeline_to_global_war']}")
        
        print(f"\n🔥 Escalation Pathways:")
        for pathway in ww_risk['escalation_pathways'][:3]:
            print(f"  • {pathway['pathway']}: {pathway['probability']} ({pathway['timeline']})")
        
        print(f"\n⚠️ Critical Thresholds:")
        for threshold in ww_risk['critical_thresholds'][:2]:
            print(f"  • {threshold['threshold']}: {threshold['probability_ww3']}")
        
        print(f"\n✅ Top Prevention Strategies:")
        for strategy in ww_risk['prevention_strategies'][:3]:
            print(f"  • {strategy}")
        
        print("\n" + "=" * 60 + "\n")
    
    # Comparative analysis
    print("📈 COMPARATIVE WORLD WAR RISK ANALYSIS")
    print("=" * 60)
    
    scenario_comparison = []
    for scenario_id, result in results.items():
        ww_risk = result['world_war_risk']
        scenario_comparison.append({
            'scenario': scenarios[scenario_id]['name'],
            'ww_risk_score': ww_risk['world_war_risk_score'],
            'probability': ww_risk['world_war_probability'],
            'timeline': ww_risk['timeline_to_global_war']
        })
    
    # Sort by risk score
    scenario_comparison.sort(key=lambda x: x['ww_risk_score'], reverse=True)
    
    print("Ranking by World War III Risk:")
    for i, scenario in enumerate(scenario_comparison, 1):
        print(f"{i}. {scenario['scenario']}")
        print(f"   Risk Score: {scenario['ww_risk_score']:.1f}/100")
        print(f"   Probability: {scenario['probability']}")
        print(f"   Timeline: {scenario['timeline']}")
        print()
    
    # Generate summary report
    print("📋 EXECUTIVE SUMMARY")
    print("=" * 60)
    
    highest_risk = scenario_comparison[0]
    average_risk = sum(s['ww_risk_score'] for s in scenario_comparison) / len(scenario_comparison)
    
    print(f"Highest Risk Scenario: {highest_risk['scenario']}")
    print(f"Maximum Risk Score: {highest_risk['ww_risk_score']:.1f}/100")
    print(f"Average Risk Score: {average_risk:.1f}/100")
    
    if highest_risk['ww_risk_score'] > 90:
        alert_level = "🔴 EXTREME ALERT"
    elif highest_risk['ww_risk_score'] > 80:
        alert_level = "🟠 HIGH ALERT"
    elif highest_risk['ww_risk_score'] > 70:
        alert_level = "🟡 MODERATE ALERT"
    else:
        alert_level = "🟢 LOW ALERT"
    
    print(f"Global Alert Level: {alert_level}")
    
    print(f"\n🎯 KEY FINDINGS:")
    print(f"• Multiple scenarios show significant World War III risk")
    print(f"• Nuclear escalation represents the highest immediate threat")
    print(f"• Multi-front conflicts could overwhelm global response capacity")
    print(f"• Alliance systems create both stability and escalation risks")
    print(f"• Economic interdependence provides both conflict prevention and vulnerability")
    
    print(f"\n⚠️ CRITICAL RECOMMENDATIONS:")
    print(f"• Maintain robust crisis communication channels")
    print(f"• Strengthen international mediation capabilities")
    print(f"• Invest in early warning and monitoring systems")
    print(f"• Develop rapid de-escalation protocols")
    print(f"• Prepare for multi-domain conflict scenarios")
    
    # Save detailed results
    output_file = f"../output/world_war_risk_assessment_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\n💾 Detailed results saved to: {output_file}")
    print("\n🔚 Analysis complete. Use results for conflict prevention and policy planning.")
    print("\n⚖️ DISCLAIMER: This analysis is for research and prevention purposes only.")
    print("   Do not use for military planning or escalatory actions.")

if __name__ == "__main__":
    main()

