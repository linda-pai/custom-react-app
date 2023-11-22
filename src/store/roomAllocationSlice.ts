import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomAllocationItem } from "../types/interfaces";

const roomAllocationSlice = createSlice({
  name: "roomallocation",
  initialState: {
    roomAllocation: [] as IRoomAllocationItem[],
    roomAvailable: 0,
  },
  reducers: {
    setRoomAllocation: (
      state,
      action: PayloadAction<IRoomAllocationItem[]>
    ) => {
      return {
        ...state,
        roomAllocation: action.payload,
      };
    },

    setRoomAvailable: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        roomAvailable: action.payload,
      };
    },
  },
});

export const { setRoomAllocation, setRoomAvailable } =
  roomAllocationSlice.actions;

export default roomAllocationSlice.reducer;
