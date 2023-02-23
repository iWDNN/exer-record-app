import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  addToggle: boolean;
}

const initialState: ToggleState = {
  addToggle: false,
};

export const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    addToggle: (state, action) => ({
      addToggle:
        action.payload === "toggle" ? !state.addToggle : action.payload,
    }),
  },
});

export const { addToggle } = toggleSlice.actions;

export default toggleSlice.reducer;
