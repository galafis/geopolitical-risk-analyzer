"""
Network Analyzer Module
Implements Pillar 3: Network analysis of alliances and trade relationships

Author: Gabriel Demetrios Lafis
"""

import pandas as pd
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, List, Tuple, Optional
import logging
from datetime import datetime

class NetworkAnalyzer:
    """
    Analyzes geopolitical networks including military alliances and trade relationships
    to assess structural stability and identify vulnerabilities.
    """
    
    def __init__(self):
        """Initialize the Network Analyzer"""
        self.alliance_graph = nx.Graph()
        self.trade_graph = nx.Graph()
        self.alliance_data = None
        self.trade_data = None
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        
        # Network metrics cache
        self._metrics_cache = {}
        self._cache_timestamp = None
    
    def load_alliance_data(self, data_source, data_type='csv'):
        """
        Load military alliance data
        
        Args:
            data_source: Path to CSV file or DataFrame
            data_type (str): 'csv' or 'dataframe'
        """
        try:
            if data_type == 'csv':
                self.alliance_data = pd.read_csv(data_source)
            elif data_type == 'dataframe':
                self.alliance_data = data_source.copy()
            
            self.logger.info(f"Loaded alliance data: {len(self.alliance_data)} records")
            self._build_alliance_network()
            
        except Exception as e:
            self.logger.error(f"Failed to load alliance data: {e}")
    
    def load_trade_data(self, data_source, data_type='csv'):
        """
        Load bilateral trade data
        
        Args:
            data_source: Path to CSV file or DataFrame  
            data_type (str): 'csv' or 'dataframe'
        """
        try:
            if data_type == 'csv':
                self.trade_data = pd.read_csv(data_source)
            elif data_type == 'dataframe':
                self.trade_data = data_source.copy()
            
            self.logger.info(f"Loaded trade data: {len(self.trade_data)} records")
            self._build_trade_network()
            
        except Exception as e:
            self.logger.error(f"Failed to load trade data: {e}")
    
    def _build_alliance_network(self):
        """Build the military alliance network graph"""
        if self.alliance_data is None:
            return
        
        self.alliance_graph.clear()
        
        # Expected columns: country1_iso, country2_iso, alliance_type, start_year, end_year
        for _, row in self.alliance_data.iterrows():
            country1 = row.get('country1_iso', row.get('country1'))
            country2 = row.get('country2_iso', row.get('country2'))
            alliance_type = row.get('alliance_type', 'defense')
            
            if pd.notna(country1) and pd.notna(country2):
                self.alliance_graph.add_edge(
                    country1, 
                    country2,
                    alliance_type=alliance_type,
                    weight=1.0  # Can be adjusted based on alliance strength
                )
        
        self.logger.info(f"Built alliance network: {self.alliance_graph.number_of_nodes()} nodes, {self.alliance_graph.number_of_edges()} edges")
    
    def _build_trade_network(self):
        """Build the trade network graph"""
        if self.trade_data is None:
            return
        
        self.trade_graph.clear()
        
        # Expected columns: reporter_iso, partner_iso, trade_value_usd, year
        for _, row in self.trade_data.iterrows():
            reporter = row.get('reporter_iso', row.get('reporter'))
            partner = row.get('partner_iso', row.get('partner'))
            trade_value = row.get('trade_value_usd', row.get('trade_value', 0))
            
            if pd.notna(reporter) and pd.notna(partner) and reporter != partner:
                # Normalize trade value (log scale to handle large differences)
                normalized_weight = np.log1p(abs(trade_value)) if trade_value > 0 else 0
                
                self.trade_graph.add_edge(
                    reporter,
                    partner, 
                    weight=normalized_weight,
                    trade_value=trade_value
                )
        
        self.logger.info(f"Built trade network: {self.trade_graph.number_of_nodes()} nodes, {self.trade_graph.number_of_edges()} edges")
    
    def calculate_network_metrics(self, country_iso: str) -> Dict:
        """
        Calculate comprehensive network metrics for a specific country
        
        Args:
            country_iso (str): ISO country code
            
        Returns:
            Dict: Network metrics
        """
        metrics = {
            'country': country_iso,
            'timestamp': datetime.now().isoformat()
        }
        
        # Alliance network metrics
        if self.alliance_graph.has_node(country_iso):
            metrics.update({
                'alliance_degree': self.alliance_graph.degree[country_iso],
                'alliance_clustering': nx.clustering(self.alliance_graph, country_iso),
                'alliance_betweenness': nx.betweenness_centrality(self.alliance_graph).get(country_iso, 0),
                'alliance_closeness': nx.closeness_centrality(self.alliance_graph).get(country_iso, 0),
                'alliance_eigenvector': nx.eigenvector_centrality(self.alliance_graph, max_iter=1000).get(country_iso, 0)
            })
        else:
            metrics.update({
                'alliance_degree': 0,
                'alliance_clustering': 0,
                'alliance_betweenness': 0,
                'alliance_closeness': 0,
                'alliance_eigenvector': 0
            })
        
        # Trade network metrics
        if self.trade_graph.has_node(country_iso):
            metrics.update({
                'trade_degree': self.trade_graph.degree[country_iso],
                'trade_strength': self.trade_graph.degree(country_iso, weight='weight'),
                'trade_clustering': nx.clustering(self.trade_graph, country_iso, weight='weight'),
                'trade_betweenness': nx.betweenness_centrality(self.trade_graph, weight='weight').get(country_iso, 0),
                'trade_closeness': nx.closeness_centrality(self.trade_graph, distance='weight').get(country_iso, 0)
            })
        else:
            metrics.update({
                'trade_degree': 0,
                'trade_strength': 0,
                'trade_clustering': 0,
                'trade_betweenness': 0,
                'trade_closeness': 0
            })
        
        return metrics
    
    def calculate_network_stability(self) -> Dict:
        """
        Calculate overall network stability metrics
        
        Returns:
            Dict: Stability metrics
        """
        stability_metrics = {
            'timestamp': datetime.now().isoformat()
        }
        
        # Alliance network stability
        if self.alliance_graph.number_of_nodes() > 0:
            alliance_density = nx.density(self.alliance_graph)
            alliance_components = nx.number_connected_components(self.alliance_graph)
            alliance_avg_clustering = nx.average_clustering(self.alliance_graph)
            
            stability_metrics.update({
                'alliance_density': alliance_density,
                'alliance_components': alliance_components,
                'alliance_avg_clustering': alliance_avg_clustering,
                'alliance_fragmentation': alliance_components / max(1, self.alliance_graph.number_of_nodes())
            })
        
        # Trade network stability  
        if self.trade_graph.number_of_nodes() > 0:
            trade_density = nx.density(self.trade_graph)
            trade_components = nx.number_connected_components(self.trade_graph)
            trade_avg_clustering = nx.average_clustering(self.trade_graph, weight='weight')
            
            stability_metrics.update({
                'trade_density': trade_density,
                'trade_components': trade_components,
                'trade_avg_clustering': trade_avg_clustering,
                'trade_fragmentation': trade_components / max(1, self.trade_graph.number_of_nodes())
            })
        
        return stability_metrics
    
    def simulate_conflict_impact(self, affected_countries: List[str]) -> Dict:
        """
        Simulate the impact of removing countries from networks (conflict scenario)
        
        Args:
            affected_countries (List[str]): Countries involved in conflict
            
        Returns:
            Dict: Impact analysis
        """
        impact_analysis = {
            'affected_countries': affected_countries,
            'timestamp': datetime.now().isoformat()
        }
        
        # Original network metrics
        original_alliance_metrics = self.calculate_network_stability()
        
        # Create copies of networks
        alliance_copy = self.alliance_graph.copy()
        trade_copy = self.trade_graph.copy()
        
        # Remove affected countries
        for country in affected_countries:
            if alliance_copy.has_node(country):
                alliance_copy.remove_node(country)
            if trade_copy.has_node(country):
                trade_copy.remove_node(country)
        
        # Calculate post-conflict metrics
        post_conflict_alliance_density = nx.density(alliance_copy) if alliance_copy.number_of_nodes() > 0 else 0
        post_conflict_trade_density = nx.density(trade_copy) if trade_copy.number_of_nodes() > 0 else 0
        
        # Calculate impact
        alliance_density_change = post_conflict_alliance_density - original_alliance_metrics.get('alliance_density', 0)
        trade_density_change = post_conflict_trade_density - original_alliance_metrics.get('trade_density', 0)
        
        impact_analysis.update({
            'alliance_density_change': alliance_density_change,
            'trade_density_change': trade_density_change,
            'alliance_nodes_lost': len([c for c in affected_countries if self.alliance_graph.has_node(c)]),
            'trade_nodes_lost': len([c for c in affected_countries if self.trade_graph.has_node(c)]),
            'systemic_risk_score': abs(alliance_density_change) + abs(trade_density_change)
        })
        
        return impact_analysis
    
    def identify_critical_nodes(self, top_n: int = 10) -> Dict:
        """
        Identify the most critical nodes in both networks
        
        Args:
            top_n (int): Number of top nodes to return
            
        Returns:
            Dict: Critical nodes analysis
        """
        critical_analysis = {
            'timestamp': datetime.now().isoformat(),
            'top_n': top_n
        }
        
        # Alliance network critical nodes
        if self.alliance_graph.number_of_nodes() > 0:
            alliance_betweenness = nx.betweenness_centrality(self.alliance_graph)
            alliance_critical = sorted(alliance_betweenness.items(), key=lambda x: x[1], reverse=True)[:top_n]
            critical_analysis['alliance_critical_nodes'] = alliance_critical
        
        # Trade network critical nodes
        if self.trade_graph.number_of_nodes() > 0:
            trade_betweenness = nx.betweenness_centrality(self.trade_graph, weight='weight')
            trade_critical = sorted(trade_betweenness.items(), key=lambda x: x[1], reverse=True)[:top_n]
            critical_analysis['trade_critical_nodes'] = trade_critical
        
        return critical_analysis
    
    def calculate_country_vulnerability(self, country_iso: str) -> Dict:
        """
        Calculate vulnerability score for a specific country
        
        Args:
            country_iso (str): ISO country code
            
        Returns:
            Dict: Vulnerability analysis
        """
        metrics = self.calculate_network_metrics(country_iso)
        
        # Vulnerability factors (higher values = lower vulnerability)
        alliance_strength = metrics.get('alliance_degree', 0) * metrics.get('alliance_clustering', 0)
        trade_diversification = metrics.get('trade_degree', 0) / max(1, metrics.get('trade_strength', 1))
        
        # Network position strength
        centrality_score = (
            metrics.get('alliance_betweenness', 0) + 
            metrics.get('trade_betweenness', 0) +
            metrics.get('alliance_eigenvector', 0)
        ) / 3
        
        # Calculate vulnerability (inverse of strength)
        vulnerability_score = 1 / (1 + alliance_strength + trade_diversification + centrality_score)
        
        return {
            'country': country_iso,
            'vulnerability_score': vulnerability_score,
            'alliance_strength': alliance_strength,
            'trade_diversification': trade_diversification,
            'centrality_score': centrality_score,
            'vulnerability_level': self._get_vulnerability_level(vulnerability_score),
            'timestamp': datetime.now().isoformat()
        }
    
    def _get_vulnerability_level(self, score: float) -> str:
        """Convert vulnerability score to descriptive level"""
        if score >= 0.8:
            return "Critical"
        elif score >= 0.6:
            return "High"
        elif score >= 0.4:
            return "Medium"
        elif score >= 0.2:
            return "Low"
        else:
            return "Very Low"
    
    def export_network_analysis(self, countries: List[str], filepath: str):
        """
        Export comprehensive network analysis for specified countries
        
        Args:
            countries (List[str]): Countries to analyze
            filepath (str): Output file path
        """
        try:
            analysis_results = []
            
            for country in countries:
                metrics = self.calculate_network_metrics(country)
                vulnerability = self.calculate_country_vulnerability(country)
                
                combined_result = {**metrics, **vulnerability}
                analysis_results.append(combined_result)
            
            # Create DataFrame and save
            df = pd.DataFrame(analysis_results)
            df.to_csv(filepath, index=False)
            
            self.logger.info(f"Network analysis exported to {filepath}")
            
        except Exception as e:
            self.logger.error(f"Failed to export network analysis: {e}")
    
    def visualize_networks(self, save_path: Optional[str] = None):
        """
        Create visualizations of the networks
        
        Args:
            save_path (Optional[str]): Path to save the visualization
        """
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 8))
        
        # Alliance network visualization
        if self.alliance_graph.number_of_nodes() > 0:
            pos1 = nx.spring_layout(self.alliance_graph, k=1, iterations=50)
            nx.draw(self.alliance_graph, pos1, ax=ax1, 
                   node_color='lightblue', node_size=300, 
                   with_labels=True, font_size=8, font_weight='bold')
            ax1.set_title("Military Alliance Network", fontsize=14, fontweight='bold')
        
        # Trade network visualization (sample of nodes if too large)
        if self.trade_graph.number_of_nodes() > 0:
            if self.trade_graph.number_of_nodes() > 50:
                # Sample top nodes by degree for visualization
                degrees = dict(self.trade_graph.degree())
                top_nodes = sorted(degrees.items(), key=lambda x: x[1], reverse=True)[:50]
                trade_subgraph = self.trade_graph.subgraph([node for node, _ in top_nodes])
            else:
                trade_subgraph = self.trade_graph
            
            pos2 = nx.spring_layout(trade_subgraph, k=1, iterations=50)
            edges = trade_subgraph.edges()
            weights = [trade_subgraph[u][v]['weight'] for u, v in edges]
            
            nx.draw(trade_subgraph, pos2, ax=ax2,
                   node_color='lightcoral', node_size=300,
                   edge_color='gray', width=[w/max(weights)*3 for w in weights],
                   with_labels=True, font_size=8, font_weight='bold')
            ax2.set_title("Trade Network (Top 50 nodes)", fontsize=14, fontweight='bold')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            self.logger.info(f"Network visualization saved to {save_path}")
        
        plt.show()


