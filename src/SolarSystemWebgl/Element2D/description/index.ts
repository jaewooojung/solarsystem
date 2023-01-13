import "./styles.css";

export default function createDescription() {
  const description = document.createElement("div");
  description.classList.add("desc", "display-none");

  const descriptionOuter = document.createElement("div");
  descriptionOuter.classList.add("desc-outer");

  const descriptionInner = document.createElement("div");
  descriptionInner.classList.add("desc-inner");

  const title = document.createElement("div");
  const titleText = document.createElement("h1");
  // titleText.id = "title";
  title.append(titleText);

  const spec = document.createElement("div");
  const specText = document.createElement("p");
  specText.id = "spec";
  spec.append(specText);

  const summary = document.createElement("div");
  const summaryText = document.createElement("p");
  summaryText.id = "summary";
  summary.append(summaryText);

  descriptionInner.append(title, spec, summary);

  description.append(descriptionOuter, descriptionInner);

  return description;
}
