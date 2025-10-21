// Professional Portfolio JavaScript
// Author: Medikonduri Vijaya Sri Varsha

class PortfolioApp {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupScrollEffects();
    }

    initializeApp() {
        // Set initial loading state
        document.body.classList.add('loading');
        
        // Initialize when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMLoaded());
        } else {
            this.onDOMLoaded();
        }
    }

    onDOMLoaded() {
        // Remove loading state with smooth transition
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 300);

        // Initialize all components
        this.initializeNavigation();
        this.initializeScrollSpy();
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.setupMobileMenu();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Navbar scroll effects
        this.setupNavbarScrollEffects();
        
        // Contact form interactions
        this.setupContactInteractions();
        
        // Skill card interactions
        this.setupSkillCardEffects();
        
        // Education flip cards
        this.setupFlipCards();
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (!menuToggle || !navMenu) return;

        // Toggle mobile menu
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupNavbarScrollEffects() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction change
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    setupContactInteractions() {
        // Contact form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                // Let the form submit naturally to mailto, but show feedback
                setTimeout(() => {
                    this.showNotification('Opening your email client...', 'info');
                }, 100);
            });
        }

        // Form input animations
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });

        // Social link hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.createRippleEffect(link);
            });
        });
    }

    setupSkillCardEffects() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add ripple effect
                this.createRippleEffect(card);
            });
        });
    }

    setupFlipCards() {
        const flipCards = document.querySelectorAll('.flip-card');
        
        flipCards.forEach(card => {
            // For touch devices, add tap to flip functionality
            if ('ontouchstart' in window) {
                card.addEventListener('touchstart', () => {
                    card.classList.toggle('flipped');
                });
            }
            
            // Add accessibility - keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.classList.toggle('flipped');
                }
            });
            
            // Make cards focusable for accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Education card - press enter to flip');
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 217, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '3px solid var(--accent-cyan)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing effect after page load
        setTimeout(typeWriter, 1000);
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections and cards
        const elementsToAnimate = document.querySelectorAll(
            'section, .skill-card, .project-card, .experience-card, .leadership-card, .contact-method, .flip-card, .cert-badge'
        );
        
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        // Add appropriate animation class based on element type
        if (element.classList.contains('skill-card')) {
            element.classList.add('fade-in');
            // Stagger animation for skill cards
            const cards = Array.from(document.querySelectorAll('.skill-card'));
            const index = cards.indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        } else if (element.classList.contains('experience-card')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('contact-method')) {
            element.classList.add('slide-in-right');
        } else if (element.classList.contains('leadership-card')) {
            element.classList.add('fade-in');
            // Stagger leadership card animations
            const leadershipCards = Array.from(document.querySelectorAll('.leadership-card'));
            const index = leadershipCards.indexOf(element);
            element.style.animationDelay = `${index * 0.15}s`;
        } else if (element.classList.contains('flip-card')) {
            element.classList.add('fade-in');
            // Stagger flip card animations
            const flipCards = Array.from(document.querySelectorAll('.flip-card'));
            const index = flipCards.indexOf(element);
            element.style.animationDelay = `${index * 0.2}s`;
        } else if (element.classList.contains('cert-badge')) {
            element.classList.add('fade-in');
            // Stagger certification animations
            const certBadges = Array.from(document.querySelectorAll('.cert-badge'));
            const index = certBadges.indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        } else {
            element.classList.add('fade-in');
        }
    }

    setupScrollEffects() {
        // Parallax effect for background orbs
        const orbs = document.querySelectorAll('.gradient-orb, .contact-orb');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            orbs.forEach((orb, index) => {
                const speed = 0.2 + (index * 0.1);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    initializeNavigation() {
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        // Add smooth reveal for education cards on scroll
        this.setupEducationReveal();

        window.addEventListener('scroll', () => {
            let currentSection = '';
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initializeScrollSpy() {
        // Add smooth scroll behavior to all internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Special handling for contact section (full height)
                    let offsetTop;
                    if (targetId === '#contact') {
                        offsetTop = targetSection.offsetTop;
                    } else {
                        offsetTop = targetSection.offsetTop - 80;
                    }
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add enhanced form validation
        this.setupFormValidation();
    }
    
    setupFormValidation() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
            
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });
    }
    
    validateInput(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        const isEmail = input.type === 'email';
        
        // Remove previous validation classes
        input.classList.remove('valid', 'invalid');
        
        if (isRequired && !value) {
            input.classList.add('invalid');
            return false;
        }
        
        if (isEmail && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('invalid');
                return false;
            }
        }
        
        if (value) {
            input.classList.add('valid');
        }
        
        return true;
    }

    setupEducationReveal() {
        const flipCards = document.querySelectorAll('.flip-card');
        
        // Add subtle hint animation to suggest interactivity
        flipCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('hint-flip');
                setTimeout(() => {
                    card.classList.remove('hint-flip');
                }, 1000);
            }, 2000 + (index * 500));
        });
        
        // Setup leadership card interactions
        this.setupLeadershipCards();
    }
    
    setupLeadershipCards() {
        const leadershipCards = document.querySelectorAll('.leadership-card');
        
        leadershipCards.forEach((card, index) => {
            // Add staggered entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
            
            // Enhanced hover interactions
            card.addEventListener('mouseenter', () => {
                // Create subtle glow effect
                card.style.boxShadow = 'var(--shadow-xl), 0 0 40px rgba(167, 139, 250, 0.4)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            background: type === 'info' ? 'var(--accent-cyan)' : 'var(--accent-purple)',
            color: 'var(--primary-bg)',
            borderRadius: '10px',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontWeight: '600',
            boxShadow: 'var(--shadow-lg)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: var(--accent-cyan) !important;
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    /* Flip card touch interactions */
    .flip-card.flipped .flip-card-inner {
        transform: rotateY(180deg);
    }
    
    /* Hint animation for flip cards */
    .flip-card.hint-flip .flip-card-inner {
        animation: hintFlip 1s ease-in-out;
    }
    
    @keyframes hintFlip {
        0%, 100% { transform: rotateY(0deg); }
        25% { transform: rotateY(15deg); }
        75% { transform: rotateY(-15deg); }
    }
    
    /* Form validation styles */
    .form-group.focused .form-label {
        color: var(--accent-cyan);
        transform: translateY(-2px);
    }
    
    .form-input.valid, .form-textarea.valid {
        border-color: var(--accent-cyan);
        box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2);
    }
    
    .form-input.invalid, .form-textarea.invalid {
        border-color: #ff4757;
        box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.2);
    }
    
    /* Leadership card animations */
    .leadership-card {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Contact section decorative animations */
    .decorative-circle {
        animation: pulse 4s ease-in-out infinite;
    }
    
    /* Mobile responsive flip cards */
    @media (max-width: 768px) {
        .education-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
        }
        
        .flip-card {
            height: 280px;
        }
        
        .certifications-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        
        .leadership-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// Initialize the portfolio app when the script loads
new PortfolioApp();

// Additional utility functions
window.portfolioUtils = {
    // Smooth scroll to element
    scrollToElement: (elementId) => {
        const element = document.getElementById(elementId.replace('#', ''));
        if (element) {
            const offset = element.offsetTop - 80;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    },
    
    // Get current scroll position
    getScrollPosition: () => {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Enhanced utility functions for the new sections
window.portfolioUtils.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

window.portfolioUtils.formatFormData = (formData) => {
    const formatted = {};
    for (let [key, value] of formData.entries()) {
        formatted[key] = value;
    }
    return formatted;
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}