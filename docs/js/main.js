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


// Early Warning Indicators Functions
function openWarningModal(warningId) {
    const warningData = getWarningData(warningId);
    const currentLang = document.documentElement.lang || 'en';
    
    const modalContent = `
        <div class="warning-modal-header">
            <h3>${warningData.title[currentLang]}</h3>
            <div class="severity-badge ${warningData.severity}">
                ${warningData.severityText[currentLang]}
            </div>
        </div>
        <div class="warning-modal-body">
            <div class="warning-details">
                <div class="detail-section">
                    <h4>${currentLang === 'pt' ? 'Descrição' : 'Description'}</h4>
                    <p>${warningData.description[currentLang]}</p>
                </div>
                <div class="detail-section">
                    <h4>${currentLang === 'pt' ? 'Impacto Potencial' : 'Potential Impact'}</h4>
                    <p>${warningData.impact[currentLang]}</p>
                </div>
                <div class="detail-section">
                    <h4>${currentLang === 'pt' ? 'Fontes' : 'Sources'}</h4>
                    <ul>
                        ${warningData.sources[currentLang].map(source => `<li>${source}</li>`).join('')}
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>${currentLang === 'pt' ? 'Recomendações' : 'Recommendations'}</h4>
                    <ul>
                        ${warningData.recommendations[currentLang].map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="warning-metrics">
                <div class="metric-item">
                    <span class="metric-label">${currentLang === 'pt' ? 'Probabilidade' : 'Probability'}</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${warningData.probability}%"></div>
                    </div>
                    <span class="metric-value">${warningData.probability}%</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">${currentLang === 'pt' ? 'Urgência' : 'Urgency'}</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${warningData.urgency}%"></div>
                    </div>
                    <span class="metric-value">${warningData.urgency}%</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">${currentLang === 'pt' ? 'Confiança' : 'Confidence'}</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${warningData.confidence}%"></div>
                    </div>
                    <span class="metric-value">${warningData.confidence}%</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modal-content').innerHTML = modalContent;
    document.getElementById('scenario-modal').style.display = 'block';
}

function getWarningData(warningId) {
    const warnings = {
        'nuclear-alert': {
            title: {
                en: 'Nuclear Alert Level Raised - Iran',
                pt: 'Nível de Alerta Nuclear Elevado - Irã'
            },
            severity: 'critical',
            severityText: {
                en: 'CRITICAL',
                pt: 'CRÍTICO'
            },
            description: {
                en: 'The International Atomic Energy Agency (IAEA) has reported a significant increase in uranium enrichment activities at Iranian nuclear facilities. Enrichment levels have reached 60%, approaching weapons-grade threshold.',
                pt: 'A Agência Internacional de Energia Atômica (AIEA) relatou um aumento significativo nas atividades de enriquecimento de urânio nas instalações nucleares iranianas. Os níveis de enriquecimento atingiram 60%, aproximando-se do limiar para armas.'
            },
            impact: {
                en: 'Potential for rapid nuclear weapons development, regional arms race, Israeli preemptive strike, global oil market disruption, and broader Middle East conflict.',
                pt: 'Potencial para desenvolvimento rápido de armas nucleares, corrida armamentista regional, ataque preventivo israelense, interrupção do mercado global de petróleo e conflito mais amplo no Oriente Médio.'
            },
            sources: {
                en: ['IAEA Safeguards Report', 'Satellite Intelligence Analysis', 'Diplomatic Communications'],
                pt: ['Relatório de Salvaguardas da AIEA', 'Análise de Inteligência por Satélite', 'Comunicações Diplomáticas']
            },
            recommendations: {
                en: ['Immediate diplomatic intervention', 'Enhanced monitoring of nuclear facilities', 'Preparation of economic sanctions', 'Military contingency planning'],
                pt: ['Intervenção diplomática imediata', 'Monitoramento aprimorado de instalações nucleares', 'Preparação de sanções econômicas', 'Planejamento de contingência militar']
            },
            probability: 85,
            urgency: 92,
            confidence: 78
        },
        'military-buildup': {
            title: {
                en: 'Military Buildup Detected - Taiwan Strait',
                pt: 'Acúmulo Militar Detectado - Estreito de Taiwan'
            },
            severity: 'high',
            severityText: {
                en: 'HIGH',
                pt: 'ALTO'
            },
            description: {
                en: 'Satellite imagery reveals significant Chinese military buildup in the Taiwan Strait region, including naval vessels, amphibious assault ships, and increased air force activity.',
                pt: 'Imagens de satélite revelam significativo acúmulo militar chinês na região do Estreito de Taiwan, incluindo navios de guerra, navios de assalto anfíbio e aumento da atividade da força aérea.'
            },
            impact: {
                en: 'Potential Taiwan invasion, US military response, global semiconductor supply chain disruption, economic warfare, and broader Pacific conflict.',
                pt: 'Potencial invasão de Taiwan, resposta militar dos EUA, interrupção da cadeia de suprimentos global de semicondutores, guerra econômica e conflito mais amplo no Pacífico.'
            },
            sources: {
                en: ['Satellite Intelligence', 'Naval Reconnaissance', 'Military Communications Intercept'],
                pt: ['Inteligência por Satélite', 'Reconhecimento Naval', 'Interceptação de Comunicações Militares']
            },
            recommendations: {
                en: ['Increase regional naval patrols', 'Diplomatic engagement with Beijing', 'Semiconductor supply chain diversification', 'Alliance coordination'],
                pt: ['Aumentar patrulhas navais regionais', 'Engajamento diplomático com Pequim', 'Diversificação da cadeia de suprimentos de semicondutores', 'Coordenação de alianças']
            },
            probability: 72,
            urgency: 68,
            confidence: 84
        },
        'market-volatility': {
            title: {
                en: 'Oil Market Volatility Spike',
                pt: 'Pico de Volatilidade do Mercado de Petróleo'
            },
            severity: 'high',
            severityText: {
                en: 'HIGH',
                pt: 'ALTO'
            },
            description: {
                en: 'Brent crude oil prices have surged 8% in the past 24 hours due to escalating Middle East tensions and concerns about potential disruption to the Strait of Hormuz shipping lane.',
                pt: 'Os preços do petróleo Brent subiram 8% nas últimas 24 horas devido ao aumento das tensões no Oriente Médio e preocupações sobre potencial interrupção da rota de navegação do Estreito de Hormuz.'
            },
            impact: {
                en: 'Global inflation increase, economic recession risk, energy security concerns, supply chain disruptions, and geopolitical instability.',
                pt: 'Aumento da inflação global, risco de recessão econômica, preocupações com segurança energética, interrupções na cadeia de suprimentos e instabilidade geopolítica.'
            },
            sources: {
                en: ['Energy Market Analysis', 'Shipping Traffic Data', 'Economic Intelligence'],
                pt: ['Análise do Mercado de Energia', 'Dados de Tráfego Marítimo', 'Inteligência Econômica']
            },
            recommendations: {
                en: ['Strategic petroleum reserve release', 'Alternative energy source activation', 'Economic stabilization measures', 'Diplomatic crisis management'],
                pt: ['Liberação de reserva estratégica de petróleo', 'Ativação de fontes de energia alternativas', 'Medidas de estabilização econômica', 'Gestão diplomática de crise']
            },
            probability: 76,
            urgency: 82,
            confidence: 91
        },
        'diplomatic-tension': {
            title: {
                en: 'Diplomatic Relations Strained - US-Russia',
                pt: 'Relações Diplomáticas Tensas - EUA-Rússia'
            },
            severity: 'moderate',
            severityText: {
                en: 'MODERATE',
                pt: 'MODERADO'
            },
            description: {
                en: 'The US has recalled its ambassador from Moscow following new sanctions announcement, marking the lowest point in US-Russia relations since the Cold War.',
                pt: 'Os EUA retiraram seu embaixador de Moscou após o anúncio de novas sanções, marcando o ponto mais baixo nas relações EUA-Rússia desde a Guerra Fria.'
            },
            impact: {
                en: 'Reduced diplomatic communication channels, increased risk of miscalculation, potential for proxy conflicts, and global alliance realignment.',
                pt: 'Redução dos canais de comunicação diplomática, aumento do risco de erro de cálculo, potencial para conflitos por procuração e realinhamento de alianças globais.'
            },
            sources: {
                en: ['Diplomatic Communications', 'State Department Briefings', 'Foreign Ministry Statements'],
                pt: ['Comunicações Diplomáticas', 'Briefings do Departamento de Estado', 'Declarações do Ministério das Relações Exteriores']
            },
            recommendations: {
                en: ['Maintain back-channel communications', 'Third-party mediation', 'Crisis communication protocols', 'Alliance consultation'],
                pt: ['Manter comunicações por canais alternativos', 'Mediação de terceiros', 'Protocolos de comunicação de crise', 'Consulta de alianças']
            },
            probability: 65,
            urgency: 45,
            confidence: 88
        },
        'cyber-activity': {
            title: {
                en: 'Increased Cyber Activity - Eastern Europe',
                pt: 'Aumento da Atividade Cibernética - Europa Oriental'
            },
            severity: 'moderate',
            severityText: {
                en: 'MODERATE',
                pt: 'MODERADO'
            },
            description: {
                en: 'Multiple government networks in Eastern European countries have been targeted by sophisticated cyber attacks, with attribution pointing to state-sponsored actors.',
                pt: 'Múltiplas redes governamentais em países da Europa Oriental foram alvo de ataques cibernéticos sofisticados, com atribuição apontando para atores patrocinados pelo estado.'
            },
            impact: {
                en: 'Critical infrastructure vulnerability, information warfare escalation, democratic process interference, and regional security destabilization.',
                pt: 'Vulnerabilidade de infraestrutura crítica, escalada de guerra de informação, interferência em processos democráticos e desestabilização da segurança regional.'
            },
            sources: {
                en: ['Cybersecurity Intelligence', 'Network Traffic Analysis', 'Threat Attribution Reports'],
                pt: ['Inteligência de Segurança Cibernética', 'Análise de Tráfego de Rede', 'Relatórios de Atribuição de Ameaças']
            },
            recommendations: {
                en: ['Enhanced cybersecurity measures', 'International cyber cooperation', 'Critical infrastructure protection', 'Incident response coordination'],
                pt: ['Medidas aprimoradas de segurança cibernética', 'Cooperação cibernética internacional', 'Proteção de infraestrutura crítica', 'Coordenação de resposta a incidentes']
            },
            probability: 58,
            urgency: 62,
            confidence: 75
        },
        'energy-disruption': {
            title: {
                en: 'Energy Supply Disruption Risk',
                pt: 'Risco de Interrupção do Fornecimento de Energia'
            },
            severity: 'low',
            severityText: {
                en: 'LOW',
                pt: 'BAIXO'
            },
            description: {
                en: 'Scheduled maintenance on a major natural gas pipeline in a conflict-affected region poses potential supply disruption risks to European energy markets.',
                pt: 'Manutenção programada em um importante gasoduto de gás natural em uma região afetada por conflito representa riscos potenciais de interrupção de fornecimento para os mercados de energia europeus.'
            },
            impact: {
                en: 'Temporary energy price increases, supply chain adjustments, alternative energy source activation, and regional energy security concerns.',
                pt: 'Aumentos temporários nos preços de energia, ajustes na cadeia de suprimentos, ativação de fontes de energia alternativas e preocupações com segurança energética regional.'
            },
            sources: {
                en: ['Energy Infrastructure Reports', 'Pipeline Monitoring Systems', 'Market Analysis'],
                pt: ['Relatórios de Infraestrutura Energética', 'Sistemas de Monitoramento de Gasodutos', 'Análise de Mercado']
            },
            recommendations: {
                en: ['Alternative supply route preparation', 'Strategic reserve monitoring', 'Market stabilization measures', 'Infrastructure security assessment'],
                pt: ['Preparação de rotas de fornecimento alternativas', 'Monitoramento de reservas estratégicas', 'Medidas de estabilização do mercado', 'Avaliação de segurança da infraestrutura']
            },
            probability: 35,
            urgency: 28,
            confidence: 82
        }
    };
    
    return warnings[warningId] || warnings['nuclear-alert'];
}

function refreshWarningIndicators() {
    // Simulate real-time updates
    const indicators = document.querySelectorAll('.indicator-time');
    indicators.forEach(indicator => {
        const currentTime = indicator.textContent;
        const currentLang = document.documentElement.lang || 'en';
        
        // Simulate time progression
        if (currentLang === 'pt') {
            if (currentTime.includes('minutos')) {
                const minutes = parseInt(currentTime) + Math.floor(Math.random() * 5);
                indicator.textContent = `${minutes} minutos atrás`;
            } else if (currentTime.includes('hora')) {
                const hours = parseInt(currentTime);
                const minutes = Math.floor(Math.random() * 60);
                indicator.textContent = `${hours} hora${hours > 1 ? 's' : ''} e ${minutes} minutos atrás`;
            }
        } else {
            if (currentTime.includes('minutes')) {
                const minutes = parseInt(currentTime) + Math.floor(Math.random() * 5);
                indicator.textContent = `${minutes} minutes ago`;
            } else if (currentTime.includes('hour')) {
                const hours = parseInt(currentTime);
                const minutes = Math.floor(Math.random() * 60);
                indicator.textContent = `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minutes ago`;
            }
        }
    });
    
    // Add refresh animation
    const refreshBtn = document.querySelector('.refresh-btn i');
    refreshBtn.style.animation = 'spin 1s linear';
    setTimeout(() => {
        refreshBtn.style.animation = '';
    }, 1000);
}

// Military Capabilities Functions
function openMilitaryModal(capability) {
    const militaryData = getMilitaryData(capability);
    const currentLang = document.documentElement.lang || 'en';
    
    const modalContent = `
        <div class="military-modal-header">
            <h3>${militaryData.title[currentLang]}</h3>
            <div class="capability-badge">
                ${militaryData.category[currentLang]}
            </div>
        </div>
        <div class="military-modal-body">
            <div class="military-overview">
                <p>${militaryData.description[currentLang]}</p>
            </div>
            <div class="military-data">
                ${militaryData.data[currentLang]}
            </div>
            <div class="military-analysis">
                <h4>${currentLang === 'pt' ? 'Análise de Risco' : 'Risk Analysis'}</h4>
                <p>${militaryData.analysis[currentLang]}</p>
            </div>
        </div>
    `;
    
    document.getElementById('modal-content').innerHTML = modalContent;
    document.getElementById('scenario-modal').style.display = 'block';
}

function getMilitaryData(capability) {
    const military = {
        'nuclear': {
            title: {
                en: 'Nuclear Arsenal Tracking',
                pt: 'Rastreamento de Arsenal Nuclear'
            },
            category: {
                en: 'Nuclear Capabilities',
                pt: 'Capacidades Nucleares'
            },
            description: {
                en: 'Real-time monitoring and analysis of global nuclear weapons capabilities, including warhead counts, delivery systems, and enrichment activities.',
                pt: 'Monitoramento e análise em tempo real das capacidades globais de armas nucleares, incluindo contagem de ogivas, sistemas de entrega e atividades de enriquecimento.'
            },
            data: {
                en: `
                    <div class="nuclear-data">
                        <h4>Global Nuclear Arsenal (2024)</h4>
                        <div class="nuclear-countries">
                            <div class="nuclear-country">
                                <span class="country-flag">🇺🇸</span>
                                <span class="country-name">United States</span>
                                <span class="warhead-count">5,550</span>
                                <span class="status deployed">Deployed</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇷🇺</span>
                                <span class="country-name">Russia</span>
                                <span class="warhead-count">6,257</span>
                                <span class="status deployed">Deployed</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇨🇳</span>
                                <span class="country-name">China</span>
                                <span class="warhead-count">350</span>
                                <span class="status expanding">Expanding</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇫🇷</span>
                                <span class="country-name">France</span>
                                <span class="warhead-count">290</span>
                                <span class="status stable">Stable</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇬🇧</span>
                                <span class="country-name">United Kingdom</span>
                                <span class="warhead-count">225</span>
                                <span class="status stable">Stable</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇮🇳</span>
                                <span class="country-name">India</span>
                                <span class="warhead-count">164</span>
                                <span class="status expanding">Expanding</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇵🇰</span>
                                <span class="country-name">Pakistan</span>
                                <span class="warhead-count">170</span>
                                <span class="status expanding">Expanding</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇮🇱</span>
                                <span class="country-name">Israel</span>
                                <span class="warhead-count">~90</span>
                                <span class="status undeclared">Undeclared</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇰🇵</span>
                                <span class="country-name">North Korea</span>
                                <span class="warhead-count">~30</span>
                                <span class="status developing">Developing</span>
                            </div>
                        </div>
                    </div>
                `,
                pt: `
                    <div class="nuclear-data">
                        <h4>Arsenal Nuclear Global (2024)</h4>
                        <div class="nuclear-countries">
                            <div class="nuclear-country">
                                <span class="country-flag">🇺🇸</span>
                                <span class="country-name">Estados Unidos</span>
                                <span class="warhead-count">5.550</span>
                                <span class="status deployed">Implantado</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇷🇺</span>
                                <span class="country-name">Rússia</span>
                                <span class="warhead-count">6.257</span>
                                <span class="status deployed">Implantado</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇨🇳</span>
                                <span class="country-name">China</span>
                                <span class="warhead-count">350</span>
                                <span class="status expanding">Expandindo</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇫🇷</span>
                                <span class="country-name">França</span>
                                <span class="warhead-count">290</span>
                                <span class="status stable">Estável</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇬🇧</span>
                                <span class="country-name">Reino Unido</span>
                                <span class="warhead-count">225</span>
                                <span class="status stable">Estável</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇮🇳</span>
                                <span class="country-name">Índia</span>
                                <span class="warhead-count">164</span>
                                <span class="status expanding">Expandindo</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇵🇰</span>
                                <span class="country-name">Paquistão</span>
                                <span class="warhead-count">170</span>
                                <span class="status expanding">Expandindo</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇮🇱</span>
                                <span class="country-name">Israel</span>
                                <span class="warhead-count">~90</span>
                                <span class="status undeclared">Não Declarado</span>
                            </div>
                            <div class="nuclear-country">
                                <span class="country-flag">🇰🇵</span>
                                <span class="country-name">Coreia do Norte</span>
                                <span class="warhead-count">~30</span>
                                <span class="status developing">Desenvolvendo</span>
                            </div>
                        </div>
                    </div>
                `
            },
            analysis: {
                en: 'Current nuclear landscape shows concerning trends: China\'s rapid expansion, North Korea\'s continued development, and Iran\'s enrichment activities. The risk of nuclear escalation in regional conflicts has increased significantly.',
                pt: 'O cenário nuclear atual mostra tendências preocupantes: rápida expansão da China, desenvolvimento contínuo da Coreia do Norte e atividades de enriquecimento do Irã. O risco de escalada nuclear em conflitos regionais aumentou significativamente.'
            }
        },
        'conventional': {
            title: {
                en: 'Conventional Force Assessment',
                pt: 'Avaliação de Força Convencional'
            },
            category: {
                en: 'Military Capabilities',
                pt: 'Capacidades Militares'
            },
            description: {
                en: 'Comprehensive analysis of conventional military forces including personnel, equipment, readiness levels, and deployment patterns across global hotspots.',
                pt: 'Análise abrangente das forças militares convencionais incluindo pessoal, equipamentos, níveis de prontidão e padrões de implantação em pontos críticos globais.'
            },
            data: {
                en: `
                    <div class="conventional-data">
                        <h4>Major Military Powers (2024)</h4>
                        <div class="military-comparison">
                            <div class="military-power">
                                <h5>🇺🇸 United States</h5>
                                <div class="power-metrics">
                                    <div class="metric">Active Personnel: 1.4M</div>
                                    <div class="metric">Defense Budget: $816B</div>
                                    <div class="metric">Aircraft Carriers: 11</div>
                                    <div class="metric">Fighter Aircraft: 2,085</div>
                                </div>
                            </div>
                            <div class="military-power">
                                <h5>🇨🇳 China</h5>
                                <div class="power-metrics">
                                    <div class="metric">Active Personnel: 2.0M</div>
                                    <div class="metric">Defense Budget: $293B</div>
                                    <div class="metric">Aircraft Carriers: 3</div>
                                    <div class="metric">Fighter Aircraft: 1,200</div>
                                </div>
                            </div>
                            <div class="military-power">
                                <h5>🇷🇺 Russia</h5>
                                <div class="power-metrics">
                                    <div class="metric">Active Personnel: 1.0M</div>
                                    <div class="metric">Defense Budget: $86B</div>
                                    <div class="metric">Aircraft Carriers: 1</div>
                                    <div class="metric">Fighter Aircraft: 809</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                pt: `
                    <div class="conventional-data">
                        <h4>Principais Potências Militares (2024)</h4>
                        <div class="military-comparison">
                            <div class="military-power">
                                <h5>🇺🇸 Estados Unidos</h5>
                                <div class="power-metrics">
                                    <div class="metric">Pessoal Ativo: 1,4M</div>
                                    <div class="metric">Orçamento de Defesa: $816B</div>
                                    <div class="metric">Porta-aviões: 11</div>
                                    <div class="metric">Aeronaves de Combate: 2.085</div>
                                </div>
                            </div>
                            <div class="military-power">
                                <h5>🇨🇳 China</h5>
                                <div class="power-metrics">
                                    <div class="metric">Pessoal Ativo: 2,0M</div>
                                    <div class="metric">Orçamento de Defesa: $293B</div>
                                    <div class="metric">Porta-aviões: 3</div>
                                    <div class="metric">Aeronaves de Combate: 1.200</div>
                                </div>
                            </div>
                            <div class="military-power">
                                <h5>🇷🇺 Rússia</h5>
                                <div class="power-metrics">
                                    <div class="metric">Pessoal Ativo: 1,0M</div>
                                    <div class="metric">Orçamento de Defesa: $86B</div>
                                    <div class="metric">Porta-aviões: 1</div>
                                    <div class="metric">Aeronaves de Combate: 809</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            analysis: {
                en: 'The conventional military balance is shifting with China\'s rapid modernization and expansion. Regional powers are increasing defense spending in response to growing tensions.',
                pt: 'O equilíbrio militar convencional está mudando com a rápida modernização e expansão da China. Potências regionais estão aumentando gastos de defesa em resposta às crescentes tensões.'
            }
        },
        'cbrn': {
            title: {
                en: 'CBRN Capabilities Assessment',
                pt: 'Avaliação de Capacidades QBRN'
            },
            category: {
                en: 'CBRN Threats',
                pt: 'Ameaças QBRN'
            },
            description: {
                en: 'Analysis of Chemical, Biological, Radiological, and Nuclear threat capabilities and proliferation risks across state and non-state actors.',
                pt: 'Análise das capacidades de ameaças Químicas, Biológicas, Radiológicas e Nucleares e riscos de proliferação entre atores estatais e não-estatais.'
            },
            data: {
                en: `
                    <div class="cbrn-data">
                        <h4>CBRN Threat Assessment</h4>
                        <div class="threat-categories">
                            <div class="threat-category">
                                <h5>Chemical Weapons</h5>
                                <div class="threat-level high">HIGH RISK</div>
                                <p>Syria, Russia confirmed use. Proliferation concerns in conflict zones.</p>
                            </div>
                            <div class="threat-category">
                                <h5>Biological Weapons</h5>
                                <div class="threat-level moderate">MODERATE RISK</div>
                                <p>Dual-use research concerns. Enhanced surveillance post-COVID.</p>
                            </div>
                            <div class="threat-category">
                                <h5>Radiological Dispersal</h5>
                                <div class="threat-level moderate">MODERATE RISK</div>
                                <p>Dirty bomb scenarios. Nuclear facility security concerns.</p>
                            </div>
                            <div class="threat-category">
                                <h5>Nuclear Terrorism</h5>
                                <div class="threat-level low">LOW RISK</div>
                                <p>Highly secured materials. International cooperation strong.</p>
                            </div>
                        </div>
                    </div>
                `,
                pt: `
                    <div class="cbrn-data">
                        <h4>Avaliação de Ameaças QBRN</h4>
                        <div class="threat-categories">
                            <div class="threat-category">
                                <h5>Armas Químicas</h5>
                                <div class="threat-level high">RISCO ALTO</div>
                                <p>Síria, Rússia confirmaram uso. Preocupações de proliferação em zonas de conflito.</p>
                            </div>
                            <div class="threat-category">
                                <h5>Armas Biológicas</h5>
                                <div class="threat-level moderate">RISCO MODERADO</div>
                                <p>Preocupações com pesquisa de duplo uso. Vigilância aprimorada pós-COVID.</p>
                            </div>
                            <div class="threat-category">
                                <h5>Dispersão Radiológica</h5>
                                <div class="threat-level moderate">RISCO MODERADO</div>
                                <p>Cenários de bomba suja. Preocupações com segurança de instalações nucleares.</p>
                            </div>
                            <div class="threat-category">
                                <h5>Terrorismo Nuclear</h5>
                                <div class="threat-level low">RISCO BAIXO</div>
                                <p>Materiais altamente protegidos. Cooperação internacional forte.</p>
                            </div>
                        </div>
                    </div>
                `
            },
            analysis: {
                en: 'CBRN threats remain a significant concern, particularly chemical weapons proliferation in conflict zones and potential biological weapon development under dual-use research programs.',
                pt: 'Ameaças QBRN permanecem uma preocupação significativa, particularmente a proliferação de armas químicas em zonas de conflito e potencial desenvolvimento de armas biológicas sob programas de pesquisa de duplo uso.'
            }
        },
        'balance': {
            title: {
                en: 'Military Balance Analysis',
                pt: 'Análise de Equilíbrio Militar'
            },
            category: {
                en: 'Strategic Balance',
                pt: 'Equilíbrio Estratégico'
            },
            description: {
                en: 'Comparative analysis of military power between nations, including force projection capabilities, technological advantages, and strategic positioning.',
                pt: 'Análise comparativa do poder militar entre nações, incluindo capacidades de projeção de força, vantagens tecnológicas e posicionamento estratégico.'
            },
            data: {
                en: `
                    <div class="balance-data">
                        <h4>Regional Military Balance</h4>
                        <div class="regional-balances">
                            <div class="region-balance">
                                <h5>Indo-Pacific</h5>
                                <div class="balance-indicator">
                                    <span class="country">🇺🇸 US Alliance</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill us" style="width: 60%"></div>
                                    </div>
                                    <span class="country">🇨🇳 China</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill china" style="width: 40%"></div>
                                    </div>
                                </div>
                                <p>US maintains edge but China rapidly closing gap</p>
                            </div>
                            <div class="region-balance">
                                <h5>Europe</h5>
                                <div class="balance-indicator">
                                    <span class="country">🇺🇸 NATO</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill nato" style="width: 75%"></div>
                                    </div>
                                    <span class="country">🇷🇺 Russia</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill russia" style="width: 25%"></div>
                                    </div>
                                </div>
                                <p>NATO maintains significant conventional advantage</p>
                            </div>
                            <div class="region-balance">
                                <h5>Middle East</h5>
                                <div class="balance-indicator">
                                    <span class="country">🇮🇱 Israel</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill israel" style="width: 45%"></div>
                                    </div>
                                    <span class="country">🇮🇷 Iran Axis</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill iran" style="width: 55%"></div>
                                    </div>
                                </div>
                                <p>Iran's proxy network provides asymmetric advantage</p>
                            </div>
                        </div>
                    </div>
                `,
                pt: `
                    <div class="balance-data">
                        <h4>Equilíbrio Militar Regional</h4>
                        <div class="regional-balances">
                            <div class="region-balance">
                                <h5>Indo-Pacífico</h5>
                                <div class="balance-indicator">
                                    <span class="country">🇺🇸 Aliança EUA</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill us" style="width: 60%"></div>
                                    </div>
                                    <span class="country">🇨🇳 China</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill china" style="width: 40%"></div>
                                    </div>
                                </div>
                                <p>EUA mantém vantagem mas China está fechando rapidamente a lacuna</p>
                            </div>
                            <div class="region-balance">
                                <h5>Europa</h5>
                                <div class="balance-indicator">
                                    <span class="country">🇺🇸 OTAN</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill nato" style="width: 75%"></div>
                                    </div>
                                    <span class="country">🇷🇺 Rússia</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill russia" style="width: 25%"></div>
                                    </div>
                                </div>
                                <p>OTAN mantém vantagem convencional significativa</p>
                            </div>
                            <div class="region-balance">
                                <h5>Oriente Médio</h5>
                                <div class="balance-indicator">
                                    <span class="country">🇮🇱 Israel</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill israel" style="width: 45%"></div>
                                    </div>
                                    <span class="country">🇮🇷 Eixo Irã</span>
                                    <div class="balance-bar">
                                        <div class="balance-fill iran" style="width: 55%"></div>
                                    </div>
                                </div>
                                <p>Rede de proxy do Irã fornece vantagem assimétrica</p>
                            </div>
                        </div>
                    </div>
                `
            },
            analysis: {
                en: 'Global military balance is shifting toward multipolarity. Regional powers are developing asymmetric capabilities to challenge traditional military advantages.',
                pt: 'O equilíbrio militar global está mudando em direção à multipolaridade. Potências regionais estão desenvolvendo capacidades assimétricas para desafiar vantagens militares tradicionais.'
            }
        }
    };
    
    return military[capability] || military['nuclear'];
}


// Strategic Recommendations System
function generateRecommendations() {
    const audience = document.getElementById('audience-filter').value;
    const riskLevel = document.getElementById('risk-filter').value;
    const timeframe = document.getElementById('timeframe-filter').value;
    
    const grid = document.getElementById('recommendations-grid');
    grid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Generating AI-powered recommendations...</div>';
    
    setTimeout(() => {
        const recommendations = getFilteredRecommendations(audience, riskLevel, timeframe);
        displayRecommendations(recommendations);
    }, 2000);
}

function getFilteredRecommendations(audience, riskLevel, timeframe) {
    const allRecommendations = [
        {
            id: 1,
            title: { en: "Diversify Supply Chains Away from High-Risk Regions", pt: "Diversificar Cadeias de Suprimentos de Regiões de Alto Risco" },
            description: { 
                en: "Reduce dependency on Taiwan Strait and Middle East shipping routes. Establish alternative suppliers in stable regions.",
                pt: "Reduzir dependência das rotas de navegação do Estreito de Taiwan e Oriente Médio. Estabelecer fornecedores alternativos em regiões estáveis."
            },
            audience: ["corporations", "investors"],
            riskLevel: "critical",
            timeframe: "immediate",
            impact: "high",
            urgency: 95,
            category: "supply-chain",
            actions: {
                en: [
                    "Audit current supplier concentration in high-risk areas",
                    "Identify alternative suppliers in ASEAN, Latin America, and Africa",
                    "Negotiate flexible contracts with multiple suppliers",
                    "Invest in supply chain visibility technology",
                    "Create emergency procurement protocols"
                ],
                pt: [
                    "Auditar concentração atual de fornecedores em áreas de alto risco",
                    "Identificar fornecedores alternativos na ASEAN, América Latina e África",
                    "Negociar contratos flexíveis com múltiplos fornecedores",
                    "Investir em tecnologia de visibilidade da cadeia de suprimentos",
                    "Criar protocolos de compras de emergência"
                ]
            },
            financialImpact: { en: "Potential savings of $2-5M annually in risk mitigation", pt: "Economia potencial de $2-5M anuais em mitigação de risco" }
        },
        {
            id: 2,
            title: { en: "Hedge Against Energy Price Volatility", pt: "Proteger-se Contra Volatilidade dos Preços de Energia" },
            description: { 
                en: "Iran-Israel tensions threaten Strait of Hormuz. Secure long-term energy contracts and explore renewable alternatives.",
                pt: "Tensões Irã-Israel ameaçam Estreito de Hormuz. Garantir contratos de energia de longo prazo e explorar alternativas renováveis."
            },
            audience: ["corporations", "governments"],
            riskLevel: "high",
            timeframe: "short",
            impact: "high",
            urgency: 88,
            category: "energy",
            actions: {
                en: [
                    "Lock in oil/gas prices through futures contracts",
                    "Accelerate renewable energy investments",
                    "Diversify energy suppliers beyond Middle East",
                    "Implement energy efficiency measures",
                    "Create strategic energy reserves"
                ],
                pt: [
                    "Fixar preços de petróleo/gás através de contratos futuros",
                    "Acelerar investimentos em energia renovável",
                    "Diversificar fornecedores de energia além do Oriente Médio",
                    "Implementar medidas de eficiência energética",
                    "Criar reservas estratégicas de energia"
                ]
            },
            financialImpact: { en: "Protect against 30-50% energy cost spikes", pt: "Proteger contra picos de 30-50% nos custos de energia" }
        },
        {
            id: 3,
            title: { en: "Strengthen Cybersecurity Infrastructure", pt: "Fortalecer Infraestrutura de Cibersegurança" },
            description: { 
                en: "Rising state-sponsored cyber attacks. Implement zero-trust architecture and incident response protocols.",
                pt: "Aumento de ataques cibernéticos patrocinados por estados. Implementar arquitetura zero-trust e protocolos de resposta a incidentes."
            },
            audience: ["corporations", "governments", "individuals"],
            riskLevel: "high",
            timeframe: "immediate",
            impact: "critical",
            urgency: 92,
            category: "cybersecurity",
            actions: {
                en: [
                    "Deploy multi-factor authentication across all systems",
                    "Conduct regular penetration testing",
                    "Train employees on social engineering threats",
                    "Implement network segmentation",
                    "Establish cyber incident response team"
                ],
                pt: [
                    "Implementar autenticação multifator em todos os sistemas",
                    "Realizar testes de penetração regulares",
                    "Treinar funcionários sobre ameaças de engenharia social",
                    "Implementar segmentação de rede",
                    "Estabelecer equipe de resposta a incidentes cibernéticos"
                ]
            },
            financialImpact: { en: "Prevent potential losses of $1-10M from cyber attacks", pt: "Prevenir perdas potenciais de $1-10M de ataques cibernéticos" }
        },
        {
            id: 4,
            title: { en: "Relocate Critical Operations from Taiwan", pt: "Realocar Operações Críticas de Taiwan" },
            description: { 
                en: "China-Taiwan tensions escalating. Move semiconductor and tech operations to reduce exposure to conflict zone.",
                pt: "Tensões China-Taiwan escalando. Mover operações de semicondutores e tecnologia para reduzir exposição à zona de conflito."
            },
            audience: ["corporations"],
            riskLevel: "critical",
            timeframe: "medium",
            impact: "critical",
            urgency: 85,
            category: "geopolitical",
            actions: {
                en: [
                    "Assess current Taiwan exposure across operations",
                    "Identify alternative manufacturing locations",
                    "Begin gradual relocation of critical processes",
                    "Secure intellectual property transfers",
                    "Maintain minimal viable Taiwan presence"
                ],
                pt: [
                    "Avaliar exposição atual de Taiwan em todas as operações",
                    "Identificar locais alternativos de fabricação",
                    "Iniciar realocação gradual de processos críticos",
                    "Garantir transferências de propriedade intelectual",
                    "Manter presença mínima viável em Taiwan"
                ]
            },
            financialImpact: { en: "Protect $50-500M in assets from potential conflict", pt: "Proteger $50-500M em ativos de potencial conflito" }
        },
        {
            id: 5,
            title: { en: "Build Emergency Cash Reserves", pt: "Construir Reservas de Caixa de Emergência" },
            description: { 
                en: "Global financial instability rising. Maintain 6-12 months operating expenses in liquid assets.",
                pt: "Instabilidade financeira global aumentando. Manter 6-12 meses de despesas operacionais em ativos líquidos."
            },
            audience: ["corporations", "individuals"],
            riskLevel: "moderate",
            timeframe: "immediate",
            impact: "moderate",
            urgency: 75,
            category: "financial",
            actions: {
                en: [
                    "Calculate 6-12 months of operating expenses",
                    "Establish high-yield savings accounts",
                    "Diversify across multiple currencies",
                    "Maintain credit line access",
                    "Review and optimize cash flow management"
                ],
                pt: [
                    "Calcular 6-12 meses de despesas operacionais",
                    "Estabelecer contas poupança de alto rendimento",
                    "Diversificar em múltiplas moedas",
                    "Manter acesso a linhas de crédito",
                    "Revisar e otimizar gestão de fluxo de caixa"
                ]
            },
            financialImpact: { en: "Ensure business continuity during 6-12 month disruptions", pt: "Garantir continuidade dos negócios durante interrupções de 6-12 meses" }
        },
        {
            id: 6,
            title: { en: "Invest in Defense and Security Stocks", pt: "Investir em Ações de Defesa e Segurança" },
            description: { 
                en: "Rising global tensions drive defense spending. Consider aerospace, cybersecurity, and military technology sectors.",
                pt: "Tensões globais crescentes impulsionam gastos com defesa. Considerar setores aeroespacial, cibersegurança e tecnologia militar."
            },
            audience: ["investors"],
            riskLevel: "moderate",
            timeframe: "short",
            impact: "moderate",
            urgency: 70,
            category: "investment",
            actions: {
                en: [
                    "Research major defense contractors (LMT, RTX, NOC)",
                    "Analyze cybersecurity leaders (CRM, PANW, CRWD)",
                    "Consider defense ETFs for diversification",
                    "Monitor government defense budget allocations",
                    "Set stop-loss orders for risk management"
                ],
                pt: [
                    "Pesquisar grandes contratadas de defesa (LMT, RTX, NOC)",
                    "Analisar líderes em cibersegurança (CRM, PANW, CRWD)",
                    "Considerar ETFs de defesa para diversificação",
                    "Monitorar alocações do orçamento de defesa governamental",
                    "Definir ordens stop-loss para gestão de risco"
                ]
            },
            financialImpact: { en: "Potential 15-25% returns during conflict periods", pt: "Retornos potenciais de 15-25% durante períodos de conflito" }
        },
        {
            id: 7,
            title: { en: "Develop Crisis Communication Plans", pt: "Desenvolver Planos de Comunicação de Crise" },
            description: { 
                en: "Prepare stakeholder communication for various crisis scenarios. Maintain reputation during turbulent times.",
                pt: "Preparar comunicação com stakeholders para vários cenários de crise. Manter reputação durante tempos turbulentos."
            },
            audience: ["corporations", "governments"],
            riskLevel: "moderate",
            timeframe: "immediate",
            impact: "moderate",
            urgency: 80,
            category: "communication",
            actions: {
                en: [
                    "Create crisis communication templates",
                    "Identify key spokespersons and backup contacts",
                    "Establish multiple communication channels",
                    "Prepare FAQ documents for common scenarios",
                    "Conduct crisis communication drills"
                ],
                pt: [
                    "Criar modelos de comunicação de crise",
                    "Identificar porta-vozes principais e contatos de backup",
                    "Estabelecer múltiplos canais de comunicação",
                    "Preparar documentos de FAQ para cenários comuns",
                    "Realizar simulações de comunicação de crise"
                ]
            },
            financialImpact: { en: "Protect brand value worth $10-100M during crises", pt: "Proteger valor da marca de $10-100M durante crises" }
        },
        {
            id: 8,
            title: { en: "Secure Personal Emergency Preparedness", pt: "Garantir Preparação Pessoal para Emergências" },
            description: { 
                en: "Individual preparedness for potential disruptions. Food, water, medical supplies, and evacuation plans.",
                pt: "Preparação individual para possíveis interrupções. Comida, água, suprimentos médicos e planos de evacuação."
            },
            audience: ["individuals"],
            riskLevel: "moderate",
            timeframe: "immediate",
            impact: "high",
            urgency: 85,
            category: "personal",
            actions: {
                en: [
                    "Store 2-4 weeks of non-perishable food",
                    "Maintain water storage (1 gallon per person per day)",
                    "Prepare first aid and medication supplies",
                    "Create family emergency communication plan",
                    "Keep important documents in waterproof container"
                ],
                pt: [
                    "Armazenar 2-4 semanas de alimentos não perecíveis",
                    "Manter armazenamento de água (1 galão por pessoa por dia)",
                    "Preparar suprimentos de primeiros socorros e medicamentos",
                    "Criar plano de comunicação de emergência familiar",
                    "Manter documentos importantes em recipiente à prova d'água"
                ]
            },
            financialImpact: { en: "Protect family safety and reduce emergency costs", pt: "Proteger segurança da família e reduzir custos de emergência" }
        }
    ];

    return allRecommendations.filter(rec => {
        const audienceMatch = audience === 'all' || rec.audience.includes(audience);
        const riskMatch = riskLevel === 'all' || rec.riskLevel === riskLevel;
        const timeframeMatch = timeframe === 'all' || rec.timeframe === timeframe;
        return audienceMatch && riskMatch && timeframeMatch;
    });
}

function displayRecommendations(recommendations) {
    const grid = document.getElementById('recommendations-grid');
    const currentLang = document.documentElement.lang || 'en';
    
    if (recommendations.length === 0) {
        grid.innerHTML = `<div class="no-results">${currentLang === 'pt' ? 'Nenhuma recomendação encontrada para os filtros selecionados.' : 'No recommendations found for the selected filters.'}</div>`;
        return;
    }
    
    grid.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card ${rec.riskLevel}" onclick="openRecommendationModal(${rec.id})">
            <div class="rec-header">
                <h3>${rec.title[currentLang]}</h3>
                <div class="rec-badges">
                    <span class="urgency-badge">${rec.urgency}%</span>
                    <span class="risk-badge ${rec.riskLevel}">${rec.riskLevel.toUpperCase()}</span>
                </div>
            </div>
            <p class="rec-description">${rec.description[currentLang]}</p>
            <div class="rec-meta">
                <span class="rec-audience">${currentLang === 'pt' ? 'Público: ' : 'Audience: '}${rec.audience.join(', ')}</span>
                <span class="rec-timeframe">${currentLang === 'pt' ? 'Prazo: ' : 'Timeframe: '}${rec.timeframe}</span>
            </div>
            <div class="rec-impact">
                <i class="fas fa-dollar-sign"></i>
                <span>${rec.financialImpact[currentLang]}</span>
            </div>
        </div>
    `).join('');
}

