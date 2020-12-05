import createShip from './createShip2'

function gameboard() {
  const layout = [...new Array(10)].map(() => {
    return [...new Array(10)].map(() => null)
  });

  const ships = []

  function placeShip(x, y, shipLength, isHorizontal) {
    let newShip = createShip(shipLength);
    ships.push(newShip)

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
    return ships.every(ship => {
      return ship.isSunk();
    })
  }

  function checkLocation(x, y) {
    return layout[x][y]
  }

  return { placeShip, checkLocation, receiveAttack, allSunk };
}

export default gameboard;
