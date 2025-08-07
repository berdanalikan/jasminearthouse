// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.gallery-item, .collection-item, .section-title, .section-description');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Gallery item hover effects
    const galleryItems = document.querySelectorAll('.gallery-item, .collection-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.image-placeholder, .artwork-img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.image-placeholder, .artwork-img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Floating artwork parallax effect
    const floatingArtworks = document.querySelectorAll('.floating-artworks .artwork-item, .scattered-artworks .artwork-item');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        floatingArtworks.forEach((artwork, index) => {
            const speed = 0.3 + (index * 0.05);
            const rotation = scrolled * 0.01;
            artwork.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
        });
    });

    // Mouse move effect for floating artworks (removed frame shifting)
    document.addEventListener('mousemove', function(e) {
        const artworks = document.querySelectorAll('.floating-artworks .artwork-item, .scattered-artworks .artwork-item');
        artworks.forEach((artwork, index) => {
            const speed = 0.01 + (index * 0.002);
            const x = (e.clientX * speed);
            const y = (e.clientY * speed);
            artwork.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.gallery-item, .collection-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Enhanced circular light beam - embedded in page, completely static
    const circularLightBeam = document.querySelector('.circular-light-beam');
    const lightParticles = document.querySelectorAll('.light-particle');
    
    // Set initial position - embedded in page
    circularLightBeam.style.transform = 'translate(-50%, -50%)';
    
    // Set position based on screen size
    if (window.innerWidth <= 768) {
        // Mobile: above "Sanatta Miras" text
        circularLightBeam.style.left = '50%';
        circularLightBeam.style.top = window.innerWidth <= 480 ? '20%' : '25%';
    } else {
        // Desktop: to the left of "Sanatta Miras" text
        circularLightBeam.style.left = '35%';
        circularLightBeam.style.top = '50%';
    }
    
    circularLightBeam.style.opacity = '0.8';
    circularLightBeam.style.visibility = 'visible';
    
    // Keep particles completely stationary
    lightParticles.forEach((particle) => {
        particle.style.transform = 'translate(0, 0)';
        particle.style.opacity = '1';
    });
    
    // No scroll event listener - light beam is embedded in page
    
    // Update position on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Mobile: above "Sanatta Miras" text
            circularLightBeam.style.left = '50%';
            circularLightBeam.style.top = window.innerWidth <= 480 ? '20%' : '25%';
        } else {
            // Desktop: to the left of "Sanatta Miras" text
            circularLightBeam.style.left = '35%';
            circularLightBeam.style.top = '50%';
        }
    });
    
    // Light beam stays completely fixed - no mouse interaction
    // Removed mouse movement effects to keep light beam stationary

    // Add CSS for navbar scroll effect and light beam enhancements
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .light-beam {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .light-particle {
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can go here
}, 16)); // 60fps

// Image Lazy Loading with Mobile Optimizations
function initLazyLoading() {
    const images = document.querySelectorAll('.artwork-img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loaded class for mobile loading skeleton
                img.classList.add('loaded');
                img.style.opacity = '1';
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // Preload images on mobile for better performance
        if (window.innerWidth <= 768) {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
        
        imageObserver.observe(img);
    });
}

