import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  addToggle: boolean;
  startToggle: boolean;
  restToggle: boolean;
}

const initialState: ToggleState = {
  addToggle: false,
  startToggle: false,
  restToggle: false,
};

export const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    // 흠
    switchToggle: (state, action) => {},
    addToggleSwitch: (state, action) => {
      state.addToggle =
        action.payload === "toggle" ? !state.addToggle : action.payload;
    },
    startToggleSwitch: (state, action) => {
      state.startToggle =
        action.payload === "toggle" ? !state.startToggle : action.payload;
    },
    restToggleSwitch: (state, action) => {
      state.startToggle =
        action.payload === "toggle" ? !state.startToggle : action.payload;
    },
  },
});

export const {
  switchToggle,
  addToggleSwitch,
  startToggleSwitch,
  restToggleSwitch,
} = toggleSlice.actions;

export default toggleSlice.reducer;
