import { createSlice } from "@reduxjs/toolkit";

type UserDataStoreStatesType = {
  username: String;
  gameRoomJoined: String;
  isRoomEditor: boolean;
};

const initialState: UserDataStoreStatesType = {
  username: "",
  gameRoomJoined: "",
  isRoomEditor: false,
};

export const userDataSettingsStoreSlice = createSlice({
  name: "User Data Settings",
  initialState: initialState,
  reducers: {
    setUsername(state, { payload }) {
      state.username = payload;
    },
    setGameRoomJoined(state, { payload }) {
      state.gameRoomJoined = payload;
    },
    setIsRoomEditor(state, { payload }) {
      state.isRoomEditor = payload;
    },
  },
});

export const userDataSettingsStoreActions = userDataSettingsStoreSlice.actions;
