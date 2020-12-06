import gameboard from '../scripts/createGameboard'
import createPlayer from '../scripts/createPlayer'

describe("Testing player functions", () =>{
  let testBoard = gameboard();
  let player = createPlayer(testBoard, false);
  testBoard.placeShip(0, 0, 3, true);

  test("Player is able to attack", () => {
    player.playerMakeMove(0, 0);
    expect(testBoard.checkLocation(0, 0)).toBe(true);
  })
})