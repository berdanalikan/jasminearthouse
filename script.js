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

    // Light beam scroll interaction
    const verticalLightBeam = document.querySelector('.vertical-light-beam');
    const lightParticles = document.querySelectorAll('.light-particle');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollProgress = scrolled / (documentHeight - windowHeight);
        
        // Adjust beam intensity and width based on scroll
        const intensity = 0.08 + (scrollProgress * 0.12);
        const width = 80 + (scrollProgress * 40);
        const blur = 3 - (scrollProgress * 1);
        
        verticalLightBeam.style.opacity = intensity;
        verticalLightBeam.style.width = `${width}px`;
        verticalLightBeam.style.filter = `blur(${blur}px)`;
        
        // Adjust particle movement based on scroll
        lightParticles.forEach((particle, index) => {
            const moveX = (scrolled * 0.05) + (index * 5);
            const moveY = (scrolled * 0.02) + (index * 3);
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Mouse interaction with light beam
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move beam slightly with mouse
        const offsetX = (mouseX - 0.5) * 15;
        verticalLightBeam.style.transform = `translateX(calc(-50% + ${offsetX}px))`;
        
        // Adjust beam intensity based on mouse position
        const distanceFromCenter = Math.abs(mouseX - 0.5);
        const intensity = 0.15 - (distanceFromCenter * 0.08);
        verticalLightBeam.style.opacity = intensity;
        
        // Move particles with mouse
        lightParticles.forEach((particle, index) => {
            const speed = 0.01 + (index * 0.002);
            const x = (e.clientX * speed);
            const y = (e.clientY * speed);
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

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

// Image Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('.artwork-img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
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
    // Initialize lazy loading
    initLazyLoading();
});

// Admin panel content sync function removed - site is now Turkish only 