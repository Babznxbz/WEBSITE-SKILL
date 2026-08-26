/**
 * AETERNA GENÈVE — Master Orchestration Script
 * Integrates Lenis Smooth Scroll + GSAP ScrollTrigger + Custom Cursor + World Clocks
 * Adheres to build-awwwards-quality-sites guidelines
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Magnetic Cursor
  initCustomCursor();

  // 2. Initialize Live Swiss & Global Clocks
  initGlobalClocks();

  // 3. Initialize Sound Toggle
  initSoundToggle();

  // 4. Initialize Lenis Smooth Scroll & GSAP ScrollTrigger Orchestration
  initSmoothScrollAndGSAP();
});

/* --------------------------------------------------------------------------
   1. Custom Cursor with Magnetic Tracking & Fluid Lerp
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  const renderRing = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  };
  renderRing();

  // Hover states on interactive elements
  const interactives = document.querySelectorAll('a, button, input, .spec-card-item, .watch-card, .material-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

/* --------------------------------------------------------------------------
   2. Live International Horology Clocks
   -------------------------------------------------------------------------- */
function initGlobalClocks() {
  const genevaHeaderTime = document.getElementById('geneva-live-time');
  const genevaFooter = document.getElementById('clock-geneva');
  const nyFooter = document.getElementById('clock-ny');
  const londonFooter = document.getElementById('clock-london');
  const tokyoFooter = document.getElementById('clock-tokyo');
  const dubaiFooter = document.getElementById('clock-dubai');

  const updateClocks = () => {
    const now = new Date();

    const formatTime = (timeZone) => {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
    };

    if (genevaHeaderTime) genevaHeaderTime.textContent = formatTime('Europe/Zurich') + ' CET';
    if (genevaFooter) genevaFooter.textContent = formatTime('Europe/Zurich');
    if (nyFooter) nyFooter.textContent = formatTime('America/New_York');
    if (londonFooter) londonFooter.textContent = formatTime('Europe/London');
    if (tokyoFooter) tokyoFooter.textContent = formatTime('Asia/Tokyo');
    if (dubaiFooter) dubaiFooter.textContent = formatTime('Asia/Dubai');
  };

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* --------------------------------------------------------------------------
   3. Sound Toggle Button Controller
   -------------------------------------------------------------------------- */
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (window.horologyAudio) {
      const isSoundOn = window.horologyAudio.toggle();
      if (isSoundOn) {
        soundBtn.classList.add('sound-on');
        soundBtn.setAttribute('aria-label', 'Sound On (Mechanical Ticking Active)');
        soundBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      } else {
        soundBtn.classList.remove('sound-on');
        soundBtn.setAttribute('aria-label', 'Sound Muted');
        soundBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   4. Lenis Smooth Scroll Engine & GSAP Choreography
   -------------------------------------------------------------------------- */
function initSmoothScrollAndGSAP() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll detection
  const header = document.querySelector('.luxury-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 1. Initialize Lenis (Sole Smooth Scroll Engine)
  let lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 2. GSAP Animations & Timelines
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    // A. Hero Entrance Choreography
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

    heroTl
      .from('.brand-logo-wrap', { opacity: 0, y: -20, duration: 0.8 })
      .from('.header-telemetry', { opacity: 0, y: -20, duration: 0.8 }, '-=0.6')
      .from('.header-actions', { opacity: 0, y: -20, duration: 0.8 }, '-=0.6')
      .from('.hero-subhead-pill', { opacity: 0, scale: 0.85, duration: 0.8 }, '-=0.4')
      .to('.hero-split-inner', { y: '0%', stagger: 0.08, duration: 1.4, ease: 'expo.out' }, '-=0.6')
      .from('.hero-description', { opacity: 0, y: 25, duration: 1 }, '-=0.8')
      .from('.hero-ctas-group', { opacity: 0, y: 20, duration: 0.8 }, '-=0.8')
      .from('.hero-watch-stage', { opacity: 0, scale: 0.75, rotationY: -15, duration: 1.6, ease: 'expo.out' }, '-=1.2')
      .from('.watch-telemetry-badge', { opacity: 0, scale: 0.6, stagger: 0.2, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.8');

    // B. Calibre 01 Exploded Movement Scroll Scrub
    if (document.querySelector('.calibre-section') && typeof ScrollTrigger !== 'undefined') {
      const calibreTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.calibre-section',
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1
        }
      });

      calibreTl
        // Separate layers along the 3D Z/Y axis with rotation
        .to('.layer-1-crystal', { z: 190, y: -50, opacity: 0.95, ease: 'none' }, 0)
        .to('.layer-2-tourbillon', { z: 110, y: -15, rotate: 45, opacity: 1, ease: 'none' }, 0)
        .to('.layer-3-bridges', { z: 25, y: 15, rotate: -30, opacity: 1, ease: 'none' }, 0)
        .to('.layer-4-mainplate', { z: -80, y: 55, opacity: 0.85, ease: 'none' }, 0)
        .to('.calibre-stack', { rotateX: 65, rotateZ: -45, ease: 'none' }, 0)
        .from('.spec-card-item', { opacity: 0.3, x: 40, stagger: 0.2, ease: 'none' }, 0);
    }

    // C. Masterpiece Collection Cards Stagger
    gsap.utils.toArray('.watch-card').forEach((card, idx) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 1,
        delay: idx * 0.15,
        ease: 'power3.out'
      });
    });

    // D. Heritage Editorial Reveal
    gsap.from('.heritage-media-collage', {
      scrollTrigger: {
        trigger: '.heritage-section',
        start: 'top 75%'
      },
      opacity: 0,
      x: -50,
      duration: 1.4,
      ease: 'expo.out'
    });

    gsap.from('.heritage-text-col', {
      scrollTrigger: {
        trigger: '.heritage-section',
        start: 'top 75%'
      },
      opacity: 0,
      x: 50,
      duration: 1.4,
      ease: 'expo.out'
    });
  }
}
