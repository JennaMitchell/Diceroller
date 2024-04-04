import classes from "./result-page.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../library/store/typescript-hooks";
import { animationSettingsStoreActions } from "../../library/store/animation-settings-store";
import { nameSpaceListener } from "../../library/socket-io-functions/socket-connection";
import { messageType } from "../popups/server-message/server-message-popup";
import { serverMessageHandler } from "../../library/functions/serverMessageHandler";
const ResultPage = (props: any) => {
  const dispatch = useAppDispatch();
  const valueRolled = useAppSelector(
    (state) => state.animationSettings.valueRolled
  );
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const typescriptNamespace: any = nameSpaceListener;
  const isRoomEditor = useAppSelector(
    (state) => state.userDataSettings.isRoomEditor
  );

  const closeButtonHandler = () => {
    gameRoomJoined === "/roomOne" &&
      typescriptNamespace.roomOne.emit(
        "resetDieRoll",
        { newAnimationStart: false, newValueRolled: 1 },
        (messageResponse: messageType) => {
          serverMessageHandler(dispatch, messageResponse);
        }
      );

    gameRoomJoined === "/roomTwo" &&
      typescriptNamespace.roomTwo.emit(
        "resetDieRoll",
        { newAnimationStart: false, newValueRolled: 1 },
        (messageResponse: messageType) => {
          serverMessageHandler(dispatch, messageResponse);
        }
      );

    dispatch(animationSettingsStoreActions.setAnimationComplete(false));
    dispatch(animationSettingsStoreActions.setStartAnimation(false));
    dispatch(animationSettingsStoreActions.setValueRolled(1));
  };

  return (
    <div className={classes.resultPage}>
      <p>{valueRolled}</p>
      {isRoomEditor && (
        <button className={classes.closingButton} onClick={closeButtonHandler}>
          X
        </button>
      )}

      {isRoomEditor && (
        <button
          className={classes.rollAgainButton}
          onClick={closeButtonHandler}
        >
          Roll Again
        </button>
      )}
    </div>
  );
};
export default ResultPage;
