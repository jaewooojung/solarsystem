import { Group, Object3D, Event, Mesh } from "three";
import Loader from "../systems/Loader";
import { stars, UNIT } from "./datas";

/**
 * blender로
 * 모든 별은 동일한 크기와 scale값(1)을 가지며 각 mesh(group)명은 별의 영어 이름으로 수정한 후
 *
 * 여기서는 실제 비율로 수정
 */
function modifyScale(starModels: Array<Mesh>) {
  const sunData = stars[0];
  starModels.forEach((starModel, index) => {
    const starData = stars.find((s) => s.name === starModel.name);
    starModel.scale.multiplyScalar(starData!.radius / UNIT);
    starModel.position.x += starData!.distanceToSun;
    // 수금지화 밀어주기
    if (index > 0 && index < 5) {
      starModel.position.x += sunData.radius / UNIT;
    }
  });
}

export default async function createStars(loader: Loader) {
  const starModels: Array<Mesh> = await Promise.all(
    stars.map(async (star) => {
      return await loader
        .getGltfLoader()
        .loadAsync(`/gltf/${star.name}.glb`)
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

  modifyScale(starModels);

  return starModels;
}
