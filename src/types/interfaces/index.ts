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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
