export type Tick = (elapsed: number, delta: number) => void;
export type Update = () => void;
export type Star = {
  name: string;
  distanceToSun: number; // km
  inclinationFromSun: number; // 궤도경사(태양 적도기준). degree
  period: {
    orbital: number; // 공전주기 // day
    rotation: number; // 자전주기 // day
  };
  radius: number; // km
};
