import { createSlice } from "@reduxjs/toolkit";

type ServerMessageStoreStatesType = {
  serverMessageName: string;
  userJoinedData: {
    usernameThatJoined: string;
    gameRoomJoined: string;
    isFirstUser: boolean;
  };
  updatedRoomEditorData: {
    newEditorUsername: string;
    room: string;
  };
  updatedGameSettingsData: {
    variableName: string;
    variableValue: number | string;
    room: string;
  };
  updatedDieRollData: {
    animationStarted: boolean;
    dieResult: number;
    room: string;
  };
};

const initialState: ServerMessageStoreStatesType = {
  serverMessageName: "",
  userJoinedData: {
    usernameThatJoined: "",
    gameRoomJoined: "",
    isFirstUser: false,
  },

  updatedRoomEditorData: { newEditorUsername: "", room: "" },
  updatedGameSettingsData: { variableName: "", room: "", variableValue: "" },
  updatedDieRollData: { animationStarted: false, dieResult: 1, room: "" },
};

export const serverMessageSettingsStoreSlice = createSlice({
  name: "Server Message Store",
  initialState: initialState,
  reducers: {
    setServerMessageName(state, { payload }) {
      state.serverMessageName = payload;
    },
    setUserJoinedData(state, { payload }) {
      state.userJoinedData = payload;
    },
    setUpdatedRoomEditorData(state, { payload }) {
      state.updatedRoomEditorData = payload;
    },
    setUpdatedGameSettingsData(state, { payload }) {
      state.updatedGameSettingsData = payload;
    },
    setUpdatedDieRollData(state, { payload }) {
      state.updatedDieRollData = payload;
    },
  },
});

export const serverMessageSettingsStoreActions =
  serverMessageSettingsStoreSlice.actions;
