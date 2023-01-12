import { CineonToneMapping, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";

class Renderer {
  private instance: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  constructor(scene: Scene, camera: PerspectiveCamera) {
    this.instance = new WebGLRenderer({ antialias: true });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    // this.instance.shadowMap.enabled = true;
    this.instance.toneMapping = CineonToneMapping;
    // this.instance.toneMappingExposure = 2;
    this.scene = scene;
    this.camera = camera;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = PCFShadowMap;
  }

  getRenderer() {
    return this.instance;
  }

  onResize(width: number, height: number, pixelRatio: number) {
    this.instance.setSize(width, height);
    this.instance.setPixelRatio(pixelRatio);
  }

  render() {
    this.instance.render(this.scene, this.camera);
  }

  stop() {
    this.instance.setAnimationLoop(null);
  }
}

export default Renderer;
