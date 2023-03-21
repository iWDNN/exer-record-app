import { createSlice } from "@reduxjs/toolkit";

interface TimeState {
  time: number;
}
const initialState: TimeState = {
  time: 0,
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
  },
});

export const { setTime, timeIncrease } = timeSlice.actions;

export default timeSlice.reducer;
