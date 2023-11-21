import { useEffect, useState } from "react";
import CustomInputNumber from "./CustomInputNumber";
import {
  AllocationWrapper,
  InfoSection,
  AllocationItem,
  LabelInputWrapper,
  Label,
  Description,
} from "./styles";
import { IRoomAllocation } from "../types/interfaces";

const RoomAllocation = ({ guest, room, onChange }: IRoomAllocation) => {
  const [roomAllData, setRoomAllData] = useState([]);
  const [disabled, setDisabled] = useState({
    minus: false,
    plus: false,
  });
  const [maxAdult, setMaxAdult] = useState<number>(guest);

  useEffect(() => {
    setMaxAdult(guest);
  }, [guest]);

  const totalGuest = roomAllData.reduce(
    (acc, cur) => acc + cur.adult + cur.child,
    0
  );

  const notAllocatedGuest = guest - totalGuest || 0;

  const maxChild = guest;

  useEffect(() => {
    setRoomAllData(
      Array.from({ length: room }, () => ({ adult: 1, child: 0 }))
    );
  }, [room]);

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
    if (notAllocatedGuest === 0) {
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
  }, [notAllocatedGuest]);

  const handleOnChange = (key: number, name: string, value: number) => {
    const newRoomAllData = [...roomAllData];
    newRoomAllData[key] = {
      ...newRoomAllData[key],
      [name]: value,
    };
    setRoomAllData(newRoomAllData);
    onChange(newRoomAllData);
  };

  const handleOnBlur = (key: number, name: string, value: number) => {
    const newRoomAllData = [...roomAllData];
    newRoomAllData[key] = {
      ...newRoomAllData[key],
      [name]: value,
    };
    setRoomAllData(newRoomAllData);
    onChange(newRoomAllData);
  };

  return (
    <AllocationWrapper>
      <div>
        住客人數：{guest} 人 / {room} 房
      </div>
      <InfoSection>尚未分配人數：{notAllocatedGuest}人</InfoSection>
      {roomAllData.map((guest, index) => (
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
                max={maxAdult}
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
