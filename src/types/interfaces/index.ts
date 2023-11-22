export interface IRoomAllocationItem {
  adult: number;
  child: number;
}

export interface IRoomAllocation {
  guest: number;
  room: number;
  onChange: (result: IRoomAllocationItem[]) => void;
}

export interface ICustomInputNumber {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: { plus: boolean; minus: boolean };
  onChange: (name: string, value: number) => void;
  onBlur: (name: string, value: number) => void;
}
