import classes from "./connect-button.module.css";
import socket from "../../library/socket-io-functions/socket-connection";
import { serverMessageHandler } from "../../library/functions/serverMessageHandler";
import {
  useAppDispatch,
  useAppSelector,
} from "../../library/store/typescript-hooks";
import { popupSettingsStoreActions } from "../../library/store/popup-settings-store";
import { userDataSettingsStoreActions } from "../../library/store/users-data-store";
const ConnectButton = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userDataSettings.username);
  const usernamePopupActive = useAppSelector(
    (state) => state.popupSettings.usernamePopupActive
  );

  const disconnectClickHandler = () => {
    if (username) {
      socket.emit(
        "userDisconnecting",
        username,
        (response: { messageType: string; messageText: string }) => {
          if (response.messageType === "Success") {
            dispatch(userDataSettingsStoreActions.setGameRoomJoined(""));
            dispatch(userDataSettingsStoreActions.setIsRoomEditor(false));
            dispatch(userDataSettingsStoreActions.setUsername(""));
            dispatch(
              userDataSettingsStoreActions.setAttemptedToJoinRoom(false)
            );
          }
          serverMessageHandler(dispatch, response);
        }
      );
    } else {
      dispatch(popupSettingsStoreActions.setUsernameMessagePopupActive(true));
    }
  };

  return (
    <button
      className={`${classes.connectButton} ${
        usernamePopupActive && classes.hideConnectButton
      }`}
      onClick={disconnectClickHandler}
    >
      {username ? "Disconnect" : "Connect"}
    </button>
  );
};
export default ConnectButton;
