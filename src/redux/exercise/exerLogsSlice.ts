import { createSlice } from "@reduxjs/toolkit";

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

export default exerLogsSlice.reducer;
