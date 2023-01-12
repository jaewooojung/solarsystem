import "./styles.css";

export default function createDescription() {
  const descDiv = document.createElement("div");
  descDiv.classList.add("desc");

  const descOuterDiv = document.createElement("div");
  descOuterDiv.classList.add("desc-outer");

  const descInnerDiv = document.createElement("div");
  descInnerDiv.classList.add("desc-inner");

  const top = document.createElement("div");
  const title = document.createElement("h1");
  title.id = "title";
  top.append(title);

  const middle = document.createElement("div");
  const spec = document.createElement("p");
  spec.id = "spec";
  middle.append(spec);

  const bottom = document.createElement("div");
  const summary = document.createElement("p");
  summary.id = "summary";
  bottom.append(summary);

  descInnerDiv.append(top, middle, bottom);

  descDiv.append(descOuterDiv, descInnerDiv);

  return descDiv;
}
