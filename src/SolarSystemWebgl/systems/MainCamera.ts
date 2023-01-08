import { PerspectiveCamera } from "three";
import Sizes from "./sizes";

class MainCamera {
  private instance: PerspectiveCamera;
  constructor(sizes: Sizes) {
    const { width, height } = sizes.getSizes();
    this.instance = new PerspectiveCamera(75, width / height, 0.001, 10000);
    this.instance.position.set(10, 10, 10);
  }
  getInstance() {
    return this.instance;
  }

  onResize(width: number, height: number) {
    this.instance.aspect = width / height;
    this.instance.updateProjectionMatrix();
  }
}

export default MainCamera;
