import classes from "./room-selection.module.css";
import lockClasses from "../lock-background.module.css";
import { useState, useEffect, useCallback } from "react";

import { nameSpaceListener } from "../../../library/socket-io-functions/socket-connection";
import { serverMessageHandler } from "../../../library/functions/serverMessageHandler";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../library/store/typescript-hooks";
import { popupSettingsStoreActions } from "../../../library/store/popup-settings-store";
import socket from "../../../library/socket-io-functions/socket-connection";

type responseType = {
  messageText: String;
  messageType: string;
};
const RoomSelection = () => {
  const [roomSelectionPopupActive, setRoomSelectionPopupActive] =
    useState(true);
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userDataSettings.username);
  const roomSelectPopupUpdateActiveUsers = useAppSelector(
    (state) => state.popupSettings.roomSelectPopupUpdateActiveUsers
  );

  const [usersInRoomOne, setUsersInRoomOne] = useState(-1);
  const [usersInRoomTwo, setUsersInRoomTwo] = useState(-1);

  const closePopupHandler = () => {
    socket.emit("userDisconnecting", username);
    dispatch(popupSettingsStoreActions.setRoomSelectPopupActive(false));
    serverMessageHandler(dispatch, {
      messageText: "Disconnected: Please Login Again",
      messageType: "Error",
    });
  };

  // Used to get the number of users in each room

  const numberOfUsersRetriever = useCallback(async () => {
    const socketNameSpaces: any = nameSpaceListener;
    try {
      await socketNameSpaces.roomOne.emit(
        "numberOfUsersRequest",
        (response: number) => {
          setUsersInRoomOne(+response);
        }
      );

      await socketNameSpaces.roomTwo.emit(
        "numberOfUsersRequest",
        (response: number) => {
          setUsersInRoomTwo(+response);
        }
      );
    } catch (err) {
      serverMessageHandler(dispatch, {
        messageText: "Local Server Error",
        messageType: "Error",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (roomSelectPopupUpdateActiveUsers) {
      numberOfUsersRetriever();
      dispatch(
        popupSettingsStoreActions.setRoomSelectPopupUpdateActiveUsers(false)
      );
    }
  }, [roomSelectPopupUpdateActiveUsers, numberOfUsersRetriever, dispatch]);

  useEffect(() => {
    numberOfUsersRetriever();
  }, [numberOfUsersRetriever]);

  const joinRoomButtonHandler = (room: string) => {
    const socketNameSpaces: any = nameSpaceListener;

    if (room === "one") {
      socketNameSpaces.roomOne.emit(
        "playerJoining",
        username,
        (response: responseType) => {
          serverMessageHandler(dispatch, response);

          if (response.messageType === "Success") {
            dispatch(popupSettingsStoreActions.setRoomSelectPopupActive(false));
          }
        }
      );
    } else if (room === "two") {
      socketNameSpaces.roomTwo.emit(
        "playerJoining",
        username,
        (response: responseType) => {
          serverMessageHandler(dispatch, response);
          if (response.messageType === "Success") {
            dispatch(popupSettingsStoreActions.setRoomSelectPopupActive(false));
          }
        }
      );
    }
  };

  return (
    <>
      <button
        className={`${classes.roomSelectionPopupButton} ${
          roomSelectionPopupActive && classes.roomSelectionPopupButtonActive
        }`}
        onClick={() => setRoomSelectionPopupActive(!roomSelectionPopupActive)}
      >
        Room <br></br> Selection
      </button>
      {roomSelectionPopupActive && (
        <div className={lockClasses.blackBackground}>
          <div className={classes.roomSelectionMainContainer}>
            <button
              className={classes.closingButton}
              onClick={closePopupHandler}
            >
              X
            </button>
            <p>Room Selection</p>

            <div className={classes.roomSelectionWindow}>
              <div className={classes.columnHeadings}>
                <p>Room ID</p>
                <p> Players</p>
              </div>
              <div className={classes.roomInfoContainer}>
                <p>Room 1</p>
                <p>{usersInRoomOne}/2</p>
                <button
                  className={classes.joinRoomButton}
                  onClick={() => joinRoomButtonHandler("one")}
                >
                  Join
                </button>
              </div>
              <div className={classes.roomInfoContainer}>
                <p>Room 2</p>
                <p>{usersInRoomTwo}/2</p>
                <button
                  className={classes.joinRoomButton}
                  onClick={() => joinRoomButtonHandler("two")}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RoomSelection;
