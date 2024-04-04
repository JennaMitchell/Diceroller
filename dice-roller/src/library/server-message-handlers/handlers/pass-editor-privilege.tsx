import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typescript-hooks";
import { userDataSettingsStoreActions } from "../../store/users-data-store";
import { serverMessageSettingsStoreActions } from "../../store/server-message-store";

const PassEditorPrivilege = () => {
  const dispatch = useAppDispatch();
  const serverMessageName = useAppSelector(
    (state) => state.serverMessageStore.serverMessageName
  );
  const username = useAppSelector((state) => state.userDataSettings.username);
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const updatedRoomEditorData = useAppSelector(
    (state) => state.serverMessageStore.updatedRoomEditorData
  );

  useEffect(() => {
    if (serverMessageName === "updatedRoomEditor") {
      if (gameRoomJoined === updatedRoomEditorData.room && gameRoomJoined) {
        if (username === updatedRoomEditorData.newEditorUsername) {
          dispatch(userDataSettingsStoreActions.setIsRoomEditor(true));
        } else {
          dispatch(userDataSettingsStoreActions.setIsRoomEditor(false));
        }
      }

      dispatch(serverMessageSettingsStoreActions.setServerMessageName(""));
      dispatch(
        serverMessageSettingsStoreActions.setUpdatedRoomEditorData({
          room: "",
          newEditorUsernam: "",
        })
      );
    }
  }, [
    dispatch,
    serverMessageName,
    gameRoomJoined,
    updatedRoomEditorData,
    username,
  ]);

  return <></>;
};
export default PassEditorPrivilege;
