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

