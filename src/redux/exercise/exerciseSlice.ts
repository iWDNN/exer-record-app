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
    uptExer: (state, action: PayloadAction<IExerciseState>) => {
      const targetIndex = state.findIndex(
        (exer) => exer.id === action.payload.id
      );
      state[targetIndex] = action.payload;
    },
    addExer: (state, action: PayloadAction<IExerciseState>) => {
      state.push(action.payload);
    },
    delExer: (state, action: PayloadAction<string>) =>
      state.filter((exercise) => exercise.id !== action.payload),
  },
});

export const { setExer, uptExer, addExer, delExer } = exerciseSlice.actions;

export default exerciseSlice.reducer;
