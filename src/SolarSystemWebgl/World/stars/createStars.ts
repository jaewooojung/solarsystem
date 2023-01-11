import { Mesh, Texture, SphereGeometry, MeshStandardMaterial, RingGeometry, DoubleSide } from "three";
import Loader from "../../systems/Loader";
import { UNIT } from "./datas";
import { Star } from "../../../types";

export default async function createStars(starDatas: Array<Star>, loader: Loader) {
  const promises = [
    ...starDatas.map(async (sd) => {
      return await loader.getTextureLoader().loadAsync(`/textures/bigStars/${sd.name}.jpg`);
    }),
    await loader.getTextureLoader().loadAsync(`/textures/bigStars/earth-normal.jpg`),
    await loader.getTextureLoader().loadAsync(`/textures/bigStars/earth-cloud.jpg`),
    await loader.getTextureLoader().loadAsync(`/textures/bigStars/earth-specular.jpg`),
    await loader.getTextureLoader().loadAsync(`/textures/bigStars/saturn-ring.jpg`),
  ];
  const textures: Array<Texture> = await Promise.all(promises);

  const getGeometry = (radius: number) => {
    return new SphereGeometry(radius, 32, 32);
  };
  const getMaterial = (star: Star, texture: Texture) => {
    const isEarth = star.name === "earth";
    const baseOptions = {
      map: texture,
      roughness: 1,
      metalness: 0.3,
    };
    const earthOptions = {
      map: texture,
      normalMap: isEarth ? textures[7] : null,
      displacementMap: isEarth ? textures[9] : null,
      displacementScale: -0.04,
    };
    return new MeshStandardMaterial(isEarth ? { ...baseOptions, ...earthOptions } : baseOptions);
  };

  const addRing = (saturn: Mesh, radius: number) => {
    const ringGeometry = new RingGeometry(radius + 1, radius * 2, 32, 32);
    const ringMaterial = new MeshStandardMaterial({
      map: textures[10],
      side: DoubleSide,
    });
    const ring = new Mesh(ringGeometry, ringMaterial);
    ring.name = "saturn";
    ring.rotateX(-Math.PI / 2);
    saturn.add(ring);
  };

  const stars = starDatas.map((sd, index) => {
    const radius = sd.radius / UNIT;
    const star: Mesh = new Mesh(getGeometry(radius), getMaterial(sd, textures[index]));
    star.position.x += sd.distanceToSun;
    star.userData = sd;
    if (sd.name === "saturn") {
      addRing(star, radius);
    }
    star.name = sd.name;
    return star;
  });

  return stars;
}
