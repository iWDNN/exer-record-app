import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exerciseSlice from "../exercise/exerciseSlice";
import exerLogsSlice from "../exercise/exerLogsSlice";
import timeSlice from "../time/timeSlice";
import toggleSlice from "../toggle/toggleSlice";

const rootReducer = combineReducers({
  exercise: exerciseSlice,
  exerLogs: exerLogsSlice,
  toggle: toggleSlice,
  time: timeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
