import { animationSettingsStoreActions } from "../../store/animation-settings-store";

import { serverMessageSettingsStoreActions } from "../../store/server-message-store";
import { useAppDispatch, useAppSelector } from "../../store/typescript-hooks";
import { useEffect } from "react";

const DieRollServerHandler = () => {
  const dispatch = useAppDispatch();

  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );

  const serverMessageName = useAppSelector(
    (state) => state.serverMessageStore.serverMessageName
  );
  const updatedDieRollData = useAppSelector(
    (state) => state.serverMessageStore.updatedDieRollData
  );
  useEffect(() => {
    if (gameRoomJoined === updatedDieRollData.room && gameRoomJoined) {
      if (serverMessageName === "newDieRolled") {
        console.log(24);
        dispatch(
          animationSettingsStoreActions.setStartAnimation(
            updatedDieRollData.animationStarted
          )
        );
        dispatch(
          animationSettingsStoreActions.setValueRolled(
            updatedDieRollData.dieResult
          )
        );
      } else if (serverMessageName === "dieRollReset") {
        dispatch(
          animationSettingsStoreActions.setStartAnimation(
            updatedDieRollData.animationStarted
          )
        );
        dispatch(
          animationSettingsStoreActions.setValueRolled(
            updatedDieRollData.dieResult
          )
        );
        dispatch(animationSettingsStoreActions.setAnimationComplete(false));
      }

      dispatch(serverMessageSettingsStoreActions.setServerMessageName(""));
      dispatch(
        serverMessageSettingsStoreActions.setUpdatedDieRollData({
          animationStarted: false,
          dieResult: 1,
          room: "",
        })
      );
    }
  }, [dispatch, gameRoomJoined, updatedDieRollData, serverMessageName]);
  return <></>;
};
export default DieRollServerHandler;
