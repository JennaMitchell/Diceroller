import { createSlice } from "@reduxjs/toolkit";

type MeshStoreStatesType = {
  meshColor: string;
  meshHoverColor: string;
  meshColorIntensity: number;
  activeMeshType: string;
  xRotation: number;
  yRotation: number;
  zRotation: number;
  scale: number;

  textColor: string;
  textColorIntensity: number;
  xPosition: number;
  yPosition: number;
  zPosition: number;
  activeAnimationType: string;
  materialType: string;
};

const initialState: MeshStoreStatesType = {
  meshColor: "#ff0000",
  meshHoverColor: "#ff9300",
  meshColorIntensity: 1,
  textColor: "#ffffff",
  textColorIntensity: 1,
  activeMeshType: "D20",
  xRotation: 0,
  yRotation: 0,
  zRotation: 0,
  scale: 1,

  xPosition: 0,
  yPosition: 0,
  zPosition: 0,
  activeAnimationType: "",
  materialType: "Basic",
};

export const meshSettingsStoreSlice = createSlice({
  name: "Mesh Settings",
  initialState: initialState,
  reducers: {
    setMeshColor(state, { payload }) {
      state.meshColor = payload;
    },
    setMeshHoverColor(state, { payload }) {
      state.meshHoverColor = payload;
    },
    setTextColor(state, { payload }) {
      state.textColor = payload;
    },
    setTextColorIntensity(state, { payload }) {
      state.textColorIntensity = payload;
    },
    setMeshColorIntensity(state, { payload }) {
      state.meshColorIntensity = payload;
    },
    setActiveMeshType(state, { payload }) {
      state.activeMeshType = payload;
    },
    setXRotation(state, { payload }) {
      state.xRotation = payload;
    },
    setYRotation(state, { payload }) {
      state.yRotation = payload;
    },
    setZRotation(state, { payload }) {
      state.zRotation = payload;
    },
    setScale(state, { payload }) {
      state.scale = payload;
    },

    setXPosition(state, { payload }) {
      state.xPosition = payload;
    },
    setYPosition(state, { payload }) {
      state.yPosition = payload;
    },
    setZPosition(state, { payload }) {
      state.zPosition = payload;
    },
    setActiveAnimationType(state, { payload }) {
      state.activeAnimationType = payload;
    },
    setMaterialType(state, { payload }) {
      state.materialType = payload;
    },
  },
});

export const meshSettingsStoreActions = meshSettingsStoreSlice.actions;
