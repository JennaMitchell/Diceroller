import classes from "./roll-button.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../library/store/typescript-hooks";
import { animationSettingsStoreActions } from "../../library/store/animation-settings-store";
import { nameSpaceListener } from "../../library/socket-io-functions/socket-connection";
import { messageType } from "../popups/server-message/server-message-popup";
import { serverMessageHandler } from "../../library/functions/serverMessageHandler";
const RollButton = () => {
  const dispatch = useAppDispatch();
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const typescriptNamespace: any = nameSpaceListener;
  const buttonHandler = () => {
    const generatedNumber = Math.floor(Math.random() * 20) + 1;

    gameRoomJoined === "/roomOne" &&
      typescriptNamespace.roomOne.emit(
        "dieRolled",
        { newAnimationStart: true, newValueRolled: generatedNumber },
        (messageResponse: messageType) => {
          serverMessageHandler(dispatch, messageResponse);
        }
      );

    gameRoomJoined === "/roomTwo" &&
      typescriptNamespace.roomTwo.emit(
        "dieRolled",
        { newAnimationStart: true, newValueRolled: generatedNumber },
        (messageResponse: messageType) => {
          serverMessageHandler(dispatch, messageResponse);
        }
      );

    dispatch(animationSettingsStoreActions.setStartAnimation(true));

    dispatch(animationSettingsStoreActions.setValueRolled(generatedNumber));
  };
  return (
    <button className={classes.rollButton} onClick={buttonHandler}>
      Roll
    </button>
  );
};
export default RollButton;
