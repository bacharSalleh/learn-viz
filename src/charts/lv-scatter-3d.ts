import { LvBaseElement } from '../core/base-element.js';
import { loadScript } from '../core/utils.js';

const THREE_CDN = 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.min.js';
const ORBIT_CDN = 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/js/controls/OrbitControls.js';

const css = `
  :host { display: block; margin: var(--lv-sp-4) 0; }
  .scene-container { width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-r-md); overflow: hidden; background: var(--lv-bg-raised); position: relative; }
  canvas { display: block; width: 100% !important; height: 100% !important; }
  .label-overlay { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 12px; font-family: var(--lv-font); font-size: 11px; color: var(--lv-text-dim); pointer-events: none; }
`;

const PALETTE = ['#3b82f6', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

interface Scatter3dDatum {
  x: number; y: number; z: number;
  label?: string;
  cluster?: string;
}

class LvScatter3d extends LvBaseElement {
  private _raf: number | null = null;
  private _renderer: any = null;

  static get observedAttributes() {
    return ['data', 'x-label', 'y-label', 'z-label', 'clusters', 'auto-rotate', 'tooltip'];
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

  private async _buildScene(): Promise<void> {
    const data: Scatter3dDatum[] = this.jsonAttr('data', []);
    const xLabel = this.getAttribute('x-label') || 'X';
    const yLabel = this.getAttribute('y-label') || 'Y';
    const zLabel = this.getAttribute('z-label') || 'Z';
    const useClusters = this.hasAttribute('clusters');
    const autoRotate = this.hasAttribute('auto-rotate');

    this.render(`<div class="scene-container" id="scene"></div>`);

    if (!data.length) return;

    try {
      await loadScript(THREE_CDN);
      await loadScript(ORBIT_CDN);
    } catch {
      return;
    }

    const THREE = (window as any).THREE;
    if (!THREE) return;

    const container = this.root.getElementById('scene');
    if (!container) return;
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 375;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      getComputedStyle(this).getPropertyValue('--lv-bg-raised').trim() || '#12122a'
    );

    // Camera
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(2.5, 2, 2.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    this._renderer = renderer;

    // Controls
    const OrbitControls = (THREE as any).OrbitControls || (window as any).THREE.OrbitControls;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;

    // Normalize data to [-1, 1]
    const xs = data.map(d => d.x), ys = data.map(d => d.y), zs = data.map(d => d.z);
    const norm = (arr: number[]) => {
      const min = Math.min(...arr), max = Math.max(...arr);
      const range = max - min || 1;
      return arr.map(v => (v - min) / range * 2 - 1);
    };
    const nx = norm(xs), ny = norm(ys), nz = norm(zs);

    // Cluster colors
    const clusterNames = [...new Set(data.map(d => d.cluster || ''))];
    const clusterColor = (c: string) => {
      const idx = clusterNames.indexOf(c);
      return new THREE.Color(PALETTE[idx % PALETTE.length]);
    };

    // Points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(data.length * 3);
    const colors = new Float32Array(data.length * 3);

    data.forEach((d, i) => {
      positions[i * 3] = nx[i];
      positions[i * 3 + 1] = ny[i];
      positions[i * 3 + 2] = nz[i];
      const c = useClusters ? clusterColor(d.cluster || '') : new THREE.Color(PALETTE[0]);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, sizeAttenuation: true });
    scene.add(new THREE.Points(geometry, material));

    // Axes
    const axisLen = 1.2;
    const axisColors = [0xff4444, 0x44ff44, 0x4444ff];
    [[axisLen, 0, 0], [0, axisLen, 0], [0, 0, axisLen]].forEach(([x, y, z], i) => {
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: axisColors[i], opacity: 0.4, transparent: true });
      scene.add(new THREE.Line(geo, mat));
    });

    // Grid
    const gridHelper = new THREE.GridHelper(2, 10, 0x333355, 0x222244);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Animate
    const animate = () => {
      this._raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }
}

customElements.define('lv-scatter-3d', LvScatter3d);
export { LvScatter3d };
