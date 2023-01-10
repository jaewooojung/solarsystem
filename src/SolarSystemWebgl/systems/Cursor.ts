import { Mesh, PerspectiveCamera, Raycaster, Vector2, Vector3 } from "three";
import Sizes from "./Sizes";

class Cursor {
  private coordinate: Vector2;
  private raycaster: Raycaster;
  private camera: PerspectiveCamera;
  private target: Mesh | null;
  constructor(sizes: Sizes, camera: PerspectiveCamera, container: HTMLDivElement) {
    this.coordinate = new Vector2(2, 2); // 초기값: 화면 밖.
    this.raycaster = new Raycaster();
    this.camera = camera;
    this.target = null;

    container.addEventListener("mousemove", (event) => {
      const { width, height } = sizes.getSizes();
      const x = (event.clientX / width) * 2 - 1;
      const y = -((event.clientY / height) * 2 - 1);
      this.coordinate.set(x, y);
    });
  }

  getCoordinate = () => this.coordinate;
  getRaycaster = () => this.raycaster;
  initRaycaster = () => {
    const { x, y } = this.coordinate;
    this.raycaster.setFromCamera({ x, y }, this.camera);
  };
  setTarget = (mesh: Mesh | null) => (this.target = mesh);
  getTarget = () => this.target as Mesh;
  projectToCamera = (position3D: Vector3) => {
    position3D.project(this.camera);
    // console.log(temp);
  };
}

export default Cursor;
