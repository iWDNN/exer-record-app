import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import exerciseSlice from "../exercise/exerciseSlice";
import exerLogsSlice from "../exercise/exerLogsSlice";
import timeSlice from "../time/timeSlice";
import toggleSlice from "../toggle/toggleSlice";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  exercise: exerciseSlice,
  exerLogs: exerLogsSlice,
  toggle: toggleSlice,
  time: timeSlice,
});
const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["exercise", "exerLogs"], // target (reducer name)
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