// Language data removed - site is now Turkish only
        'contact-hero-description': 'Bizimle iletişime geçin ve sanatsal yolculuğumuza katılın',
        'contact-form-title': 'Mesaj Gönderin',
        'contact-form-name': 'Adınız',
        'contact-form-email': 'E-posta',
        'contact-form-message': 'Mesajınız',
        'contact-form-send': 'Gönder',
        'contact-info-title': 'İletişim Bilgileri',
        'contact-address': 'Adres',
        'contact-phone': 'Telefon',
        'contact-email': 'E-posta',
        'contact-hours': 'Çalışma Saatleri',
        
        // Footer
        'footer-collecting': '2010\'dan beri Sanat Topluyoruz',
        'footer-navigation': 'Navigasyon',
        'footer-rights': 'Tüm hakları saklıdır',
        'footer-essence': 'SANATTA MİRASIN ÖZÜ',
        'view-artwork': 'Eseri Görüntüle'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-gallery': 'Gallery',
        'nav-studio': 'Studio',
        'nav-contact': 'Contact',
        
        // Home Page
        'hero-title': 'Heritage',
        'hero-title-highlight': 'In Art',
        'hero-description': 'Celebrate the craftsmanship that has transcended generations, connecting you with the heart of artistic heritage.',
        'hero-cta': 'Visit Gallery',
        'journey-title': 'A Journey Through Time',
        'journey-description': 'Step into a world where tradition meets artistry. Here, you are invited to explore a personal collection of artworks, where each piece reveals layers of artistic history, meticulous craftsmanship, and the enduring beauty of heritage.',
        'about-cta': 'About Us',
        'oil-paintings-title': 'Masterpieces in Oil',
        'oil-paintings-description': 'Timeless paintings that capture the essence of artistic heritage',
        'gallery-title': 'Impressions Of Heritage',
        'gallery-subtitle': 'Timeless Masterpieces',
        'gallery-description': 'Each piece exhibited at Jasmine Art House embodies both the visual allure and the spirit of artistic heritage.',
        'gallery-cta': 'Visit Gallery',
        'studio-title': 'Studio Moments',
        'studio-description': 'Behind the scenes: capturing the creative process and artistic journey',
        'contact-title': 'Get in Touch',
        'contact-description': 'Our mission is to preserve and showcase artistic heritage, inviting visitors to engage with the rich beauty of tradition through a contemporary platform.',
        
        // Gallery Page
        'gallery-hero-title': 'Our Collection',
        'gallery-hero-description': 'Timeless masterpieces and artistic excellence',
        'gallery-filters-all': 'All',
        'gallery-filters-oil': 'Oil Paintings',
        'gallery-filters-drawings': 'Drawings',
        'gallery-filters-studio': 'Studio',
        
        // About Page
        'about-hero-title': 'About Us',
        'about-hero-description': 'Guardians of artistic heritage and sustainers of tradition',
        'mission-title': 'Our Mission',
        'mission-description': 'To preserve artistic heritage and pass it on to future generations',
        'history-title': 'Legacy of Excellence',
        'history-description': 'Our pursuit of artistic excellence over the years',
        'values-title': 'Our Values',
        'values-description': 'Artistic excellence and traditional values',
        'team-title': 'Meet Our Team',
        'team-description': 'Passionate professionals who share our artistic vision',
        
        // Studio Page
        'studio-hero-title': 'Studio',
        'studio-hero-title-highlight': 'Moments',
        'studio-hero-description': 'Behind the scenes: capturing the creative process and artistic journey in our studio.',
        'studio-gallery-title': 'Behind the Scenes',
        'studio-gallery-description': 'Exploring the creative process and studio environment',
        'studio-info-title': 'Our Studio',
        'studio-info-description': 'Our studio is a creative sanctuary where artistic visions come to life. Every corner tells a story of passion, dedication, and the endless pursuit of artistic excellence.',
        'feature-1-title': 'Creative Environment',
        'feature-1-desc': 'A space designed to inspire and nurture artistic expression',
        'feature-2-title': 'Professional Equipment',
        'feature-2-desc': 'State-of-the-art tools and materials for the best results',
        'feature-3-title': 'Artistic Process',
        'feature-3-desc': 'Documenting the journey from concept to completion',
        
        // Contact Page
        'contact-hero-title': 'Get in Touch',
        'contact-hero-description': 'Contact us and join our artistic journey',
        'contact-form-title': 'Send a Message',
        'contact-form-name': 'Your Name',
        'contact-form-email': 'Email',
        'contact-form-message': 'Your Message',
        'contact-form-send': 'Send',
        'contact-info-title': 'Contact Information',
        'contact-address': 'Address',
        'contact-phone': 'Phone',
        'contact-email': 'Email',
        'contact-hours': 'Opening Hours',
        
        // Footer
        'footer-collecting': 'Collecting Arts since ©2010',
        'footer-navigation': 'Navigation',
        'footer-rights': 'All rights reserved',
        'footer-essence': 'THE ESSENCE OF HERITAGE IN ART',
        'view-artwork': 'View Artwork'
    }
};

let currentLanguage = 'tr';

