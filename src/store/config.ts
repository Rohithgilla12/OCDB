import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer, { getCurrentUser } from "./auth/authSlice";
import appReducer, { getCurrentUserApps } from "./app/appSlice";
import { auth } from "./constants";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

auth.onAuthStateChanged((user) => {
  console.log({ user });
  store.dispatch(getCurrentUser());
  if (user !== null && auth.currentUser !== null) {
    store.dispatch(getCurrentUserApps(auth.currentUser.uid));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
