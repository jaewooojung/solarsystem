import { TextureLoader, CubeTextureLoader, DefaultLoadingManager, Texture } from "three";
import { getStarDatas } from "../../World/stars/datas";

const SMALL_STAR_ALPHA_MAPS = [0, 1, 2, 3, 4, 5];

class Loader {
  private static instance: Loader;
  private textureLoader: TextureLoader;
  private percentage: number;
  private textures: {
    bigStars: Array<Texture>;
    smallStars: Array<Texture>;
  };

  private constructor() {
    this.textureLoader = new TextureLoader(DefaultLoadingManager);
    this.percentage = 0;
    this.textures = {
      bigStars: [],
      smallStars: [],
    };
  }
  /**
   * initialize in root.
   */
  static init = () => {
    if (!Loader.instance) {
      Loader.instance = new Loader();
    }
  };
  /**
   * get the instance. no initialization.
   */
  static getInstance() {
    if (Loader.instance) {
      return Loader.instance;
    } else {
      throw new Error("You should initialize the instance. call 'Loader.init()' first");
    }
  }
  load = async () => {
    const starDatas = getStarDatas(true);
    const promises = [
      ...starDatas.map(async (sd) => {
        return this.textureLoader.loadAsync(`/textures/bigStars/${sd.name}.jpg`);
      }),
      this.textureLoader.loadAsync(`/textures/bigStars/earth-normal.jpg`),
      this.textureLoader.loadAsync(`/textures/bigStars/earth-specular.jpg`),
      this.textureLoader.loadAsync(`/textures/bigStars/saturn-ring.jpg`),
      ...SMALL_STAR_ALPHA_MAPS.map(async (n) => {
        return await this.textureLoader.loadAsync(`/textures/smallStars/${n}.png`);
      }),
      ...starDatas.map(async (sd) => {
        return this.textureLoader.loadAsync(`/textures/bigStars/${sd.name}.jpg`);
      }),
      ...starDatas.map(async (sd) => {
        return this.textureLoader.loadAsync(`/textures/bigStars/${sd.name}.jpg`);
      }),
      ...starDatas.map(async (sd) => {
        return this.textureLoader.loadAsync(`/textures/bigStars/${sd.name}.jpg`);
      }),
    ];
    const result = await Promise.all(promises);
    this.textures = {
      bigStars: result.slice(0, 10),
      smallStars: result.slice(10, 16),
    };
  };
  getTextures = () => this.textures;
  getPercentage = () => this.percentage;
}

export default Loader;
