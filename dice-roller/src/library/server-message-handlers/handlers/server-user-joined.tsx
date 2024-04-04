import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typescript-hooks";
import { userDataSettingsStoreActions } from "../../store/users-data-store";
import { popupSettingsStoreActions } from "../../store/popup-settings-store";
import { serverMessageSettingsStoreActions } from "../../store/server-message-store";

const UserJoinedUseEffect = () => {
  const dispatch = useAppDispatch();

  const serverMessageName = useAppSelector(
    (state) => state.serverMessageStore.serverMessageName
  );
  const userJoinedData = useAppSelector(
    (state) => state.serverMessageStore.userJoinedData
  );
  const username = useAppSelector((state) => state.userDataSettings.username);
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const attemptedToJoinRoom = useAppSelector(
    (state) => state.userDataSettings.attemptedToJoinRoom
  );

  // Use Effect to Handle userLogin Request

  useEffect(() => {
    if (serverMessageName === "userJoined") {
      if (
        userJoinedData.usernameThatJoined === username &&
        !gameRoomJoined &&
        attemptedToJoinRoom
      ) {
        userJoinedData.isFirstUser &&
          dispatch(userDataSettingsStoreActions.setIsRoomEditor(true));
        userJoinedData.gameRoomJoined &&
          dispatch(
            userDataSettingsStoreActions.setGameRoomJoined(
              userJoinedData.gameRoomJoined
            )
          );
      } else if (
        userJoinedData.usernameThatJoined !== username &&
        gameRoomJoined === userJoinedData.gameRoomJoined &&
        attemptedToJoinRoom
      ) {
        dispatch(popupSettingsStoreActions.setServerMessagePopupActive(true));
        dispatch(
          popupSettingsStoreActions.setServerMessageText(
            `${userJoinedData.usernameThatJoined} has joined the room.`
          )
        );
      }

      dispatch(serverMessageSettingsStoreActions.setServerMessageName(""));
      dispatch(
        serverMessageSettingsStoreActions.setUserJoinedData({
          usernameThatJoined: "",
          gameRoomJoined: "",
          isFirstUser: false,
        })
      );
    }
  }, [
    dispatch,
    serverMessageName,
    username,
    userJoinedData,
    attemptedToJoinRoom,
    gameRoomJoined,
  ]);

  return <></>;
};
export default UserJoinedUseEffect;
