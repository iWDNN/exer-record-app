import { createSlice } from "@reduxjs/toolkit";
import { EXER_LOGS } from "../../ls-type";
import { IRecord } from "../timer/timerSlice";

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
  },
});

export const { addLog } = exerLogsSlice.actions;

export default exerLogsSlice.reducer;
