import { Clock, Mesh, Scene } from "three";
import gsap, { Linear } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { createOrbitContols } from "./systems/control";
import Cursor from "./systems/Cursor";
import DevOnly from "./systems/DevOnly";
import Loader from "./systems/Loader";
import MainCamera from "./systems/MainCamera";
import Renderer from "./systems/Renderer";
import { createScene } from "./systems/scene";
import Sizes from "./systems/Sizes";
import Element2D from "./Element2D";
import World from "./World";

import "../styles/global.css";
import "../styles/common.css";

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

    this.scene.add(this.mainCamera.getCamera(), this.world.getWorld());

    console.log("env", process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      this.scene.add(...DevOnly.getInstance().getHelpers());
    }

    this.clock = new Clock();

    this.onResize();
    window.addEventListener("resize", () => {
      this.onResize();
    });

    // Set Cursor coordinate.
    container.addEventListener("mousemove", (event) => {
      const { width, height } = this.sizes.getSizes();
      const x = (event.clientX / width) * 2 - 1;
      const y = -((event.clientY / height) * 2 - 1);
      cursor.setCoordinate(x, y);
    });

    // When you click on a star.
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
                document.body.style.cursor = "default";
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

  private onResize = () => {
    const { width, height, pixelRatio } = this.sizes.onResize();
    this.mainCamera.onResize(width, height);
    this.renderer.onResize(width, height, pixelRatio);
  };

  private render = () => {
    this.renderer.render();
  };

  /**
   * It will be triggered by World.
   */
  private onClickStart = () => {
    const cameraPosition = this.mainCamera.getCamera().position;
    const tl = gsap.timeline({
      onComplete: () => {
        this.controls.enabled = true;
        this.controls.saveState();
      },
    });
    tl.to(cameraPosition, {
      duration: 8,
      delay: 10,
      ease: "sine.out",
      x: 50,
      y: 50,
    });
    tl.to(cameraPosition, {
      duration: 2,
      ease: Linear.easeOut,
      x: -50,
      z: 50,
    });
    this.renderer.getRenderer().setAnimationLoop(() => {
      const elapsed = this.clock.getElapsedTime();
      const delta = elapsed - this.previousElapsed;
      this.previousElapsed = elapsed;

      // tick
      this.world.tick(elapsed, delta);

      // update
      this.controls.update();
      if (process.env.NODE_ENV === "development") {
        DevOnly.getInstance().getStats().update();
      }

      this.render();
    });
  };

  load = () => {
    this.render();
  };

  /**
   * [todo] Do not use yet.
   */
  stop = () => {
    this.renderer.stop();
  };

  /**
   * [todo] Do not use yet.
   */
  resetView = () => {
    this.controls.reset();
  };
}

export default SolarSystemWebgl;
