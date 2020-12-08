import createPlayer from "./createPlayer";
import gameboard from "./createGameboard";
import gameboardView from "../views/gameboardView";
import mainView from "../views/mainView";
import pubsub from "./pubsub"
import createComputer from "./createComputer"

function main() {
  let playerGameboard = gameboard();
  function placePlayerShip(placeShipData) {
    let [x, y, shipLength, isHorizontal] = placeShipData;
    playerGameboard.placeShip(x, y, shipLength, isHorizontal);
  };
  pubsub.subscribe("Create ship", placePlayerShip)

  let computerGameboard = gameboard();

  let player = createPlayer(computerGameboard, false);
  let computerPlayer = createComputer(playerGameboard, true);

  let view = mainView();
  let playerGameboardView = gameboardView(player);
  let computerGameboardView = gameboardView(computerPlayer);

  computerGameboard.placeShip(0, 0, 5, true);

  pubsub.subscribe("playerMadeMove", runRound);

  function runRound() {
    if (computerGameboard.allSunk()) {
      pubsub.publish(player.playerName + 'Won')
      alert('You won')
    } else {
      computerPlayer.computerMakeMove();
      if (playerGameboard.allSunk()) {
        pubsub.publish(computerPlayer.playerName + 'Won')
        alert('You lost')

      }
    }
  }
  
}

export default main;
