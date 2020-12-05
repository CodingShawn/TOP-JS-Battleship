import createShip from "../scripts/createShip2";

describe("Testing ship functions", () => {
  let testShip = createShip(3);

  test("Ship function will create ship of length equivalent to length passed as argument", () => {
    expect(testShip.shipLength).toBe(3);
  });

  test("Ship should show not sunk before being hit", () =>{
    expect(testShip.isSunk()).toBe(false);
  })

  test("Ship will be at full health before being hit", () => {
    expect(testShip.getHealth()).toBe(3);
  });

  test("Ship's health will be 2 when hit once", () => {
    testShip.hit(1);
    expect(testShip.getHealth()).toBe(2);
  });

  test("Ship should show not sunk after being hit", () => {
    expect(testShip.isSunk()).toBe(false);
  })

  test("Ship's health will be 1 when hit twice", () => {
    testShip.hit(0);
    expect(testShip.getHealth()).toBe(1);
  });

  test("Ship's health will be 0 when hit thrice", () => {
    testShip.hit(2);
    expect(testShip.getHealth()).toBe(0);
  });

  test("Ship will show as sunk when all sections are hit", () => {
    expect(testShip.isSunk()).toBe(true);
  })
});
