import { meshSettingsStoreActions } from "../../../../library/store/mesh-settings-store";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../library/store/typescript-hooks";
import classes from "./settings-slider.module.css";
import { nameSpaceListener } from "../../../../library/socket-io-functions/socket-connection";
import { useRef, useState } from "react";
import { messageType } from "../../../popups/server-message/server-message-popup";
import { serverMessageHandler } from "../../../../library/functions/serverMessageHandler";
type SettingsInputPropsType = {
  name: string;
  min: number;
  max: number;
  storeValueSet: string;
  currentValue: number;
  step: number;
};

const SettingsSliderInput = ({
  name,
  min,
  max,
  storeValueSet,
  currentValue,
  step,
}: SettingsInputPropsType) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<null | HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(currentValue);
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const typescriptNamespace: any = nameSpaceListener;

  const settingSliderInputHandler = () => {
    const possibleNullRef = inputRef.current;
    if (possibleNullRef) {
      const inputRef = possibleNullRef;
      const inputValue = inputRef.value;

      if (storeValueSet === "scale") {
        gameRoomJoined === "/roomOne" &&
          typescriptNamespace.roomOne.emit(
            "meshScale",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        gameRoomJoined === "/roomTwo" &&
          typescriptNamespace.roomTwo.emit(
            "meshScale",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        dispatch(meshSettingsStoreActions.setScale(+inputValue));
      } else if (storeValueSet === "MeshColorIntensity") {
        gameRoomJoined === "/roomOne" &&
          typescriptNamespace.roomOne.emit(
            "updateMeshColorIntensity",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        gameRoomJoined === "/roomTwo" &&
          typescriptNamespace.roomTwo.emit(
            "updateMeshColorIntensity",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        dispatch(meshSettingsStoreActions.setMeshColorIntensity(+inputValue));
      } else if (storeValueSet === "MeshTextColorIntensity") {
        gameRoomJoined === "/roomOne" &&
          typescriptNamespace.roomOne.emit(
            "updateMeshTextColorIntensity",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        gameRoomJoined === "/roomTwo" &&
          typescriptNamespace.roomTwo.emit(
            "updateMeshTextColorIntensity",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        dispatch(meshSettingsStoreActions.setTextColorIntensity(+inputValue));
      }
      setInputValue(+inputValue);
    }
  };

  return (
    <div className={classes.settingsSliderButtonContainer}>
      <label htmlFor={`settings-${storeValueSet}-${name}`}>{name}</label>
      <div>
        <input
          type="range"
          id={`settings-${storeValueSet}-${name}`}
          min={min}
          max={max}
          ref={inputRef}
          value={currentValue}
          onChange={settingSliderInputHandler}
          step={step}
        />
        <p>{inputValue}</p>
      </div>
    </div>
  );
};
export default SettingsSliderInput;
