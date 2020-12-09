import { drag } from "../scripts/dragUtil";
import pubsub from "../scripts/pubsub";

let shipsSizeArray = [5, 4, 3, 3, 2];

const placeShipsView = (() => {
  let placeShipsContainer = document.createElement("div");
  placeShipsContainer.classList.add("place-ships-container");

  let placeShipsContainerHeader = document.createElement("div");
  placeShipsContainerHeader.textContent = "Place Ships";
  placeShipsContainer.appendChild(placeShipsContainerHeader);

  for (let i = 0; i < shipsSizeArray.length; i++) {
    let ship = createShip(shipsSizeArray[i], i);
    placeShipsContainer.appendChild(ship);
  }

  pubsub.subscribe("RemoveShipFromOptions", removeShipFromHoldingArea);

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

export default placeShipsView;
