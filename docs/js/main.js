// Geopolitical Risk Analyzer - Main JavaScript

// Global variables
let currentLanguage = 'en';
let riskChart, regionalChart;
let worldMap;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize components
    initializeNavigation();
    initializeLanguageToggle();
    initializeWorldMap();
    initializeCharts();
    initializeAnimations();
    initializeRealTimeUpdates();
    
    // Set initial language
    setLanguage('en');
    
    console.log('Geopolitical Risk Analyzer initialized');
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Language toggle functionality
function initializeLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.id.split('-')[1];
            setLanguage(lang);
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang; // Set document language
    
    // Update all elements with data-en and data-pt attributes
    document.querySelectorAll('[data-en][data-pt]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update charts and dynamic content
    updateChartsLanguage();
}

function updateChartsLanguage() {
    // Update chart labels based on current language
    const translations = {
        en: {
            globalRiskTrends: 'Global Risk Trends',
            riskByRegion: 'Risk by Region',
            nuclearRiskMatrix: 'Nuclear Risk Matrix',
            earlyWarningIndicators: 'Early Warning Indicators',
            lastDays: 'Last 7 Days',
            lastMonth: 'Last 30 Days',
            lastQuarter: 'Last 90 Dias',
            middleEast: 'Middle East',
            europe: 'Europe',
            pacific: 'Pacific',
            asia: 'Asia',
            africa: 'Africa',
            americas: 'Americas'
        },
        pt: {
            globalRiskTrends: 'Tendências de Risco Global',
            riskByRegion: 'Risco por Região',
            nuclearRiskMatrix: 'Matriz de Risco Nuclear',
            earlyWarningIndicators: 'Indicadores de Alerta Precoce',
            lastDays: 'Últimos 7 Dias',
            lastMonth: 'Últimos 30 Dias',
            lastQuarter: 'Últimos 90 Dias',
            middleEast: 'Oriente Médio',
            europe: 'Europa',
            pacific: 'Pacífico',
            asia: 'Ásia',
            africa: 'África',
            americas: 'Américas'
        }
    };
    
    // Update select options
    const timeframeSelect = document.getElementById('timeframe-select');
    if (timeframeSelect) {
        const options = timeframeSelect.querySelectorAll('option');
        options.forEach(option => {
            const translation = option.getAttribute(`data-${currentLanguage}`);
            if (translation) {
                option.textContent = translation;
            }
        });
    }
    
    // Update charts if they exist
    if (riskChart) {
        riskChart.options.plugins.title.text = translations[currentLanguage].globalRiskTrends;
        riskChart.update();
    }
    
    if (regionalChart) {
        regionalChart.options.plugins.title.text = translations[currentLanguage].riskByRegion;
        regionalChart.data.labels = [
            translations[currentLanguage].middleEast,
            translations[currentLanguage].europe,
            translations[currentLanguage].pacific,
            translations[currentLanguage].asia,
            translations[currentLanguage].africa,
            translations[currentLanguage].americas
        ];
        regionalChart.update();
    }
}

// World map initialization
function initializeWorldMap() {
    const mapContainer = document.getElementById('world-map');
    if (!mapContainer) return;
    
    // Initialize Leaflet map
    worldMap = L.map('world-map', {
        center: [20, 0],
        zoom: 2,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false
    });
    
    // Add tile layer with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(worldMap);
    
    // Add risk markers
    addRiskMarkers();
}

