import { Clock, Raycaster, Scene, Vector2 } from "three";
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
  private debugger: Debugger;
  private clock: Clock;
  private previousElapsed = 0;
  private element2D: Element2D;
  private world: World;

  constructor(container: HTMLDivElement) {
    this.scene = createScene();
    this.sizes = new Sizes(container);
    this.element2D = new Element2D(this.sizes, container);
    this.mainCamera = new MainCamera(this.sizes);
    this.cursor = new Cursor(this.sizes, this.mainCamera.getInstance(), container);
    this.renderer = new Renderer(this.scene, this.mainCamera.getInstance());
    this.loader = new Loader();
    const canvas = this.renderer.getInstance().domElement;
    container.append(canvas);
    this.mainControl = createOrbitContols(this.mainCamera.getInstance(), canvas);
    this.debugger = new Debugger();
    this.clock = new Clock();
    this.scene.add(this.mainCamera.getInstance());
    this.onResize();
    window.addEventListener("resize", () => {
      this.onResize();
    });
    this.world = new World(this.loader, this.cursor, this.element2D);
    this.world.init();
    this.scene.add(this.world.getWorld());
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

      // this.mainControl.update();
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
