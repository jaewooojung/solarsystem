import "./styles/global.css";
import "./styles/scroll-based.css";

import SolarSystemWebgl from "./SolarSystemWebgl";

function init() {
  const webglContainer = document.getElementById("solarsystem") as HTMLDivElement;
  const solarSystemWebgl = new SolarSystemWebgl(webglContainer);
  solarSystemWebgl.start();
}

init();
