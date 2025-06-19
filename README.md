# Geopolitical Risk Analyzer 🌍⚡

*A comprehensive framework for predicting and analyzing geopolitical risks using advanced data science and machine learning techniques*

**Author:** Gabriel Demetrios Lafis  
**License:** MIT  
**Version:** 1.0.0

---

## 🇺🇸 English | [🇧🇷 Português](#português)

### 📋 Table of Contents
- [Overview](#overview)
- [Current Geopolitical Scenarios](#current-geopolitical-scenarios)
- [The Three-Pillar Framework](#the-three-pillar-framework)
- [Military Capabilities Analysis](#military-capabilities-analysis)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Real-World Examples](#real-world-examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)

---

## 🎯 Overview

The **Geopolitical Risk Analyzer** is a sophisticated framework designed for data scientists, analysts, and policy researchers to predict and assess geopolitical risks using cutting-edge machine learning techniques. In an era where global conflicts can escalate rapidly and impact markets, supply chains, and international stability, this tool provides quantitative insights into complex geopolitical dynamics.

### 🔥 Why This Matters Now

We are living through one of the most volatile geopolitical periods since the Cold War. The ongoing conflicts in Ukraine, escalating tensions between Israel and Iran, the strategic competition between the US and China over Taiwan, and North Korea's nuclear provocations create a complex web of interconnected risks that traditional analysis struggles to capture.

This framework transforms the overwhelming noise of global events into clear, actionable signals by analyzing:
- **Historical conflict patterns** using probabilistic models
- **Real-time narrative analysis** of diplomatic rhetoric and media coverage  
- **Network effects** of alliances, trade relationships, and dependencies
- **Military capabilities** including nuclear arsenals and conventional forces

---

## 🌍 Current Geopolitical Scenarios

### 🔴 **Critical Active Conflicts**

#### **Israel-Iran Regional Confrontation**
*Risk Level: HIGH | Nuclear Implications: YES*

The escalating proxy conflict between Israel and Iran represents one of the most dangerous flashpoints in the Middle East. Our framework analyzes:

- **Military Balance**: Israel's advanced air force vs. Iran's missile capabilities and proxy networks
- **Nuclear Factor**: Iran's uranium enrichment program vs. Israel's undeclared nuclear arsenal
- **Alliance Networks**: US-Israel defense cooperation vs. Iran-Russia-China axis
- **Economic Impact**: Potential closure of Strait of Hormuz affecting global oil supplies

**Example Analysis:**
```python
# Analyze Israel-Iran escalation scenario
analyzer = GeopoliticalRiskAnalyzer()
result = analyzer.analyze_scenario(
    scenario_name="Israel-Iran Regional War",
    countries=['ISR', 'IRN'],
    narrative_texts=[
        "Israeli airstrikes target Iranian nuclear facilities",
        "Iran threatens to close Strait of Hormuz",
        "US deploys additional naval assets to Persian Gulf",
        "Hezbollah mobilizes forces on Lebanese border"
    ]
)
# Output: Risk Level: CRITICAL (85/100)
```

#### **Russia-Ukraine War Escalation**
*Risk Level: HIGH | Nuclear Implications: YES*

The ongoing war in Ukraine has fundamentally altered European security architecture. Key analysis points:

- **Military Dynamics**: NATO weapons supplies vs. Russian conventional forces
- **Nuclear Threats**: Putin's escalatory rhetoric and tactical nuclear weapons
- **Economic Warfare**: Energy dependencies and sanctions effectiveness
- **Alliance Cohesion**: NATO unity vs. war fatigue in Western democracies

**Example Analysis:**
```python
# Monitor Ukraine conflict escalation
result = analyzer.analyze_scenario(
    scenario_name="Ukraine War Escalation",
    countries=['RUS', 'UKR', 'USA'],
    narrative_texts=[
        "NATO approves long-range missile deliveries to Ukraine",
        "Russia conducts tactical nuclear weapons exercises",
        "Ukrainian forces advance in occupied territories",
        "China calls for immediate ceasefire negotiations"
    ]
)
# Output: Risk Level: HIGH (78/100)
```

#### **US-China Taiwan Strait Crisis**
*Risk Level: MODERATE-HIGH | Economic Impact: CATASTROPHIC*

The Taiwan question represents the most dangerous potential flashpoint between superpowers:

- **Military Balance**: US Pacific Fleet vs. Chinese Anti-Access/Area-Denial capabilities
- **Economic Stakes**: 90% of advanced semiconductors manufactured in Taiwan
- **Alliance Systems**: US-Japan-Australia vs. China-Russia partnership
- **Escalation Dynamics**: Risk of miscalculation during military encounters

**Example Analysis:**
```python
# Assess Taiwan Strait crisis
result = analyzer.analyze_scenario(
    scenario_name="Taiwan Strait Military Crisis",
    countries=['USA', 'CHN'],
    narrative_texts=[
        "Chinese military exercises surround Taiwan",
        "US Navy conducts freedom of navigation operations",
        "Taiwan raises defense readiness level",
        "Japan expresses concern over regional stability"
    ]
)
# Output: Risk Level: MODERATE-HIGH (72/100)
```

### 🟡 **Emerging Threats**

#### **North Korea Nuclear Escalation**
*Risk Level: MODERATE | Unpredictability: EXTREME*

Kim Jong-un's regime continues to develop nuclear capabilities while facing economic pressures:

- **Nuclear Arsenal**: Estimated 30+ warheads with improving delivery systems
- **Regional Impact**: South Korea, Japan, and US forces in range
- **China Factor**: Beijing's influence vs. strategic autonomy
- **Regime Stability**: Economic sanctions vs. nuclear deterrence

#### **Iran Nuclear Breakout Scenario**
*Risk Level: MODERATE-HIGH | Regional Impact: EXTREME*

Iran's nuclear program advancement creates multiple escalation pathways:

- **Technical Capability**: 60% uranium enrichment approaching weapons-grade
- **Regional Arms Race**: Saudi Arabia and Turkey nuclear ambitions
- **Israeli Red Lines**: Preemptive strike considerations
- **International Response**: JCPOA revival vs. maximum pressure

---

## 🏗️ The Three-Pillar Framework

### 🎯 **Pillar 1: Event Prediction (The "Radar")**
*Technology: Natural Gradient Boosting (NGBoost)*

Analyzes historical conflict data to predict future violence intensity and probability.

**Data Sources:**
- Armed Conflict Location & Event Data Project (ACLED)
- Uppsala Conflict Data Program (UCDP)
- GDELT Global Events Database

**Key Features:**
- Probabilistic predictions with uncertainty quantification
- Conflict trap analysis (past violence predicts future violence)
- Regional spillover effects modeling
- Economic and political stability indicators

### 📡 **Pillar 2: Narrative Analysis (The "Sonar")**
*Technology: BERT/Transformer Models*

Creates real-time Geopolitical Tension Index (GTI) from news, speeches, and social media.

**Capabilities:**
- Sentiment analysis of diplomatic communications
- Escalatory rhetoric detection
- Source credibility weighting
- Multi-language processing

**Example GTI Scores:**
- **+50 to +100**: Cooperative rhetoric, peace negotiations
- **0 to +50**: Normal diplomatic relations
- **-50 to 0**: Rising tensions, sanctions threats
- **-100 to -50**: Crisis rhetoric, military threats

### 🕸️ **Pillar 3: Network Analysis (The "Web")**
*Technology: NetworkX Graph Analysis*

Maps structural relationships that constrain or enable conflict.

**Network Types:**
- **Military Alliances**: NATO, CSTO, bilateral defense treaties
- **Trade Dependencies**: Bilateral trade volumes and critical supply chains
- **International Organizations**: UN, G7, BRICS membership overlaps

**Key Metrics:**
- Network density and fragmentation
- Critical node identification
- Cascade failure simulation
- Alliance cohesion measurement

---

## ⚔️ Military Capabilities Analysis

### 🚀 **Nuclear Arsenal Assessment**

**Current Nuclear Powers (2024 Estimates):**

| Country | Warheads | Delivery Systems | Threat Level |
|---------|----------|------------------|--------------|
| 🇺🇸 USA | 5,550 | ICBM, SLBM, Bomber | Strategic |
| 🇷🇺 Russia | 6,257 | ICBM, SLBM, Bomber | Strategic |
| 🇨🇳 China | 350 | ICBM, SLBM, Bomber | Regional |
| 🇫🇷 France | 290 | SLBM, Bomber | Regional |
| 🇬🇧 UK | 225 | SLBM | Regional |
| 🇮🇳 India | 164 | IRBM, Aircraft | Limited |
| 🇵🇰 Pakistan | 170 | IRBM, Aircraft | Limited |
| 🇮🇱 Israel | ~90 | IRBM, Aircraft | Limited |
| 🇰🇵 North Korea | ~30 | IRBM | Minimal |

### 🛡️ **Conventional Military Power Index**

**Methodology:**
- Defense spending (weighted 20%)
- Active personnel (weighted 15%)
- Technology tier (weighted 25%)
- Nuclear capabilities (weighted 25%)
- CBRN capabilities (weighted 15%)

**Power Classifications:**
- **Superpower**: USA, Russia, China
- **Great Power**: France, UK, India
- **Regional Power**: Israel, Iran, Turkey, Saudi Arabia
- **Middle Power**: South Korea, Japan, Pakistan
- **Small Power**: Others

### ☢️ **CBRN Threat Assessment**

**Chemical/Biological/Nuclear Capabilities:**

| Country | Chemical | Biological | Nuclear | Overall Threat |
|---------|----------|------------|---------|----------------|
| 🇷🇺 Russia | Advanced | Advanced | Advanced | Critical |
| 🇺🇸 USA | Defensive | Defensive | Advanced | High |
| 🇨🇳 China | Advanced | Moderate | Advanced | High |
| 🇮🇷 Iran | Moderate | Limited | Developing | Moderate |
| 🇰🇵 North Korea | Advanced | Moderate | Limited | Moderate |

---

## 🚀 Installation

### Prerequisites
- Python 3.8+
- 8GB+ RAM recommended
- Internet connection for data APIs

### Quick Install
```bash
git clone https://github.com/galafis/geopolitical-risk-analyzer.git
cd geopolitical-risk-analyzer
pip install -r requirements.txt
```

### API Configuration
Create a `.env` file with your API keys:
```env
ACLED_API_KEY=your_acled_key
ACLED_EMAIL=your_email@example.com
WORLD_BANK_API_KEY=your_wb_key  # Optional
```

---

## ⚡ Quick Start

### Basic Risk Assessment
```python
from src.main import GeopoliticalRiskAnalyzer

# Initialize analyzer
analyzer = GeopoliticalRiskAnalyzer()

# Analyze current Middle East tensions
result = analyzer.analyze_scenario(
    scenario_name="Middle East Escalation",
    countries=['ISR', 'IRN', 'USA'],
    narrative_texts=[
        "Military buildup reported in region",
        "Diplomatic talks suspended indefinitely",
        "International allies express concern"
    ]
)

print(f"Risk Level: {result['risk_assessment']['overall_risk']['level']}")
print(f"Risk Score: {result['risk_assessment']['overall_risk']['score']}/100")
```

### Predefined Scenario Analysis
```python
# Run all predefined scenarios
results = analyzer.analyze_predefined_scenarios()

# Access specific scenario
ukraine_analysis = results['individual_scenarios']['ukraine_russia_war']
print(f"Ukraine War Risk: {ukraine_analysis['risk_assessment']['overall_risk']['level']}")
```

### Military Balance Comparison
```python
from src.models.military_analyzer import MilitaryPowerAnalyzer

military = MilitaryPowerAnalyzer()

# Compare military capabilities
balance = military.analyze_military_balance('USA', 'CHN')
print(f"Military Balance: {balance['military_balance']}")

# Assess escalation risk
escalation = military.calculate_escalation_risk(['USA', 'CHN', 'RUS'])
print(f"Escalation Risk: {escalation['escalation_risk_level']}")
```

---

## 🌟 Real-World Examples

### Example 1: US Military Aid to Israel Impact Analysis
```python
# Scenario: US increases military aid to Israel during Iran conflict
analyzer = GeopoliticalRiskAnalyzer()

result = analyzer.analyze_scenario(
    scenario_name="US-Israel Military Cooperation Escalation",
    countries=['USA', 'ISR', 'IRN'],
    narrative_texts=[
        "US Congress approves $14 billion emergency aid package for Israel",
        "Advanced missile defense systems deployed to Israel",
        "Iran condemns US military escalation in region",
        "Regional allies express concern over arms race"
    ],
    narrative_sources=['official', 'official', 'official', 'high_press']
)

# Expected Output:
# Risk Level: HIGH (76/100)
# Key Factors: Superpower involvement, Nuclear weapons present, Regional arms race
```

### Example 2: Russia-Iran Strategic Partnership
```python
# Scenario: Russia provides advanced weapons to Iran
result = analyzer.analyze_scenario(
    scenario_name="Russia-Iran Military Alliance",
    countries=['RUS', 'IRN', 'ISR'],
    narrative_texts=[
        "Russia delivers S-400 air defense systems to Iran",
        "Joint military exercises conducted in Caspian Sea",
        "Israel warns of red line violations",
        "US imposes new sanctions on Russia-Iran cooperation"
    ]
)

# Expected Output:
# Risk Level: HIGH (82/100)
# Key Factors: Nuclear powers involved, Regional destabilization, Alliance shifts
```

### Example 3: China-Taiwan Military Escalation
```python
# Scenario: Chinese military exercises escalate around Taiwan
result = analyzer.analyze_scenario(
    scenario_name="Taiwan Strait Crisis 2024",
    countries=['CHN', 'USA', 'JPN'],
    narrative_texts=[
        "China conducts largest-ever military exercises around Taiwan",
        "US deploys carrier strike group to South China Sea",
        "Taiwan raises defense readiness to highest level",
        "Japan considers activating collective self-defense"
    ]
)

# Expected Output:
# Risk Level: CRITICAL (88/100)
# Key Factors: Superpower confrontation, Economic disruption risk, Alliance activation
```

### Example 4: Multi-Front Crisis Scenario
```python
# Scenario: Simultaneous crises in multiple theaters
result = analyzer.analyze_scenario(
    scenario_name="Global Multi-Front Crisis",
    countries=['USA', 'CHN', 'RUS', 'IRN', 'ISR'],
    narrative_texts=[
        "Russia escalates in Ukraine while China threatens Taiwan",
        "Iran accelerates nuclear program amid Israeli threats",
        "US faces strategic overstretch across multiple theaters",
        "NATO allies struggle to coordinate response"
    ]
)

# Expected Output:
# Risk Level: EXTREME (95/100)
# Key Factors: Multiple nuclear powers, Strategic overstretch, Alliance strain
```

---

## 📊 Output Examples

### Risk Assessment Report
```json
{
  "scenario_name": "Israel-Iran Regional War",
  "overall_risk": {
    "score": 85.2,
    "level": "CRITICAL",
    "confidence": 0.87
  },
  "pillar_scores": {
    "events": {"score": 78.5, "confidence": 0.82},
    "narratives": {"score": 92.1, "confidence": 0.91},
    "networks": {"score": 71.3, "confidence": 0.79},
    "military": {"score": 89.7, "confidence": 0.95}
  },
  "risk_factors": {
    "high_priority": [
      "Nuclear weapons involved: ['ISR']",
      "Critical narrative tension (GTI: -78.2)",
      "Regional power confrontation"
    ]
  },
  "scenarios": {
    "immediate_conflict": {
      "probability": "High (60-80%)",
      "timeframe": "1-3 months",
      "description": "High probability of direct military confrontation"
    }
  },
  "recommendations": [
    "URGENT: Activate crisis management protocols",
    "Establish direct communication channels",
    "Deploy diplomatic mediation efforts immediately"
  ]
}
```

---

## 📚 API Reference

### Core Classes

#### `GeopoliticalRiskAnalyzer`
Main orchestrator for comprehensive risk analysis.

**Methods:**
- `analyze_scenario(scenario_name, countries, narrative_texts=None)`
- `analyze_predefined_scenarios()`
- `monitor_risk_changes(previous_assessment, current_assessment)`

#### `EventPredictor`
Pillar 1: Historical event analysis and prediction.

**Methods:**
- `train(data, target_column='fatalities')`
- `predict(data)`
- `predict_risk_level(data)`

#### `NarrativeAnalyzer`
Pillar 2: Real-time narrative and sentiment analysis.

**Methods:**
- `analyze_geopolitical_texts(texts, sources=None)`
- `calculate_gti_score(sentiment_results)`
- `get_tension_level_description(gti_score)`

#### `NetworkAnalyzer`
Pillar 3: Alliance and trade network analysis.

**Methods:**
- `calculate_network_metrics(country_iso)`
- `simulate_conflict_impact(affected_countries)`
- `identify_critical_nodes(top_n=10)`

#### `MilitaryPowerAnalyzer`
Military capabilities and escalation risk assessment.

**Methods:**
- `calculate_military_power_index(country_iso)`
- `calculate_nuclear_capability_score(country_iso)`
- `analyze_military_balance(country1, country2)`
- `calculate_escalation_risk(countries)`

---

## 🤝 Contributing

We welcome contributions from researchers, analysts, and developers interested in geopolitical risk assessment.

### Areas for Contribution:
- **Data Sources**: Integration of new conflict databases
- **Models**: Advanced ML techniques for prediction
- **Visualization**: Interactive dashboards and maps
- **Case Studies**: Analysis of historical conflicts
- **Documentation**: Translations and examples

### Getting Started:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

---

## ⚖️ Ethical Considerations

This tool is designed for **analysis and prevention**, not prediction of specific attacks or military operations. Users must:

- Use outputs for **conflict prevention** and **risk mitigation**
- Maintain **human oversight** in all decision-making
- Recognize **uncertainty** in all predictions
- Avoid **self-fulfilling prophecies** through responsible communication
- Respect **data privacy** and **source protection**

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Gabriel Demetrios Lafis**  
📧 Email: [gabriel.lafis@example.com](mailto:gabriel.lafis@example.com)  
🔗 LinkedIn: [linkedin.com/in/gabriel-lafis](https://linkedin.com/in/gabriel-lafis)  
🐙 GitHub: [github.com/galafis](https://github.com/galafis)

---

## 🙏 Acknowledgments

This framework builds upon decades of research in conflict prediction, international relations theory, and data science. Special recognition to:

- Armed Conflict Location & Event Data Project (ACLED)
- Uppsala Conflict Data Program (UCDP)
- GDELT Project
- Correlates of War Project
- World Bank Open Data Initiative

---

# Português

## 🎯 Visão Geral

O **Analisador de Risco Geopolítico** é uma estrutura sofisticada projetada para cientistas de dados, analistas e pesquisadores de políticas para prever e avaliar riscos geopolíticos usando técnicas avançadas de aprendizado de máquina. Em uma era onde conflitos globais podem escalar rapidamente e impactar mercados, cadeias de suprimentos e estabilidade internacional, esta ferramenta fornece insights quantitativos sobre dinâmicas geopolíticas complexas.

### 🔥 Por Que Isso Importa Agora

Estamos vivendo um dos períodos geopolíticos mais voláteis desde a Guerra Fria. Os conflitos em andamento na Ucrânia, as tensões crescentes entre Israel e Irã, a competição estratégica entre EUA e China sobre Taiwan, e as provocações nucleares da Coreia do Norte criam uma teia complexa de riscos interconectados que a análise tradicional luta para capturar.

## 🌍 Cenários Geopolíticos Atuais

### 🔴 **Conflitos Ativos Críticos**

#### **Confronto Regional Israel-Irã**
*Nível de Risco: ALTO | Implicações Nucleares: SIM*

O conflito proxy em escalada entre Israel e Irã representa um dos pontos de tensão mais perigosos no Oriente Médio. Nossa estrutura analisa:

- **Equilíbrio Militar**: Força aérea avançada de Israel vs. capacidades de mísseis do Irã e redes proxy
- **Fator Nuclear**: Programa de enriquecimento de urânio do Irã vs. arsenal nuclear não declarado de Israel
- **Redes de Aliança**: Cooperação de defesa EUA-Israel vs. eixo Irã-Rússia-China
- **Impacto Econômico**: Potencial fechamento do Estreito de Ormuz afetando suprimentos globais de petróleo

#### **Escalada da Guerra Rússia-Ucrânia**
*Nível de Risco: ALTO | Implicações Nucleares: SIM*

A guerra em andamento na Ucrânia alterou fundamentalmente a arquitetura de segurança europeia. Pontos-chave de análise:

- **Dinâmicas Militares**: Suprimentos de armas da OTAN vs. forças convencionais russas
- **Ameaças Nucleares**: Retórica escalatória de Putin e armas nucleares táticas
- **Guerra Econômica**: Dependências energéticas e eficácia das sanções
- **Coesão da Aliança**: Unidade da OTAN vs. fadiga da guerra nas democracias ocidentais

#### **Crise do Estreito de Taiwan EUA-China**
*Nível de Risco: MODERADO-ALTO | Impacto Econômico: CATASTRÓFICO*

A questão de Taiwan representa o ponto de tensão mais perigoso entre superpotências:

- **Equilíbrio Militar**: Frota do Pacífico dos EUA vs. capacidades chinesas de Anti-Acesso/Negação de Área
- **Interesses Econômicos**: 90% dos semicondutores avançados fabricados em Taiwan
- **Sistemas de Aliança**: EUA-Japão-Austrália vs. parceria China-Rússia
- **Dinâmicas de Escalada**: Risco de erro de cálculo durante encontros militares

### 🟡 **Ameaças Emergentes**

#### **Escalada Nuclear da Coreia do Norte**
*Nível de Risco: MODERADO | Imprevisibilidade: EXTREMA*

O regime de Kim Jong-un continua a desenvolver capacidades nucleares enquanto enfrenta pressões econômicas.

#### **Cenário de Ruptura Nuclear do Irã**
*Nível de Risco: MODERADO-ALTO | Impacto Regional: EXTREMO*

O avanço do programa nuclear iraniano cria múltiplos caminhos de escalada.

## 🏗️ A Estrutura de Três Pilares

### 🎯 **Pilar 1: Predição de Eventos (O "Radar")**
*Tecnologia: Natural Gradient Boosting (NGBoost)*

Analisa dados históricos de conflitos para prever intensidade e probabilidade de violência futura.

### 📡 **Pilar 2: Análise Narrativa (O "Sonar")**
*Tecnologia: Modelos BERT/Transformer*

Cria Índice de Tensão Geopolítica (ITG) em tempo real a partir de notícias, discursos e mídias sociais.

### 🕸️ **Pilar 3: Análise de Rede (A "Teia")**
*Tecnologia: Análise de Grafos NetworkX*

Mapeia relacionamentos estruturais que restringem ou permitem conflitos.

## ⚔️ Análise de Capacidades Militares

### 🚀 **Avaliação de Arsenal Nuclear**

**Potências Nucleares Atuais (Estimativas 2024):**

| País | Ogivas | Sistemas de Entrega | Nível de Ameaça |
|------|--------|-------------------|-----------------|
| 🇺🇸 EUA | 5.550 | ICBM, SLBM, Bombardeiro | Estratégico |
| 🇷🇺 Rússia | 6.257 | ICBM, SLBM, Bombardeiro | Estratégico |
| 🇨🇳 China | 350 | ICBM, SLBM, Bombardeiro | Regional |
| 🇮🇱 Israel | ~90 | IRBM, Aeronave | Limitado |
| 🇮🇷 Irã | 0* | Em desenvolvimento | Potencial |

*Em desenvolvimento - capacidade de breakout estimada

## 🚀 Instalação

### Pré-requisitos
- Python 3.8+
- 8GB+ RAM recomendado
- Conexão com internet para APIs de dados

### Instalação Rápida
```bash
git clone https://github.com/galafis/geopolitical-risk-analyzer.git
cd geopolitical-risk-analyzer
pip install -r requirements.txt
```

## ⚡ Início Rápido

### Avaliação Básica de Risco
```python
from src.main import GeopoliticalRiskAnalyzer

# Inicializar analisador
analyzer = GeopoliticalRiskAnalyzer()

# Analisar tensões atuais no Oriente Médio
result = analyzer.analyze_scenario(
    scenario_name="Escalada no Oriente Médio",
    countries=['ISR', 'IRN', 'USA'],
    narrative_texts=[
        "Acúmulo militar relatado na região",
        "Conversas diplomáticas suspensas indefinidamente",
        "Aliados internacionais expressam preocupação"
    ]
)

print(f"Nível de Risco: {result['risk_assessment']['overall_risk']['level']}")
print(f"Pontuação de Risco: {result['risk_assessment']['overall_risk']['score']}/100")
```

## 🌟 Exemplos do Mundo Real

### Exemplo 1: Impacto da Ajuda Militar dos EUA a Israel
```python
# Cenário: EUA aumentam ajuda militar a Israel durante conflito com Irã
result = analyzer.analyze_scenario(
    scenario_name="Escalada da Cooperação Militar EUA-Israel",
    countries=['USA', 'ISR', 'IRN'],
    narrative_texts=[
        "Congresso dos EUA aprova pacote de ajuda emergencial de $14 bilhões para Israel",
        "Sistemas avançados de defesa antimíssil implantados em Israel",
        "Irã condena escalada militar dos EUA na região",
        "Aliados regionais expressam preocupação com corrida armamentista"
    ]
)

# Saída Esperada:
# Nível de Risco: ALTO (76/100)
# Fatores-Chave: Envolvimento de superpotência, Armas nucleares presentes, Corrida armamentista regional
```

### Exemplo 2: Parceria Estratégica Rússia-Irã
```python
# Cenário: Rússia fornece armas avançadas ao Irã
result = analyzer.analyze_scenario(
    scenario_name="Aliança Militar Rússia-Irã",
    countries=['RUS', 'IRN', 'ISR'],
    narrative_texts=[
        "Rússia entrega sistemas de defesa aérea S-400 ao Irã",
        "Exercícios militares conjuntos realizados no Mar Cáspio",
        "Israel alerta sobre violações de linha vermelha",
        "EUA impõem novas sanções à cooperação Rússia-Irã"
    ]
)

# Saída Esperada:
# Nível de Risco: ALTO (82/100)
# Fatores-Chave: Potências nucleares envolvidas, Desestabilização regional, Mudanças de aliança
```

### Exemplo 3: Escalada Militar China-Taiwan
```python
# Cenário: Exercícios militares chineses escalam ao redor de Taiwan
result = analyzer.analyze_scenario(
    scenario_name="Crise do Estreito de Taiwan 2024",
    countries=['CHN', 'USA', 'JPN'],
    narrative_texts=[
        "China conduz maiores exercícios militares de todos os tempos ao redor de Taiwan",
        "EUA implantam grupo de ataque de porta-aviões no Mar do Sul da China",
        "Taiwan eleva prontidão de defesa ao nível mais alto",
        "Japão considera ativar autodefesa coletiva"
    ]
)

# Saída Esperada:
# Nível de Risco: CRÍTICO (88/100)
# Fatores-Chave: Confronto de superpotências, Risco de disrupção econômica, Ativação de alianças
```

---

**Desenvolvido por Gabriel Demetrios Lafis**  
*Para análise e prevenção de conflitos, não para predição de ataques específicos*

