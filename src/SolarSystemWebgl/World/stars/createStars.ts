import { Mesh, Texture, SphereGeometry, MeshStandardMaterial, RingGeometry, DoubleSide } from "three";
import Loader from "../../systems/Loader";
import { UNIT } from "./datas";
import { StarData, Tick } from "../../../types";

export default function createStars(starDatas: Array<StarData>, loader: Loader) {
  const textures = loader.getTextures().bigStars;

  const getGeometry = (radius: number) => {
    return new SphereGeometry(radius, 32, 32);
  };
  const getMaterial = (sd: StarData, texture: Texture) => {
    const isEarth = sd.name === "earth";
    const baseOptions = {
      map: texture,
      roughness: 1,
      metalness: 0.3,
    };
    const earthOptions = {
      map: texture,
      normalMap: isEarth ? textures[7] : null,
      displacementMap: isEarth ? textures[8] : null,
      displacementScale: -0.04,
    };
    return new MeshStandardMaterial(isEarth ? { ...baseOptions, ...earthOptions } : baseOptions);
  };

  const addRing = (saturn: Mesh, radius: number) => {
    const ringGeometry = new RingGeometry(radius + 1, radius * 2, 32, 32);
    const ringMaterial = new MeshStandardMaterial({
      map: textures[9],
      side: DoubleSide,
    });
    const ring = new Mesh(ringGeometry, ringMaterial);
    ring.name = "saturnRing";
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

  const starsTick: Tick = (elapsed: number, delta: number) => {
    /**
     * 자전. 1 round per 'period.rotation(sec)'
     */
    stars.forEach((s) => {
      s.rotateY(((2 * Math.PI) / s.userData.period.rotation) * delta * -1);
    });
    /**
     * 공전. 1 round per 'orbitalRotaionRadianPerSecond(sec)'
     */
    stars.slice(1).forEach((s) => {
      const orbitRotationPerFrame = s.userData.orbitalRotaionRadianPerSecond! * elapsed;
      const positionX = Math.sin(orbitRotationPerFrame) * s.userData.distanceToSun;
      s.position.x = positionX;
      s.position.z = Math.cos(orbitRotationPerFrame) * s.userData.distanceToSun;
      s.position.y = positionX * s.userData.tangent_inclinationFromSun!;
    });
  };

  return { stars, starsTick };
}
