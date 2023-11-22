export const isGuestOverRoomLimit = (
  guest: number,
  room: number,
  maxGuestPerRoom: number
) => {
  return guest > room * maxGuestPerRoom || room * maxGuestPerRoom < guest;
};

export const isGuestLessThenRoom = (guest: number, room: number) => {
  return room > guest || guest < room;
};
