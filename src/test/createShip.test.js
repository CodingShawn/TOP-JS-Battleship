import createShip from "../scripts/createShip";

describe("Testing ship functions", () => {
  let testShip = createShip(3);

  test("Ship function will create ship of length equivalent to length passed as argument", () => {
    expect(testShip.shipLength).toBe(3);
  });

  test("Ship will show as all not hit before being hit", () => {
    expect(testShip.status).toBe([false, false, false])
  });

  test("Ship will mark a position as hit when hit", () => {
    testShip.hit(1);
    expect(testShip.status).toBe([false, true, false]);
  });

  test("Ship will mark a position as hit when hit", () => {
    testShip.hit(0);
    expect(testShip.status).toBe([true, true, false]);
  });

  test("Ship will mark a position as hit when hit", () => {
    testShip.hit(2);
    expect(testShip.status).toBe([true, true, true]);
  });

  test("Ship will show as sunk when all sections are hit", () => {
    expect(testShip.isSunk()).toBeTruthy();
  })
});
