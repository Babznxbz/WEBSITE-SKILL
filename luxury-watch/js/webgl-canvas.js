/**
 * AETERNA GENÈVE — Three.js Celestial Astronomy Background
 * Adheres to Section 5 of build-awwwards-quality-sites (Performance, Disposals, Capped DPR, Visibility Observer)
 */

class CelestialStarfield {
  constructor(canvasId = 'webgl-bg-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.canvas.style.display = 'none';
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.orbitRings = [];
    this.animationFrameId = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.isVisible = true;

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded. Falling back to static gradient.');
      return;
    }

    try {
      // 1. Scene & Camera
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 120;

      // 2. Renderer with capped DPR for maximum efficiency
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // 3. Create Golden Stardust Particle System
      const particleCount = window.innerWidth < 768 ? 600 : 1200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorGold1 = new THREE.Color('#d4af37');
      const colorGold2 = new THREE.Color('#fae8be');
      const colorPlatinum = new THREE.Color('#8a8994');

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 350;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 350;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        // Mix gold and celestial tones
        const mixedColor = Math.random() > 0.4 ? (Math.random() > 0.5 ? colorGold1 : colorGold2) : colorPlatinum;
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 1.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      this.particles = new THREE.Points(geometry, particleMaterial);
      this.scene.add(this.particles);

      // 4. Create Astrological Orbit Rings
      const ringRadii = [45, 75, 110];
      const ringMaterial = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.12
      });

      ringRadii.forEach((radius, idx) => {
        const ringGeo = new THREE.BufferGeometry();
        const segments = 90;
        const pts = [];
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
        }
        ringGeo.setFromPoints(pts);
        const ring = new THREE.LineLoop(ringGeo, ringMaterial);
        ring.rotation.x = Math.PI / 3 + idx * 0.2;
        ring.rotation.y = idx * 0.35;
        this.orbitRings.push(ring);
        this.scene.add(ring);
      });

      // 5. Event Listeners
      this.bindEvents();

      // 6. Intersection & Visibility Observers (Pause rendering when tab inactive)
      document.addEventListener('visibilitychange', () => {
        this.isVisible = !document.hidden;
      });

      // 7. Start Loop
      this.animate();
    } catch (err) {
      console.warn('WebGL initialization failed:', err);
    }
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this), { passive: true });
    window.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 30;
    this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 30;
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    if (!this.isVisible) return;

    // Smooth lerp mouse tracking
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.04;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.04;

    if (this.particles) {
      this.particles.rotation.y += 0.0006;
      this.particles.rotation.x = this.mouseY * 0.015;
      this.particles.rotation.y += this.mouseX * 0.0008;
    }

    this.orbitRings.forEach((ring, idx) => {
      ring.rotation.z += (idx + 1) * 0.0008;
      ring.rotation.x += 0.0003;
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.celestialCanvas = new CelestialStarfield();
});
