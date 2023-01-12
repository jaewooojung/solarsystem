import { AmbientLight, Group, Mesh, PointLight, PointLightHelper, Vector3 } from "three";
import Loder from "../systems/Loader";
import Cursor from "../systems/Cursor";
import createStars from "./stars/createStars";
import { createOrbitLine } from "./orbits";
import { createBackground } from "./background";
import { getStarDatas } from "./stars/datas";
import { Tick } from "../../types";

class World {
  private instance: Group;
  private loader: Loder;
  private cursor: Cursor;
  private updatables: Array<Tick>;

  constructor(loder: Loder, cursor: Cursor) {
    this.instance = new Group();
    this.loader = loder;
    this.cursor = cursor;
    this.updatables = [];
  }

  init = async () => {
    const starDatas = getStarDatas(true);

    // Stars
    const stars = await createStars(starDatas, this.loader);
    this.instance.add(...stars);

    // OrbitLine
    /**
     * 공전궤도
     */
    const orbitLines = createOrbitLine(starDatas);
    this.instance.add(...orbitLines);

    // Background
    const background = await createBackground(this.loader);
    this.instance.add(background);

    // Light
    const ambientLight = new AmbientLight("white", 3);
    const pointLight = new PointLight("white", 10000);
    this.instance.add(ambientLight);
    const pointLightHelper = new PointLightHelper(pointLight);
    this.instance.add(pointLight, pointLightHelper);

    // Tick - selfrotation and orbitrotation of stars
    /**
     * 자전. 1 round per 'period.rotation(sec)'
     */
    const selfRotation: Tick = (elapsed, delta) => {
      stars.forEach((s) => {
        s.rotateY(((2 * Math.PI) / s.userData.period.rotation) * delta * -1);
      });
    };
    /**
     * 공전. 1 round per 'orbitalRotaionRadianPerSecond(sec)'
     */
    const orbitRotation: Tick = (elapsed, delta) => {
      stars.slice(1).forEach((s) => {
        const orbitRotationPerFrame = s.userData.orbitalRotaionRadianPerSecond! * elapsed;
        const positionX = Math.sin(orbitRotationPerFrame) * s.userData.distanceToSun;
        s.position.x = positionX;
        s.position.z = Math.cos(orbitRotationPerFrame) * s.userData.distanceToSun;
        s.position.y = positionX * s.userData.tangent_inclinationFromSun!;
      });
    };
    this.updatables.push(selfRotation, orbitRotation);

    // Tick - tooltip
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
