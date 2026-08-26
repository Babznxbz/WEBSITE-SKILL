import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Easing = {
    easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeInOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
    easeIn: 'cubic-bezier(0.95, 0, 0.795, 0.03)',
};

export const GSAPAnimations = {
    Easing,
    
    fadeIn: (element: Element, options: {
        duration?: number;
        delay?: number;
        y?: number;
        opacity?: number;
        stagger?: number;
    } = {}) => {
        const defaults = {
            duration: 0.8,
            delay: 0,
            y: 0,
            opacity: 1,
        };
        
        const settings = { ...defaults, ...options };
        
        return gsap.fromTo(element, 
            {
                opacity: 0,
                y: settings.y || 20,
            },
            {
                opacity: settings.opacity,
                y: 0,
                duration: settings.duration,
                delay: settings.delay,
                ease: Easing.easeOut,
                stagger: settings.stagger,
            }
        );
    },
    
    staggerChildren: (parent: Element, options: {
        duration?: number;
        delay?: number;
        y?: number;
        opacity?: number;
    } = {}) => {
        const defaults = {
            duration: 0.6,
            delay: 0,
            y: 20,
            opacity: 0,
        };
        
        const settings = { ...defaults, ...options };
        
        return gsap.utils.toArray(parent).forEach((child, index) => {
            gsap.fromTo(child,
                {
                    opacity: 0,
                    y: settings.y,
                },
                {
                    opacity: settings.opacity,
                    y: 0,
                    duration: settings.duration,
                    delay: settings.delay + (index * 0.1),
                    ease: Easing.easeOut,
                }
            );
        });
    },
    
    scrollReveal: (element: Element, options: {
        start?: string;
        end?: string;
        scrub?: boolean;
        toggleActions?: string;
    } = {}) => {
        const defaults = {
            start: 'bottom 80%',
            end: 'bottom 10%',
            scrub: false,
            toggleActions: 'play none none reverse',
        };
        
        const settings = { ...defaults, ...options };
        
        return gsap.fromTo(element,
            {
                opacity: 0,
                y: 50,
                rotationX: 15,
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                ease: Easing.easeOut,
                scrollTrigger: {
                    trigger: element,
                    start: settings.start,
                    end: settings.end,
                    scrub: settings.scrub,
                    toggleActions: settings.toggleActions,
                }
            }
        );
    },
    
    heroParallax: (element: Element, scrollTrigger: {
        start: string;
        end: string;
        scrub: boolean;
    }) => {
        return gsap.to(element, {
            y: -100,
            rotation: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: scrollTrigger.start,
                end: scrollTrigger.end,
                scrub: scrollTrigger.scrub,
            }
        });
    },
    
    buttonPress: (button: Element) => {
        button.addEventListener('mousedown', () => {
            gsap.to(button, {
                scale: 0.97,
                duration: 0.15,
                ease: 'power2.out',
            });
        });
        
        button.addEventListener('mouseup', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.15,
                ease: 'power2.out',
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.15,
                ease: 'power2.out',
            });
        });
    },
};

export const useGSAPAnimations = () => {
    const heroRef = useRef<HTMLElement>(null);
    const featuresRef = useRef<HTMLElement>(null);
    const productsRef = useRef<HTMLElement>(null);
    
    useEffect(() => {
        if (!heroRef.current) return;
        
        const ctx = gsap.context(() => {
            const heroAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
            
            const heroImage = heroRef.current.querySelector('.hero-image') as Element;
            if (heroImage) {
                heroAnimation.to(heroImage, {
                    y: -50,
                    rotation: 5,
                    duration: 1,
                    ease: 'none'
                }, 0);
            }
            
            const title = heroRef.current.querySelector('.hero-title') as Element;
            if (title) {
                heroAnimation.to(title, {
                    scale: 0.95,
                    duration: 1,
                    ease: 'none'
                }, 0);
            }
        });
        
        return () => ctx.revert();
    }, []);
    
    return {
        heroRef,
        featuresRef,
        productsRef,
    };
};