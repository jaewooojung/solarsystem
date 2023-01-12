import { TextureLoader, CubeTextureLoader, DefaultLoadingManager } from "three";

class Loader {
  // private gltfLoader: GLTFLoader;
  private textureLoader: TextureLoader;
  private cubeTextureLoader: CubeTextureLoader;
  private percentage: number;

  constructor() {
    // [todo] gltf 사용 없으면 삭제할것
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("/draco/");
    // this.gltfLoader = new GLTFLoader(DefaultLoadingManager);
    // this.gltfLoader.setDRACOLoader(dracoLoader);
    this.textureLoader = new TextureLoader(DefaultLoadingManager);
    this.cubeTextureLoader = new CubeTextureLoader(DefaultLoadingManager);
    this.percentage = 0;

    DefaultLoadingManager.onProgress = (url, loaded, total) => {
      this.percentage = (loaded / total) * 100;
      console.log(url, this.percentage, `${loaded} / ${total}`);
      if (this.percentage === 100) {
        console.log("Loading complete");
      }
    };
  }
  // getGltfLoader = () => this.gltfLoader;
  getTextureLoader = () => this.textureLoader;
  getCubeTextureLoader = () => this.cubeTextureLoader;
  getLoadingPercentage = () => this.percentage;
}

export default Loader;
