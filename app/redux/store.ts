import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./reducer/authSlice"; // Ensure path is correct
import tokenReducer from './reducer/tokenSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    token: tokenReducer,
  },
  devTools: process.env.NODE_ENV === "development", // Disable in production
});

// Correct Redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ FIX: Use proper Redux hooks to avoid excessive re-renders
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
