import { checkIsInRange } from "./checkIsInRange";

test("checkIsInRange(0, 10, 5) should return 5", () => {
  expect(checkIsInRange(0, 10, 5)).toBe(5);
});

test("checkIsInRange(0, 10, -5) should return 0", () => {
  expect(checkIsInRange(0, 10, -5)).toBe(0);
});

test("checkIsInRange(0, 10, 15) should return 10", () => {
  expect(checkIsInRange(0, 10, 15)).toBe(10);
});

test("checkIsInRange(0, 10, 20) should return 10", () => {
  expect(checkIsInRange(0, 10, 20)).toBe(10);
});
