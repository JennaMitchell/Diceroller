import { animationSettingsStoreActions } from "../../../../library/store/animation-settings-store";
import { useAppDispatch } from "../../../../library/store/typescript-hooks";
import classes from "./drop-down-input.module.css";
import { useRef, useState } from "react";
type DropDownProps = {
  dropDownOptions: string[];
  storeValueSet: string;
  currentValue: string;
  name: string;
};

const DropDownInput = ({
  dropDownOptions,
  storeValueSet,
  currentValue,
  name,
}: DropDownProps) => {
  const dropDownRef = useRef<null | HTMLSelectElement>(null);
  const [dropDownValue, setDropDownValue] = useState(currentValue);
  const dispatch = useAppDispatch();

  const selectChangeHandler = () => {
    const possibleNullDropDown = dropDownRef.current;

    if (possibleNullDropDown) {
      const notNullRef = possibleNullDropDown;
      const selectedValue = notNullRef.value;
      if (storeValueSet === "AnimationDirection") {
        dispatch(
          animationSettingsStoreActions.setAnimationDirection(selectedValue)
        );
      }
      setDropDownValue(selectedValue);
    }
  };

  return (
    <div className={classes.dropDownInputContainer}>
      <label htmlFor={`drop-down-${storeValueSet}`}>{name}</label>
      <select
        id={`drop-down-${storeValueSet}`}
        ref={dropDownRef}
        onChange={selectChangeHandler}
        value={dropDownValue}
      >
        {dropDownOptions.map((value, index) => (
          <option value={value} key={`${storeValueSet}-${value}-${index}`}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropDownInput;
