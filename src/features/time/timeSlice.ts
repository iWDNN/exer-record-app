import { createSlice } from "@reduxjs/toolkit";

interface TimeState {
  time: number;
  cmp: boolean;
}
const initialState: TimeState = {
  time: 0,
  cmp: false,
};

export const timeSlice = createSlice({
  name: "timeSlice",
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    timeIncrease: (state) => {
      state.time = state.time + 1;
    },
    timeDecrease: (state) => {
      state.time = state.time - 1;
    },
  },
});

export const { setTime, timeIncrease, timeDecrease } = timeSlice.actions;

export default timeSlice.reducer;
