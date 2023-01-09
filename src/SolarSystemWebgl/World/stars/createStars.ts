import { Mesh, MathUtils, Texture, SphereGeometry, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { Star } from "../../../types";
import Loader from "../../systems/Loader";
import { UNIT } from "./datas";

export default async function createStars(loader: Loader, starDatas: Array<Star>) {
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

  console.log(textures);

  const getGeometry = (radius: number) => {
    return new SphereGeometry(radius, 32, 32);
  };
  const getMaterial = (texture: Texture) => {
    return new MeshStandardMaterial({
      map: texture,
    });
  };

  const stars = starDatas.map((sd, index) => {
    const radius = sd.radius / UNIT;
    const star: Mesh = new Mesh(getGeometry(radius), getMaterial(textures[index]));
    star.position.x += sd.distanceToSun;
    return star;
  });

  console.log(stars);
  return stars;
}
