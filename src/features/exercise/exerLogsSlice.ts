import { createSlice } from "@reduxjs/toolkit";
import { EXER_LOGS } from "../../ls-type";

export interface IRecord {
  id: string;
  date: string;
  name: string;
  detailTimes: number[];
  playSetCount: number;
  setCount: number;
  setRestTerm: number;
  exerCount: number;
  cmp: boolean;
}

if (!localStorage.getItem(EXER_LOGS)) {
  localStorage.setItem(EXER_LOGS, JSON.stringify([]));
}
const initialState: IRecord[] = JSON.parse(
  localStorage.getItem(EXER_LOGS) as any
);

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

export default exerLogsSlice.reducer;
