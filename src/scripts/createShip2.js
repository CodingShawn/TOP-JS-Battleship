function createShip2(length) {
  let shipLength = length;
  let health = length;

  function getHealth() {
    return health;
  }

  function hit() {
      health--;
  }

  function isSunk() {
      return health == 0;
  }

  return { shipLength, getHealth, hit, isSunk };
}

export default createShip2;
