import { BufferGeometry, BufferAttribute, PointsMaterial, Points, Group, Texture } from "three";
import Loader from "../../systems/singletons/Loader";

const COLORS = ["#ffffff", "#b54731", "#f5d442", "#ebc7bc", "#f2dbff", "#bdba31"];

async function createBackground() {
  const parameters = {
    count: 50,
    radius: 2000,
  };
  const textures = Loader.getInstance().getTextures().smallStars;

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
  const getMaterial = (texture: Texture, color: string) =>
    new PointsMaterial({
      size: 50,
      fog: false,
      color,
      sizeAttenuation: true,
      alphaMap: texture,
      transparent: true,
      alphaTest: 0.01,
      depthTest: true,
    });
  const backgrounds = textures.map((t, i) => new Points(getGeometry(), getMaterial(t, COLORS[i])));
  const group = new Group();
  group.add(...backgrounds);
  return group;
}

export { createBackground };
