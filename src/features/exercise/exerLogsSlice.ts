import { createSlice } from "@reduxjs/toolkit";
import { IRecord } from "../timer/timerSlice";

export interface ExerLogsState {
  records: IRecord[];
}

const initialState: ExerLogsState = {
  records: [],
};

export const exerLogsSlice = createSlice({
  name: "exerLogs",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.records?.push(action.payload);
    },
  },
});

export const { addLog } = exerLogsSlice.actions;

export default exerLogsSlice.reducer;
