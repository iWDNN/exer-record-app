import { configureStore, createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import exerciseSlice from "./features/exercise/exerciseSlice";

const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
