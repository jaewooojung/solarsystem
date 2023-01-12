import { AxesHelper } from "three";
import GUI from "lil-gui";
import * as Stats from "stats.js";

/**
 * singleton
 */
class Debugger {
  private static instance: Debugger;
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
    document.body.appendChild(this.stats.dom);
  }
  /**
   * initialize in root.
   */
  static init() {
    if (!Debugger.instance) {
      Debugger.instance = new Debugger();
    }
  }
  /**
   * get the instance. no initialization.
   */
  static getInstance() {
    if (Debugger.instance) {
      return Debugger.instance;
    } else {
      throw new Error("You should initialize the instance. call 'Debugger.init()' first");
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

export default Debugger;
