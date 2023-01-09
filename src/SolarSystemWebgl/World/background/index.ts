import GUI from "lil-gui";
import { BufferGeometry, BufferAttribute, PointsMaterial, Points, Group } from "three";
import Loader from "../../systems/Loader";

const ALPHA_MAPS_NAME = [0, 1, 2, 3, 4, 5];

async function createBackground(loader: Loader) {
  const parameters = {
    count: 50,
    radius: 2000,
  };
  const textures = await Promise.all(
    ALPHA_MAPS_NAME.map(async (n) => {
      return await loader.getTextureLoader().loadAsync(`/textures/smallStars/${n}.png`);
    })
  );
  const getRandomPositions = () => {
    const positions = new Float32Array(parameters.count * 3);
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const randomX = Math.random() * 2 * parameters.radius - parameters.radius;
      const randomY = Math.random() * 2 * parameters.radius - parameters.radius;
      const randomZ = Math.random() * 2 * parameters.radius - parameters.radius;

      positions[i3] = randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = randomZ;
    }
    return positions;
  };
  const getGeometry = () => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(getRandomPositions(), 3));
    return geometry;
  };
  const getMaterial = (alphaNum: number, color: string) =>
    new PointsMaterial({
      size: 50,
      fog: false,
      color,
      sizeAttenuation: true,
      alphaMap: textures[alphaNum],
      transparent: true,
      alphaTest: 0.01,
      depthTest: true,
    });
  const colors = ["#ffffff", "#b54731", "#f5d442", "#ebc7bc", "#f2dbff", "#bdba31"];
  const backgrounds = ALPHA_MAPS_NAME.map((n, i) => new Points(getGeometry(), getMaterial(n, colors[i])));
  const group = new Group();
  group.add(...backgrounds);
  return group;
}

export { createBackground };
