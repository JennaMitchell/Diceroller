import classes from "./username-popup.module.css";
import lockbackgroundClasses from "../lock-background.module.css";
import { ChangeEvent } from "react";
import { useState } from "react";
import { KeyboardEvent } from "react";

import { serverMessageHandler } from "../../../library/functions/serverMessageHandler";
import { useAppDispatch } from "../../../library/store/typescript-hooks";
import socket from "../../../library/socket-io-functions/socket-connection";
import { popupSettingsStoreActions } from "../../../library/store/popup-settings-store";
import { userDataSettingsStoreActions } from "../../../library/store/users-data-store";
type responseType = {
  messageText: String;
  messageType: string;
};
const UsernamePopup = () => {
  const dispatch = useAppDispatch();
  const [enteredUsername, setEnteredUsername] = useState<string>("");

  const usernameInputOnChangeHandler = (
    inputElement: ChangeEvent<HTMLInputElement>
  ) => {
    const inputTarget = inputElement.target;
    if (inputTarget) {
      setEnteredUsername(inputTarget.value);
    }
  };

  const usernameServerHandler = () => {
    // const socketNameSpaces: any = nameSpaceListener;

    if (enteredUsername.split("").length !== 0) {
      // Username Check

      const regexPattern = new RegExp("^[A-Za-z]{3,10}$");
      console.log(enteredUsername);

      const regexPatternMet = regexPattern.test(enteredUsername);
      console.log(regexPatternMet);

      if (regexPatternMet) {
        socket.emit(
          "activeUsernameCheck",
          enteredUsername,
          (response: responseType) => {
            serverMessageHandler(dispatch, response);

            if (response.messageType === "Success") {
              dispatch(
                userDataSettingsStoreActions.setUsername(enteredUsername)
              );
              dispatch(
                popupSettingsStoreActions.setRoomSelectPopupActive(true)
              );
              dispatch(
                userDataSettingsStoreActions.setAttemptedToJoinRoom(true)
              );
              closePopup();
            }
          }
        );
      } else {
        serverMessageHandler(dispatch, {
          messageType: "Error",
          messageText: "Invalid username!",
        });
      }
    }
  };

  const usernameEnterPressedHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    const keyCode = event.key;

    if (keyCode === "Enter") {
      usernameServerHandler();
    }
  };

  const closePopup = () => {
    dispatch(popupSettingsStoreActions.setUsernameMessagePopupActive(false));
  };

  return (
    <div className={lockbackgroundClasses.blackBackground}>
      <div className={classes.mainContainer}>
        <button className={classes.closePopupButton} onClick={closePopup}>
          X
        </button>
        <label htmlFor="usernameTextInput">Username</label>
        <input
          type="text"
          id="usernameTextInput"
          onChange={usernameInputOnChangeHandler}
          onKeyDown={usernameEnterPressedHandler}
          maxLength={10}
        />
        <button
          className={classes.submitButton}
          onClick={usernameServerHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default UsernamePopup;
