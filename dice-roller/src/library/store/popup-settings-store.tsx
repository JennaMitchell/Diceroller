import { createSlice } from "@reduxjs/toolkit";

type popupSettingsType = {
  serverMessageText: string;
  serverMessageType: string;
  serverMessagePopupActive: boolean;
  usernamePopupActive: boolean;
  roomSelectPopupActive: boolean;
  roomSelectPopupUpdateActiveUsers: boolean;
  roomEditorPrivilegePasserPopupActive: boolean;
};

const initialState: popupSettingsType = {
  serverMessageText: "",
  serverMessageType: "",
  serverMessagePopupActive: false,
  usernamePopupActive: false,
  roomSelectPopupActive: false,
  roomSelectPopupUpdateActiveUsers: false,
  roomEditorPrivilegePasserPopupActive: false,
};

export const popupSettingsStoreSlice = createSlice({
  name: "Popup Settings",
  initialState: initialState,
  reducers: {
    setServerMessageType(state, { payload }) {
      state.serverMessageType = payload;
    },
    setServerMessageText(state, { payload }) {
      state.serverMessageText = payload;
    },
    setServerMessagePopupActive(state, { payload }) {
      state.serverMessagePopupActive = payload;
    },
    setUsernameMessagePopupActive(state, { payload }) {
      state.usernamePopupActive = payload;
    },
    setRoomSelectPopupActive(state, { payload }) {
      state.roomSelectPopupActive = payload;
    },
    setRoomSelectPopupUpdateActiveUsers(state, { payload }) {
      state.roomSelectPopupUpdateActiveUsers = payload;
    },
    setRoomEditorPrivilegePasserPopupActive(state, { payload }) {
      state.roomEditorPrivilegePasserPopupActive = payload;
    },
  },
});

export const popupSettingsStoreActions = popupSettingsStoreSlice.actions;
