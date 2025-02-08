import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {API} from '../../lib/apiHandler'
import { setAccessToken } from "../../lib/tokenHandler";
import { AppDispatch } from "../store";

interface AuthState {
    user: { username: string } | null;
    loading: boolean;
  }
  
  const initialState: AuthState = {
    user: null,
    loading: false,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<{ username: string }>) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
    },
  });
  
  export const { setUser, logout } = authSlice.actions;
  
  // Async Thunk: Login User
  export const loginUser =
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        const response = await API.post("/api/auth", { username, password });
        setAccessToken(response.data.accessToken);
        dispatch(setUser({ username }));
      } catch (error) {
        console.error("Login failed", error);
      }
    };
  
  // Async Thunk: Logout User
  export const logoutUser = () => async (dispatch: AppDispatch) => {
    try {
      await API.post("/api/auth/logout");
      setAccessToken(null);
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  
  export default authSlice.reducer;