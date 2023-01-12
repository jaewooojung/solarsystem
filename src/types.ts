export type Tick = (elapsed: number, delta: number) => void;
export type Update = () => void;
export type StarData = {
  name: string;
  distanceToSun: number; // km
  inclinationFromSun: number; // 궤도경사(태양 적도기준). degree
  period: {
    orbital: number; // 공전주기 // second
    rotation: number; // 자전주기 // second
  };
  radius: number; // km. multiplyScalar 하는데에만 쓰이며 코드에서는 distanceToSun 거리를 기준으로 연산함
  tangent_inclinationFromSun: number;
  orbitalRotaionRadianPerSecond?: number;
  summary: string;
};
