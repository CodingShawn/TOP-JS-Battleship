import createPlayer from "./createPlayer";

function createComputer(opponentGameboard, isComputer) {
  let computerFunctions = Object.create(
    createPlayer(opponentGameboard, isComputer)
  );
  computerFunctions.computerMakeMove = function computerMakeMove() {
    do {
      var x = Math.floor(Math.random() * 10);
      var y = Math.floor(Math.random() * 10);
    } while (!isMoveLegal(x, y));
    computerFunctions.attack(x, y);
  };

  function isMoveLegal(x, y) {
    if (
      opponentGameboard.checkLocation(x, y) !== true &&
      opponentGameboard.checkLocation(x, y) !== false
    ) {
      return true;
    } else {
      return false;
    }
  }

  return computerFunctions;
}

export default createComputer;
