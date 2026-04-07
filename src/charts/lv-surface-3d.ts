import { LvBaseElement } from '../core/base-element.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); }
  canvas { display: block; width: 100% !important; height: 100% !important; }
`;

class LvSurface3d extends LvBaseElement {
  private _raf: number | null = null;
  private _renderer: any = null;

  static get observedAttributes() {
    return ['data', 'x-label', 'y-label', 'z-label', 'color-scale', 'wireframe', 'auto-rotate'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.adoptStyles(css);
    this._buildScene();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._renderer) { this._renderer.dispose(); this._renderer = null; }
  }

  handleAttributeChange() {
    if (this.isConnected) this._buildScene();
  }

  private _buildScene(): void {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    if (this._renderer) { this._renderer.dispose(); this._renderer = null; }
    const grid: number[][] = this.jsonAttr('data', []);
    const wireframe = this.hasAttribute('wireframe');
    const autoRotate = this.hasAttribute('auto-rotate');

    this.render('<div class="scene-container" id="scene"></div>');

    if (!grid.length || !grid[0].length) return;

    const container = this.root.getElementById('scene');
    if (!container) return;
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 375;

    const rows = grid.length;
    const cols = grid[0].length;
    const allVals = grid.flat();
    const zMin = Math.min(...allVals);
    const zMax = Math.max(...allVals);
    const zRange = zMax - zMin || 1;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      getComputedStyle(this).getPropertyValue('--lv-bg-raised').trim() || '#12122a'
    );

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    this._renderer = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2, cols - 1, rows - 1);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const z = (grid[r][c] - zMin) / zRange; // 0..1
        positions.setZ(idx, z - 0.5); // center around 0

        // Color: blue (low) → cyan → green → yellow → red (high)
        const t = z;
        let cr, cg, cb;
        if (t < 0.25) { cr = 0; cg = t * 4; cb = 1; }
        else if (t < 0.5) { cr = 0; cg = 1; cb = 1 - (t - 0.25) * 4; }
        else if (t < 0.75) { cr = (t - 0.5) * 4; cg = 1; cb = 0; }
        else { cr = 1; cg = 1 - (t - 0.75) * 4; cb = 0; }

        colors[idx * 3] = cr;
        colors[idx * 3 + 1] = cg;
        colors[idx * 3 + 2] = cb;
      }
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    // Rotate to lay flat on XZ plane, then tilt
    geometry.rotateX(-Math.PI / 2);

    const material = wireframe
      ? new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true })
      : new THREE.MeshPhongMaterial({ vertexColors: true, side: THREE.DoubleSide, flatShading: true });

    scene.add(new THREE.Mesh(geometry, material));

    // Lighting (for non-wireframe)
    if (!wireframe) {
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const dir = new THREE.DirectionalLight(0xffffff, 0.8);
      dir.position.set(3, 5, 3);
      scene.add(dir);
    }

    // Grid helper
    const gridHelper = new THREE.GridHelper(2, 10, 0x333355, 0x222244);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    const animate = () => {
      this._raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}

customElements.define('lv-surface-3d', LvSurface3d);
export { LvSurface3d };
