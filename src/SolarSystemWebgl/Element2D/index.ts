import { Mesh, Vector3 } from "three";
import Sizes from "../systems/Sizes";
import "./styles.css";

/**
 * singleton
 */
class Element2D {
  private static instance: Element2D;
  private sizes: Sizes;
  private tooltip: HTMLDivElement;
  private tooltipText: HTMLDivElement;
  private desc: HTMLDivElement;
  private descOuter: HTMLDivElement;
  private descInner: HTMLDivElement;
  private constructor(sizes: Sizes, container: HTMLDivElement) {
    this.sizes = sizes;

    // tooltip
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add("tooltip");

    const tooltipTextDiv = document.createElement("div");
    tooltipTextDiv.classList.add("tooltip-text");
    this.tooltipText = tooltipTextDiv;

    const tooltipAniDiv = document.createElement("div");
    tooltipAniDiv.classList.add("tooltip-animate");

    this.tooltip = tooltipDiv;
    this.tooltip.append(tooltipTextDiv);
    this.tooltip.append(tooltipAniDiv);

    container!.append(tooltipDiv);

    // description
    const descDiv = document.createElement("div");
    descDiv.classList.add("desc");
    this.desc = descDiv;

    const descOuterDiv = document.createElement("div");
    descOuterDiv.classList.add("desc-outer");
    this.descOuter = descOuterDiv;

    const descInnerDiv = document.createElement("div");
    descInnerDiv.classList.add("desc-inner");
    this.descInner = descInnerDiv;

    descDiv.append(descOuterDiv, descInnerDiv);
    container!.append(descDiv);
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
  getDescOuter = () => this.descOuter;

  getDescInner = () => this.descInner;

  showTooltip = (starName: string, position: Vector3) => {
    const { width, height } = this.sizes.getSizes();
    const translateX = position.x * width * 0.5;
    const translateY = -position.y * height * 0.5;
    this.tooltip.classList.remove("hidden");
    this.tooltip.classList.add("visible");
    this.tooltipText.innerText = starName.toUpperCase();
    this.tooltip.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  };

  hideTooltip = () => {
    this.tooltip.classList.remove("visible");
    this.tooltip.classList.add("hidden");
  };

  showDesc = (mesh: Mesh) => {
    this.desc.style.display = "flex";
  };

  hideDesc = () => {
    this.desc.style.display = "none";
  };
}

export default Element2D;
