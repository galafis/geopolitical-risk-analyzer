// MOBILE-OPTIMIZED JAVASCRIPT

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile-optimized JavaScript loading...');
    
    // Mobile Navigation
    initializeMobileNavigation();
    
    // Force number visibility
    forceNumberVisibility();
    
    // Touch optimizations
    initializeTouchOptimizations();
    
    // Responsive adjustments
    handleResponsiveAdjustments();
    
    console.log('Mobile optimizations loaded successfully');
});

function initializeMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) {
        console.warn('Navigation elements not found');
        return;
    }
    
    // Toggle menu
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle('active');
        
        // Update icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Restore scroll
        }
    });
    
    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    function closeMenu() {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
    
    console.log('Mobile navigation initialized');
}

function forceNumberVisibility() {
    const selectors = [
        '.stat-number',
        '.metric-value', 
        '.prediction-value',
        '.warning-value',
        '[data-metric]',
        '.accuracy-value',
        '.risk-score'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Force visibility styles
            el.style.setProperty('display', 'inline-block', 'important');
            el.style.setProperty('visibility', 'visible', 'important');
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('color', '#000000', 'important');
            el.style.setProperty('font-weight', '900', 'important');
            el.style.setProperty('background', 'rgba(255,255,255,0.95)', 'important');
            el.style.setProperty('padding', '0.3em 0.6em', 'important');
            el.style.setProperty('border-radius', '8px', 'important');
            el.style.setProperty('border', '2px solid #000000', 'important');
            el.style.setProperty('text-shadow', 'none', 'important');
            el.style.setProperty('box-shadow', '0 2px 4px rgba(0,0,0,0.2)', 'important');
            el.style.setProperty('z-index', '10', 'important');
            el.style.setProperty('position', 'relative', 'important');
            
            // Mobile-specific adjustments
            if (window.innerWidth <= 768) {
                el.style.setProperty('font-size', '1.5rem', 'important');
                el.style.setProperty('padding', '0.4em 0.8em', 'important');
                el.style.setProperty('margin', '0.25rem', 'important');
            }
            
            if (window.innerWidth <= 480) {
                el.style.setProperty('font-size', '1.3rem', 'important');
                el.style.setProperty('padding', '0.5em 1em', 'important');
                el.style.setProperty('border-width', '3px', 'important');
            }
        });
    });
    
    console.log('Number visibility forced for all elements');
}

function initializeTouchOptimizations() {
    // Only run on touch devices
    if (!('ontouchstart' in window)) return;
    
    document.body.classList.add('touch-device');
    
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .nav-link, .scenario-card, .metric-card, .pillar-card, .tech-item');
    
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
        
        el.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
    
    console.log('Touch optimizations initialized');
}

function handleResponsiveAdjustments() {
    function adjustForViewport() {
        const width = window.innerWidth;
        
        // Force number visibility on every resize
        forceNumberVisibility();
        
        // Adjust hero stats layout
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            if (width <= 480) {
                heroStats.style.gridTemplateColumns = '1fr';
                heroStats.style.gap = '1.5rem';
            } else if (width <= 768) {
                heroStats.style.gridTemplateColumns = 'repeat(3, 1fr)';
                heroStats.style.gap = '1rem';
            }
        }
        
        // Adjust metric grids
        const metricGrids = document.querySelectorAll('.predictions-metrics, .early-warning-metrics');
        metricGrids.forEach(grid => {
            if (width <= 480) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (width <= 768) {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            }
        });
        
        console.log(`Responsive adjustments applied for width: ${width}px`);
    }
    
    // Run on load
    adjustForViewport();
    
    // Run on resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustForViewport, 100);
    });
    
    // Run on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(adjustForViewport, 200);
    });
}

// Language switching (maintain existing functionality)
function setLanguage(lang) {
    document.querySelectorAll('[data-en], [data-pt]').forEach(el => {
        if (lang === 'en' && el.hasAttribute('data-en')) {
            el.textContent = el.getAttribute('data-en');
        } else if (lang === 'pt' && el.hasAttribute('data-pt')) {
            el.textContent = el.getAttribute('data-pt');
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Force number visibility after language change
    setTimeout(forceNumberVisibility, 100);
}

// Initialize language buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-pt')?.addEventListener('click', () => setLanguage('pt'));
});

// Continuous number visibility check (fallback)
setInterval(function() {
    const numbers = document.querySelectorAll('.stat-number, .metric-value');
    let needsUpdate = false;
    
    numbers.forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.color !== 'rgb(0, 0, 0)' || styles.visibility !== 'visible') {
            needsUpdate = true;
        }
    });
    
    if (needsUpdate) {
        forceNumberVisibility();
        console.log('Numbers re-forced due to style changes');
    }
}, 5000); // Check every 5 seconds

console.log('Mobile-optimized JavaScript loaded');

