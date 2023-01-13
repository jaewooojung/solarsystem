import { AmbientLight, Group, Mesh, PointLight, PointLightHelper, Vector3 } from "three";
import Cursor from "../systems/Cursor";
import createStars from "./stars/createStars";
import createOrbitLine from "./orbits";
import createBackground from "./background";
import { getStarDatas } from "./stars/datas";
import { Tick } from "../../types";
import Loader from "../systems/Loader";
import Element2D from "../Element2D";

class World {
  private instance: Group;
  private loader: Loader;
  private cursor: Cursor;
  private element2D: Element2D;
  private onClickStart: () => void;
  private updatables: Array<Tick>;

  constructor(loader: Loader, cursor: Cursor, element2D: Element2D, onClickStart: () => void) {
    this.instance = new Group();
    this.loader = loader;
    this.cursor = cursor;
    this.element2D = element2D;
    this.onClickStart = onClickStart;
    this.updatables = [];
  }

  init = async () => {
    // texture Loading
    await this.loader.load();

    // Stars
    const starDatas = getStarDatas(true);
    const { stars, starsTick } = createStars(starDatas, this.loader);
    this.instance.add(...stars);
    this.updatables.push(starsTick);

    // OrbitLine
    /**
     * 공전궤도
     */
    const orbitLines = createOrbitLine(starDatas);
    this.instance.add(...orbitLines);

    // Background
    const background = createBackground(this.loader);
    this.instance.add(background);

    // Light
    const ambientLight = new AmbientLight("white", 3);
    const pointLight = new PointLight("white", 10000);
    this.instance.add(ambientLight);
    const pointLightHelper = new PointLightHelper(pointLight);
    this.instance.add(pointLight, pointLightHelper);

    // World Tick
    const checkHover = () => {
      if (this.cursor.getClicked()) {
        return;
      }
      const raycaster = this.cursor.prepareRaycaster();
      const intersects = raycaster.intersectObjects(stars);
      const hovered = this.cursor.getHovered();
      let newHovered = null;
      if (intersects.length > 0) {
        newHovered = intersects[0].object as Mesh;
        if (!hovered || hovered.name !== newHovered.name) {
          // [todo] star(newHovered) hovered animation
        }
        this.cursor.setHovered(newHovered);
        document.body.style.cursor = "pointer";
      } else {
        if (hovered) {
          this.cursor.setHovered(null);
          this.element2D.hideTooltip();
          document.body.style.cursor = "default";
        }
      }
      const clicked = this.cursor.getClicked();
      if (newHovered && !clicked) {
        const position3D = new Vector3(0, 0, 0);
        newHovered.getWorldPosition(position3D);
        this.cursor.projectToCamera(position3D);
        this.element2D.showTooltip(newHovered.name, position3D);
      }
    };

    this.updatables.push(checkHover);

    // Handling Element2D with Cursor
    const intro = this.element2D.getIntro();
    const progress = intro.children[1];
    const progressText = progress.getElementsByTagName("span")[0];
    // click START
    progress.addEventListener("click", (event) => {
      this.element2D.onClickStart();
    });
    // Detect the end of above animations
    progressText.addEventListener("animationend", () => {
      this.element2D.removeIntro();
      this.onClickStart();
    });

    const desc = this.element2D.getDesc();
    const [descOuter, descInner] = desc.children;

    descOuter.addEventListener("click", (event) => {
      event.stopPropagation();
      this.element2D.hideDesc();
      this.cursor.setClicked(null);
    });

    descInner.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  };

  getWorld = () => this.instance;

  tick: Tick = (elapsed, delta) => {
    this.updatables.forEach((t) => t(elapsed, delta));
  };
}

export default World;
