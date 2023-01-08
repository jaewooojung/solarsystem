import { TextureLoader, CubeTextureLoader, DefaultLoadingManager, Texture, CubeTexture } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class Loader {
  private gltfLoader: GLTFLoader;
  private textureLoader: TextureLoader;
  private cubeTextureLoader: CubeTextureLoader;
  private percentage: number;
  constructor() {
    this.gltfLoader = new GLTFLoader(DefaultLoadingManager);
    this.textureLoader = new TextureLoader(DefaultLoadingManager);
    this.cubeTextureLoader = new CubeTextureLoader(DefaultLoadingManager);
    this.percentage = 0;

    DefaultLoadingManager.onProgress = (url, loaded, total) => {
      this.percentage = (loaded / total) * 100;
      console.log(this.percentage, `${loaded} / ${total}`);
      if (this.percentage === 100) {
        console.log("Loading complete");
      }
    };
  }
  getGltfLoader = () => this.gltfLoader;
  getTextureLoader = () => this.textureLoader;
  getCubeTextureLoader = () => this.cubeTextureLoader;
  getLoadingPercentage = () => this.percentage;
}

export default Loader;
