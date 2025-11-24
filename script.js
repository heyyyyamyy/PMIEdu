// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 170, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + (element.dataset.suffix || '');
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

// Initialize counters when page loads
function calculateDailyIncrement(base, startDateISO, perDay) {
    const start = new Date(startDateISO);
    const now = new Date();
    const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.floor((nowUTC - startUTC) / (1000 * 60 * 60 * 24));
    return base + Math.max(0, days) * perDay;
}

window.addEventListener('load', function () {
    const dynamicSuccessCount = calculateDailyIncrement(48478, '2025-11-24', 10);
    const heroCounters = document.querySelectorAll('#home .stat-item .stat-number');
    heroCounters.forEach((counter, index) => {
        const values = [dynamicSuccessCount, 20];
        const suffixes = ['+', '+'];
        counter.dataset.target = values[index];
        counter.dataset.suffix = suffixes[index];
        counterObserver.observe(counter);
    });
    const aboutCounters = document.querySelectorAll('.stat-card .stat-number');
    aboutCounters.forEach((counter, index) => {
        const values = [dynamicSuccessCount, 20, 15, 98];
        const suffixes = ['+', '+', '+', '%'];
        counter.dataset.target = values[index];
        counter.dataset.suffix = suffixes[index];
        counterObserver.observe(counter);
    });
});

// Floating shapes animation enhancement
function enhanceFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 3000 + index * 1000);
    });
}

// Particle system for hero background
function createParticleSystem() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return; // Exit if hero section doesn't exist

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 170, 0.6);
            border-radius: 50%;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }

    heroSection.appendChild(particleContainer);
}

// Add particle animation keyframes
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced button hover effects
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.btn-glow, .btn-cert-primary, .btn-deal-primary');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click ripple effect
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Countdown timer for deals
function initializeCountdownTimer() {
    const timerDisplay = document.querySelector('.timer-display');
    if (!timerDisplay) return;

    // Set countdown to 6 hours from now
    const countdownTime = new Date().getTime() + (6 * 60 * 60 * 1000);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = countdownTime - now;

        if (distance < 0) {
            timerDisplay.innerHTML = '<span class="timer-unit">00</span>:<span class="timer-unit">00</span>:<span class="timer-unit">00</span>';
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDisplay.innerHTML = `
            <span class="timer-unit">${hours.toString().padStart(2, '0')}</span>:
            <span class="timer-unit">${minutes.toString().padStart(2, '0')}</span>:
            <span class="timer-unit">${seconds.toString().padStart(2, '0')}</span>
        `;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Parallax effect for sections
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-animation, .floating-elements');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced card hover effects
function enhanceCardEffects() {
    const cards = document.querySelectorAll('.cert-card, .deal-card, .feature-item, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

// Typing animation for hero title
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const textContent = heroTitle.textContent;
    heroTitle.innerHTML = '';

    let i = 0;
    function typeWriter() {
        if (i < textContent.length) {
            heroTitle.innerHTML = originalText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Magnetic effect for buttons
function initializeMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-cert-primary, .btn-deal-primary');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add custom styles
    addParticleStyles();
    addRippleStyles();

    // Initialize features
    createParticleSystem();
    enhanceFloatingShapes();
    enhanceButtonEffects();
    initializeSlotsCycle();
    initializeParallax();
    enhanceCardEffects();
    initializeMagneticEffect();

    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.cert-card, .deal-card, .feature-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Carousel auto-play enhancement
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#courseCarousel');
    if (carousel) {
        // Add custom indicators
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators-custom';
        indicators.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        `;

        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach((item, index) => {
            const indicator = document.createElement('button');
            indicator.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid rgba(0, 212, 170, 0.5);
                background: ${index === 0 ? '#00d4aa' : 'transparent'};
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            indicator.addEventListener('click', () => {
                const bsCarousel = new bootstrap.Carousel(carousel);
                bsCarousel.to(index);
            });

            indicators.appendChild(indicator);
        });

        carousel.appendChild(indicators);

        // Update indicators on slide change
        carousel.addEventListener('slide.bs.carousel', function (e) {
            const indicators = this.querySelectorAll('.carousel-indicators-custom button');
            indicators.forEach((indicator, index) => {
                indicator.style.background = index === e.to ? '#00d4aa' : 'transparent';
            });
        });
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar scroll effect (already defined above)
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical images and resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Add intersection observer for lazy loading animations
const lazyAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            lazyAnimationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for lazy animation
document.addEventListener('DOMContentLoaded', function () {
    const lazyElements = document.querySelectorAll('.cert-card, .deal-card, .mini-deal-card');
    lazyElements.forEach(element => {
        lazyAnimationObserver.observe(element);
    });
});

// Add CSS for lazy animations
const lazyAnimationStyles = document.createElement('style');
lazyAnimationStyles.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(lazyAnimationStyles);

function initializeSlotsCycle() {
    const containers = document.querySelectorAll('.spots-remaining');
    if (!containers.length) return;

    const start = new Date('2025-11-24');
    const now = new Date();
    const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.max(0, Math.floor((nowUTC - startUTC) / (1000 * 60 * 60 * 24)));

    containers.forEach((el) => {
        const initialAttr = el.dataset.slotsStart || el.dataset.start;
        const initial = parseInt(initialAttr || (el.querySelector('.spots-number') ? el.querySelector('.spots-number').textContent : '12'), 10);
        let totalDecrease = 0;
        for (let d = 0; d < days; d++) {
            totalDecrease += d % 2 === 0 ? 2 : 3;
        }
        const remainder = totalDecrease % initial;
        const left = initial - remainder || initial;
        const numberEl = el.querySelector('.spots-number');
        if (numberEl) numberEl.textContent = left;
    });
}

// Console welcome message
console.log('%c🚀 PMI Edu Website Loaded Successfully! 🚀', 'color: #00d4aa; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern web technologies and optimized for performance.', 'color: #39ff14; font-size: 12px;');
