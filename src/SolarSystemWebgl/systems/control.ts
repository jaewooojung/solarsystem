import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function createOrbitContols(camera: PerspectiveCamera, container: HTMLCanvasElement) {
  const orbitControls = new OrbitControls(camera, container);
  orbitControls.enabled = false;
  return orbitControls;
}

export { createOrbitContols };
