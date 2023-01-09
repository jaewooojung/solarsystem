import {
  AmbientLight,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PointLight,
  PointLightHelper,
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
    // Stars
    const starDatas = getStarDatas(true);
    const starModels = await createStars(this.loader, starDatas);
    this.instance.add(...starModels);

    // Light
    const light = new AmbientLight("white", 3);
    this.instance.add(light);

    // Orbit
    const orbitLines = createOrbitLine(starDatas);
    this.instance.add(...orbitLines);

    const selfRotation: Tick = (elapsed, delta) => {
      starModels.forEach((starModel, index) => {
        starModel.rotateY(((2 * Math.PI) / starDatas[index].period.rotation) * delta * -1); // rotation초마다 한바퀴 (1day => 1second)
      });
    };
    const orbitRotation: Tick = (elapsed, delta) => {
      starModels.forEach((starModel, index) => {
        if (index === 0) {
          return;
        }
        const orbitRadian = starDatas[index].orbitalRotaionRadianPerSceond! * elapsed;
        // orbital초마다 한바퀴 (1day => 1second)
        const positionX = Math.sin(orbitRadian) * starDatas[index].distanceToSun;
        starModel.position.x = positionX;
        starModel.position.z = Math.cos(orbitRadian) * starDatas[index].distanceToSun;
        starModel.position.y = positionX * starDatas[index].maxTanY!;
      });
    };
    this.updatables.push(selfRotation, orbitRotation);

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
