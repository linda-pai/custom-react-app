import { configureStore } from "@reduxjs/toolkit";
import roomAllocationSlice from "./roomAllocationSlice";

const store = configureStore({
  reducer: {
    roomAllocationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
