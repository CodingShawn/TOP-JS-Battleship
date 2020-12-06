function mainView() {
  let container = document.createElement("div");
  let body = document.getElementsByTagName("body")[0];
  container.id = 'container';

  body.appendChild(container);
};

export default mainView