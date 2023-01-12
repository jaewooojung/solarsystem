import { Clock, Mesh, Scene } from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { createOrbitContols } from "./systems/control";
import Cursor from "./systems/Cursor";
import Debugger from "./systems/Debugger";
import Loader from "./systems/Loader";
import MainCamera from "./systems/MainCamera";
import Renderer from "./systems/Renderer";
import { createScene } from "./systems/scene";
import Sizes from "./systems/Sizes";
import Element2D from "./Element2D";
import World from "./World";

class SolarSystemWebgl {
  private scene: Scene;
  private sizes: Sizes;
  private mainCamera: MainCamera;
  private renderer: Renderer;
  private controls: OrbitControls;
  private world: World;
  private clock: Clock;
  private previousElapsed = 0;

  constructor(container: HTMLDivElement) {
    this.scene = createScene();
    const loader = new Loader();
    this.sizes = new Sizes(container);
    this.mainCamera = new MainCamera(this.sizes);
    const cursor = new Cursor(this.mainCamera.getCamera());
    const element2D = new Element2D(container, this.sizes);
    this.renderer = new Renderer(this.scene, this.mainCamera.getCamera());
    const canvas = this.renderer.getRenderer().domElement;
    container.append(canvas);
    this.controls = createOrbitContols(this.mainCamera.getCamera(), canvas);

    this.world = new World(loader, cursor, element2D, this.onClickStart);
    this.world.init();

    this.scene.add(this.mainCamera.getCamera(), this.world.getWorld(), ...Debugger.getInstance().getHelpers());

    this.clock = new Clock();

    this.onResize();
    window.addEventListener("resize", () => {
      this.onResize();
    });

    container.addEventListener("mousemove", (event) => {
      const { width, height } = this.sizes.getSizes();
      const x = (event.clientX / width) * 2 - 1;
      const y = -((event.clientY / height) * 2 - 1);
      cursor.setCoordinate(x, y);
    });

    container.addEventListener("click", (event) => {
      const isCameraMoving = cursor.getIsCameraMoving();
      if (isCameraMoving) {
        return;
      }
      const hovered = cursor.getHovered();
      if (hovered) {
        const clicked = hovered.name === "saturnRing" ? (hovered.parent as Mesh) : hovered;
        gsap
          .timeline({
            defaults: {
              duration: 1.5,
              ease: "expo.out",
              onStart: () => {
                cursor.setIsCameraMoving(true);
                this.controls.enabled = false;
                cursor.setHovered(null);
                cursor.setClicked(clicked);
                element2D.hideTooltip();
                element2D.showDesc(clicked);
              },
              onUpdate: () => {},
              onComplete: () => {
                cursor.setIsCameraMoving(false);
                this.controls.enabled = true;
              },
            },
          })
          .to(this.controls.target, {
            x: clicked.position.x,
            y: clicked.position.y,
            z: clicked.position.z,
          });
      }
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
    gsap.timeline({}).to(this.mainCamera.getCamera().position, {
      duration: 2,
      x: 20,
      y: 20,
      z: 20,
    });
    this.renderer.getRenderer().setAnimationLoop(() => {
      const elapsed = this.clock.getElapsedTime();
      const delta = elapsed - this.previousElapsed;
      this.previousElapsed = elapsed;

      // tick
      this.world.tick(elapsed, delta);

      // update
      this.controls.update();
      Debugger.getInstance().getStats().update();

      this.render();
    });
  };

  stop = () => {
    this.renderer.stop();
  };

  resetView = () => {
    this.controls.reset();
  };

  load = () => {
    this.render();
  };
}

export default SolarSystemWebgl;
