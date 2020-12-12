import { drag } from "../scripts/dragUtil";
import pubsub from "../scripts/pubsub";

let shipsSizeArray = [5, 4, 3, 3, 2];

const placeShipsView = (() => {
  let placeShipsContainer = document.createElement("div");
  placeShipsContainer.classList.add("place-ships-container");

  let placeShipsContainerHeader = document.createElement("h2");
  placeShipsContainerHeader.textContent =
    "Drag ships to place on grid. Double click to rotate ships.";
  placeShipsContainer.appendChild(placeShipsContainerHeader);

  for (let i = 0; i < shipsSizeArray.length; i++) {
    let ship = createShip(shipsSizeArray[i], i);
    placeShipsContainer.appendChild(ship);
  }

  let buttonContainer = document.createElement("div");
  placeShipsContainer.appendChild(buttonContainer);

  createResetPlacementButton(buttonContainer);

  pubsub.subscribe("RemoveShipFromOptions", removeShipFromHoldingArea);
  pubsub.subscribe("AllShipsPlaced", () => {
    createStartGameButton(buttonContainer);
  });

  return { placeShipsContainer };
})();

function createShip(length, index) {
  let ship = document.createElement("div");
  ship.id = "id" + index;
  for (let i = 0; i < length; i++) {
    let shipBody = document.createElement("div");
    shipBody.classList.add("ship-body");
    shipBody.addEventListener("mousedown", function setDragPos() {
      ship.setAttribute("data-pos", i);
    });
    ship.appendChild(shipBody);
  }

  function rotateShip() {
    if (ship.getAttribute("data-isHorizontal") == "true") {
      ship.setAttribute("data-isHorizontal", "false");
      ship.style.flexDirection = "column";
    } else if (ship.getAttribute("data-isHorizontal") == "false") {
      ship.setAttribute("data-isHorizontal", "true");
      ship.style.flexDirection = "row";
    }
  }

  ship.addEventListener("dragstart", drag);
  ship.addEventListener("dblclick", rotateShip);
  ship.setAttribute("draggable", "true");
  ship.setAttribute("data-isHorizontal", "true");
  ship.setAttribute("data-length", length);
  ship.classList.add("ship" + length);
  ship.classList.add("ship");
  return ship;
}

function removeShipFromHoldingArea(shipID) {
  let ship = document.getElementById(shipID);
  ship.style.display = "none";
}

function createStartGameButton(buttonContainer) {
  let startGameButton = document.createElement("button");
  startGameButton.id = "start-game-button";
  startGameButton.textContent = "Start Game";
  startGameButton.addEventListener("click", function startGameCue() {
    pubsub.publish("StartGame");
  });

  buttonContainer.appendChild(startGameButton);
}

function createResetPlacementButton(buttonContainer) {
  let resetPlacementButton = document.createElement("button");
  resetPlacementButton.id = "reset-placement-button";
  resetPlacementButton.textContent = "Reset Ships Placement";
  resetPlacementButton.addEventListener("click", function resetShipsPlacement() {
    pubsub.publish("ResetShipsPlacement");
  });

  buttonContainer.appendChild(resetPlacementButton);
}

export default placeShipsView;
