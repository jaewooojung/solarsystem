import { MathUtils, Mesh, MeshBasicMaterial, RingGeometry } from "three";
import { Star } from "../../../../types";

function createOrbitLine(starDatas: Array<Star>) {
  const material = new MeshBasicMaterial({
    color: "white",
  });
  const createEachOribitLine = (starData: Star) => {
    console.log(starData.distanceToSun, starData.maxTanY);
    const geometry = new RingGeometry(starData.distanceToSun, starData.distanceToSun + 1, 128, 2);
    const mesh = new Mesh(geometry, material);
    mesh.rotateX(-Math.PI * 0.5);
    mesh.rotateY(-MathUtils.degToRad(starData.inclinationFromSun));
    return mesh;
  };
  const orbitLines = starDatas.map((sd) => createEachOribitLine(sd));
  return orbitLines;
}

export { createOrbitLine };
