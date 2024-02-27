import { createSlice } from "@reduxjs/toolkit";

type CanvasStoreStatesType = {
  canvasBackgroundColor: string;
};

const initialState: CanvasStoreStatesType = {
  canvasBackgroundColor: "#feffff",
};

export const canvasSettingsStoreSlice = createSlice({
  name: "Canvas Settings",
  initialState: initialState,
  reducers: {
    setCanvasBackgroundColor(state, { payload }) {
      state.canvasBackgroundColor = payload;
    },
  },
});

export const canvasSettingsStoreActions = canvasSettingsStoreSlice.actions;
