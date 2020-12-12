function mainView() {
  let container = document.createElement("div");
  let body = document.getElementsByTagName("body")[0];
  container.id = "container";

  let containerTitle = document.createElement("h1");
  containerTitle.textContent = "Battleships";
  container.appendChild(containerTitle);

  body.appendChild(container);
}

export default mainView;
