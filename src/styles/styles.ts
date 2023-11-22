import styled from "styled-components";

export const AllocationWrapper = styled.div`
  width: 90%;
  max-width: 330px;
  min-width: 240px;
`;

export const InfoSection = styled.div`
  background: #f4fcfd;
  padding: 16px;
  margin: 20px 4px;
  border: 1px solid #6cd1ea;
  border-radius: 4px;
  font-size: 12px;
  color: #6e6c6c;
`;

export const AllocationItem = styled.div`
  padding: 12px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #e6e6e6;
  }
`;

export const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  margin-top: 6px;
  line-height: 22px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #3d3d3d;
  margin: 0;
  padding-top: 4px;
`;

export const Description = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #9e9e9e;
  margin: 0;
`;

export const InputNumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ControlButton = styled.input.attrs({
  type: "button",
})`
  height: 48px;
  width: 48px;
  margin: 4px;
  font-size: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px #6cd1ea solid;
  color: #6cd1ea;

  &:hover {
    background-color: #6cd1ea;
    color: #ffffff;
    cursor: pointer;
  }

  ${(props) =>
    props.disabled &&
    ` border: 1px #e4e3e3 solid !important;
      background-color: #ffffff !important;
      cursor: not-allowed !important;
      color:#e4e3e3 !important;
  `}
`;

export const InputNumber = styled.input.attrs({ type: "number" })`
  height: 46px;
  width: 46px;
  margin: 4px;
  padding: 0px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #ffffff;
  text-align: center;
  border: 1px #aaa9a9 solid;
  color: #6e6c6c;

  &:disabled {
    border: 1px #e4e3e3 solid;
    background-color: #ffffff;
    cursor: not-allowed;
    color: #bfbcbc;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const RoomAllocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 60px;
`;
