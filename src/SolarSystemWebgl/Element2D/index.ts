import { Mesh, Vector3 } from "three";
import Sizes from "../systems/Sizes";
import createDescription from "./description";
import createIntro from "./intro";
import createTooltip from "./tooltip";

class Element2D {
  private sizes: Sizes;
  private intro: HTMLDivElement;
  private tooltip: HTMLDivElement;
  private desc: HTMLDivElement;
  constructor(container: HTMLDivElement, sizes: Sizes) {
    this.sizes = sizes;

    // intro
    this.intro = createIntro();
    container!.append(this.intro);

    // tooltip
    this.tooltip = createTooltip();
    container!.append(this.tooltip);

    // description
    this.desc = createDescription();
    container!.append(this.desc);
  }

  getIntro = () => this.intro;

  getDesc = () => this.desc;

  showTooltip = (starName: string, projectedPosition: Vector3) => {
    const { width, height } = this.sizes.getSizes();
    const translateX = projectedPosition.x * width * 0.5;
    const translateY = -projectedPosition.y * height * 0.5;
    this.tooltip.children[0].innerHTML = starName.toUpperCase();
    this.tooltip.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    this.tooltip.style.display = "block";
  };

  hideTooltip = () => {
    this.tooltip.style.display = "none";
  };

  showDesc = (mesh: Mesh) => {
    const descInner = this.desc.children[1];
    this.desc.classList.remove("display-none");
    this.desc.classList.add("display-flex");
    const [title, spec, summary] = descInner.children;
    title.innerHTML = mesh.name.toUpperCase();
    const { userData } = mesh;
    spec.innerHTML = `
    - Distance from sun: ${userData.distanceToSun} AU <br />
    - Orbital period: ${userData.period.orbital} day <br />
    - Rotation period: ${userData.period.rotation} day <br />
    - Radius: ${userData.radius} km <br />
    - Orbital inclination : ${userData.inclinationFromSun} degree
    `;
    summary.innerHTML = userData.summary;
  };

  hideDesc = () => {
    this.desc.classList.remove("display-flex");
    this.desc.classList.add("display-none");
  };

  removeIntro = () => this.intro.remove();

  onClickStart = () => {
    const [title, progress] = this.intro.children;
    const [circle1, circle2, startText] = progress.children;
    title.classList.add("transition-30", "opacity-0");
    startText.classList.add("last-animation");
    circle1.classList.remove("transition-04");
    circle2.classList.remove("transition-04");
    circle1.classList.add("scaleout-circle");
    circle2.classList.add("scaleout-circle");
  };
}

export default Element2D;
