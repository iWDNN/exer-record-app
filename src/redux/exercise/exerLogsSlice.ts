import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IExerciseState } from "./exerciseSlice";

export interface IRecord extends IExerciseState {
  recordId: string;
  date: string;
  recordList: number[];
  performedSetCount: number;
  cmp: boolean;
}

interface IExerIdName {
  name: string;
  id: string;
}
const initialState: IRecord[] = [];

export const exerLogsSlice = createSlice({
  name: "exerLogs",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.push(action.payload);
    },
    resetLog: () => [],
  },
});

export const { addLog, resetLog } = exerLogsSlice.actions;

export const selectDeDupExerLogs = (state: RootState) => {
  let names = Array.from(new Set(state.exerLogs.map((exer) => exer.exerName)));
  let ids = Array.from(new Set(state.exerLogs.map((exer) => exer.exerId)));
  const result: IExerIdName[] = [];
  names.forEach((v, i) => {
    result.push({ name: names[i], id: ids[i] });
  });
  return result;
};

export default exerLogsSlice.reducer;
