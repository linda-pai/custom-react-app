import React, { useEffect } from "react";
import {
  InputNumberWrapper,
  ControlButton,
  InputNumber,
} from "../styles/styles";
import useLongPress from "../hooks/useLongPress";
import { ICustomInputNumber } from "../types/interfaces";
import { checkIsInRange } from "../utils/checkIsInRange";

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}: ICustomInputNumber) => {
  const [currentValue, setCurrentValue] = React.useState<number>(value);

  useEffect(() => {
    onChange({
      target: {
        name,
        value: checkIsInRange(min, max, currentValue),
      },
    } as any);

    onBlur({
      target: {
        name,
        value: checkIsInRange(min, max, currentValue),
      },
    } as any);
  }, [currentValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentValue(checkIsInRange(min, max, parseInt(value)));
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "")
      setCurrentValue(checkIsInRange(min, max, parseInt(value)));
  };

  const onPressMinus = () =>
    setCurrentValue((prev) => checkIsInRange(min, max, prev - step));
  const onPressPlus = () =>
    setCurrentValue((prev) => checkIsInRange(min, max, prev + step));

  const onClickMinus = () => setCurrentValue((prev) => prev - step);
  const onClickPlus = () => setCurrentValue((prev) => prev + step);

  const longPressMinus = useLongPress(onPressMinus, onClickMinus);
  const longPressPlus = useLongPress(onPressPlus, onClickPlus);

  return (
    <InputNumberWrapper>
      <ControlButton
        type="button"
        value="-"
        disabled={disabled.minus || currentValue === min}
        {...longPressMinus}
      />
      <InputNumber
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        value={currentValue}
        disabled={disabled.minus && disabled.plus}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <ControlButton
        type="button"
        value="+"
        disabled={disabled.plus}
        {...longPressPlus}
      />
    </InputNumberWrapper>
  );
};

export default CustomInputNumber;
