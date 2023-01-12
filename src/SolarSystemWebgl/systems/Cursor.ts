import { Mesh, PerspectiveCamera, Raycaster, Vector2, Vector3 } from "three";

class Cursor {
  private camera: PerspectiveCamera;
  private coordinate: Vector2;
  private raycaster: Raycaster;
  private hovered: Mesh | null;
  private clicked: Mesh | null;
  private isCameraMoving: boolean;

  constructor(camera: PerspectiveCamera) {
    this.camera = camera;
    this.coordinate = new Vector2(2, 2); // 초기값: 화면 밖.
    this.raycaster = new Raycaster();
    this.hovered = null;
    this.clicked = null;
    this.isCameraMoving = false;
  }

  setCoordinate = (x: number, y: number) => {
    this.coordinate.set(x, y);
  };

  getIsCameraMoving = () => this.isCameraMoving;

  setIsCameraMoving = (value: boolean) => {
    this.isCameraMoving = value;
  };

  getHovered = () => this.hovered;

  setHovered = (newHovered: Mesh | null) => {
    this.hovered = newHovered;
  };

  getClicked = () => this.clicked;

  setClicked = (newClicked: Mesh | null) => {
    this.clicked = newClicked;
  };

  prepareRaycaster = () => {
    const { x, y } = this.coordinate;
    this.raycaster.setFromCamera({ x, y }, this.camera);
    return this.raycaster;
  };

  projectToCamera = (position3D: Vector3) => {
    position3D.project(this.camera);
  };
}

export default Cursor;
