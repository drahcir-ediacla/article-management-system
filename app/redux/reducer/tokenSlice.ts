import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
    accessToken: string | null;
}

const initialState: TokenState = {
    accessToken: null, // No localStorage, just memory
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const { setAccessToken, clearAccessToken } = tokenSlice.actions;
export default tokenSlice.reducer;
