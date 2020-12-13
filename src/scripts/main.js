import createPlayer from "./createPlayer";
import gameboard from "./createGameboard";
import gameboardView from "../views/gameboardView";
import mainView from "../views/mainView";
import pubsub from "./pubsub";
import createComputer from "./createComputer";
import {resetPlaceShipsView} from "../views/placeShipsView"

function main() {
  let playerGameboard = gameboard();
  playerGameboard.subscribeToShipPlacement();

  let computerGameboard = gameboard();

  let player = createPlayer(computerGameboard, false);
  let computerPlayer = createComputer(playerGameboard, true);

  mainView();
  gameboardView(player);
  gameboardView(computerPlayer);
  computerGameboard.autoPlaceShip();

  pubsub.subscribe("playerMadeMove", runRound);

  function runRound() {
    if (computerGameboard.allSunk()) {
      pubsub.publish("GameEnd");
      alert("You won");
    } else {
      computerPlayer.computerMakeMove();
      if (playerGameboard.allSunk()) {
        pubsub.publish("GameEnd");
        alert("You lost");
      }
    }
  }

  pubsub.subscribe("StartNewGame", function initiateStartNewGame() {
    startNewGame(computerGameboard);
  });
}

function startNewGame(computerGameboard) {
  let placeShipsViewContainer = document.querySelector(
    ".place-ships-container"
  );
  placeShipsViewContainer.classList.remove("hidden");
  resetPlaceShipsView();
  computerGameboard.autoPlaceShip();
  let computerGrid = document.querySelector("#computer-grid");
  computerGrid.classList.add("hidden");
  let covers = document.querySelectorAll(".cover");
  covers.forEach(cover => cover.remove());
}

export default main;
