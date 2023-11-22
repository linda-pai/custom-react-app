import { isGuestOverRoomLimit, isGuestLessThenRoom } from "./checkCount";

describe("isGuestOverRoomLimit", () => {
  it("should return true if guest is over room limit", () => {
    expect(isGuestOverRoomLimit(9, 2, 4)).toBe(true);
  });

  it("should return false if guest is not over room limit", () => {
    expect(isGuestOverRoomLimit(2, 2, 4)).toBe(false);
  });
});

describe("isGuestLessThenRoom", () => {
  it("should return true if guest is less then room", () => {
    expect(isGuestLessThenRoom(1, 2)).toBe(true);
  });

  it("should return false if guest is equal to room", () => {
    expect(isGuestLessThenRoom(2, 2)).toBe(false);
  });

  it("should return false if guest is greater than room", () => {
    expect(isGuestLessThenRoom(3, 2)).toBe(false);
  });
});
