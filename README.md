# ⚠️ Geopolitical Risk Analyzer

> Advanced framework for geopolitical risk analysis with World War III assessment capabilities. Features multi-pillar analysis, interactive web interface, and real-time scenario modeling for current global conflicts.

[![Python](https://img.shields.io/badge/Python-3.12-3776AB.svg)](https://img.shields.io/badge/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://img.shields.io/badge/)
[![NumPy](https://img.shields.io/badge/NumPy-1.26-013243.svg)](https://img.shields.io/badge/)
[![Pandas](https://img.shields.io/badge/Pandas-2.2-150458.svg)](https://img.shields.io/badge/)
[![Plotly](https://img.shields.io/badge/Plotly-5.18-3F4F75.svg)](https://img.shields.io/badge/)
[![scikit--learn](https://img.shields.io/badge/scikit--learn-1.4-F7931E.svg)](https://img.shields.io/badge/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker)](Dockerfile)

[English](#english) | [Português](#português)

---

## English

### 🎯 Overview

**Geopolitical Risk Analyzer** is a production-grade Python application complemented by CSS, HTML, JavaScript that showcases modern software engineering practices including clean architecture, comprehensive testing, containerized deployment, and CI/CD readiness.

The codebase comprises **15,706 lines** of source code organized across **23 modules**, following industry best practices for maintainability, scalability, and code quality.

### ✨ Key Features

- **🐳 Containerized**: Docker support for consistent deployment
- **🏗️ Object-Oriented**: 13 core classes with clean architecture
- **📐 Clean Architecture**: Modular design with clear separation of concerns
- **🧪 Test Coverage**: Unit and integration tests for reliability
- **📚 Documentation**: Comprehensive inline documentation and examples
- **🔧 Configuration**: Environment-based configuration management

### 🏗️ Architecture

```mermaid
graph LR
    subgraph Input["📥 Input"]
        A[Raw Data]
        B[Feature Config]
    end
    
    subgraph Pipeline["🔬 ML Pipeline"]
        C[Preprocessing]
        D[Feature Engineering]
        E[Model Training]
        F[Evaluation]
    end
    
    subgraph Output["📤 Output"]
        G[Trained Models]
        H[Metrics & Reports]
        I[Predictions]
    end
    
    A --> C --> D --> E --> F
    B --> D
    F --> G
    F --> H
    G --> I
    
    style Input fill:#e1f5fe
    style Pipeline fill:#f3e5f5
    style Output fill:#e8f5e9
```

```mermaid
classDiagram
    class GeopoliticalRiskAnalyzer
    class NetworkAnalyzer
    class WorldWarRiskAnalyzer
    class DataIngestionPipeline
    class NarrativeAnalyzer
    class MilitaryPowerAnalyzer
    class EventPredictor
    class RiskCalculator
    class PowerBIIntegration
    class RealTimeDataFetcher
```

### 🚀 Quick Start

#### Prerequisites

- Python 3.12+
- pip (Python package manager)

#### Installation

```bash
# Clone the repository
git clone https://github.com/galafis/geopolitical-risk-analyzer.git
cd geopolitical-risk-analyzer

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Running

```bash
# Run the application
python src/main.py
```

### 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage report
pytest --cov --cov-report=html

# Run specific test module
pytest tests/test_main.py -v

# Run with detailed output
pytest -v --tb=short
```

### 📁 Project Structure

```
geopolitical-risk-analyzer/
├── data/
│   ├── processed/
│   └── raw/
├── docs/          # Documentation
│   ├── assets/
│   ├── css/
│   ├── js/
│   │   ├── data-2025.js
│   │   ├── data.js
│   │   ├── main.js
│   │   ├── mobile-optimized.js
│   │   ├── powerbi-integration.js
│   │   ├── realtime-2025-data.js
│   │   ├── realtime-fetcher.js
│   │   └── scenarios.js
│   └── technical_documentation.md
├── examples/
│   ├── README.md
│   └── world_war_demo.py
├── output/
├── src/          # Source code
│   ├── analysis/
│   │   ├── risk_calculator.py
│   │   └── world_war_analyzer.py
│   ├── data_ingestion/
│   │   └── data_pipeline.py
│   ├── models/        # Data models
│   │   ├── event_predictor.py
│   │   ├── military_analyzer.py
│   │   ├── narrative_analyzer.py
│   │   └── network_analyzer.py
│   ├── __init__.py
│   └── main.py
├── tests/         # Test suite
│   └── test_framework.py
├── Dockerfile
├── LICENSE
├── README.md
├── requirements.txt
└── test_functionality.py
```

### 🛠️ Tech Stack

| Technology | Description | Role |
|------------|-------------|------|
| **Python** | Core Language | Primary |
| **Docker** | Containerization platform | Framework |
| **NumPy** | Numerical computing | Framework |
| **Pandas** | Data manipulation library | Framework |
| **Plotly** | Interactive visualization | Framework |
| **scikit-learn** | Machine learning library | Framework |
| JavaScript | 8 files | Supporting |
| CSS | 2 files | Supporting |
| HTML | 1 files | Supporting |

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 👤 Author

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-demetrios-lafis)

---

## Português

### 🎯 Visão Geral

**Geopolitical Risk Analyzer** é uma aplicação Python de nível profissional, complementada por CSS, HTML, JavaScript que demonstra práticas modernas de engenharia de software, incluindo arquitetura limpa, testes abrangentes, implantação containerizada e prontidão para CI/CD.

A base de código compreende **15,706 linhas** de código-fonte organizadas em **23 módulos**, seguindo as melhores práticas do setor para manutenibilidade, escalabilidade e qualidade de código.

### ✨ Funcionalidades Principais

- **🐳 Containerized**: Docker support for consistent deployment
- **🏗️ Object-Oriented**: 13 core classes with clean architecture
- **📐 Clean Architecture**: Modular design with clear separation of concerns
- **🧪 Test Coverage**: Unit and integration tests for reliability
- **📚 Documentation**: Comprehensive inline documentation and examples
- **🔧 Configuration**: Environment-based configuration management

### 🏗️ Arquitetura

```mermaid
graph LR
    subgraph Input["📥 Input"]
        A[Raw Data]
        B[Feature Config]
    end
    
    subgraph Pipeline["🔬 ML Pipeline"]
        C[Preprocessing]
        D[Feature Engineering]
        E[Model Training]
        F[Evaluation]
    end
    
    subgraph Output["📤 Output"]
        G[Trained Models]
        H[Metrics & Reports]
        I[Predictions]
    end
    
    A --> C --> D --> E --> F
    B --> D
    F --> G
    F --> H
    G --> I
    
    style Input fill:#e1f5fe
    style Pipeline fill:#f3e5f5
    style Output fill:#e8f5e9
```

### 🚀 Início Rápido

#### Prerequisites

- Python 3.12+
- pip (Python package manager)

#### Installation

```bash
# Clone the repository
git clone https://github.com/galafis/geopolitical-risk-analyzer.git
cd geopolitical-risk-analyzer

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Running

```bash
# Run the application
python src/main.py
```

### 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage report
pytest --cov --cov-report=html

# Run specific test module
pytest tests/test_main.py -v

# Run with detailed output
pytest -v --tb=short
```

### 📁 Estrutura do Projeto

```
geopolitical-risk-analyzer/
├── data/
│   ├── processed/
│   └── raw/
├── docs/          # Documentation
│   ├── assets/
│   ├── css/
│   ├── js/
│   │   ├── data-2025.js
│   │   ├── data.js
│   │   ├── main.js
│   │   ├── mobile-optimized.js
│   │   ├── powerbi-integration.js
│   │   ├── realtime-2025-data.js
│   │   ├── realtime-fetcher.js
│   │   └── scenarios.js
│   └── technical_documentation.md
├── examples/
│   ├── README.md
│   └── world_war_demo.py
├── output/
├── src/          # Source code
│   ├── analysis/
│   │   ├── risk_calculator.py
│   │   └── world_war_analyzer.py
│   ├── data_ingestion/
│   │   └── data_pipeline.py
│   ├── models/        # Data models
│   │   ├── event_predictor.py
│   │   ├── military_analyzer.py
│   │   ├── narrative_analyzer.py
│   │   └── network_analyzer.py
│   ├── __init__.py
│   └── main.py
├── tests/         # Test suite
│   └── test_framework.py
├── Dockerfile
├── LICENSE
├── README.md
├── requirements.txt
└── test_functionality.py
```

### 🛠️ Stack Tecnológica

| Tecnologia | Descrição | Papel |
|------------|-----------|-------|
| **Python** | Core Language | Primary |
| **Docker** | Containerization platform | Framework |
| **NumPy** | Numerical computing | Framework |
| **Pandas** | Data manipulation library | Framework |
| **Plotly** | Interactive visualization | Framework |
| **scikit-learn** | Machine learning library | Framework |
| JavaScript | 8 files | Supporting |
| CSS | 2 files | Supporting |
| HTML | 1 files | Supporting |

### 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

### 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

### 👤 Autor

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-demetrios-lafis)
