import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { axiosHandler } from "../../lib/axiosHandler";
// import { setAccessToken } from "../../lib/tokenHandler";
// import { AppDispatch } from "../store";

interface UserData {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  status: "Active" | "Inactive";
  type: "Writer" | "Editor";
}

interface AuthState {
  data: UserData | null;
  loading: boolean;
  error: string | null,
}

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // logout: (state) => {
    //   state.data = null;
    //   state.loading = false;
    // },
  },
});

export const { 
  setUser, 
  setLoading, 
  // logout 
} = authSlice.actions;

// // Async Thunk: Login User
// export const loginUser =
//   (userName: string, password: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await axiosHandler.post("/api/auth", { userName, password });
//       setAccessToken(response.data.accessToken);
//       dispatch(setUser(response.data.user));
//       return Promise.resolve(response.data.user);
//     } catch (error) {
//       console.error("Login failed", error);
//       return Promise.reject(error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };


// // Async Thunk: Logout User
// export const logoutUser = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(setLoading(true));
//     await axiosHandler.post("/api/auth/logout");
//     setAccessToken(null);
//     dispatch(logout());
//   } catch (error) {
//     console.error("Logout failed", error);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

export default authSlice.reducer;
