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
  },
});

export const { setTime } = timeSlice.actions;

export default timeSlice.reducer;
