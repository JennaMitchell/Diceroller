import { createSlice } from "@reduxjs/toolkit";

type animationStoreStatesType = {
  startAnimation: boolean;
  valueRolled: number;
  animationComplete: boolean;
  animationDirection: string;
};

const initialState: animationStoreStatesType = {
  startAnimation: false,
  valueRolled: 1,
  animationComplete: false,
  animationDirection: "Right",
};

export const animationSettingsStoreSlice = createSlice({
  name: "Animation Settings",
  initialState: initialState,
  reducers: {
    setStartAnimation(state, { payload }) {
      state.startAnimation = payload;
    },
    setValueRolled(state, { payload }) {
      state.valueRolled = payload;
    },
    setAnimationComplete(state, { payload }) {
      state.animationComplete = payload;
    },
    setAnimationDirection(state, { payload }) {
      state.animationDirection = payload;
    },
  },
});

export const animationSettingsStoreActions =
  animationSettingsStoreSlice.actions;
