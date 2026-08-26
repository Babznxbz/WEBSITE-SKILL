gsap.registerPlugin(ScrollTrigger);

const PAGE_WIDTH = 1200;

function initAnimations() {
    heroSection();
    productCards();
    featuresSection();
    testimonialCards();
    scrollEffects();
    buttonAnimations();
}

function heroSection() {
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
    });
    
    heroTimeline.to('.shoe-3d', {
        rotationY: -30,
        z: -100,
        duration: 1,
        ease: 'none'
    }, 0);
    
    heroTimeline.to('.hero-title', {
        scale: 0.8,
        duration: 1,
        ease: 'none'
    }, 0);
    
    heroTimeline.to('.hero-subtitle', {
        opacity: 0,
        duration: 1,
        ease: 'none'
    }, 0);
    
    const scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'top 10%',
            scrub: true
        }
    });
    
    scrollTimeline.to('.scroll-down', {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'none'
    });
}

function productCards() {
    gsap.utils.toArray('.product-card').forEach((card, index) => {
        gsap.set(card, {
            y: 100,
            opacity: 0,
            rotationX: 15
        });
        
        ScrollTrigger.create({
            trigger: card,
            start: 'bottom 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
            onEnter: function() {
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * 0.1
                });
            }
        });
    });
    
    const cards = gsap.utils.toArray('.product-card');
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

function featuresSection() {
    const featuresTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    featuresTimeline.from('.feature-item', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15
    });
    
    gsap.utils.toArray('.feature-icon').forEach(icon => {
        gsap.to(icon, {
            rotation: 360,
            duration: 2,
            ease: 'none',
            repeat: -1,
           repeatDelay: 3,
            transformOrigin: 'center'
        });
    });
    
    ScrollTrigger.create({
        trigger: '.features',
        start: 'top 80%',
        end: 'bottom top',
        onEnter: function() {
            gsap.from('.section-title', {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
    });
}

function testimonialCards() {
    const testimonials = gsap.utils.toArray('.testimonial');
    
    testimonials.forEach((testimonial, index) => {
        gsap.set(testimonial, {
            opacity: 0,
            x: 100,
            rotationX: 10
        });
        
        ScrollTrigger.create({
            trigger: testimonial,
            start: 'bottom 80%',
            end: 'bottom 60%',
            onEnter: function() {
                gsap.to(testimonial, {
                    opacity: 1,
                    x: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * 0.15
                });
            }
        });
    });
    
    const sliderTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 10,
        defaults: { duration: 0.8, ease: 'power2.inOut' }
    });
    
    testimonials.forEach((testimonial, index) => {
        sliderTimeline.to(testimonial, {
            y: -50,
            opacity: 0,
            duration: 1
        });
        sliderTimeline.to(testimonial, {
            y: 0,
            opacity: 1,
            duration: 1
        }, `-=0.7`);
    });
}

function scrollEffects() {
    gsap.to('.shoe-image', {
        y: -100,
        rotation: 10,
        duration: 2,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: false
        }
    });
    
    gsap.utils.toArray('section').forEach(section => {
        if (!section.classList.contains('hero')) {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                onEnter: function() {
                    const title = section.querySelector('.section-title');
                    if (title) {
                        gsap.from(title, {
                            opacity: 0,
                            y: -50,
                            duration: 0.8,
                            ease: 'power3.out'
                        });
                    }
                }
            });
        }
    });
}

function buttonAnimations() {
    const buttons = gsap.utils.toArray('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mousedown', () => {
            gsap.to(button, {
                scale: 0.97,
                duration: 0.15,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseup', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.15,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('touchstart', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('touchend', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.1,
                ease: 'power2.out'
            });
        });
    });
}

function addToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            
            count++;
            cartCount.textContent = count;
            
            gsap.to(cartCount, {
                scale: 1.5,
                duration: 0.3,
                ease: 'back.out(1.7)',
                yoyo: true,
                repeat: 1
            });
            
            const notification = document.createElement('div');
            notification.className = 'add-to-cart-notification';
            notification.textContent = `Added ${productName} to cart!`;
            document.body.appendChild(notification);
            
            gsap.from(notification, {
                y: 100,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
            
            setTimeout(() => {
                gsap.to(notification, {
                    y: -50,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        notification.remove();
                    }
                });
            }, 500);
        });
    });
}

function navbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            gsap.to(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.set(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                boxShadow: '0 0 0 0'
            });
        }
        
        if (scrollTop > 100) {
            gsap.from(navbar, {
                y: -100,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
        
        lastScrollTop = scrollTop;
    });
}

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

function initHeroGallery() {
    const images = document.querySelectorAll('.shoe-image');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        img.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initHeroGallery();
    initAnimations();
    addToCart();
    navbarScroll();
    smoothScroll();
    
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});