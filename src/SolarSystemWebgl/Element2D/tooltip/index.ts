import "./styles.css";

export default function createTooltip() {
  const tooltipDiv = document.createElement("div");
  tooltipDiv.classList.add("tooltip");

  const tooltipNameDiv = document.createElement("div");
  tooltipNameDiv.classList.add("tooltip-name");

  const tooltipAniDiv = document.createElement("div");
  tooltipAniDiv.classList.add("tooltip-animate");

  tooltipDiv.append(tooltipNameDiv);
  tooltipDiv.append(tooltipAniDiv);

  return tooltipDiv;
}
