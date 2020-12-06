import pubsub from "../scripts/pubsub"

function gameboardView(player) {
  let container = document.getElementById("container");
  let boardContainer = document.createElement("div");
  boardContainer.classList.add("board-container");

  let board = document.createElement("div");
  board.classList.add("board");

  container.appendChild(boardContainer);
  boardContainer.appendChild(board);

  let boardArray = [];
  let opponentGameboard = player.opponentGameboard;

  for (let y = 0; y < 10; y++) {
    let rowArray = [];
    for (let x = 0; x < 10; x++) {
      let gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");
      board.appendChild(gameCell);
      rowArray.push(gameCell);
      if (!player.isComputer) {
        gameCell.addEventListener("click", (event) => {
          listenForClicks(event, x, y);
        }, {once: true});
      }
    }
    boardArray.push(rowArray);
  }

  function listenForClicks(event, x, y) {
    player.playerMakeMove(x, y);
    console.log(event.target)
    pubsub.publish("playerMadeMove")
  }

  pubsub.subscribe(player.playerName + "Attacked", updateGameboardView);

  function updateGameboardView(coords) {
    let x = coords[0];
    let y = coords[1];
    if (opponentGameboard.checkLocation(x, y) === true) {
      //x and y coords inverted
      boardArray[y][x].classList.add("hit");
    } else if (opponentGameboard.checkLocation(x, y) === false) {
      boardArray[y][x].classList.add("miss");
    }
  }

  pubsub.subscribe()

  let gridTitle = document.createElement("div");
  boardContainer.appendChild(gridTitle);
  if (!player.isComputer) {
    gridTitle.textContent = "Computer's Grid";
  } else {
    gridTitle.textContent = "Player's Grid";
  }

  return { updateGameboardView };
}

export default gameboardView;
