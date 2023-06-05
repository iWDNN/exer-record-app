import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  addToggle: boolean;
  initStartToggle: boolean;
  startToggle: boolean;
  restToggle: boolean;
}

const initialState: ToggleState = {
  addToggle: false,
  initStartToggle: false,
  startToggle: false,
  restToggle: false,
};

export const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    // 흠
    addToggleSwitch: (state, action) => {
      state.addToggle =
        action.payload === "toggle" ? !state.addToggle : action.payload;
    },
    initStartToggleSwitch: (state, action) => {
      state.initStartToggle =
        action.payload === "toggle" ? !state.initStartToggle : action.payload;
    },
    startToggleSwitch: (state, action) => {
      state.startToggle =
        action.payload === "toggle" ? !state.startToggle : action.payload;
    },
    restToggleSwitch: (state, action) => {
      state.restToggle =
        action.payload === "toggle" ? !state.restToggle : action.payload;
    },
  },
});

export const {
  initStartToggleSwitch,
  addToggleSwitch,
  startToggleSwitch,
  restToggleSwitch,
} = toggleSlice.actions;

export default toggleSlice.reducer;
