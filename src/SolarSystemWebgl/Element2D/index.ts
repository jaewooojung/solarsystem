import "./styles.css";
import Sizes from "../systems/Sizes";
import { Vector3 } from "three";

class Element2D {
  private tooltip: HTMLDivElement;
  private tooltipText: HTMLDivElement;
  private sizes: Sizes;
  constructor(sizes: Sizes, container: HTMLDivElement) {
    this.sizes = sizes;

    const tooltipTextDiv = document.createElement("div");
    tooltipTextDiv.classList.add("tooltip-text");
    this.tooltipText = tooltipTextDiv;

    const tooltipAniDiv = document.createElement("div");
    tooltipAniDiv.classList.add("tooltip-animate");

    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add("tooltip");

    this.tooltip = tooltipDiv;
    this.tooltip.append(tooltipTextDiv);
    this.tooltip.append(tooltipAniDiv);

    container!.append(tooltipDiv);
  }
  // getTooltip = (starName: string) => this.tooltips.find((t) => t.id === starName);
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
}

export default Element2D;
