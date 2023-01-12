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
import Sizes from "./systems/Sizes";
import World from "./World";

class SolarSystemWebgl {
  private sizes: Sizes;
  private scene: Scene;
  private mainCamera: MainCamera;
  private mainControl: OrbitControls;
  private renderer: Renderer;
  private world: World;
  private clock: Clock;
  private previousElapsed = 0;

  constructor(container: HTMLDivElement) {
    this.scene = createScene();
    const loader = new Loader();
    this.sizes = new Sizes(container);
    const element2D = new Element2D(container, this.sizes);
    this.mainCamera = new MainCamera(this.sizes);
    this.renderer = new Renderer(this.scene, this.mainCamera.getCamera());
    const canvas = this.renderer.getRenderer().domElement;
    container.append(canvas);
    this.mainControl = createOrbitContols(this.mainCamera.getCamera(), canvas);
    const cursor = new Cursor(
      container,
      this.sizes,
      element2D,
      this.mainCamera.getCamera(),
      this.mainControl,
      this.onClickStart
    );
    this.world = new World(loader, cursor);
    this.world.init();
    this.scene.add(this.mainCamera.getCamera(), this.world.getWorld(), ...Debugger.getInstance().getHelpers());

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

  onClickStart = () => {
    this.renderer.getRenderer().setAnimationLoop(() => {
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

  load = () => {
    this.render();
  };
}

export default SolarSystemWebgl;
