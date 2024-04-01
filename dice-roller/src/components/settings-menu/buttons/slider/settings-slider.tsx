import { meshSettingsStoreActions } from "../../../../library/store/mesh-settings-store";
import { useAppDispatch } from "../../../../library/store/typescript-hooks";
import classes from "./settings-slider.module.css";
import { useRef, useState } from "react";
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

  const settingSliderInputHandler = () => {
    const possibleNullRef = inputRef.current;
    if (possibleNullRef) {
      const inputRef = possibleNullRef;
      const inputValue = inputRef.value;

      if (storeValueSet === "scale") {
        dispatch(meshSettingsStoreActions.setScale(+inputValue));
      } else if (storeValueSet === "MeshColorIntensity") {
        dispatch(meshSettingsStoreActions.setMeshColorIntensity(+inputValue));
      } else if (storeValueSet === "MeshTextColorIntensity") {
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