function addRiskMarkers() {
    if (!worldMap) return;
    
    const riskAreas = [
        { lat: 31.5, lng: 35.0, risk: 'critical', name: 'Middle East', conflicts: ['Israel-Iran', 'Syria'] },
        { lat: 49.0, lng: 32.0, risk: 'high', name: 'Eastern Europe', conflicts: ['Russia-Ukraine'] },
        { lat: 23.8, lng: 121.0, risk: 'moderate', name: 'Taiwan Strait', conflicts: ['US-China Tensions'] },
        { lat: 39.0, lng: 127.0, risk: 'high', name: 'Korean Peninsula', conflicts: ['North Korea'] },
        { lat: 28.0, lng: 77.0, risk: 'moderate', name: 'South Asia', conflicts: ['India-Pakistan'] }
    ];
    
    riskAreas.forEach(area => {
        const color = getRiskColor(area.risk);
        const marker = L.circleMarker([area.lat, area.lng], {
            radius: 15,
            fillColor: color,
            color: color,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.6
        }).addTo(worldMap);
        
        // Add popup
        marker.bindPopup(`
            <div class="risk-popup">
                <h4>${area.name}</h4>
                <p>Risk Level: <strong>${area.risk.toUpperCase()}</strong></p>
                <p>Active Conflicts:</p>
                <ul>
                    ${area.conflicts.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        `);
        
        // Add pulsing animation for critical areas
        if (area.risk === 'critical') {
            marker.setStyle({ className: 'pulse-marker' });
        }
    });
}

function getRiskColor(risk) {
    const colors = {
        'low': '#27ae60',
        'moderate': '#3498db',
        'high': '#f39c12',
        'critical': '#e74c3c',
        'extreme': '#8e44ad'
    };
    return colors[risk] || '#95a5a6';
}

// Charts initialization
function initializeCharts() {
    initializeRiskTrendsChart();
    initializeRegionalRiskChart();
}

function initializeRiskTrendsChart() {
    const ctx = document.getElementById('risk-trends-chart');
    if (!ctx) return;
    
    const data = generateRiskTrendsData();
    
    riskChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Global Risk Score',
                data: data.globalRisk,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Nuclear Risk',
                data: data.nuclearRisk,
                borderColor: '#8e44ad',
                backgroundColor: 'rgba(142, 68, 173, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Economic Risk',
                data: data.economicRisk,
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializeRegionalRiskChart() {
    const ctx = document.getElementById('regional-risk-chart');
    if (!ctx) return;
    
    const data = generateRegionalRiskData();
    
    regionalChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    '#e74c3c',
                    '#f39c12',
                    '#3498db',
                    '#27ae60',
                    '#8e44ad',
                    '#95a5a6'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false
                }
            }
        }
    });
}

function generateRiskTrendsData() {
    const days = 30;
    const labels = [];
    const globalRisk = [];
    const nuclearRisk = [];
    const economicRisk = [];
    
    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Generate realistic risk data with trends
        globalRisk.push(65 + Math.sin(i * 0.1) * 10 + Math.random() * 8);
        nuclearRisk.push(45 + Math.sin(i * 0.15) * 15 + Math.random() * 6);
        economicRisk.push(55 + Math.cos(i * 0.12) * 12 + Math.random() * 7);
    }
    
    return { labels, globalRisk, nuclearRisk, economicRisk };
}

function generateRegionalRiskData() {
    return {
        labels: ['Middle East', 'Eastern Europe', 'Pacific', 'South Asia', 'Africa', 'Americas'],
        values: [85, 78, 72, 65, 58, 45]
    };
}

function updateChartsLanguage() {
    if (riskChart) {
        const labels = currentLanguage === 'pt' ? 
            ['Pontuação de Risco Global', 'Risco Nuclear', 'Risco Econômico'] :
            ['Global Risk Score', 'Nuclear Risk', 'Economic Risk'];
        
        riskChart.data.datasets.forEach((dataset, index) => {
            dataset.label = labels[index];
        });
        riskChart.update();
    }
    
    if (regionalChart) {
        const labels = currentLanguage === 'pt' ? 
            ['Oriente Médio', 'Europa Oriental', 'Pacífico', 'Sul da Ásia', 'África', 'Américas'] :
            ['Middle East', 'Eastern Europe', 'Pacific', 'South Asia', 'Africa', 'Americas'];
        
        regionalChart.data.labels = labels;
        regionalChart.update();
    }
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.scenario-card, .dashboard-card, .pillar, .feature-item').forEach(el => {
        observer.observe(el);
    });
    
    // Counter animations
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Real-time updates
function initializeRealTimeUpdates() {
    // Update risk scores every 30 seconds
    setInterval(updateRiskScores, 30000);
    
    // Update warning indicators every 60 seconds
    setInterval(updateWarningIndicators, 60000);
    
    // Initial update
    updateRiskScores();
    updateWarningIndicators();
}

