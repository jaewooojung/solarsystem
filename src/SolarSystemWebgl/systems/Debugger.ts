import GUI from "lil-gui";
import * as Stats from "stats.js";
import { AxesHelper } from "three";

class Debugger {
  private gui: GUI;
  private axesHelper: AxesHelper;
  private stats: any;
  constructor() {
    this.gui = new GUI();
    this.axesHelper = new AxesHelper(100);
    const tick = () => {
      this.stats.update();
      requestAnimationFrame(tick);
    };
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }
  getGUI() {
    return this.gui;
  }
  getHelpers() {
    return [this.axesHelper];
  }
  getStats() {
    return this.stats;
  }
}

export default Debugger;
