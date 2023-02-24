import { configureStore } from "@reduxjs/toolkit";
import exerciseSlice from "./features/exercise/exerciseSlice";
import timerSlice from "./features/timer/timerSlice";
import toggleSlice from "./features/toggle/toggleSlice";

export const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
    timer: timerSlice,
    toggle: toggleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
