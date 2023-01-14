import { AxesHelper } from "three";
import GUI from "lil-gui";
import * as Stats from "stats.js";

/**
 * singleton.
 * initialized once in the root.
 * You can import and use instance anywhere in the application.
 */
class DevOnly {
  private static instance: DevOnly;
  private gui: GUI;
  private axesHelper: AxesHelper;
  private stats: any;
  private constructor() {
    this.gui = new GUI();
    this.axesHelper = new AxesHelper(1000);
    const tick = () => {
      this.stats.update();
      requestAnimationFrame(tick);
    };
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.append(this.stats.dom);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new DevOnly();
      return this.instance;
    }
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

export default DevOnly;