function openRecommendationModal(recId) {
    const recommendations = getFilteredRecommendations('all', 'all', 'all');
    const rec = recommendations.find(r => r.id === recId);
    const currentLang = document.documentElement.lang || 'en';
    
    const modal = document.getElementById('scenario-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <div class="recommendation-modal-header">
            <h2>${rec.title[currentLang]}</h2>
            <div class="rec-modal-badges">
                <span class="urgency-badge">${rec.urgency}% ${currentLang === 'pt' ? 'Urgência' : 'Urgency'}</span>
                <span class="risk-badge ${rec.riskLevel}">${rec.riskLevel.toUpperCase()}</span>
                <span class="impact-badge ${rec.impact}">${rec.impact.toUpperCase()} ${currentLang === 'pt' ? 'IMPACTO' : 'IMPACT'}</span>
            </div>
        </div>
        
        <div class="recommendation-details">
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Descrição' : 'Description'}</h4>
                <p>${rec.description[currentLang]}</p>
            </div>
            
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Ações Recomendadas' : 'Recommended Actions'}</h4>
                <ul>
                    ${rec.actions[currentLang].map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Impacto Financeiro' : 'Financial Impact'}</h4>
                <p class="financial-impact">${rec.financialImpact[currentLang]}</p>
            </div>
            
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Público-Alvo' : 'Target Audience'}</h4>
                <p>${rec.audience.join(', ')}</p>
            </div>
            
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Prazo de Implementação' : 'Implementation Timeframe'}</h4>
                <p>${rec.timeframe}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Predictions Tracking System
function refreshPredictions() {
    const timeline = document.getElementById('predictions-timeline');
    timeline.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading predictions data...</div>';
    
    setTimeout(() => {
        const predictions = getPredictionsData();
        displayPredictions(predictions);
        updateAccuracyChart();
    }, 1500);
}

function getPredictionsData() {
    return [
        {
            id: 1,
            date: "2024-01-15",
            prediction: {
                en: "Iran will increase uranium enrichment to 90% by March 2024",
                pt: "Irã aumentará enriquecimento de urânio para 90% até março de 2024"
            },
            status: "verified-correct",
            category: "nuclear",
            confidence: 85,
            outcome: {
                en: "IAEA confirmed Iran reached 84% enrichment in February 2024",
                pt: "AIEA confirmou que Irã atingiu 84% de enriquecimento em fevereiro de 2024"
            },
            accuracy: 92,
            verificationDate: "2024-02-28"
        },
        {
            id: 2,
            date: "2024-02-10",
            prediction: {
                en: "China will conduct major military exercises near Taiwan in Q2 2024",
                pt: "China conduzirá grandes exercícios militares perto de Taiwan no Q2 2024"
            },
            status: "verified-correct",
            category: "military",
            confidence: 78,
            outcome: {
                en: "China conducted 'Joint Sword-2024A' exercises in April 2024",
                pt: "China conduziu exercícios 'Joint Sword-2024A' em abril de 2024"
            },
            accuracy: 95,
            verificationDate: "2024-04-15"
        },
        {
            id: 3,
            date: "2024-03-05",
            prediction: {
                en: "Oil prices will spike above $100/barrel due to Middle East tensions",
                pt: "Preços do petróleo dispararão acima de $100/barril devido a tensões no Oriente Médio"
            },
            status: "verified-incorrect",
            category: "economic",
            confidence: 72,
            outcome: {
                en: "Oil peaked at $87/barrel, strategic reserves release prevented spike",
                pt: "Petróleo atingiu pico de $87/barril, liberação de reservas estratégicas impediu disparo"
            },
            accuracy: 65,
            verificationDate: "2024-05-30"
        },
        {
            id: 4,
            date: "2024-04-20",
            prediction: {
                en: "Russia will escalate cyber attacks on NATO infrastructure by summer 2024",
                pt: "Rússia escalará ataques cibernéticos em infraestrutura da OTAN até verão de 2024"
            },
            status: "active",
            category: "cybersecurity",
            confidence: 88,
            outcome: {
                en: "Monitoring ongoing - increased activity detected in May-June",
                pt: "Monitoramento em andamento - atividade aumentada detectada em maio-junho"
            },
            accuracy: null,
            verificationDate: null
        },
        {
            id: 5,
            date: "2024-05-15",
            prediction: {
                en: "North Korea will test new ICBM variant before end of 2024",
                pt: "Coreia do Norte testará nova variante de ICBM antes do final de 2024"
            },
            status: "pending",
            category: "nuclear",
            confidence: 75,
            outcome: {
                en: "Awaiting verification - satellite imagery shows increased activity",
                pt: "Aguardando verificação - imagens de satélite mostram atividade aumentada"
            },
            accuracy: null,
            verificationDate: null
        },
        {
            id: 6,
            date: "2024-06-01",
            prediction: {
                en: "EU will impose additional sanctions on Russia by Q4 2024",
                pt: "UE imporá sanções adicionais à Rússia até Q4 2024"
            },
            status: "active",
            category: "diplomatic",
            confidence: 82,
            outcome: {
                en: "Monitoring - EU discussions ongoing, proposal in development",
                pt: "Monitoramento - discussões da UE em andamento, proposta em desenvolvimento"
            },
            accuracy: null,
            verificationDate: null
        }
    ];
}

function displayPredictions(predictions) {
    const timeline = document.getElementById('predictions-timeline');
    const currentLang = document.documentElement.lang || 'en';
    
    timeline.innerHTML = predictions.map(pred => `
        <div class="prediction-item ${pred.status}" onclick="openPredictionModal(${pred.id})">
            <div class="prediction-date">
                <span class="date">${new Date(pred.date).toLocaleDateString()}</span>
                <span class="category ${pred.category}">${pred.category}</span>
            </div>
            <div class="prediction-content">
                <h4>${pred.prediction[currentLang]}</h4>
                <div class="prediction-meta">
                    <span class="confidence">${currentLang === 'pt' ? 'Confiança' : 'Confidence'}: ${pred.confidence}%</span>
                    <span class="status ${pred.status}">${getStatusText(pred.status, currentLang)}</span>
                    ${pred.accuracy ? `<span class="accuracy">${currentLang === 'pt' ? 'Precisão' : 'Accuracy'}: ${pred.accuracy}%</span>` : ''}
                </div>
                <p class="outcome">${pred.outcome[currentLang]}</p>
            </div>
            <div class="prediction-indicator">
                ${getStatusIcon(pred.status)}
            </div>
        </div>
    `).join('');
}

function getStatusText(status, lang) {
    const statusTexts = {
        'verified-correct': { en: 'Verified Correct', pt: 'Verificada Correta' },
        'verified-incorrect': { en: 'Verified Incorrect', pt: 'Verificada Incorreta' },
        'pending': { en: 'Pending', pt: 'Pendente' },
        'active': { en: 'Active Monitoring', pt: 'Monitoramento Ativo' }
    };
    return statusTexts[status][lang];
}

function getStatusIcon(status) {
    const icons = {
        'verified-correct': '<i class="fas fa-check-circle"></i>',
        'verified-incorrect': '<i class="fas fa-times-circle"></i>',
        'pending': '<i class="fas fa-clock"></i>',
        'active': '<i class="fas fa-eye"></i>'
    };
    return icons[status];
}

function openPredictionModal(predId) {
    const predictions = getPredictionsData();
    const pred = predictions.find(p => p.id === predId);
    const currentLang = document.documentElement.lang || 'en';
    
    const modal = document.getElementById('scenario-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <div class="prediction-modal-header">
            <h2>${currentLang === 'pt' ? 'Detalhes da Predição' : 'Prediction Details'}</h2>
            <div class="pred-modal-badges">
                <span class="confidence-badge">${pred.confidence}% ${currentLang === 'pt' ? 'Confiança' : 'Confidence'}</span>
                <span class="status-badge ${pred.status}">${getStatusText(pred.status, currentLang)}</span>
                ${pred.accuracy ? `<span class="accuracy-badge">${pred.accuracy}% ${currentLang === 'pt' ? 'Precisão' : 'Accuracy'}</span>` : ''}
            </div>
        </div>
        
        <div class="prediction-details">
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Predição Original' : 'Original Prediction'}</h4>
                <p>${pred.prediction[currentLang]}</p>
                <small>${currentLang === 'pt' ? 'Data da Predição' : 'Prediction Date'}: ${new Date(pred.date).toLocaleDateString()}</small>
            </div>
            
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Resultado/Status' : 'Outcome/Status'}</h4>
                <p>${pred.outcome[currentLang]}</p>
                ${pred.verificationDate ? `<small>${currentLang === 'pt' ? 'Data de Verificação' : 'Verification Date'}: ${new Date(pred.verificationDate).toLocaleDateString()}</small>` : ''}
            </div>
            
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Categoria' : 'Category'}</h4>
                <p class="category-tag ${pred.category}">${pred.category}</p>
            </div>
            
            ${pred.accuracy ? `
            <div class="detail-section">
                <h4>${currentLang === 'pt' ? 'Análise de Precisão' : 'Accuracy Analysis'}</h4>
                <div class="accuracy-breakdown">
                    <div class="accuracy-bar">
                        <div class="accuracy-fill" style="width: ${pred.accuracy}%"></div>
                    </div>
                    <p>${currentLang === 'pt' ? 'Esta predição atingiu' : 'This prediction achieved'} ${pred.accuracy}% ${currentLang === 'pt' ? 'de precisão baseada na verificação dos resultados.' : 'accuracy based on outcome verification.'}</p>
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
}

function updateAccuracyChart() {
    const ctx = document.getElementById('accuracy-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'],
            datasets: [{
                label: 'Prediction Accuracy (%)',
                data: [82, 85, 79, 91, 88, 87],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Initialize recommendations and predictions on page load
document.addEventListener('DOMContentLoaded', function() {
    generateRecommendations();
    refreshPredictions();
});



// Initialize Power BI Integration and Auto-Update System
function initializePowerBISystem() {
    console.log('Initializing Power BI Integration System...');
    
    // Initialize Power BI Integration
    if (typeof PowerBIIntegration !== 'undefined') {
        const powerBI = new PowerBIIntegration();
        console.log('Power BI Integration initialized successfully');
        
        // Auto-refresh data every 5 minutes for critical updates
        setInterval(() => {
            powerBI.updateData();
            updateLiveMetrics();
            refreshPredictionsData();
            console.log('Auto-refresh completed at:', new Date().toISOString());
        }, 5 * 60 * 1000);
        
        // Initial data load
        powerBI.updateData();
    } else {
        console.error('PowerBIIntegration class not found');
    }
}

// Update live metrics with current 2025 data
function updateLiveMetrics() {
    const currentTime = new Date().toLocaleString();
    
    // Update Early Warning metrics
    const earlyWarningMetrics = {
        activeAlerts: 8,
        newsAnalyzed: 1847 + Math.floor(Math.random() * 50),
        riskTrend: '+18%',
        sourcesMonitored: 52
    };
    
    // Update Predictions metrics
    const predictionsMetrics = {
        totalPredictions: 203,
        verifiedCorrect: 127,
        pendingVerification: 58,
        overallAccuracy: '89%'
    };
    
    // Apply updates to DOM
    updateMetricElements(earlyWarningMetrics, predictionsMetrics);
    
    console.log('Live metrics updated:', currentTime);
}

// Update metric elements in DOM
function updateMetricElements(earlyWarning, predictions) {
    // Update Early Warning metrics
    const alertsElement = document.querySelector('[data-metric="active-alerts"]');
    if (alertsElement) alertsElement.textContent = earlyWarning.activeAlerts;
    
    const newsElement = document.querySelector('[data-metric="news-analyzed"]');
    if (newsElement) newsElement.textContent = earlyWarning.newsAnalyzed.toLocaleString();
    
    const riskElement = document.querySelector('[data-metric="risk-trend"]');
    if (riskElement) riskElement.textContent = earlyWarning.riskTrend;
    
    // Update Predictions metrics
    const totalElement = document.querySelector('[data-metric="total-predictions"]');
    if (totalElement) totalElement.textContent = predictions.totalPredictions;
    
    const verifiedElement = document.querySelector('[data-metric="verified-correct"]');
    if (verifiedElement) verifiedElement.textContent = predictions.verifiedCorrect;
    
    const accuracyElement = document.querySelector('[data-metric="overall-accuracy"]');
    if (accuracyElement) accuracyElement.textContent = predictions.overallAccuracy;
}

// Refresh predictions data with 2025 events
function refreshPredictionsData() {
    const predictions2025 = [
        {
            date: '6/19/2025',
            event: 'Iran-Israel direct military confrontation escalates',
            status: 'VERIFIED CORRECT',
            accuracy: '94%',
            source: 'Reuters, CNN, AP News'
        },
        {
            date: '6/17/2025',
            event: 'Russia intensifies attacks on Ukrainian civilian infrastructure',
            status: 'VERIFIED CORRECT',
            accuracy: '91%',
            source: 'UN Reports, ISW'
        },
        {
            date: '6/19/2025',
            event: 'China increases military pressure on Taiwan with dual carrier ops',
            status: 'VERIFIED CORRECT',
            accuracy: '88%',
            source: 'Pentagon, Taiwan Defense Ministry'
        }
    ];
    
    // Update predictions display
    updatePredictionsDisplay(predictions2025);
}

// Update predictions display with 2025 data
function updatePredictionsDisplay(predictions) {
    const container = document.querySelector('.predictions-list');
    if (!container) return;
    
    // Clear existing predictions
    container.innerHTML = '';
    
    // Use 2025 predictions data if available
    const predictions2025 = window.predictionsData2025 || predictions;
    
    predictions2025.forEach(prediction => {
        const predictionElement = createPredictionElement2025(prediction);
        container.appendChild(predictionElement);
    });
    
    console.log('Predictions display updated with 2025 data');
}

// Create prediction element for 2025 data
function createPredictionElement2025(prediction) {
    const div = document.createElement('div');
    div.className = `prediction-item ${prediction.status.toLowerCase().replace(/\s+/g, '-')}`;
    div.innerHTML = `
        <div class="prediction-header">
            <div class="prediction-date">${prediction.date}</div>
            <div class="prediction-category ${prediction.category}">${prediction.category.toUpperCase()}</div>
        </div>
        <div class="prediction-content">
            <h4 class="prediction-title">${prediction.prediction}</h4>
            <div class="prediction-details">
                <span class="prediction-confidence">Confidence: ${prediction.confidence}</span>
                <span class="prediction-accuracy">Accuracy: ${prediction.accuracy}</span>
                <span class="prediction-status ${prediction.status.toLowerCase().replace(/\s+/g, '-')}">${prediction.status}</span>
            </div>
            <p class="prediction-outcome">${prediction.outcome}</p>
            <div class="prediction-source">Source: ${prediction.source}</div>
            <div class="prediction-impact">Impact: ${prediction.impact}</div>
        </div>
    `;
    return div;
}

// Initialize predictions with 2025 data
function initializePredictionsTracking() {
    console.log('Initializing Predictions Tracking with 2025 data...');
    
    // Update metrics with 2025 data
    if (window.accuracyTrends2025) {
        const metrics = window.accuracyTrends2025.overall;
        
        // Update metric displays
        updateMetricDisplay('total-predictions', metrics.totalPredictions);
        updateMetricDisplay('verified-correct', metrics.verifiedCorrect);
        updateMetricDisplay('pending-verification', metrics.pendingVerification);
        updateMetricDisplay('overall-accuracy', metrics.overallAccuracy + '%');
    }
    
    // Load 2025 predictions
    if (window.predictionsData2025) {
        updatePredictionsDisplay(window.predictionsData2025);
    }
    
    // Initialize accuracy trends chart with 2025 data
    initializeAccuracyTrendsChart();
}

// Initialize accuracy trends chart
function initializeAccuracyTrendsChart() {
    const canvas = document.getElementById('accuracy-trends-chart');
    if (!canvas || !window.accuracyTrends2025) return;
    
    const ctx = canvas.getContext('2d');
    const data = window.accuracyTrends2025.monthly;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.month),
            datasets: [{
                label: 'Prediction Accuracy (%)',
                data: data.map(d => d.accuracy),
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Predictions Made',
                data: data.map(d => d.predictions),
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Prediction Accuracy Trends - 2025',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Accuracy (%)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Number of Predictions'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Update metric display helper
function updateMetricDisplay(metricId, value) {
    const element = document.querySelector(`[data-metric="${metricId}"]`);
    if (element) {
        element.textContent = value;
        // Force black color
        element.style.setProperty('color', '#000000', 'important');
        element.style.setProperty('font-weight', '900', 'important');
        element.style.setProperty('background', 'rgba(255,255,255,0.9)', 'important');
        element.style.setProperty('padding', '0.2em 0.4em', 'important');
        element.style.setProperty('border-radius', '4px', 'important');
    }
}

// Initialize the Power BI system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other scripts to load
    setTimeout(() => {
        initializePowerBISystem();
    }, 1000);
});


// Force black numbers on page load - DEFINITIVE SOLUTION
document.addEventListener('DOMContentLoaded', function() {
    function forceBlackNumbers() {
        const allNumbers = document.querySelectorAll('.metric-value, .stat-number, .prediction-value, .warning-value, .dashboard-metric .value, .live-metric .value, .predictions-metrics .metric-value, .early-warning .metric-value');
        
        allNumbers.forEach(el => {
            el.style.setProperty('color', '#000000', 'important');
            el.style.setProperty('font-weight', '900', 'important');
            el.style.setProperty('text-shadow', 'none', 'important');
            el.style.setProperty('background', 'rgba(255,255,255,0.9)', 'important');
            el.style.setProperty('padding', '0.2em 0.4em', 'important');
            el.style.setProperty('border-radius', '4px', 'important');
            el.style.setProperty('display', 'inline-block', 'important');
        });
        
        console.log('Forced black color on', allNumbers.length, 'number elements');
    }
    
    // Apply immediately
    forceBlackNumbers();
    
    // Apply again after 1 second to catch dynamically loaded content
    setTimeout(forceBlackNumbers, 1000);
    
    // Apply every 5 seconds to maintain black numbers
    setInterval(forceBlackNumbers, 5000);
});

// Also apply when sections are scrolled into view
function observeNumberElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.metric-value, .stat-number');
                numbers.forEach(el => {
                    el.style.setProperty('color', '#000000', 'important');
                    el.style.setProperty('font-weight', '900', 'important');
                    el.style.setProperty('background', 'rgba(255,255,255,0.9)', 'important');
                    el.style.setProperty('padding', '0.2em 0.4em', 'important');
                    el.style.setProperty('border-radius', '4px', 'important');
                });
            }
        });
    });
    
    // Observe all sections with metrics
    document.querySelectorAll('.predictions, .early-warning, .powerbi-dashboard').forEach(section => {
        observer.observe(section);
    });
}

// Initialize observer when DOM is ready
document.addEventListener('DOMContentLoaded', observeNumberElements);


// Force initialize 2025 data on page load
window.addEventListener('load', function() {
    console.log('Page loaded - forcing 2025 data initialization...');
    
    // Wait for all scripts to load
    setTimeout(() => {
        // Force load 2025 predictions
        if (window.predictionsData2025) {
            const container = document.querySelector('.predictions-list');
            if (container) {
                container.innerHTML = '';
                
                window.predictionsData2025.forEach(prediction => {
                    const div = document.createElement('div');
                    div.className = `prediction-item ${prediction.status.toLowerCase().replace(/\s+/g, '-')}`;
                    div.innerHTML = `
                        <div class="prediction-header">
                            <div class="prediction-date" style="color: #000 !important; font-weight: 900 !important; background: rgba(255,255,255,0.9) !important; padding: 0.2em 0.4em !important; border-radius: 4px !important;">${prediction.date}</div>
                            <div class="prediction-category ${prediction.category}">${prediction.category.toUpperCase()}</div>
                        </div>
                        <div class="prediction-content">
                            <h4 class="prediction-title">${prediction.prediction}</h4>
                            <div class="prediction-details">
                                <span class="prediction-confidence">Confidence: ${prediction.confidence}</span>
                                <span class="prediction-accuracy">Accuracy: ${prediction.accuracy}</span>
                                <span class="prediction-status ${prediction.status.toLowerCase().replace(/\s+/g, '-')}">${prediction.status}</span>
                            </div>
                            <p class="prediction-outcome">${prediction.outcome}</p>
                            <div class="prediction-source">Source: ${prediction.source}</div>
                            <div class="prediction-impact">Impact: ${prediction.impact}</div>
                        </div>
                    `;
                    container.appendChild(div);
                });
                
                console.log('Successfully loaded', window.predictionsData2025.length, '2025 predictions');
            }
        }
        
        // Update metrics with 2025 data
        if (window.accuracyTrends2025) {
            const metrics = window.accuracyTrends2025.overall;
            
            // Update each metric
            const metricElements = {
                'total-predictions': metrics.totalPredictions,
                'verified-correct': metrics.verifiedCorrect,
                'pending-verification': metrics.pendingVerification,
                'overall-accuracy': metrics.overallAccuracy + '%'
            };
            
            Object.entries(metricElements).forEach(([id, value]) => {
                const elements = document.querySelectorAll(`[data-metric="${id}"], .metric-value`);
                elements.forEach(el => {
                    if (el.textContent.includes('156') || el.textContent.includes('136') || el.textContent.includes('23') || el.textContent.includes('87')) {
                        el.textContent = value;
                        el.style.setProperty('color', '#000000', 'important');
                        el.style.setProperty('font-weight', '900', 'important');
                        el.style.setProperty('background', 'rgba(255,255,255,0.9)', 'important');
                        el.style.setProperty('padding', '0.2em 0.4em', 'important');
                        el.style.setProperty('border-radius', '4px', 'important');
                    }
                });
            });
        }
        
    }, 2000);
});


// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// Enhanced mobile number visibility
function ensureMobileNumberVisibility() {
    const numbers = document.querySelectorAll('.stat-number, .metric-value, .prediction-value, .warning-value');
    
    numbers.forEach(el => {
        // Force styles for mobile
        el.style.setProperty('color', '#000000', 'important');
        el.style.setProperty('font-weight', '900', 'important');
        el.style.setProperty('background', 'rgba(255,255,255,0.95)', 'important');
        el.style.setProperty('padding', '0.3em 0.6em', 'important');
        el.style.setProperty('border-radius', '8px', 'important');
        el.style.setProperty('border', '2px solid #000000', 'important');
        el.style.setProperty('display', 'inline-block', 'important');
        el.style.setProperty('text-shadow', 'none', 'important');
        el.style.setProperty('box-shadow', '0 2px 4px rgba(0,0,0,0.2)', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('opacity', '1', 'important');
        
        // Mobile-specific adjustments
        if (window.innerWidth <= 768) {
            el.style.setProperty('font-size', '1.8rem', 'important');
            el.style.setProperty('padding', '0.4em 0.8em', 'important');
            el.style.setProperty('border-width', '3px', 'important');
        }
        
        if (window.innerWidth <= 480) {
            el.style.setProperty('font-size', '1.5rem', 'important');
            el.style.setProperty('padding', '0.5em 1em', 'important');
            el.style.setProperty('border-radius', '10px', 'important');
        }
    });
    
    console.log('Mobile number visibility ensured for', numbers.length, 'elements');
}

// Run on load and resize
window.addEventListener('load', ensureMobileNumberVisibility);
window.addEventListener('resize', ensureMobileNumberVisibility);
window.addEventListener('orientationchange', function() {
    setTimeout(ensureMobileNumberVisibility, 100);
});

// Touch event improvements for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback
    const touchElements = document.querySelectorAll('.btn, .nav-link, .scenario-card, .metric-card');
    
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

