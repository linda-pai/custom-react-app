import { useEffect, useState } from "react";
import RoomAllocation from "./components/RoomAllocation";
import { RoomAllocationWrapper } from "./styles/styles";
import { IRoomAllocationItem } from "./types/interfaces";
import { isGuestOverRoomLimit, isGuestLessThenRoom } from "./utils/checkCount";

const App = () => {
  const [guest, setGuest] = useState<number>(5);
  const [room, setRoom] = useState<number>(3);
  const maxGuestPerRoom = 4;

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGuest(parseInt(e.target.value));

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoom(parseInt(e.target.value));

  useEffect(() => {
    if (isGuestOverRoomLimit(guest, room, maxGuestPerRoom)) {
      alert(`睡不下了～超過房間上限：${maxGuestPerRoom}人`);
      setGuest(guest - 1);
    }

    if (isGuestLessThenRoom(guest, room)) {
      alert(`人數最少要等於房間數量：${guest} 人`);
      setRoom(guest);
    }
  }, [guest, room]);

  return (
    <div>
      <div>
        <input
          type="range"
          value={guest}
          min="1"
          max="30"
          onChange={handleGuestChange}
        />
        <label htmlFor="guest">guest</label>
      </div>
      <div>
        <input
          type="range"
          value={room}
          min="1"
          max="30"
          onChange={handleRoomChange}
        />
        <label htmlFor="room">room</label>
      </div>

      <RoomAllocationWrapper>
        <RoomAllocation
          guest={guest}
          room={room}
          onChange={(result: IRoomAllocationItem[]) =>
            console.log("result", result)
          }
        />
      </RoomAllocationWrapper>
    </div>
  );
};

export default App;
