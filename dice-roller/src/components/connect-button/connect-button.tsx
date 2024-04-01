import classes from "./connect-button.module.css";
import socket from "../../library/socket-io-functions/socket-connection";
import { serverMessageHandler } from "../../library/functions/serverMessageHandler";
import {
  useAppDispatch,
  useAppSelector,
} from "../../library/store/typescript-hooks";
import { popupSettingsStoreActions } from "../../library/store/popup-settings-store";
const ConnectButton = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userDataSettings.username);
  const usernamePopupActive = useAppSelector(
    (state) => state.popupSettings.usernamePopupActive
  );

  const disconnectClickHandler = () => {
    if (username) {
      socket.emit("userDisconnecting", username, (response: any) => {
        serverMessageHandler(dispatch, response);
      });
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
