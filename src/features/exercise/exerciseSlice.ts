import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

// 필요 자원 : id, startDate / type,level,maxCount,[휴식주기(?), 세트수(?)]
export interface ExerciseState {
  id: string;
  inputInfo: {
    startDate: string;
    name: string;
    level: string;
    maxCount: number;
    restDayPeriod: Date;
    setCount: number;
  };
}

const initialState: ExerciseState[] = [];

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push({
        id: uuid(),
        inputInfo: action.payload,
      });
    },
  },
});

export const { add } = exerciseSlice.actions;

export default exerciseSlice.reducer;
