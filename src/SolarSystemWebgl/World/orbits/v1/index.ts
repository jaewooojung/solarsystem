import { MathUtils, Mesh, MeshBasicMaterial, RingGeometry } from "three";
import { Star } from "../../../../types";

function createOrbitLine(starDatas: Array<Star>) {
  const material = new MeshBasicMaterial({
    color: "white",
  });
  const createEachOribitLine = (starData: Star) => {
    const geometry = new RingGeometry(starData.distanceToSun, starData.distanceToSun + 0.05, 128, 2);
    const mesh = new Mesh(geometry, material);
    mesh.rotateX(-Math.PI * 0.5);
    mesh.rotateY(-MathUtils.degToRad(starData.inclinationFromSun));
    return mesh;
  };
  const orbitLines = starDatas.slice(1).map((sd) => createEachOribitLine(sd));
  return orbitLines;
}

export { createOrbitLine };
