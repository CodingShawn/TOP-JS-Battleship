import pubsub from "../scripts/pubsub";

function mainView() {
  let container = document.createElement("div");
  let body = document.getElementsByTagName("body")[0];
  container.id = "container";

  let pageTitle = document.createElement("h1");
  pageTitle.textContent = "Battleships";
  body.appendChild(pageTitle);

  body.appendChild(container);

  let buttonContainer = createNewGameButton();
  body.appendChild(buttonContainer);

  pubsub.subscribe("GameEnd", function showNewGameButton() {
    buttonContainer.classList.remove("hidden");
  });
}

export default mainView;

function createNewGameButton() {
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.classList.add("hidden");

  let newGameButton = document.createElement("button");
  newGameButton.textContent = "New Game";
  newGameButton.classList.add("new-game-button");
  newGameButton.addEventListener("click", function startNewGame() {
    pubsub.publish("StartNewGame");
    newGameButton.classList.add("hidden");
  });

  buttonContainer.appendChild(newGameButton);
  return buttonContainer;
}
