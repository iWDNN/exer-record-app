import { configureStore } from "@reduxjs/toolkit";
import exerciseSlice from "./features/exercise/exerciseSlice";
import exerLogsSlice from "./features/exercise/exerLogsSlice";
import timerSlice from "./features/timer/timerSlice";
import toggleSlice from "./features/toggle/toggleSlice";

export const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
    exerLogs: exerLogsSlice,
    timer: timerSlice,
    toggle: toggleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
