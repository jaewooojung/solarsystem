import { Star } from "../../types";

export const UNIT = 6378.1; // km. earth 반지름
const AU = 150000000; // km
const SHRINKED_AU = (AU / 150000000) * 80;

/**
 * real value
 */
export const stars: Array<Star> = [
  {
    name: "sun",
    distanceToSun: 0,
    inclinationFromSun: 0,
    period: {
      orbital: 0,
      rotation: 27,
    },
    radius: 696340,
  },
  {
    name: "mercury",
    distanceToSun: 0.4 * SHRINKED_AU,
    inclinationFromSun: 3.38,
    period: {
      orbital: 87.969,
      rotation: 58.646,
    },
    radius: 2439.7,
  },
  {
    name: "venus",
    distanceToSun: 0.7 * SHRINKED_AU,
    inclinationFromSun: 3.394,
    period: {
      orbital: 224.7,
      rotation: 243.019,
    },
    radius: 6051.85,
  },
  {
    name: "earth",
    distanceToSun: 1 * SHRINKED_AU,
    inclinationFromSun: 7.25,
    period: {
      orbital: 365,
      rotation: 1,
    },
    radius: UNIT,
  },
  {
    name: "mars",
    distanceToSun: 1.5 * SHRINKED_AU,
    inclinationFromSun: 5.65,
    period: {
      orbital: 686.971,
      rotation: 1.026,
    },
    radius: 3389.5,
  },
  {
    name: "jupiter",
    distanceToSun: 5.2 * SHRINKED_AU,
    inclinationFromSun: 6.09,
    period: {
      orbital: 4332.59,
      rotation: 0.414,
    },
    radius: 69911,
  },
  {
    name: "saturn",
    distanceToSun: 9.5 * SHRINKED_AU,
    inclinationFromSun: 5.51,
    period: {
      orbital: 10756.2,
      rotation: 0.444,
    },
    radius: 60268,
  },
];
