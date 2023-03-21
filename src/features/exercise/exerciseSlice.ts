import { createSlice } from "@reduxjs/toolkit";
import { EXERCISES } from "../../ls-type";

export interface ExerciseState {
  id: string;
  exerName: string;
  exerCount: number;
  exerSetCount: number;
  exerSetRestTerm: number;
}

if (!localStorage.getItem(EXERCISES)) {
  localStorage.setItem(EXERCISES, JSON.stringify([]));
}

const initialState: ExerciseState[] = JSON.parse(
  localStorage.getItem(EXERCISES) as any
);

// console.log("initialState :", initialState);

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    exerAdd: (state, action) => {
      state.push(action.payload);
    },
    exerDel: (state, action) =>
      (state = state.filter((exercise) => exercise.id !== action.payload)),
  },
});

export const { exerAdd, exerDel } = exerciseSlice.actions;

export default exerciseSlice.reducer;
