import { useEffect, useState } from "react";
import CustomInputNumber from "./CustomInputNumber";
import {
  AllocationWrapper,
  InfoSection,
  AllocationItem,
  LabelInputWrapper,
  Label,
  Description,
} from "../styles/styles";
import { IRoomAllocation } from "../types/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  setRoomAllocation,
  setRoomAvailable,
} from "../store/roomAllocationSlice";

const RoomAllocation = ({ guest, room, onChange }: IRoomAllocation) => {
  const roomAllocation = useSelector(
    (state: RootState) => state.roomAllocationSlice.roomAllocation
  );

  const roomAvailable = useSelector(
    (state: RootState) => state.roomAllocationSlice.roomAvailable
  );

  const maxChild = roomAvailable;
  const maxAdult = roomAvailable;

  const [disabled, setDisabled] = useState({
    minus: false,
    plus: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const newRoomAllData = Array.from({ length: room }, () => ({
      adult: 1,
      child: 0,
    }));
    dispatch(setRoomAllocation(newRoomAllData));
  }, [room]);

  useEffect(() => {
    onChange(roomAllocation);
  }, [roomAllocation]);

  useEffect(() => {
    const totalGuest = roomAllocation.reduce(
      (acc, cur) => acc + cur.adult + cur.child,
      0
    );
    dispatch(setRoomAvailable(guest - totalGuest));
  }, [guest, roomAllocation]);

  useEffect(() => {
    if (guest === room) {
      setDisabled({
        ...disabled,
        plus: true,
        minus: true,
      });
    }
  }, [guest, room]);

  useEffect(() => {
    if (roomAvailable === 0) {
      setDisabled({
        ...disabled,
        plus: true,
        minus: false,
      });
    } else {
      setDisabled({
        ...disabled,
        plus: false,
        minus: false,
      });
    }
  }, [roomAvailable]);

  const getNewRoomAllocation = (key: number, name: string, value: number) => {
    const newRoomAllData = [...roomAllocation];
    newRoomAllData[key] = {
      ...newRoomAllData[key],
      [name]: value,
    };
    return newRoomAllData;
  };

  const handleOnChange = (key: number, name: string, value: number) => {
    const newRoomAllData = getNewRoomAllocation(key, name, value);
    dispatch(setRoomAllocation(newRoomAllData));
  };

  const handleOnBlur = (key: number, name: string, value: number) => {
    const newRoomAllData = getNewRoomAllocation(key, name, value);
    dispatch(setRoomAllocation(newRoomAllData));
  };

  return (
    <AllocationWrapper>
      <div>
        住客人數：{guest} 人 / {room} 房
      </div>
      <InfoSection>尚未分配人數：{roomAvailable}人</InfoSection>
      {roomAllocation.map((guest, index) => (
        <AllocationItem key={index}>
          <div>
            <div>
              房間：
              {Boolean(guest.adult + guest.child)
                ? guest.adult + guest.child
                : 0}
              人
            </div>
            <LabelInputWrapper>
              <div>
                <Label>大人</Label>
                <Description>年齡 20+</Description>
              </div>
              <CustomInputNumber
                min={1}
                max={maxAdult + guest.adult}
                step={1}
                name="adult"
                value={guest.adult}
                onChange={(name, value) => handleOnChange(index, name, value)}
                onBlur={(name, value) => handleOnBlur(index, name, value)}
                disabled={disabled}
              />
            </LabelInputWrapper>
            <LabelInputWrapper>
              <Label>小孩</Label>
              <CustomInputNumber
                min={0}
                max={maxChild}
                step={1}
                name="child"
                value={guest.child}
                onChange={(name, value) => handleOnChange(index, name, value)}
                onBlur={(name, value) => handleOnBlur(index, name, value)}
                disabled={disabled}
              />
            </LabelInputWrapper>
          </div>
        </AllocationItem>
      ))}
    </AllocationWrapper>
  );
};

export default RoomAllocation;
