import { animationSettingsStoreActions } from "../../store/animation-settings-store";
import { meshSettingsStoreActions } from "../../store/mesh-settings-store";
import { serverMessageSettingsStoreActions } from "../../store/server-message-store";
import { useAppDispatch, useAppSelector } from "../../store/typescript-hooks";
import { useEffect } from "react";

const UpdatedGameSetting = () => {
  const dispatch = useAppDispatch();
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const serverMessageName = useAppSelector(
    (state) => state.serverMessageStore.serverMessageName
  );
  const updatedGameSettingsData = useAppSelector(
    (state) => state.serverMessageStore.updatedGameSettingsData
  );

  useEffect(() => {
    if (
      gameRoomJoined === updatedGameSettingsData.room &&
      serverMessageName === "updatedGameSetting" &&
      gameRoomJoined
    ) {
      switch (updatedGameSettingsData.variableName) {
        case "animationDirection":
          dispatch(
            animationSettingsStoreActions.setAnimationDirection(
              updatedGameSettingsData.variableValue
            )
          );
          break;
        case "meshScale":
          dispatch(
            meshSettingsStoreActions.setScale(
              updatedGameSettingsData.variableValue
            )
          );
          break;

        case "meshTextColorIntensity":
          dispatch(
            meshSettingsStoreActions.setTextColorIntensity(
              updatedGameSettingsData.variableValue
            )
          );
          break;

        case "meshTextColor":
          dispatch(
            meshSettingsStoreActions.setTextColor(
              updatedGameSettingsData.variableValue
            )
          );
          break;
        case "meshColorIntensity":
          dispatch(
            meshSettingsStoreActions.setMeshColorIntensity(
              updatedGameSettingsData.variableValue
            )
          );
          break;
        case "meshColor":
          dispatch(
            meshSettingsStoreActions.setMeshColor(
              updatedGameSettingsData.variableValue
            )
          );
          break;
      }

      dispatch(serverMessageSettingsStoreActions.setServerMessageName(""));
      dispatch(
        serverMessageSettingsStoreActions.setUpdatedGameSettingsData({
          variableName: "",
          room: "",
          variableValue: "",
        })
      );
    }
  }, [dispatch, serverMessageName, gameRoomJoined, updatedGameSettingsData]);

  return <></>;
};
export default UpdatedGameSetting;
