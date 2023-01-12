import { Mesh, Vector3 } from "three";
import Sizes from "../systems/Sizes";
import createDescription from "./description";
import createIntro from "./intro";
import createTooltip from "./tooltip";
import "./styles/index.css";

/**
 * singleton
 */
class Element2D {
  private static instance: Element2D;
  private sizes: Sizes;
  private intro: HTMLDivElement;
  private tooltip: HTMLDivElement;
  private desc: HTMLDivElement;
  private constructor(sizes: Sizes, container: HTMLDivElement) {
    this.sizes = sizes;

    // loading
    this.intro = createIntro();
    container!.append(this.intro);

    // tooltip
    this.tooltip = createTooltip();
    container!.append(this.tooltip);

    // description
    this.desc = createDescription();
    container!.append(this.desc);
  }
  /**
   * initialize in root.
   */
  static init(sizes: Sizes, container: HTMLDivElement) {
    if (!Element2D.instance) {
      Element2D.instance = new Element2D(sizes, container);
    }
  }
  /**
   * get the instance. no initialization.
   */
  static getInstance() {
    if (Element2D.instance) {
      return Element2D.instance;
    } else {
      throw new Error("You should initialize the instance. call 'Element2D.init(sizes, container)' first");
    }
  }
  getIntro = () => this.intro;

  getProgress = () => this.intro.children[0];

  getDescOuter = () => this.desc.children[0];

  getDescInner = () => this.desc.children[1];

  showTooltip = (starName: string, position: Vector3) => {
    const { width, height } = this.sizes.getSizes();
    const translateX = position.x * width * 0.5;
    const translateY = -position.y * height * 0.5;
    this.tooltip.children[0].innerHTML = starName.toUpperCase();
    this.tooltip.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    this.tooltip.style.display = "block";
  };

  hideTooltip = () => {
    this.tooltip.style.display = "none";
  };

  showDesc = (mesh: Mesh) => {
    this.desc.style.display = "flex";
    const title = document.getElementById("title");
    const spec = document.getElementById("spec");
    const summary = document.getElementById("summary");
    title!.innerHTML = mesh.name.toUpperCase();
    const { userData } = mesh;
    spec!.innerHTML = `
    - Distance from sun: ${userData.distanceToSun} AU <br />
    - Orbital period: ${userData.period.orbital} day <br />
    - Rotation period: ${userData.period.rotation} day <br />
    - Radius: ${userData.radius} km <br />
    - Orbital inclination : ${userData.inclinationFromSun} degree
    `;
    summary!.innerHTML = userData.summary;
  };

  hideDesc = () => {
    this.desc.style.display = "none";
  };

  hideIntro = () => {
    this.intro.style.display = "none";
  };
}

export default Element2D;
