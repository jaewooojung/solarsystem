import { CineonToneMapping, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";

class Renderer {
  private instance: WebGLRenderer;
  private scene: Scene;
  private mainCameraInstance: PerspectiveCamera;

  constructor(scene: Scene, mainCameraInstance: PerspectiveCamera) {
    this.instance = new WebGLRenderer({ antialias: true });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    // this.instance.shadowMap.enabled = true;
    this.instance.toneMapping = CineonToneMapping;
    // this.instance.toneMappingExposure = 2;
    this.scene = scene;
    this.mainCameraInstance = mainCameraInstance;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = PCFShadowMap;
  }

  getInstance() {
    return this.instance;
  }

  onResize(width: number, height: number, pixelRatio: number) {
    this.instance.setSize(width, height);
    this.instance.setPixelRatio(pixelRatio);
  }

  render() {
    this.instance.render(this.scene, this.mainCameraInstance);
  }

  stop() {
    this.instance.setAnimationLoop(null);
  }
}

export default Renderer;
