import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isLoginModal: false,
    isCreatePlaylistModal: false,
    isAddToPlaylistModal: false,
    addSongId: null,
    message: "",
  },
  reducers: {
    toggleLoginModal: (state) => {
      state.isLoginModal = !state.isLoginModal;
    },
    setSongId: (state, action) => {
      state.addSongId = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  toggleLoginModal,
  setSongId,
  setMessage,
} = modalSlice.actions;

export default modalSlice.reducer;
