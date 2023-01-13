import "./styles.css";

export default function createTooltip() {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");

  const name = document.createElement("div");
  const nameText = document.createElement("span");
  name.append(nameText);
  name.classList.add("tooltip-name");

  const animated = document.createElement("div");
  animated.classList.add("tooltip-animate");

  tooltip.append(name, animated);

  return tooltip;
}
