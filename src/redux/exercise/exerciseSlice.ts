import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IExerciseState {
  id: string;
  exerName: string;
  exerCount: number;
  exerSetCount: number;
  exerSetRestTerm: number;
}

const initialState: IExerciseState[] = [];

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setExer: (state, action: PayloadAction<IExerciseState[]>) => action.payload,
    addExer: (state, action: PayloadAction<IExerciseState>) => {
      state.push(action.payload);
    },
    delExer: (state, action: PayloadAction<string>) =>
      state.filter((exercise) => exercise.id !== action.payload),
  },
});

export const { setExer, addExer, delExer } = exerciseSlice.actions;

export default exerciseSlice.reducer;
