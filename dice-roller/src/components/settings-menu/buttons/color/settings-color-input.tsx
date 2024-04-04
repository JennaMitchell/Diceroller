import { useRef, useState } from "react";
import classes from "./settings-color-input.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../library/store/typescript-hooks";
import { meshSettingsStoreActions } from "../../../../library/store/mesh-settings-store";
import { KeyboardEvent } from "react";

import { nameSpaceListener } from "../../../../library/socket-io-functions/socket-connection";
import { messageType } from "../../../popups/server-message/server-message-popup";
import { serverMessageHandler } from "../../../../library/functions/serverMessageHandler";

type SettingsColorInputPropsType = {
  name: string;
  storeValueSet: string;
  currentValue: string;
};

const SettingsColorInput = ({
  name,
  currentValue,
  storeValueSet,
}: SettingsColorInputPropsType) => {
  const colorInputRef = useRef<null | HTMLInputElement>(null);
  const colorTextInputRef = useRef<null | HTMLInputElement>(null);
  const [currentColorValue, setCurrentColorValue] = useState(currentValue);
  const dispatch = useAppDispatch();
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const typescriptNamespace: any = nameSpaceListener;

  const updateStoreValues = (value: string) => {
    if (storeValueSet === "MeshColor") {
      dispatch(meshSettingsStoreActions.setMeshColor(value));
      gameRoomJoined === "/roomOne" &&
        typescriptNamespace.roomOne.emit(
          "updateMeshColor",
          value,
          (messageResponse: messageType) => {
            serverMessageHandler(dispatch, messageResponse);
          }
        );
      gameRoomJoined === "/roomTwo" &&
        typescriptNamespace.roomTwo.emit(
          "updateMeshColor",
          value,
          (messageResponse: messageType) => {
            serverMessageHandler(dispatch, messageResponse);
          }
        );
    }
    if (storeValueSet === "MeshTextColor") {
      dispatch(meshSettingsStoreActions.setTextColor(value));
      gameRoomJoined === "/roomOne" &&
        typescriptNamespace.roomOne.emit(
          "updateMeshTextColor",
          value,
          (messageResponse: messageType) => {
            serverMessageHandler(dispatch, messageResponse);
          }
        );
      gameRoomJoined === "/roomTwo" &&
        typescriptNamespace.roomTwo.emit(
          "updateMeshTextColor",
          value,
          (messageResponse: messageType) => {
            serverMessageHandler(dispatch, messageResponse);
          }
        );
    }
  };

  const colorInputChangeHandler = () => {
    const possibleNullColorInputRef = colorInputRef.current;
    const possibleNullTextInput = colorTextInputRef.current;

    if (possibleNullColorInputRef && possibleNullTextInput) {
      const notNullColorInputRef = possibleNullColorInputRef;
      const refValue = notNullColorInputRef.value;

      const notNullTextInput = possibleNullTextInput;

      updateStoreValues(refValue);
      setCurrentColorValue(refValue);

      notNullTextInput.value = refValue;
    }
  };

  const colorTextInputChangeHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    const keyPressed = event.key;
    const possibleNullColorInputRef = colorInputRef.current;
    const possibleNullTextInput = colorTextInputRef.current;

    if (keyPressed === "Enter") {
      if (possibleNullColorInputRef && possibleNullTextInput) {
        const notNullTextColorInput = possibleNullTextInput;
        const notNullColorInputRef = possibleNullColorInputRef;
        let textInputValue = notNullTextColorInput.value;

        if (textInputValue.length <= 4) {
          if (textInputValue.substring(0, 1) === "#") {
            const repeatedString = textInputValue.substring(
              1,
              textInputValue.length
            );
            if (repeatedString.length === 3) {
              textInputValue = "#" + repeatedString + repeatedString;
            }
          }
        }

        updateStoreValues(textInputValue);
        setCurrentColorValue(textInputValue);
        notNullColorInputRef.value = textInputValue;
        notNullTextColorInput.blur();
      }
    }
  };
  //   const colorTextInputBlurHandler = () => {
  //     const possibleNullRef = colorTextInputRef.current;

  //     if (possibleNullRef) {
  //       const notNullRef = possibleNullRef;
  //       const refValue = notNullRef.value;
  //       dispatch(meshSettingsStoreActions.setMeshColor(refValue));
  //       setCurrentColorValue(refValue);
  //       //   notNullRef.blur();
  //     }
  //   };

  return (
    <div className={classes.settingsColorButtonContainer}>
      <label htmlFor={`settings-${storeValueSet}-${name}`}>{name}</label>
      <div>
        <input
          type="color"
          id="result-color"
          name="color-hexCode-"
          value={`${currentValue}`}
          className={classes.settingsColorInput}
          onChange={colorInputChangeHandler}
          ref={colorInputRef}
        />
        <label
          className={classes.settingsColorTextInputLabel}
          htmlFor={`settings-${storeValueSet}-${name}-text-input`}
        >
          Text Input
        </label>
        <input
          defaultValue={`${currentColorValue}`}
          type="text"
          id={`settings-${storeValueSet}-${name}-text-input`}
          className={classes.settingsColorTextInput}
          ref={colorTextInputRef}
          onKeyUp={colorTextInputChangeHandler}
        />
      </div>
    </div>
  );
};
export default SettingsColorInput;
