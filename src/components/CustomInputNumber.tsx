import React, { useEffect } from "react";
import { InputNumberWrapper, ControlButton, InputNumber } from "./styles";
import useLongPress from "../hooks/useLongPress";
import { ICustomInputNumber } from "../types/interfaces";

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
    onChange(name, currentValue);
  }, [currentValue]);

  const onPressMinus = () => {
    if (currentValue === min) return;
    setCurrentValue((prev) => checkIsInRange(prev - step));
  };

  const onPressPlus = () => {
    if (currentValue === max) return;
    setCurrentValue((prev) => checkIsInRange(prev + step));
  };

  const longPressMinus = useLongPress(onPressMinus);

  const longPressPlus = useLongPress(onPressPlus);

  const checkIsInRange = (value: number) => {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentValue(checkIsInRange(parseInt(value)));
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "") onBlur(name, checkIsInRange(parseInt(value)));
  };

  return (
    <InputNumberWrapper>
      <ControlButton
        type="button"
        value="-"
        disabled={value === min || disabled.minus}
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
        disabled={value === max || disabled.plus}
        {...longPressPlus}
      />
    </InputNumberWrapper>
  );
};

export default CustomInputNumber;
