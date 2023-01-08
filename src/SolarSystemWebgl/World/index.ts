import { AmbientLight, Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, SphereGeometry } from "three";
import { Tick } from "../../types";
import Loder from "../systems/Loader";
import createStars from "./createStars";

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
    const starModels = await createStars(this.loader);
    this.instance.add(...starModels);
    const [sun, mercury, venus, earth, mars, jupiter, saturn] = starModels;
    const obj: any = {};
    starModels.forEach((s) => (obj[s.name] = s));
    this.stars = obj;
    const sunTick: Tick = (elapsed, delta) => {
      this.stars.sun.rotateY(elapsed * 0.001);
    };
    this.updatables.push(sunTick);
    // const ge = new SphereGeometry(1,16,16);
    // const ma = new MeshBasicMaterial();
    // const mesh = new Mesh(ge, ma)

    const light = new AmbientLight("white", 10);
    light.position.set(10, 10, 10);
    this.instance.add(light);
  };

  getWorld = () => this.instance;
  tick: Tick = (elapsed, delta) => {
    this.updatables.forEach((t) => t(elapsed, delta));
  };
}

export default World;
