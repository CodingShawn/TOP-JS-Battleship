import createShip from "./createShip2";
import pubsub from "./pubsub";

function gameboard() {
  const layout = [...new Array(10)].map(() => {
    return [...new Array(10)].map(() => null);
  });

  const ships = [];

  function placeShip(x, y, shipLength, isHorizontal, shipID = null) {
    if (isPlacingShipLegal(x, y, shipLength, isHorizontal)) {
      let newShip = createShip(shipLength);
      ships.push(newShip);

      if (isHorizontal === true) {
        //Place ship horizontally
        for (let i = 0; i < shipLength; i++) {
          layout[x + i][y] = newShip;
        }
      } else {
        //Place ship vertically
        for (let i = 0; i < shipLength; i++) {
          layout[x][y + i] = newShip;
        }
      }
      console.table(layout);
      let placeShipData = [x, y, shipLength, isHorizontal];
      if (shipID) {
        //Only run this if ships placed by dragging
        pubsub.publish("Mark ship location", placeShipData);
        pubsub.publish("RemoveShipFromOptions", shipID);
      }
    }
  }

  function isPlacingShipLegal(x, y, shipLength, isHorizontal) {
    let isLegal = true;
    if (isHorizontal === true) {
      for (let i = 0; i < shipLength; i++) {
        isLegal = isLegal && layout[x + i][y] === null;
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        isLegal = isLegal && layout[x][y + i] === null;
      }
    }
    console.log(isLegal);
    return isLegal;
  }

  function receiveAttack(x, y) {
    if (layout[x][y]) {
      //Truthy means ship present
      layout[x][y].hit();
      layout[x][y] = true;
    } else if (layout[x][y] === null) {
      layout[x][y] = false;
    }
  }

  function allSunk() {
    return ships.every((ship) => {
      return ship.isSunk();
    });
  }

  function checkLocation(x, y) {
    return layout[x][y];
  }

  return { placeShip, checkLocation, receiveAttack, allSunk };
}

export default gameboard;
