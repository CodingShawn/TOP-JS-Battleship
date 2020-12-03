function createShip(length) {
  let shipLength = length;
  let status = new Array(length).fill(false);

  function getStatus() {
    return status;
  }

  function hit(position) {
      status[position] = true;
  }

  function isSunk() {
      return status.every((position)=> { return position} );
  }

  return { shipLength, getStatus, hit, isSunk };
}

export default createShip;
