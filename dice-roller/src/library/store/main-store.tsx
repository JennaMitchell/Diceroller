import { configureStore } from "@reduxjs/toolkit";
import { meshSettingsStoreSlice } from "./mesh-settings-store";
import { lightSettingsStoreSlice } from "./light-settings-store";
import { canvasSettingsStoreSlice } from "./canvas-settings-store";
import { animationSettingsStoreSlice } from "./animation-settings-store";
import { popupSettingsStoreSlice } from "./popup-settings-store";
import { userDataSettingsStoreSlice } from "./users-data-store";
import { serverMessageSettingsStoreSlice } from "./server-message-store";
const store = configureStore({
  reducer: {
    animationSettings: animationSettingsStoreSlice.reducer,
    lightSettings: lightSettingsStoreSlice.reducer,
    meshSettings: meshSettingsStoreSlice.reducer,
    canvasSettings: canvasSettingsStoreSlice.reducer,
    popupSettings: popupSettingsStoreSlice.reducer,
    userDataSettings: userDataSettingsStoreSlice.reducer,
    serverMessageStore: serverMessageSettingsStoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// used to set it so our usestate perfectly match what is in the store
export type AppDispatch = typeof store.dispatch;
// dispatch is used to type or dispatch actions

export default store;
