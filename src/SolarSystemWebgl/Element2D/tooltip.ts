export default function createTooltip() {
  const tooltipDiv = document.createElement("div");
  tooltipDiv.classList.add("tooltip");

  const tooltipTextDiv = document.createElement("div");
  tooltipTextDiv.classList.add("tooltip-text");

  const tooltipAniDiv = document.createElement("div");
  tooltipAniDiv.classList.add("tooltip-animate");

  tooltipDiv.append(tooltipTextDiv);
  tooltipDiv.append(tooltipAniDiv);

  return tooltipDiv;
}
