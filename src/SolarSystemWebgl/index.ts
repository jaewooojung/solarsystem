import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { createOrbitContols } from "./systems/control";
import Debugger from "./systems/Debugger";
import Loader from "./systems/Loader";
import MainCamera from "./systems/MainCamera";
import Renderer from "./systems/Renderer";
import { createScene } from "./systems/scene";
import Sizes from "./systems/sizes";

class SolarSystemWebgl {
  private sizes: Sizes;
  private loader: Loader;
  private scene: Scene;
  private mainCamera: MainCamera;
  private mainControl: OrbitControls;
  private renderer: Renderer;
  private debugger: Debugger;
  private clock: Clock;
  private previousElapsed = 0;

  constructor(container: HTMLDivElement) {
    this.scene = createScene();
    this.sizes = new Sizes(container);
    this.mainCamera = new MainCamera(this.sizes);
    this.renderer = new Renderer(this.scene, this.mainCamera.getInstance());
    this.loader = new Loader();
    const canvas = this.renderer.getInstance().domElement;
    container.append(canvas);
    this.mainControl = createOrbitContols(this.mainCamera.getInstance(), canvas);
    this.debugger = new Debugger();
    this.clock = new Clock();
    this.scene.add(this.mainCamera.getInstance(), ...this.debugger.getHelpers());

    this.onResize();
    window.addEventListener("resize", () => {
      this.onResize();
    });
  }

  onResize = () => {
    const { width, height, pixelRatio } = this.sizes.onResize();
    this.mainCamera.onResize(width, height);
    this.renderer.onResize(width, height, pixelRatio);
  };

  render = () => {
    this.renderer.render();
  };

  start = () => {
    this.renderer.getInstance().setAnimationLoop(() => {
      const elapsed = this.clock.getElapsedTime();
      const delta = elapsed - this.previousElapsed;
      this.previousElapsed = elapsed;

      // tick
      // update

      this.mainControl.update();
      this.debugger.getStats().update();

      this.render();
    });
  };

  stop = () => {
    this.renderer.stop();
  };

  resetView = () => {
    this.mainControl.reset();
  };
}

export default SolarSystemWebgl;
