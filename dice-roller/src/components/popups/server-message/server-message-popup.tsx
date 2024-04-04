import { popupSettingsStoreActions } from "../../../library/store/popup-settings-store";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../library/store/typescript-hooks";
import classes from "./server-message-popup.module.css";

export type messageType = {
  messageType: string;
  messageText: string;
};
const ServerMessagePopup = () => {
  const dispatch = useAppDispatch();
  const serverMessageText = useAppSelector(
    (state) => state.popupSettings.serverMessageText
  );
  const serverMessageType = useAppSelector(
    (state) => state.popupSettings.serverMessageType
  );

  const closingButtonHandler = () => {
    dispatch(popupSettingsStoreActions.setServerMessagePopupActive(false));
    dispatch(popupSettingsStoreActions.setServerMessageText(""));
    dispatch(popupSettingsStoreActions.setServerMessageType(""));
  };

  return (
    <div
      className={`${classes.serverMessagePopupContainer} ${
        serverMessageType === "Error" && classes.serverMessageError
      } ${serverMessageType === "Success" && classes.serverMessageSuccess}`}
    >
      <p>{serverMessageText}</p>
      <button onClick={closingButtonHandler}>X</button>
    </div>
  );
};
export default ServerMessagePopup;
