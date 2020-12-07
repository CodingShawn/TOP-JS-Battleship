import pubsub from "./pubsub";

function createPlayer(opponentGameboard, isComputer) {
  let playerName = isComputer ? "Computer" : "Player";

  function attack(x, y) {
    opponentGameboard.receiveAttack(x, y);
    pubsub.publish(playerName + "Attacked", [x, y])
  }

  return { opponentGameboard, playerName, attack };
}

export default createPlayer;
