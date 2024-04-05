import { meshSettingsStoreActions } from "../../../../library/store/mesh-settings-store";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../library/store/typescript-hooks";
import classes from "./settings-slider.module.css";
import { nameSpaceListener } from "../../../../library/socket-io-functions/socket-connection";
import { useMemo, useRef, useState } from "react";
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

  const [
    savedName,
    savedMin,
    savedMax,
    sliderType,
    savedCurrentValue,
    savedStep,
  ] = useMemo(() => {
    return [name, min, max, storeValueSet, currentValue, step];
  }, []);

  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const typescriptNamespace: any = nameSpaceListener;

  const settingSliderInputHandler = () => {
    const possibleNullRef = inputRef.current;
    if (possibleNullRef) {
      const inputRef = possibleNullRef;
      const inputValue = inputRef.value;

      if (sliderType === "scale") {
        if (gameRoomJoined === "/roomOne") {
          typescriptNamespace.roomOne.emit(
            "updateMeshScale",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        }
        gameRoomJoined === "/roomTwo" &&
          typescriptNamespace.roomTwo.emit(
            "updateMeshScale",
            +inputValue,
            (messageResponse: messageType) => {
              serverMessageHandler(dispatch, messageResponse);
            }
          );
        dispatch(meshSettingsStoreActions.setScale(+inputValue));
      } else if (sliderType === "MeshColorIntensity") {
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
      } else if (sliderType === "MeshTextColorIntensity") {
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
      <label htmlFor={`settings-${storeValueSet}-${savedName}`}>
        {savedName}
      </label>
      <div>
        <input
          type="range"
          id={`settings-${sliderType}-${savedName}`}
          min={savedMin}
          max={savedMax}
          ref={inputRef}
          onChange={settingSliderInputHandler}
          step={savedStep}
        />
        <p>{inputValue}</p>
      </div>
    </div>
  );
};
export default SettingsSliderInput;
