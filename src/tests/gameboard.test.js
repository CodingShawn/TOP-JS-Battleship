import gameboard from "../scripts/gameboard";

describe("Testing gameboard functions", () => {
  let testBoard = gameboard();
  testBoard.placeShip(5, 5, 2, true); //True means to be place horizontally

  test("checkLocation to return null if no ship at location passed", () => {
    expect(testBoard.checkLocation(0, 0)).toBeNull();
  });

  test("checkLocation to return not null if ship at location passed", () => {
    testBoard.placeShip(0, 0, 3, false); //False means to be placed vertically
    expect(testBoard.checkLocation(0, 0)).not.toBeNull();
  });

  test("Check if ship was placed vertically", () => {
    expect(testBoard.checkLocation(0, 1)).not.toBeNull();
    expect(testBoard.checkLocation(0, 2)).not.toBeNull();
    expect(testBoard.checkLocation(1, 0)).toBeNull();
  });

  test("Check that only ship placed only occupies 3 grids as per its length", () => {
    expect(testBoard.checkLocation(0, 3)).toBeNull();
  });

  test("Check if gameboard will not return true or false at coords which have not be hit", () => {
    expect(testBoard.checkLocation(0, 0)).not.toBe(true);
    expect(testBoard.checkLocation(0, 0)).not.toBe(false);
  });

  test("Check if gameboard will register hit", () => {
    testBoard.receiveAttack(0, 0);
    expect(testBoard.checkLocation(0, 0)).toBe(true);
  });

  test("Check if gameboard will not return true or false at coords which have not be hit after recieve hit called", () => {
    expect(testBoard.checkLocation(1, 0)).not.toBe(false);
    expect(testBoard.checkLocation(1, 0)).not.toBe(true);
  });

  test("Check if gameboard will return false at coords hit but has no ship", () => {
    testBoard.receiveAttack(1, 0);
    expect(testBoard.checkLocation(1, 0)).toBe(false);
  });

  test("Check if gameboard.allSunk will return false when all ships not sunk", () => {
    expect(testBoard.allSunk()).toBe(false);
  });

  test("Check if gameboar.allSunk will return false when only 1 ship sunk", () => {
    testBoard.receiveAttack(0, 1);
    testBoard.receiveAttack(0, 2);
    expect(testBoard.allSunk()).toBe(false);
  });

  test("Check if gameboard.allSunk will return true when all ships sunk", () => {
    testBoard.receiveAttack(5, 5);
    testBoard.receiveAttack(6, 5);
    expect(testBoard.allSunk()).toBe(true);
  });
});
