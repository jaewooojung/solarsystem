import { DefaultLoadingManager } from "three";
import "./styles.css";

export default function createIntro() {
  const intro = document.createElement("div");
  intro.classList.add("intro");

  const title = document.createElement("div");
  title.classList.add("title");
  const titleText = document.createElement("h1");
  titleText.innerText = `SOLAR
  SYSTEM`;
  title.append(titleText);
  intro.append(title);

  intro.onmousemove = (event) => {
    event.stopPropagation();
  };

  const progress = document.createElement("div");
  progress.classList.add("progress", "point-events-none");

  progress.onmousedown = () => {
    circle1.classList.add("border-width-3");
    circle2.classList.add("border-width-3");
  };

  progress.onmouseenter = () => {
    circle1.classList.add("border-purple", "shrink");
    circle2.classList.add("border-blue", "shrink-rotate");
    progressText.classList.remove("opacity-80");
    progressText.classList.add("opacity-100");
  };

  progress.onmouseleave = () => {
    circle1.classList.remove("border-purple", "shrink", "border-width-3");
    circle2.classList.remove("border-blue", "shrink-rotate", "border-width-3");
    progressText.classList.remove("opacity-100");
    progressText.classList.add("opacity-80");
  };

  const circle1 = document.createElement("div");
  circle1.classList.add("transition-04", "border-width-1");
  progress.append(circle1);

  const circle2 = document.createElement("div");
  circle2.classList.add("transition-04", "border-width-1");
  progress.append(circle2);

  const progressText = document.createElement("span");
  progressText.classList.add("opacity-80", "transition-30");
  progress.append(progressText);

  intro.append(progress);

  DefaultLoadingManager.onProgress = (url, loaded, total) => {
    const percentage = (loaded / total) * 100;
    progressText.innerHTML = Math.round(percentage) + "%";
    if (percentage === 100) {
      progress.classList.remove("point-events-none");
      progressText.innerHTML = "START";
    }
  };

  return intro;
}