# Example usage and testing
if __name__ == "__main__":
    # Initialize analyzer
    analyzer = NetworkAnalyzer()
    
    # Create sample alliance data
    sample_alliances = pd.DataFrame({
        'country1_iso': ['USA', 'USA', 'USA', 'GBR', 'FRA', 'DEU', 'CHN', 'RUS'],
        'country2_iso': ['GBR', 'FRA', 'DEU', 'FRA', 'DEU', 'POL', 'RUS', 'IRN'],
        'alliance_type': ['defense', 'defense', 'defense', 'defense', 'defense', 'defense', 'cooperation', 'cooperation']
    })
    
    # Create sample trade data
    sample_trade = pd.DataFrame({
        'reporter_iso': ['USA', 'USA', 'CHN', 'CHN', 'DEU', 'DEU', 'GBR', 'FRA'],
        'partner_iso': ['CHN', 'DEU', 'USA', 'DEU', 'USA', 'CHN', 'USA', 'DEU'],
        'trade_value_usd': [500000000000, 200000000000, 450000000000, 180000000000, 190000000000, 170000000000, 150000000000, 120000000000]
    })
    
    # Load data
    analyzer.load_alliance_data(sample_alliances, 'dataframe')
    analyzer.load_trade_data(sample_trade, 'dataframe')
    
    # Test countries
    test_countries = ['USA', 'CHN', 'DEU', 'RUS']
    
    print("\n=== NETWORK ANALYSIS RESULTS ===")
    
    # Calculate metrics for each country
    for country in test_countries:
        metrics = analyzer.calculate_network_metrics(country)
        vulnerability = analyzer.calculate_country_vulnerability(country)
        
        print(f"\n{country}:")
        print(f"  Alliance Degree: {metrics['alliance_degree']}")
        print(f"  Trade Degree: {metrics['trade_degree']}")
        print(f"  Trade Strength: {metrics['trade_strength']:.2f}")
        print(f"  Vulnerability: {vulnerability['vulnerability_level']} ({vulnerability['vulnerability_score']:.3f})")
    
    # Network stability
    stability = analyzer.calculate_network_stability()
    print(f"\n=== NETWORK STABILITY ===")
    print(f"Alliance Density: {stability.get('alliance_density', 0):.3f}")
    print(f"Trade Density: {stability.get('trade_density', 0):.3f}")
    
    # Conflict simulation
    conflict_impact = analyzer.simulate_conflict_impact(['RUS', 'CHN'])
    print(f"\n=== CONFLICT IMPACT SIMULATION (RUS, CHN) ===")
    print(f"Systemic Risk Score: {conflict_impact['systemic_risk_score']:.3f}")
    print(f"Alliance Density Change: {conflict_impact['alliance_density_change']:.3f}")
    print(f"Trade Density Change: {conflict_impact['trade_density_change']:.3f}")
    
    # Export results
    analyzer.export_network_analysis(test_countries, "/home/ubuntu/geopolitical-risk-analyzer/examples/network_analysis_example.csv")

