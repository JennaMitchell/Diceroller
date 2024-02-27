import { createSlice } from "@reduxjs/toolkit";

type AnimaationStoreStatesType = {
  lightOn: boolean;
};

const initialState: AnimaationStoreStatesType = {
  lightOn: false,
};

export const lightSettingsStoreSlice = createSlice({
  name: "Light Settings",
  initialState: initialState,
  reducers: {
    setLightOn(state, { payload }) {
      state.lightOn = payload;
    },
  },
});

export const lightSettingsStoreActions = lightSettingsStoreSlice.actions;
