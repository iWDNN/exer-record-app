import { configureStore } from "@reduxjs/toolkit";
import exerciseSlice from "./features/exercise/exerciseSlice";
import exerLogsSlice from "./features/exercise/exerLogsSlice";
import timeSlice from "./features/time/timeSlice";
import toggleSlice from "./features/toggle/toggleSlice";

export const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
    exerLogs: exerLogsSlice,
    toggle: toggleSlice,
    time: timeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
