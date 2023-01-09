import { MathUtils } from "three";
import { Star } from "../../../types";

/**
 * km. 1 UNIT = Earth 반지름.
 */
export const UNIT = 6378.1;
const DAY_SECONDS = 24 * 60 * 60;
/**
 * km
 */
const AU = 150000000;

function virtualizeMeasurements(realStarDatas: Array<Star>) {
  const multipliers = {
    radius: [0.05, 2, 2, 2, 2, 0.3, 0.3],
    distanceToSun: [0, 0, 0, 0, 0, -65, -150],
    period: {
      orbital: [
        1 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.1 / DAY_SECONDS,
        0.1 / DAY_SECONDS,
      ],
      rotation: [
        1 / DAY_SECONDS,
        0.5 / DAY_SECONDS,
        0.1 / DAY_SECONDS,
        20 / DAY_SECONDS,
        20 / DAY_SECONDS,
        50 / DAY_SECONDS,
        50 / DAY_SECONDS,
      ],
    },
  };
  return realStarDatas.map((s, i) => {
    const newOrbitPeriod = s.period.orbital * multipliers.period.orbital[i];
    return {
      ...s,
      radius: s.radius * multipliers.radius[i],
      distanceToSun: s.distanceToSun / (AU * 0.04) + multipliers.distanceToSun[i],
      period: { orbital: newOrbitPeriod, rotation: s.period.rotation * multipliers.period.rotation[i] },
      orbitalRotaionRadianPerSceond: (2 * Math.PI) / newOrbitPeriod,
    };
  });
  // const multipliers = {
  //   radius: [1, 10, 10, 10, 10, 3, 3],

  //   distanceToSun: [0, 140, 160, 190, 210, 0, -150],
  // };
  // return realStarDatas.map((s, i) => {
  //   const newOrbitPeriod = s.period.orbital * multipliers.period.orbital[i];
  //   const newDistanceToSun = (s.distanceToSun / AU) * 100 + multipliers.distanceToSun[i];
  //   return {
  //     ...s,
  //     radius: s.radius * multipliers.radius[i],
  //     distanceToSun: newDistanceToSun,
  //     period: {
  //       orbital: newOrbitPeriod,
  //       rotation: s.period.rotation * multipliers.period.rotation[i],
  //     },
  //     orbitalRotaionRadianPerSceond: (2 * Math.PI) / newOrbitPeriod,
  //   };
  // });
}

/**
 * real value
 */
const realStarDatas: Array<Star> = [
  {
    name: "sun",
    distanceToSun: 0 * AU,
    inclinationFromSun: 0,
    period: {
      orbital: 0 * DAY_SECONDS,
      rotation: 27 * DAY_SECONDS,
    },
    radius: 696340,
    maxTanY: Math.tan(MathUtils.degToRad(0)),
  },
  {
    name: "mercury",
    distanceToSun: 0.4 * AU,
    inclinationFromSun: 3.38,
    period: {
      orbital: 87.969 * DAY_SECONDS,
      rotation: 58.646 * DAY_SECONDS,
    },
    radius: 2439.7,
    maxTanY: Math.tan(MathUtils.degToRad(3.38)),
  },
  {
    name: "venus",
    distanceToSun: 0.7 * AU,
    inclinationFromSun: 3.394,
    period: {
      orbital: 224.7 * DAY_SECONDS,
      rotation: 243.019 * DAY_SECONDS,
    },
    radius: 6051.85,
    maxTanY: Math.tan(MathUtils.degToRad(3.394)),
  },
  {
    name: "earth",
    distanceToSun: 1 * AU,
    inclinationFromSun: 7.25,
    period: {
      orbital: 365 * DAY_SECONDS,
      rotation: 1 * DAY_SECONDS,
    },
    radius: UNIT,
    maxTanY: Math.tan(MathUtils.degToRad(7.25)),
  },
  {
    name: "mars",
    distanceToSun: 1.5 * AU,
    inclinationFromSun: 5.65,
    period: {
      orbital: 686.971 * DAY_SECONDS,
      rotation: 1.026 * DAY_SECONDS,
    },
    radius: 3389.5,
    maxTanY: Math.tan(MathUtils.degToRad(5.65)),
  },
  {
    name: "jupiter",
    distanceToSun: 5.2 * AU,
    inclinationFromSun: 6.09,
    period: {
      orbital: 4332.59 * DAY_SECONDS,
      rotation: 0.414 * DAY_SECONDS,
    },
    radius: 69911,
    maxTanY: Math.tan(MathUtils.degToRad(6.09)),
  },
  {
    name: "saturn",
    distanceToSun: 9.5 * AU,
    inclinationFromSun: 5.51,
    period: {
      orbital: 10756.2 * DAY_SECONDS,
      rotation: 0.444 * DAY_SECONDS,
    },
    radius: 60268,
    maxTanY: Math.tan(MathUtils.degToRad(5.51)),
  },
];

export function getStarDatas(isVirtualized: boolean) {
  if (isVirtualized) {
    return virtualizeMeasurements(realStarDatas);
  } else {
    return realStarDatas;
  }
}
