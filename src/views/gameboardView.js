import pubsub from "../scripts/pubsub";
import placeShipsView from "./placeShipsView"
import {allowDrop, drop} from '../scripts/dragUtil'

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
      gameCell.addEventListener("dragover", allowDrop);
      gameCell.addEventListener("drop", drop);
      gameCell.setAttribute("data-x", `${x}`);
      gameCell.setAttribute("data-y", `${y}`);
      board.appendChild(gameCell);
      rowArray.push(gameCell);
      if (!player.isComputer) {
        
        gameCell.addEventListener(
          "click",
          function listenForClicks() {
            player.playerMakeMove(x, y);
            pubsub.publish("playerMadeMove");
          },
          { once: true }
        );
      }
    }
    boardArray.push(rowArray);
  }

  if (player.isComputer) {
    //Means gameboard is for player
    boardContainer.append(placeShipsView.placeShipsContainer);
    pubsub.subscribe("Create ship", markShipLocation)
  }

  function markShipLocation(arrayData) {
    let [x, y, length, isHorizontal] = arrayData;
    if (isHorizontal) {
      for (let i = x; i < x + length; i++) {
        boardArray[y][i].classList.add('ship')
      }
    } else {
      for (let i = y; i < y + length; i++) {
        boardArray[i][x].classList.add('ship');
      }
    }
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


  let gridTitle = document.createElement("div");
  boardContainer.appendChild(gridTitle);
  if (!player.isComputer) {
    gridTitle.textContent = "Computer's Grid";
  } else {
    gridTitle.textContent = "Player's Grid";
  }

  function freezeBoard() {
    let cover = document.createElement("div")
    cover.classList.add('cover');
    container.appendChild(cover)
  }
  
  pubsub.subscribe(player.playerName + 'Won', freezeBoard);

  return { updateGameboardView };
}

export default gameboardView;
