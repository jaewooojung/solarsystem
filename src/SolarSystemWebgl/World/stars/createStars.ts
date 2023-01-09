import { Mesh, MathUtils } from "three";
import { Star } from "../../../types";
import Loader from "../../systems/Loader";
import { UNIT } from "./datas";

function modifyScale(starModels: Array<Mesh>, starDatas: Array<Star>) {
  starModels.forEach((starModel, index) => {
    const starData = starDatas.find((sd) => sd.name === starModel.name);
    starModel.scale.multiplyScalar(starData!.radius / UNIT);
    starModel.position.x += starData!.distanceToSun;
  });
}

export default async function createStars(loader: Loader, starDatas: Array<Star>) {
  const starModels: Array<Mesh> = await Promise.all(
    starDatas.map(async (sd) => {
      return await loader
        .getGltfLoader()
        .loadAsync(`/gltf/${sd.name}.glb`)
        .then((gltf) => {
          if (gltf.scene.children.length > 1) {
            const [ringTop, ringBotton, core] = gltf.scene.children;
            core.add(ringTop, ringBotton);
            core.name = "saturn";
            return core as Mesh;
          } else {
            return gltf.scene.children[0] as Mesh;
          }
        });
    })
  );

  modifyScale(starModels, starDatas);

  return starModels;
}
