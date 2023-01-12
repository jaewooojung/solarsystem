import { Mesh, PerspectiveCamera, Raycaster, Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

import Element2D from "../../Element2D";
import Sizes from "../Sizes";

class Cursor {
  private static instance: Cursor;
  private coordinate: Vector2;
  private raycaster: Raycaster;
  private camera: PerspectiveCamera;
  private hovered: Mesh | null;
  private clicked: Mesh | null;
  private isAnimating: boolean;
  private element2D: Element2D;

  private constructor(
    sizes: Sizes,
    camera: PerspectiveCamera,
    controls: OrbitControls,
    container: HTMLDivElement,
    startLoop: () => void
  ) {
    this.coordinate = new Vector2(2, 2); // 초기값: 화면 밖.
    this.raycaster = new Raycaster();
    this.camera = camera;
    this.hovered = null;
    this.clicked = null;
    this.isAnimating = false;
    this.element2D = Element2D.getInstance();

    container.addEventListener("mousemove", (event) => {
      const { width, height } = sizes.getSizes();
      const x = (event.clientX / width) * 2 - 1;
      const y = -((event.clientY / height) * 2 - 1);
      this.coordinate.set(x, y);
    });

    container.addEventListener("click", (event) => {
      if (this.isAnimating) {
        return;
      }
      if (this.hovered) {
        gsap
          .timeline({
            defaults: {
              duration: 1.5,
              ease: "expo.out",
              onStart: () => {
                this.isAnimating = true;
                controls.enabled = false;
                this.clicked = this.hovered;
                this.removeHovered();
                this.element2D.showDesc(this.clicked!);
              },
              onUpdate: () => {},
              onComplete: () => {
                this.isAnimating = false;
                controls.enabled = true;
              },
            },
          })
          .to(controls.target, {
            x: this.hovered.position.x,
            y: this.hovered.position.y,
            z: this.hovered.position.z,
          });
      }
    });

    this.element2D.getDescOuter().addEventListener("click", (event) => {
      event.stopPropagation();
      this.element2D.hideDesc();
      this.clicked = null;
    });

    this.element2D.getDescInner().addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.element2D.getProgress().addEventListener("click", (event) => {
      this.element2D.getIntro().remove();
      startLoop();
      gsap.timeline({}).to(this.camera.position, {
        duration: 2,
        x: 20,
        y: 20,
        z: 20,
      });
    });
  }

  static init(
    sizes: Sizes,
    camera: PerspectiveCamera,
    controls: OrbitControls,
    container: HTMLDivElement,
    startLoop: () => void
  ) {
    if (!Cursor.instance) {
      Cursor.instance = new Cursor(sizes, camera, controls, container, startLoop);
    }
  }
  /**
   * get the instance. no initialization.
   */
  static getInstance() {
    if (Cursor.instance) {
      return Cursor.instance;
    } else {
      throw new Error(
        "You should initialize the instance. call 'Cursor.init(sizes, camera, controls, container)' first"
      );
    }
  }

  getHovered = () => this.hovered;
  setHovered = (mesh: Mesh | null) => (this.hovered = mesh);
  getClicked = () => this.clicked;

  prepareRaycaster = () => {
    const { x, y } = this.coordinate;
    this.raycaster.setFromCamera({ x, y }, this.camera);
    return this.raycaster;
  };

  removeHovered = () => {
    this.hovered = null;
    this.element2D.hideTooltip();
  };

  showTooltip = (starName: string, position3D: Vector3) => {
    position3D.project(this.camera);
    this.element2D.showTooltip(starName, position3D);
  };
}

export default Cursor;
