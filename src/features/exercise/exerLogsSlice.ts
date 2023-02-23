import { createSlice } from "@reduxjs/toolkit";
import { ExerciseState } from "./exerciseSlice";

export interface ExerLogsState extends ExerciseState {
  // id: string;
  // exerName: string;
  // exerCount: string;
  // exerSetCount: string;
  cmp: boolean;
  cmpDate: string;
  cmpTime: string;
}

const initialState: ExerLogsState[] = [];

export const exerLogsSlice = createSlice({
  name: "exerLogs",
  initialState,
  reducers: {
    complete: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { complete } = exerLogsSlice.actions;

export default exerLogsSlice.reducer;
