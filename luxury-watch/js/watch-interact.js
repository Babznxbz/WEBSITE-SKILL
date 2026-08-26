/**
 * AETERNA GENÈVE — Watch Interaction Controller
 * Handles 3D Tilt Parallax, Calibre Layer Highlighting, Bespoke Customizer, and Inspection Modal
 */

class WatchInteractionManager {
  constructor() {
    this.initHeroParallax();
    this.initCalibreLayerClicks();
    this.initCustomizer();
    this.initInspectionModal();
  }

  /* ------------------------------------------------------------------------
     1. Hero Watch 3D Mouse Tilt & Parallax
     ------------------------------------------------------------------------ */
  initHeroParallax() {
    const stage = document.querySelector('.hero-watch-stage');
    const heroSec = document.querySelector('.hero-section');
    if (!stage || !heroSec) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    heroSec.addEventListener('mousemove', (e) => {
      const rect = heroSec.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotateY = x * 22; // Degrees tilt Y
      targetRotateX = -y * 22; // Degrees tilt X
    });

    heroSec.addEventListener('mouseleave', () => {
      targetRotateX = 0;
      targetRotateY = 0;
    });

    const updateTilt = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.08;
      currentRotateY += (targetRotateY - currentRotateY) * 0.08;

      stage.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      requestAnimationFrame(updateTilt);
    };
    updateTilt();
  }

  /* ------------------------------------------------------------------------
     2. Calibre 01 Layer Click & Spec Focus
     ------------------------------------------------------------------------ */
  initCalibreLayerClicks() {
    const specCards = document.querySelectorAll('.spec-card-item');
    const calibreLayers = document.querySelectorAll('.calibre-layer');

    specCards.forEach((card) => {
      card.addEventListener('click', () => {
        const layerTarget = card.getAttribute('data-layer');
        if (window.horologyAudio) {
          window.horologyAudio.playChime(640, 0.12);
        }

        specCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        calibreLayers.forEach((layer) => {
          if (layer.getAttribute('data-layer-id') === layerTarget) {
            layer.style.boxShadow = '0 0 45px rgba(212, 175, 55, 0.7), inset 0 0 40px rgba(212, 175, 55, 0.4)';
            layer.style.borderColor = '#d4af37';
          } else {
            layer.style.boxShadow = '';
            layer.style.borderColor = '';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Bespoke Commission Customizer
     ------------------------------------------------------------------------ */
  initCustomizer() {
    const materialBtns = document.querySelectorAll('.material-btn');
    const materialValText = document.getElementById('current-material-val');
    const customizerWatchImg = document.getElementById('customizer-watch-image');
    const engravingInput = document.getElementById('monogram-input');
    const engravingDisplay = document.getElementById('engraving-display-text');
    const customizerPrice = document.getElementById('customizer-total-price');

    const materials = {
      'gold': {
        name: '18K 4N Champagne Gold',
        filter: 'sepia(0.4) saturate(1.8) hue-rotate(5deg) brightness(1.05)',
        price: '148,000 CHF'
      },
      'titanium': {
        name: 'Grade 5 Satin Titanium',
        filter: 'grayscale(0.85) contrast(1.1) brightness(1.1)',
        price: '124,000 CHF'
      },
      'obsidian': {
        name: 'Obsidian DLC & Carbon',
        filter: 'grayscale(1) brightness(0.75) contrast(1.4)',
        price: '136,000 CHF'
      }
    };

    materialBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const matKey = btn.getAttribute('data-material');
        const data = materials[matKey];
        if (!data) return;

        materialBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (materialValText) materialValText.textContent = data.name;
        if (customizerPrice) customizerPrice.textContent = data.price;
        if (customizerWatchImg) customizerWatchImg.style.filter = data.filter;

        if (window.horologyAudio) {
          window.horologyAudio.playChime(700, 0.15);
        }
      });
    });

    if (engravingInput && engravingDisplay) {
      engravingInput.addEventListener('input', (e) => {
        const text = e.target.value.trim().toUpperCase();
        engravingDisplay.textContent = text.length > 0 ? `“${text}”` : '“GENÈVE”';
      });
    }

    // Concierge Request submit feedback
    const commissionFormBtn = document.getElementById('submit-commission-btn');
    if (commissionFormBtn) {
      commissionFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.horologyAudio) window.horologyAudio.playChime(880, 0.25);

        commissionFormBtn.innerHTML = '<span>✓ Request Transmitted</span>';
        commissionFormBtn.style.background = '#28a745';
        commissionFormBtn.style.borderColor = '#28a745';
        commissionFormBtn.style.color = '#ffffff';

        setTimeout(() => {
          commissionFormBtn.innerHTML = '<span>Transmit Atelier Request</span>';
          commissionFormBtn.style.background = '';
          commissionFormBtn.style.borderColor = '';
          commissionFormBtn.style.color = '';
        }, 3500);
      });
    }
  }

  /* ------------------------------------------------------------------------
     4. 360 Inspection Modal Controller
     ------------------------------------------------------------------------ */
  initInspectionModal() {
    const modal = document.getElementById('inspection-modal');
    const openBtns = document.querySelectorAll('.open-inspection-modal');
    const closeBtn = document.getElementById('close-inspection-modal');
    const modalImg = document.getElementById('modal-watch-img');
    const modalTitle = document.getElementById('modal-watch-title');
    const modalSpecs = document.getElementById('modal-watch-specs');

    const watchDetails = {
      'celestial': {
        title: 'AETERNA I. Celestial Tourbillon',
        img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
        specs: 'Astronomical Moonphase • 3D Hand-Engraved Star Map • Flying Tourbillon (60-sec) • 72-Hour Power Reserve'
      },
      'obsidian': {
        title: 'AETERNA II. Chronos Obsidian',
        img: 'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?q=80&w=1200&auto=format&fit=crop',
        specs: 'Forged Carbon Case • Black Diamond Set Bezel • Skeleton Calibre 02 • 100m Water Resistance'
      },
      'solaris': {
        title: 'AETERNA III. Solaris Perpetual',
        img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
        specs: '18K Champagne Gold • Perpetual Calendar Mechanism • Côtes de Genève Hand Finishing • Sapphire Exhibition Back'
      }
    };

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const watchKey = btn.getAttribute('data-watch') || 'celestial';
        const data = watchDetails[watchKey] || watchDetails['celestial'];

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalImg) modalImg.src = data.img;
        if (modalSpecs) modalSpecs.textContent = data.specs;

        if (modal) modal.classList.add('open');
        if (window.horologyAudio) window.horologyAudio.playChime(580, 0.2);
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.watchManager = new WatchInteractionManager();
});
