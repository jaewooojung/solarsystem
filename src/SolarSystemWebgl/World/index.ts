import {
  AmbientLight,
  ClampToEdgeWrapping,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MirroredRepeatWrapping,
  PointLight,
  PointLightHelper,
  RepeatWrapping,
  SphereGeometry,
} from "three";
import { Tick } from "../../types";
import Loder from "../systems/Loader";
import { createBackground } from "./background";
import { createOrbitLine } from "./orbits/v1";
import createStars from "./stars/createStars";
import { getStarDatas } from "./stars/datas";

class World {
  private instance: Group;
  private loader: Loder;
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

  constructor(loder: Loder) {
    this.loader = loder;
    this.instance = new Group();
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
    const light = new AmbientLight("white", 3);
    this.instance.add(light);

    // Orbit
    const orbitLines = createOrbitLine(starDatas);
    this.instance.add(...orbitLines);

    // Background
    const background = await createBackground(this.loader);
    this.instance.add(background);
  };

  getWorld = () => this.instance;

  tick: Tick = (elapsed, delta) => {
    this.updatables.forEach((t) => t(elapsed, delta));
  };
}

export default World;
