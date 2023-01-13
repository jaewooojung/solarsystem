import SolarSystemWebgl from "./SolarSystemWebgl";

function init() {
  const webglContainer = document.getElementById("solarsystem") as HTMLDivElement;
  const solarSystemWebgl = new SolarSystemWebgl(webglContainer);
  solarSystemWebgl.load();
}

init();
