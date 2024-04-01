import { createSlice } from "@reduxjs/toolkit";

type UserDataStoreStatesType = {
  username: String;
  gameRoomJoined: String;
};

const initialState: UserDataStoreStatesType = {
  username: "",
  gameRoomJoined: "",
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
  },
});

export const userDataSettingsStoreActions = userDataSettingsStoreSlice.actions;