// Language switching functionality removed - site is now Turkish only

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhanced lazy loading
    initEnhancedLazyLoading();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize mobile optimizations
    initMobileOptimizations();
    
    // Initialize scroll optimizations
    initScrollOptimizations();
    
    // Initialize touch feedback
    initTouchFeedback();
    
    // Add mobile-specific event listeners
    if (window.innerWidth <= 768) {
        // Optimize performance on mobile
        document.addEventListener('touchstart', function() {}, {passive: true});
        document.addEventListener('touchmove', function() {}, {passive: true});
        
        // Add pull-to-refresh prevention
        let startY = 0;
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].pageY;
        });
        
        document.addEventListener('touchmove', (e) => {
            const y = e.touches[0].pageY;
            const pull = y - startY;
            
            if (pull > 0 && window.scrollY === 0) {
                e.preventDefault();
            }
        }, {passive: false});
    }
});

// Enhanced Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link with smooth transition
        navMenu.querySelectorAll('a').forEach((link, index) => {
            link.addEventListener('click', () => {
                // Add delay for smooth animation
                setTimeout(() => {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }, 300);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Handle swipe to close menu
        let startX = 0;
        let currentX = 0;
        
        navMenu.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        navMenu.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
        });
        
        navMenu.addEventListener('touchend', () => {
            const diffX = startX - currentX;
            if (diffX > 50) { // Swipe left to close
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Enhanced Mobile Performance Optimizations
function initMobileOptimizations() {
    // Reduce animations on mobile for better performance
    if (window.innerWidth <= 768) {
        // Disable heavy animations
        const heavyAnimations = document.querySelectorAll('.floating-artworks .artwork-item, .scattered-artworks .artwork-item');
        heavyAnimations.forEach(item => {
            item.style.animation = 'none';
        });
        
        // Optimize scroll performance
        let ticking = false;
        function updateScroll() {
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
        
        // Optimize touch interactions
        const touchElements = document.querySelectorAll('.gallery-item, .oil-painting-item, .studio-photo-item');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Enhanced Image Loading with Mobile Optimizations
function initEnhancedLazyLoading() {
    const images = document.querySelectorAll('.artwork-img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading skeleton
                const imageContainer = img.closest('.artwork-image');
                if (imageContainer) {
                    imageContainer.classList.add('loading');
                }
                
                // Load image with error handling
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                    this.style.opacity = '1';
                    
                    if (imageContainer) {
                        imageContainer.classList.remove('loading');
                    }
                });
                
                img.addEventListener('error', function() {
                    // Show placeholder on error
                    this.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder';
                    placeholder.style.cssText = `
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #999;
                        font-size: 0.9rem;
                    `;
                    placeholder.textContent = 'Image not available';
                    this.parentNode.appendChild(placeholder);
                });
                
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile Scroll Performance Optimization
function initScrollOptimizations() {
    if (window.innerWidth <= 768) {
        // Optimize horizontal scroll for oil paintings
        const oilPaintingsGrid = document.querySelector('.oil-paintings-grid');
        if (oilPaintingsGrid) {
            let isScrolling = false;
            let startX = 0;
            let scrollLeft = 0;
            
            oilPaintingsGrid.addEventListener('touchstart', (e) => {
                isScrolling = true;
                startX = e.touches[0].pageX - oilPaintingsGrid.offsetLeft;
                scrollLeft = oilPaintingsGrid.scrollLeft;
            });
            
            oilPaintingsGrid.addEventListener('touchmove', (e) => {
                if (!isScrolling) return;
                e.preventDefault();
                const x = e.touches[0].pageX - oilPaintingsGrid.offsetLeft;
                const walk = (x - startX) * 2;
                oilPaintingsGrid.scrollLeft = scrollLeft - walk;
            });
            
            oilPaintingsGrid.addEventListener('touchend', () => {
                isScrolling = false;
            });
        }
        
        // Add scroll indicators
        const addScrollIndicators = () => {
            const scrollContainers = document.querySelectorAll('.oil-paintings-grid');
            scrollContainers.forEach(container => {
                const indicator = document.createElement('div');
                indicator.className = 'scroll-indicator';
                indicator.style.cssText = `
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 4px;
                    background: rgba(0,0,0,0.2);
                    border-radius: 2px;
                    z-index: 10;
                `;
                container.style.position = 'relative';
                container.appendChild(indicator);
            });
        };
        
        addScrollIndicators();
    }
}

// Mobile Touch Feedback Enhancement
function initTouchFeedback() {
    if (window.innerWidth <= 768) {
        const touchElements = document.querySelectorAll('.btn-primary, .btn-secondary, .view-artwork');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Admin panel content sync function removed - site is now Turkish only 