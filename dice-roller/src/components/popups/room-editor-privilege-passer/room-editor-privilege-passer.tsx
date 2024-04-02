import {
  useAppDispatch,
  useAppSelector,
} from "../../../library/store/typescript-hooks";
import classes from "./room-editor-privilege-passer.module.css";

import blackbackgroundClasses from "../lock-background.module.css";
import { popupSettingsStoreActions } from "../../../library/store/popup-settings-store";
import { useState } from "react";
import { nameSpaceListener } from "../../../library/socket-io-functions/socket-connection";
import { serverMessageHandler } from "../../../library/functions/serverMessageHandler";

const RoomEditorPrivilegePasser = () => {
  const roomEditorPribilegePasserPopupActive = useAppSelector(
    (state) => state.popupSettings.roomEditorPrivilegePasserPopupActive
  );
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const username = useAppSelector((state) => state.userDataSettings.username);
  const dispatch = useAppDispatch();

  const [listofUsersInRoom, setListofUsersInRoom] = useState<string[]>([]);

  const enablePopupHandler = () => {
    const socketNameSpaces: any = nameSpaceListener;
    dispatch(
      popupSettingsStoreActions.setRoomEditorPrivilegePasserPopupActive(true)
    );

    if (gameRoomJoined === "/roomOne") {
      socketNameSpaces.roomOne.emit(
        "listOfUsersInRoomRequest",
        (response: string[]) => {
          setListofUsersInRoom(response);
        }
      );
    } else if (gameRoomJoined === "/roomTwo") {
      socketNameSpaces.roomTwo.emit(
        "listOfUsersInRoomRequest",
        (response: string[]) => {
          setListofUsersInRoom(response);
        }
      );
    }
  };

  const passButtonHandler = (usernameToPassTo: string) => {
    const socketNameSpaces: any = nameSpaceListener;

    if (username !== usernameToPassTo) {
      if (gameRoomJoined === "/roomOne") {
        socketNameSpaces.roomOne.emit(
          "updateRoomEditor",
          usernameToPassTo,
          (response: { messageType: string; messageText: string }) => {
            if (response.messageType === "Success") {
              dispatch(
                popupSettingsStoreActions.setRoomEditorPrivilegePasserPopupActive(
                  false
                )
              );
            }

            serverMessageHandler(dispatch, response);
          }
        );
      } else if (gameRoomJoined === "/roomTwo") {
        socketNameSpaces.roomTwo.emit(
          "updateRoomEditor",
          usernameToPassTo,
          (response: { messageType: string; messageText: string }) => {
            if (response.messageType === "Success") {
              dispatch(
                popupSettingsStoreActions.setRoomEditorPrivilegePasserPopupActive(
                  false
                )
              );
            }
            serverMessageHandler(dispatch, response);
          }
        );
      }
    }
  };
  const closingButtonHandler = () => {
    dispatch(
      popupSettingsStoreActions.setRoomEditorPrivilegePasserPopupActive(false)
    );
  };

  return (
    <>
      <button
        className={classes.popupEnableButton}
        onClick={enablePopupHandler}
      >
        Pass Editor <br></br>Privilege
      </button>
      {roomEditorPribilegePasserPopupActive && (
        <div className={blackbackgroundClasses.blackBackground}>
          <div className={classes.popupMainContainer}>
            <button
              className={classes.closingButton}
              onClick={closingButtonHandler}
            >
              X
            </button>
            <p className={classes.popupTitle}>Pass Editor Privilege</p>
            <div className={classes.popupSubWindow}>
              {listofUsersInRoom.map((usernameFromList) => {
                return (
                  <>
                    {username !== usernameFromList && (
                      <div
                        className={classes.usernameToPassToContainer}
                        key={`username-to-pass-to-${username}`}
                      >
                        <p>{username}</p>
                        <button
                          onClick={() => {
                            passButtonHandler(usernameFromList);
                          }}
                        >
                          Pass
                        </button>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RoomEditorPrivilegePasser;
