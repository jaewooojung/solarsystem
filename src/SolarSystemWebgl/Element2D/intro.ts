import { DefaultLoadingManager } from "three";

export default function createIntro() {
  const introDiv = document.createElement("div");
  introDiv.classList.add("intro");

  introDiv.onmousemove = (event) => {
    event.stopPropagation();
  };

  const progressDiv = document.createElement("div");
  progressDiv.classList.add("progress");

  const progressText = document.createElement("span");
  progressDiv.append(progressText);

  const startText = document.createElement("span");
  startText.innerHTML = "START";

  introDiv.append(progressDiv);

  DefaultLoadingManager.onProgress = (url, loaded, total) => {
    const percentage = (loaded / total) * 100;
    progressText.innerHTML = Math.round(percentage) + "%";
    if (percentage === 100) {
      progressDiv.removeChild(progressText);
      progressDiv.append(startText);
    }
  };

  return introDiv;
}
