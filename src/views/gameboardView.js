import pubsub from "../scripts/pubsub";
import placeShipsView from "./placeShipsView";
import { allowDrop, drop } from "../scripts/dragUtil";

function gameboardView(player) {
  let container = document.getElementById("container");
  let boardContainer = document.createElement("div");
  boardContainer.classList.add("board-container");

  let board = document.createElement("div");
  board.classList.add("board");

  container.appendChild(boardContainer);
  boardContainer.appendChild(board);

  let boardArray = createGameCells(board, player);

  allowPlayerToPlaceShips(player, boardContainer, boardArray);

  pubsub.subscribe("ResetShips", function initiateClearBoard() {
    clearBoardOfShips(boardArray);
  });

  allowUpdatingOfGameboardView(player, boardArray);

  let gridTitle = document.createElement("div");
  boardContainer.appendChild(gridTitle);
  if (player.playerName == "Player") {
    gridTitle.textContent = "Computer's Grid";
    boardContainer.classList.add("computer-board");
  } else {
    gridTitle.textContent = "Player's Grid";
  }

  allowFreezeBoardAtGameEnd(player, container);
}

function createGameCells(board, player) {
  let boardArray = [];
  for (let y = 0; y < 10; y++) {
    let rowArray = [];
    for (let x = 0; x < 10; x++) {
      let gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");
      gameCell.addEventListener("dragover", allowDrop);
      gameCell.addEventListener("drop", drop);
      gameCell.setAttribute("data-x", `${x}`);
      gameCell.setAttribute("data-y", `${y}`);
      board.appendChild(gameCell);
      rowArray.push(gameCell);
      if (player.playerName == "Player") {
        gameCell.addEventListener(
          "click",
          function listenForClicks() {
            player.attack(x, y);
            pubsub.publish("playerMadeMove");
          },
          { once: true }
        );
      }
    }
    boardArray.push(rowArray);
  }
  return boardArray;
}

function allowPlayerToPlaceShips(player, boardContainer, boardArray) {
  if (player.playerName == "Computer") {
    //Means gameboard is for player
    boardContainer.append(placeShipsView());
    pubsub.subscribe("Mark ship location", markShipLocation);
  }

  function markShipLocation(arrayData) {
    let [x, y, length, isHorizontal] = arrayData;
    let shipClass = "ship" + length;
    if (isHorizontal) {
      for (let i = x; i < x + length; i++) {
        boardArray[y][i].classList.add(shipClass);
      }
    } else {
      for (let i = y; i < y + length; i++) {
        boardArray[i][x].classList.add(shipClass);
      }
    }
  }
}

function allowUpdatingOfGameboardView(player, boardArray) {
  let opponentGameboard = player.opponentGameboard;
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
}

function allowFreezeBoardAtGameEnd(player, container) {
  function freezeBoard() {
    let cover = document.createElement("div");
    cover.classList.add("cover");
    container.appendChild(cover);
  }

  pubsub.subscribe(player.playerName + "Won", freezeBoard);
}

function clearBoardOfShips(boardArray) {
  let shipClass = /ship[0-9]/;
  for (let rows of boardArray) {
    for (let gameCell of rows) {
      for (let classType of gameCell.classList) {
        if (classType.match(shipClass)) {
          gameCell.classList.remove(classType);
        }
      }
    }
  }
}

export default gameboardView;
