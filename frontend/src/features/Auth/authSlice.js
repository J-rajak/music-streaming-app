import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    username: null,
    isAuthenticated: false,
    isPremium: false,
    provider: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUser: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setIsPremium: (state, action) => {
      state.isPremium = action.payload;
    },
    logoutUser: (state) => {
      state.userId = null,
      state.username = null;
      state.isAuthenticated = false;
      state.isPremium = false;
    },
  },
});

export const { setUserId, setUser, setProvider, setIsPremium, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
