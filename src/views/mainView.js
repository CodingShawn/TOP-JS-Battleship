function mainView() {
  let container = document.createElement("div");
  let body = document.getElementsByTagName("body")[0];
  container.id = "container";

  let pageTitle = document.createElement("h1");
  pageTitle.textContent = "Battleships";
  body.appendChild(pageTitle);

  body.appendChild(container);
}

export default mainView;
