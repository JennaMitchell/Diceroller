import { popupSettingsStoreActions } from "../store/popup-settings-store";
export const serverMessageHandler = (dispatch: any, severMessageData: any) => {
  if (severMessageData.messageType === "Error") {
    dispatch(popupSettingsStoreActions.setServerMessagePopupActive(true));
    dispatch(
      popupSettingsStoreActions.setServerMessageText(
        severMessageData.messageText
      )
    );
    dispatch(popupSettingsStoreActions.setServerMessageType("Error"));
  } else if (severMessageData.messageType === "Success") {
    dispatch(popupSettingsStoreActions.setServerMessagePopupActive(true));
    dispatch(
      popupSettingsStoreActions.setServerMessageText(
        severMessageData.messageText
      )
    );
    dispatch(popupSettingsStoreActions.setServerMessageType("Success"));
  }
};