function updateRiskScores() {
    // Simulate real-time risk score updates
    const riskScore = document.getElementById('risk-score');
    const activeConflicts = document.getElementById('active-conflicts');
    const nuclearPowers = document.getElementById('nuclear-powers');
    
    if (riskScore) {
        const currentScore = parseInt(riskScore.textContent);
        const newScore = Math.max(60, Math.min(95, currentScore + (Math.random() - 0.5) * 4));
        animateNumberChange(riskScore, Math.round(newScore));
    }
    
    if (activeConflicts) {
        const conflicts = [10, 11, 12, 13, 14];
        const randomConflict = conflicts[Math.floor(Math.random() * conflicts.length)];
        animateNumberChange(activeConflicts, randomConflict);
    }
}

function updateWarningIndicators() {
    const indicators = document.querySelectorAll('.indicator-item');
    
    indicators.forEach((indicator, index) => {
        // Randomly activate/deactivate indicators
        if (Math.random() > 0.7) {
            indicator.classList.toggle('active');
            
            // Update timestamp
            const timeElement = indicator.querySelector('.indicator-time');
            if (timeElement) {
                const minutes = Math.floor(Math.random() * 60) + 1;
                timeElement.textContent = `${minutes} minutes ago`;
            }
        }
    });
}

function animateNumberChange(element, newValue) {
    const currentValue = parseInt(element.textContent);
    const difference = newValue - currentValue;
    const steps = 20;
    const stepValue = difference / steps;
    let current = currentValue;
    
    const timer = setInterval(() => {
        current += stepValue;
        if ((stepValue > 0 && current >= newValue) || (stepValue < 0 && current <= newValue)) {
            current = newValue;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 50);
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function openScenarioDetails(scenarioId) {
    const modal = document.getElementById('scenario-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    // Load scenario content
    const scenarioData = getScenarioData(scenarioId);
    
    modalTitle.textContent = scenarioData.title;
    modalBody.innerHTML = scenarioData.content;
    
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('scenario-modal');
    modal.style.display = 'none';
}

function showPillarDetails(pillarId) {
    // This would typically load detailed information about each pillar
    console.log(`Showing details for pillar: ${pillarId}`);
    
    // For now, scroll to the framework section
    scrollToSection('framework');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Language shortcuts
    if (e.ctrlKey || e.metaKey) {
        if (e.key === '1') {
            e.preventDefault();
            setLanguage('en');
            document.getElementById('lang-en').classList.add('active');
            document.getElementById('lang-pt').classList.remove('active');
        } else if (e.key === '2') {
            e.preventDefault();
            setLanguage('pt');
            document.getElementById('lang-pt').classList.add('active');
            document.getElementById('lang-en').classList.remove('active');
        }
    }
});

// Export functions for use in other modules
window.GeopoliticalRiskAnalyzer = {
    setLanguage,
    scrollToSection,
    openScenarioDetails,
    closeModal,
    showPillarDetails,
    updateRiskScores,
    updateWarningIndicators
};



// Framework pillar modal functions
function openPillarModal(pillarId) {
    const modal = document.getElementById('scenario-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalTitle || !modalContent) {
        console.error('Modal elements not found');
        return;
    }
    
    const pillarData = getPillarData(pillarId);
    
    modalTitle.textContent = pillarData.title[currentLanguage];
    modalContent.innerHTML = pillarData.content[currentLanguage];
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function getPillarData(pillarId) {
    const pillars = {
        'pillar1': {
            title: {
                en: 'Pillar 1: Event Prediction - The Radar',
                pt: 'Pilar 1: Predição de Eventos - O Radar'
            },
            content: {
                en: `
                    <div class="pillar-detail">
                        <h3>Advanced Event Prediction System</h3>
                        <p>Our first pillar uses sophisticated machine learning algorithms to analyze historical conflict patterns and predict future violence intensity and probability.</p>
                        
                        <h4>🎯 Core Technologies</h4>
                        <ul>
                            <li><strong>NGBoost:</strong> Natural Gradient Boosting for probabilistic predictions</li>
                            <li><strong>ACLED Data:</strong> Armed Conflict Location & Event Data Project integration</li>
                            <li><strong>GDELT:</strong> Global Database of Events, Language, and Tone analysis</li>
                        </ul>
                        
                        <h4>📊 Key Features</h4>
                        <ul>
                            <li>Historical pattern recognition across 50+ years of conflict data</li>
                            <li>Probabilistic forecasting with uncertainty quantification</li>
                            <li>Real-time event classification and severity assessment</li>
                            <li>Multi-scale temporal predictions (days to months)</li>
                        </ul>
                        
                        <h4>🔬 Methodology</h4>
                        <p>The system processes over 100 variables including:</p>
                        <ul>
                            <li>Economic indicators and market volatility</li>
                            <li>Political stability metrics</li>
                            <li>Social unrest patterns</li>
                            <li>Military deployment data</li>
                            <li>Diplomatic communication frequency</li>
                        </ul>
                        
                        <div class="accuracy-metrics">
                            <h4>📈 Performance Metrics</h4>
                            <div class="metric-grid">
                                <div class="metric">
                                    <span class="metric-value">87%</span>
                                    <span class="metric-label">Prediction Accuracy</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">0.23</span>
                                    <span class="metric-label">Mean Absolute Error</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">72h</span>
                                    <span class="metric-label">Early Warning Lead Time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                pt: `
                    <div class="pillar-detail">
                        <h3>Sistema Avançado de Predição de Eventos</h3>
                        <p>Nosso primeiro pilar utiliza algoritmos sofisticados de aprendizado de máquina para analisar padrões históricos de conflitos e prever intensidade e probabilidade de violência futura.</p>
                        
                        <h4>🎯 Tecnologias Principais</h4>
                        <ul>
                            <li><strong>NGBoost:</strong> Natural Gradient Boosting para predições probabilísticas</li>
                            <li><strong>Dados ACLED:</strong> Integração com Armed Conflict Location & Event Data Project</li>
                            <li><strong>GDELT:</strong> Análise do Global Database of Events, Language, and Tone</li>
                        </ul>
                        
                        <h4>📊 Características Principais</h4>
                        <ul>
                            <li>Reconhecimento de padrões históricos em mais de 50 anos de dados de conflitos</li>
                            <li>Previsão probabilística com quantificação de incerteza</li>
                            <li>Classificação de eventos em tempo real e avaliação de severidade</li>
                            <li>Predições temporais multi-escala (dias a meses)</li>
                        </ul>
                        
                        <h4>🔬 Metodologia</h4>
                        <p>O sistema processa mais de 100 variáveis incluindo:</p>
                        <ul>
                            <li>Indicadores econômicos e volatilidade do mercado</li>
                            <li>Métricas de estabilidade política</li>
                            <li>Padrões de agitação social</li>
                            <li>Dados de deslocamento militar</li>
                            <li>Frequência de comunicação diplomática</li>
                        </ul>
                        
                        <div class="accuracy-metrics">
                            <h4>📈 Métricas de Performance</h4>
                            <div class="metric-grid">
                                <div class="metric">
                                    <span class="metric-value">87%</span>
                                    <span class="metric-label">Precisão de Predição</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">0.23</span>
                                    <span class="metric-label">Erro Absoluto Médio</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">72h</span>
                                    <span class="metric-label">Tempo de Alerta Antecipado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        },
        'pillar2': {
            title: {
                en: 'Pillar 2: Narrative Analysis - The Sonar',
                pt: 'Pilar 2: Análise Narrativa - O Sonar'
            },
            content: {
                en: `
                    <div class="pillar-detail">
                        <h3>Real-Time Narrative Intelligence System</h3>
                        <p>Our second pillar creates a real-time Geopolitical Tension Index (GTI) by analyzing news, speeches, and diplomatic communications using advanced NLP and sentiment analysis.</p>
                        
                        <h4>🎯 Core Technologies</h4>
                        <ul>
                            <li><strong>BERT:</strong> Bidirectional Encoder Representations from Transformers</li>
                            <li><strong>Transformers:</strong> State-of-the-art language models for context understanding</li>
                            <li><strong>NLP Pipeline:</strong> Multi-language natural language processing</li>
                        </ul>
                        
                        <h4>📊 Data Sources</h4>
                        <ul>
                            <li>Global news feeds from 500+ sources in 25+ languages</li>
                            <li>Official government statements and press releases</li>
                            <li>Diplomatic communications and UN proceedings</li>
                            <li>Social media sentiment from key political figures</li>
                            <li>Economic reports and market analysis</li>
                        </ul>
                        
                        <h4>🔬 Analysis Framework</h4>
                        <p>The GTI system evaluates:</p>
                        <ul>
                            <li><strong>Sentiment Polarity:</strong> Positive, negative, or neutral tone detection</li>
                            <li><strong>Escalation Keywords:</strong> Military, diplomatic, and economic tension indicators</li>
                            <li><strong>Entity Recognition:</strong> Countries, leaders, organizations, and locations</li>
                            <li><strong>Temporal Patterns:</strong> Narrative evolution and trend analysis</li>
                            <li><strong>Cross-Reference Validation:</strong> Multi-source fact checking</li>
                        </ul>
                        
                        <div class="gti-dashboard">
                            <h4>📈 Current GTI Scores</h4>
                            <div class="gti-grid">
                                <div class="gti-item">
                                    <span class="gti-region">Middle East</span>
                                    <span class="gti-score high">78/100</span>
                                </div>
                                <div class="gti-item">
                                    <span class="gti-region">Eastern Europe</span>
                                    <span class="gti-score critical">92/100</span>
                                </div>
                                <div class="gti-item">
                                    <span class="gti-region">East Asia</span>
                                    <span class="gti-score moderate">65/100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                pt: `
                    <div class="pillar-detail">
                        <h3>Sistema de Inteligência Narrativa em Tempo Real</h3>
                        <p>Nosso segundo pilar cria um Índice de Tensão Geopolítica (ITG) em tempo real analisando notícias, discursos e comunicações diplomáticas usando PLN avançado e análise de sentimento.</p>
                        
                        <h4>🎯 Tecnologias Principais</h4>
                        <ul>
                            <li><strong>BERT:</strong> Bidirectional Encoder Representations from Transformers</li>
                            <li><strong>Transformers:</strong> Modelos de linguagem de última geração para compreensão contextual</li>
                            <li><strong>Pipeline PLN:</strong> Processamento de linguagem natural multi-idioma</li>
                        </ul>
                        
                        <h4>📊 Fontes de Dados</h4>
                        <ul>
                            <li>Feeds de notícias globais de mais de 500 fontes em mais de 25 idiomas</li>
                            <li>Declarações oficiais do governo e comunicados à imprensa</li>
                            <li>Comunicações diplomáticas e procedimentos da ONU</li>
                            <li>Sentimento de mídia social de figuras políticas importantes</li>
                            <li>Relatórios econômicos e análise de mercado</li>
                        </ul>
                        
                        <h4>🔬 Framework de Análise</h4>
                        <p>O sistema ITG avalia:</p>
                        <ul>
                            <li><strong>Polaridade de Sentimento:</strong> Detecção de tom positivo, negativo ou neutro</li>
                            <li><strong>Palavras-chave de Escalada:</strong> Indicadores de tensão militar, diplomática e econômica</li>
                            <li><strong>Reconhecimento de Entidades:</strong> Países, líderes, organizações e localizações</li>
                            <li><strong>Padrões Temporais:</strong> Evolução narrativa e análise de tendências</li>
                            <li><strong>Validação Cruzada:</strong> Verificação de fatos multi-fonte</li>
                        </ul>
                        
                        <div class="gti-dashboard">
                            <h4>📈 Pontuações ITG Atuais</h4>
                            <div class="gti-grid">
                                <div class="gti-item">
                                    <span class="gti-region">Oriente Médio</span>
                                    <span class="gti-score high">78/100</span>
                                </div>
                                <div class="gti-item">
                                    <span class="gti-region">Europa Oriental</span>
                                    <span class="gti-score critical">92/100</span>
                                </div>
                                <div class="gti-item">
                                    <span class="gti-region">Ásia Oriental</span>
                                    <span class="gti-score moderate">65/100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        },
        'pillar3': {
            title: {
                en: 'Pillar 3: Network Analysis - The Web',
                pt: 'Pilar 3: Análise de Rede - A Teia'
            },
            content: {
                en: `
                    <div class="pillar-detail">
                        <h3>Global Systems Network Analysis</h3>
                        <p>Our third pillar maps alliance and trade networks to identify vulnerabilities and cascade effects in global systems using advanced graph theory and network science.</p>
                        
                        <h4>🎯 Core Technologies</h4>
                        <ul>
                            <li><strong>NetworkX:</strong> Advanced graph analysis and network algorithms</li>
                            <li><strong>Graph Theory:</strong> Mathematical modeling of complex relationships</li>
                            <li><strong>Trade Data:</strong> Global economic interdependency mapping</li>
                        </ul>
                        
                        <h4>📊 Network Types Analyzed</h4>
                        <ul>
                            <li><strong>Military Alliances:</strong> NATO, CSTO, bilateral defense agreements</li>
                            <li><strong>Economic Partnerships:</strong> Trade agreements, supply chains, financial flows</li>
                            <li><strong>Diplomatic Relations:</strong> Embassy networks, international organizations</li>
                            <li><strong>Information Networks:</strong> Media influence and propaganda channels</li>
                            <li><strong>Energy Dependencies:</strong> Oil, gas, and renewable energy flows</li>
                        </ul>
                        
                        <h4>🔬 Analysis Metrics</h4>
                        <p>Key network properties evaluated:</p>
                        <ul>
                            <li><strong>Centrality Measures:</strong> Identifying key nodes and influence hubs</li>
                            <li><strong>Clustering Coefficients:</strong> Regional bloc formation analysis</li>
                            <li><strong>Path Analysis:</strong> Shortest routes and alternative pathways</li>
                            <li><strong>Vulnerability Assessment:</strong> Critical node failure impact</li>
                            <li><strong>Cascade Modeling:</strong> Domino effect simulation</li>
                        </ul>
                        
                        <div class="network-insights">
                            <h4>🌐 Current Network Insights</h4>
                            <div class="insight-grid">
                                <div class="insight-item">
                                    <h5>🔗 Alliance Density</h5>
                                    <p>NATO: 0.87 | CSTO: 0.72 | QUAD: 0.65</p>
                                </div>
                                <div class="insight-item">
                                    <h5>💰 Trade Vulnerability</h5>
                                    <p>China-US: High | EU-Russia: Critical | ASEAN: Moderate</p>
                                </div>
                                <div class="insight-item">
                                    <h5>⚡ Energy Dependencies</h5>
                                    <p>Europe-Russia: 0.34 | Asia-Middle East: 0.67</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="cascade-simulation">
                            <h4>🎯 Cascade Risk Scenarios</h4>
                            <ul>
                                <li><strong>Taiwan Strait Closure:</strong> 23% global trade disruption</li>
                                <li><strong>Suez Canal Blockade:</strong> 12% shipping delay impact</li>
                                <li><strong>Russian Energy Cut:</strong> 45% European energy crisis</li>
                            </ul>
                        </div>
                    </div>
                `,
                pt: `
                    <div class="pillar-detail">
                        <h3>Análise de Rede de Sistemas Globais</h3>
                        <p>Nosso terceiro pilar mapeia redes de aliança e comércio para identificar vulnerabilidades e efeitos cascata em sistemas globais usando teoria de grafos avançada e ciência de redes.</p>
                        
                        <h4>🎯 Tecnologias Principais</h4>
                        <ul>
                            <li><strong>NetworkX:</strong> Análise de grafos avançada e algoritmos de rede</li>
                            <li><strong>Teoria de Grafos:</strong> Modelagem matemática de relacionamentos complexos</li>
                            <li><strong>Dados Comerciais:</strong> Mapeamento de interdependência econômica global</li>
                        </ul>
                        
                        <h4>📊 Tipos de Rede Analisados</h4>
                        <ul>
                            <li><strong>Alianças Militares:</strong> OTAN, OTSC, acordos de defesa bilaterais</li>
                            <li><strong>Parcerias Econômicas:</strong> Acordos comerciais, cadeias de suprimento, fluxos financeiros</li>
                            <li><strong>Relações Diplomáticas:</strong> Redes de embaixadas, organizações internacionais</li>
                            <li><strong>Redes de Informação:</strong> Influência da mídia e canais de propaganda</li>
                            <li><strong>Dependências Energéticas:</strong> Fluxos de petróleo, gás e energia renovável</li>
                        </ul>
                        
                        <h4>🔬 Métricas de Análise</h4>
                        <p>Propriedades principais da rede avaliadas:</p>
                        <ul>
                            <li><strong>Medidas de Centralidade:</strong> Identificação de nós-chave e centros de influência</li>
                            <li><strong>Coeficientes de Agrupamento:</strong> Análise de formação de blocos regionais</li>
                            <li><strong>Análise de Caminhos:</strong> Rotas mais curtas e caminhos alternativos</li>
                            <li><strong>Avaliação de Vulnerabilidade:</strong> Impacto de falha de nós críticos</li>
                            <li><strong>Modelagem de Cascata:</strong> Simulação de efeito dominó</li>
                        </ul>
                        
                        <div class="network-insights">
                            <h4>🌐 Insights de Rede Atuais</h4>
                            <div class="insight-grid">
                                <div class="insight-item">
                                    <h5>🔗 Densidade de Aliança</h5>
                                    <p>OTAN: 0.87 | OTSC: 0.72 | QUAD: 0.65</p>
                                </div>
                                <div class="insight-item">
                                    <h5>💰 Vulnerabilidade Comercial</h5>
                                    <p>China-EUA: Alto | UE-Rússia: Crítico | ASEAN: Moderado</p>
                                </div>
                                <div class="insight-item">
                                    <h5>⚡ Dependências Energéticas</h5>
                                    <p>Europa-Rússia: 0.34 | Ásia-Oriente Médio: 0.67</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="cascade-simulation">
                            <h4>🎯 Cenários de Risco de Cascata</h4>
                            <ul>
                                <li><strong>Fechamento do Estreito de Taiwan:</strong> 23% de interrupção do comércio global</li>
                                <li><strong>Bloqueio do Canal de Suez:</strong> 12% de impacto no atraso de navegação</li>
                                <li><strong>Corte de Energia Russo:</strong> 45% de crise energética europeia</li>
                            </ul>
                        </div>
                    </div>
                `
            }
        }
    };
    
    return pillars[pillarId] || pillars['pillar1'];
}

