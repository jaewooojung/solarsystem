import { AmbientLight, Group, Mesh, PointLight, PointLightHelper, Vector3 } from "three";
import Cursor from "../systems/singletons/Cursor";
import createStars from "./stars/createStars";
import { createOrbitLine } from "./orbits";
import { createBackground } from "./background";
import { getStarDatas } from "./stars/datas";
import { Tick } from "../../types";
import Loader from "../systems/singletons/Loader";

class World {
  private instance: Group;
  private cursor: Cursor;
  private updatables: Array<Tick>;

  constructor() {
    this.instance = new Group();
    this.cursor = Cursor.getInstance();
    this.updatables = [];
  }

  init = async () => {
    // texture Loading
    await Loader.getInstance().load();

    const starDatas = getStarDatas(true);

    // Stars
    const { stars, starsTick } = await createStars(starDatas);
    this.instance.add(...stars);
    this.updatables.push(starsTick);

    // OrbitLine
    /**
     * 공전궤도
     */
    const orbitLines = createOrbitLine(starDatas);
    this.instance.add(...orbitLines);

    // Background
    const background = await createBackground();
    this.instance.add(background);

    // Light
    const ambientLight = new AmbientLight("white", 3);
    const pointLight = new PointLight("white", 10000);
    this.instance.add(ambientLight);
    const pointLightHelper = new PointLightHelper(pointLight);
    this.instance.add(pointLight, pointLightHelper);

    // World Tick
    const checkIntersections = () => {
      if (this.cursor.getClicked() !== null) {
        return;
      }
      const raycaster = this.cursor.prepareRaycaster();
      const intersects = raycaster.intersectObjects(stars);
      const hovered = this.cursor.getHovered();
      if (intersects.length > 0) {
        const newHovered = intersects[0].object as Mesh;
        if (!hovered || hovered.name !== newHovered.name) {
          // [todo]
          // console.log("new or change. start star animation");
        }
        this.cursor.setHovered(newHovered);
      } else {
        if (hovered) {
          this.cursor.removeHovered();
        }
      }
    };

    const showStarTooltip = () => {
      const hovered = this.cursor.getHovered();
      if (hovered) {
        const position3D = new Vector3(0, 0, 0);
        hovered.getWorldPosition(position3D);
        this.cursor.showTooltip(hovered.name, position3D);
      }
    };
    this.updatables.push(checkIntersections, showStarTooltip);
  };

  getWorld = () => this.instance;

  tick: Tick = (elapsed, delta) => {
    this.updatables.forEach((t) => t(elapsed, delta));
  };
}

export default World;
