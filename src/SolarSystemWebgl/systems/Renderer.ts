import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

class Renderer {
  private instance: WebGLRenderer;
  private scene: Scene;
  private mainCameraInstance: PerspectiveCamera;

  constructor(scene: Scene, mainCameraInstance: PerspectiveCamera) {
    this.instance = new WebGLRenderer({ antialias: true });
    this.scene = scene;
    this.mainCameraInstance = mainCameraInstance;
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
