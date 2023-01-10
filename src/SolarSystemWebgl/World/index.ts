import { AmbientLight, Group, Mesh, PointLight, PointLightHelper, Raycaster, Vector2, Vector3 } from "three";
import Loder from "../systems/Loader";
import { createBackground } from "./background";
import { createOrbitLine } from "./orbits";
import createStars from "./stars/createStars";
import { getStarDatas } from "./stars/datas";
import { Tick } from "../../types";
import Cursor from "../systems/Cursor";
import Element2D from "../Element2D";

class World {
  private instance: Group;
  private loader: Loder;
  private cursor: Cursor;
  private element2D: Element2D;
  private stars!: {
    sun: Mesh;
    mercury: Mesh;
    venus: Mesh;
    earth: Mesh;
    mars: Mesh;
    jupiter: Mesh;
    saturn: Mesh;
  };
  private updatables: Array<Tick>;

  constructor(loder: Loder, cursor: Cursor, element2D: Element2D) {
    this.instance = new Group();
    this.loader = loder;
    this.cursor = cursor;
    this.element2D = element2D;
    this.updatables = [];
  }

  init = async () => {
    const starDatas = getStarDatas(true);

    // Stars
    const stars = await createStars(this.loader, starDatas);
    this.instance.add(...stars);

    const selfRotation: Tick = (elapsed, delta) => {
      stars.forEach((s, i) => {
        s.rotateY(((2 * Math.PI) / starDatas[i].period.rotation) * delta * -1); // rotation초마다 한바퀴 (1day => 1second)
      });
    };
    const orbitRotation: Tick = (elapsed, delta) => {
      stars.forEach((s, i) => {
        if (i === 0) {
          return;
        }
        const orbitRadian = starDatas[i].orbitalRotaionRadianPerSceond! * elapsed;
        // orbital초마다 한바퀴 (1day => 1second)
        const positionX = Math.sin(orbitRadian) * starDatas[i].distanceToSun;
        s.position.x = positionX;
        s.position.z = Math.cos(orbitRadian) * starDatas[i].distanceToSun;
        s.position.y = positionX * starDatas[i].maxTanY!;
      });
    };
    this.updatables.push(selfRotation, orbitRotation);

    // Light
    const ambientLight = new AmbientLight("white", 3);
    const pointLight = new PointLight("white", 10000);
    pointLight.position.set(0, 0, 0);
    this.instance.add(ambientLight);
    const pointLightHelper = new PointLightHelper(pointLight);
    this.instance.add(pointLight, pointLightHelper);

    // Orbit
    const orbitLines = createOrbitLine(starDatas);
    this.instance.add(...orbitLines);

    // Background
    const background = await createBackground(this.loader);
    this.instance.add(background);

    // const temp = 10;
    // console.time("a");
    // for (let i = 0; i < 100000; i++) {
    //   if (temp < 100) {
    //   }
    //   // this.cursor.setTarget(null);
    // }
    // console.timeEnd("a");

    // Raycaster
    const checkIntersections = () => {
      this.cursor.initRaycaster();
      const raycaster = this.cursor.getRaycaster();
      const intersects = raycaster.intersectObjects(stars);
      const target = this.cursor.getTarget();
      if (intersects.length > 0) {
        const newTarget = intersects[0].object as Mesh;
        if (!target || target.name !== newTarget.name) {
          console.log("new or change. start star animation");
        }
        this.cursor.setTarget(newTarget);
      } else {
        if (target) {
          this.cursor.setTarget(null);
          this.element2D.hideTooltip();
        }
      }
    };
    const showStarTooltip = () => {
      const target = this.cursor.getTarget();
      if (target) {
        // console.log(target);
        // mouse hover시에만 실행.
        // 1)target의 worldPosition뽑고
        const position3D = new Vector3();
        target.getWorldPosition(position3D);
        // console.log(position3D);
        // 2)2D coordinate 위치 따고
        this.cursor.projectToCamera(position3D);
        this.element2D.showTooltip(target.name, position3D);
        // 3)미리 만들어놓은 htmlElement를 visible로하고, 위치를 2)의 2D coordinate를 주입
        // this.element2D.showTooltip(target.name, position3D)
        // * sun은 위치 딸 필요없음
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
