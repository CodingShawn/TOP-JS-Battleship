import pubsub from "./pubsub";

function createPlayer(opponentGameboard, isComputer) {
  const playerName = isComputer ? "Computer" : "Player";

  function attack(x, y) {
    opponentGameboard.receiveAttack(x, y);
    pubsub.publish(playerName + "Attacked", [x, y])
  }

  function isMoveLegal(x, y) {
    if (opponentGameboard.checkLocation(x, y) !== true && opponentGameboard.checkLocation(x, y) !== false) {
      return true;
    } else {
      return false;
    }
  }

  function playerMakeMove(x, y) {
    attack(x, y);
  }

  function computerMakeMove() {
    do {
      var x = Math.floor(Math.random() * 10);
      var y = Math.floor(Math.random() * 10);
    } while (!isMoveLegal(x, y))
    attack(x, y);
  }

  return { playerMakeMove, computerMakeMove, isComputer, opponentGameboard, playerName };
}

export default createPlayer;
