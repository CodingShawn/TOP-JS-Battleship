import createShip from "./createShip2";
import pubsub from "./pubsub";

function gameboard() {
  let layout = createNewLayout();

  let ships = createNewShipsArray();

  pubsub.subscribe("StartNewGame", resetShipsPlacement);

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
      let placeShipData = [x, y, shipLength, isHorizontal];
      if (shipID) {
        //Only run this if ships placed by dragging
        pubsub.publish("Mark ship location", placeShipData);
        pubsub.publish("RemoveShipFromOptions", shipID);
        if (ships.length == 5) {
          pubsub.publish("AllShipsPlaced");
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function subscribeToShipPlacement() {
    //Allow board to be reset for players
    pubsub.subscribe("ResetShips", resetShipsPlacement)
    pubsub.subscribe(
      "Create ship",
      function placeShipByDropping(placeShipData) {
        let [x, y, shipLength, isHorizontal, shipID] = placeShipData;
        placeShip(x, y, shipLength, isHorizontal, shipID);
      }
    );
  }

  function resetShipsPlacement() {
    layout = createNewLayout();
    ships = createNewShipsArray();
  }

  function isPlacingShipLegal(x, y, shipLength, isHorizontal) {
    let isLegal = true;
    if (isHorizontal === true) {
      for (let i = 0; i < shipLength; i++) {
        if (x + i > 9) {
          return (isLegal = false);
        }
        isLegal = isLegal && layout[x + i][y] === null;
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        if (i + i > 9) {
          return (isLegal = false);
        }
        isLegal = isLegal && layout[x][y + i] === null;
      }
    }
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

  function autoPlaceShip() {
    let shipsLengthArray = [5, 4, 3, 3, 2];
    for (let shipsLength of shipsLengthArray) {
      do {
        var x = Math.floor(Math.random() * 10);
        var y = Math.floor(Math.random() * 10);
        if (Math.floor(Math.random() * 2)) {
          var isHorizontal = true;
        } else {
          var isHorizontal = false;
        }
      } while (!placeShip(x, y, shipsLength, isHorizontal));
    }
  }

  return {
    placeShip,
    checkLocation,
    receiveAttack,
    allSunk,
    autoPlaceShip,
    subscribeToShipPlacement,
  };
}

function createNewLayout() {
  let layout = [...new Array(10)].map(() => {
    return [...new Array(10)].map(() => null);
  });
  return layout;
}

function createNewShipsArray() {
  return [];
}

export default gameboard;
