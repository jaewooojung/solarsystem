import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Element2D from "./Element2D";
import { createOrbitContols } from "./systems/control";
import Cursor from "./systems/Cursor";
import Debugger from "./systems/Debugger";
import Loader from "./systems/Loader";
import MainCamera from "./systems/MainCamera";
import Renderer from "./systems/Renderer";
import { createScene } from "./systems/scene";
import Sizes from "./systems/sizes";
import World from "./World";

class SolarSystemWebgl {
  private sizes: Sizes;
  private loader: Loader;
  private scene: Scene;
  private mainCamera: MainCamera;
  private cursor: Cursor;
  private mainControl: OrbitControls;
  private renderer: Renderer;
  private world: World;
  private clock: Clock;
  private previousElapsed = 0;

  constructor(container: HTMLDivElement) {
    this.scene = createScene();
    this.sizes = new Sizes(container);
    Element2D.init(this.sizes, container);
    Debugger.init();
    this.mainCamera = new MainCamera(this.sizes);
    this.renderer = new Renderer(this.scene, this.mainCamera.getInstance());
    const canvas = this.renderer.getInstance().domElement;
    container.append(canvas);
    this.mainControl = createOrbitContols(this.mainCamera.getInstance(), canvas);
    this.loader = new Loader();
    this.cursor = new Cursor(this.sizes, this.mainCamera.getInstance(), container, this.mainControl);
    this.world = new World(this.loader, this.cursor);
    this.world.init();
    this.scene.add(this.mainCamera.getInstance(), this.world.getWorld());
    this.clock = new Clock();
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
      this.world.tick(elapsed, delta);

      // update
      this.mainControl.update();
      Debugger.getInstance().getStats().update();

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
