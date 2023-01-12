import { Clock, Scene } from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Element2D from "./Element2D";
import { createOrbitContols } from "./systems/control";
import Cursor from "./systems/singletons/Cursor";
import Debugger from "./systems/singletons/Debugger";
import Loader from "./systems/singletons/Loader";
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
    Loader.init();
    Debugger.init();
    this.scene = createScene();
    this.sizes = new Sizes(container);
    Element2D.init(this.sizes, container);
    this.mainCamera = new MainCamera(this.sizes);
    this.renderer = new Renderer(this.scene, this.mainCamera.getCamera());
    const canvas = this.renderer.getRenderer().domElement;
    container.append(canvas);
    this.mainControl = createOrbitContols(this.mainCamera.getCamera(), canvas);
    Cursor.init(this.sizes, this.mainCamera.getCamera(), this.mainControl, container, this.startLoop);
    this.world = new World();
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

  startLoop = () => {
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
