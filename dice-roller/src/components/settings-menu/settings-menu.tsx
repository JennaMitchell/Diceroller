import classes from "./settings-menu.module.css";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import SettingsSliderInput from "./buttons/slider/settings-slider";
import SettingsColorInput from "./buttons/color/settings-color-input";
import { useAppSelector } from "../../library/store/typescript-hooks";
import { useState, useRef } from "react";

import DropDownInput from "./buttons/drop-down/drop-down-input";
const SettingsMenu = () => {
  // const SettingsMenuSections = ["Scale", "Color", "Animation"];
  const settingsWindowRef = useRef<null | HTMLDivElement>(null);
  const [settingsWindowPosition, setSettingsWindowPosition] = useState({
    top: 100,
    left: 100,
  });
  const [dragActive, setDragActive] = useState(false);

  const currentScale = useAppSelector((state) => state.meshSettings.scale);
  const currentMeshColorIntensity = useAppSelector(
    (state) => state.meshSettings.meshColorIntensity
  );
  const currentMeshColor = useAppSelector(
    (state) => state.meshSettings.meshColor
  );
  const currentTextColor = useAppSelector(
    (state) => state.meshSettings.textColor
  );
  const currentTextColorIntensity = useAppSelector(
    (state) => state.meshSettings.textColorIntensity
  );

  const currentAnimationDirection = useAppSelector(
    (state) => state.animationSettings.animationDirection
  );
  const [hideAllDropDowns, setHideAllDropDowns] = useState(false);
  const [scaleDropDownActive, setScaleDropDownActive] = useState(false);
  const [colorDropDownActive, setColorDropDownActive] = useState(false);
  const [animationDropDownActive, setAnimationDropDownActive] = useState(false);

  const SettingsMenuSubData = {
    Scale: {
      buttons: [
        {
          name: "Scale",
          min: 0.1,
          max: 10,
          step: 0.1,
          storeValueSet: "scale",
          currentValue: currentScale,
        },
      ],
    },
    Color: {
      meshColor: {
        name: "Mesh Color",
        storeValueSet: "MeshColor",
        currentValue: currentMeshColor,
      },
      meshColorIntensity: {
        name: "Intensity",
        min: 0,
        max: 1,
        step: 0.1,
        storeValueSet: "MeshColorIntensity",
        currentValue: currentMeshColorIntensity,
      },
      textColor: {
        name: "Text Color",
        storeValueSet: "MeshTextColor",
        currentValue: currentTextColor,
      },
      textColorIntensity: {
        name: "Text Intensity",
        min: 0,
        max: 1,
        step: 0.1,
        storeValueSet: "MeshTextIntensity",
        currentValue: currentTextColorIntensity,
      },
    },
    Animation: {
      direction: {
        storeValueSet: "AnimationDirection",
        dropDownOptions: ["Left", "Right", "Up", "Down"],
        currentValue: currentAnimationDirection,
        name: "Direction",
      },
    },
  };

  const dragEndHandler = (event: any) => {
    const possibleNullRef = settingsWindowRef.current;
    event.preventDefault();
    if (possibleNullRef) {
      const settingMenuWidth = possibleNullRef.offsetHeight;

      setSettingsWindowPosition({
        top: event.clientY - 10,
        left: event.clientX - settingMenuWidth,
      });
    }
  };

  // useEffect(() => {
  //   const updateMousePosition = (event: MouseEvent) => {
  //     console.log(`X:${event.clientX} | Y: ${event.clientY}`);
  //     // setMousePosition({ x: event.clientX, y: event.clientY });
  //   };
  //   window.addEventListener("mouseup", updateMousePosition);
  //   window.addEventListener("mousedown", updateMousePosition);
  //   return () => {
  //     window.removeEventListener("mouseup", updateMousePosition);
  //     window.addEventListener("mousedown", updateMousePosition);
  //   };
  // }, []);

  return (
    <div
      className={classes.settingsTopContainer}
      ref={settingsWindowRef}
      onDragEnd={dragEndHandler}
      draggable={dragActive}
      style={{
        left: `${settingsWindowPosition.left}px`,
        top: `${settingsWindowPosition.top}px`,
      }}
    >
      <div className={classes.buttonBar}>
        <button onClick={() => setHideAllDropDowns(!hideAllDropDowns)}>
          {hideAllDropDowns ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </button>
        <button
          onMouseDown={() => setDragActive(true)}
          onMouseUp={() => {
            setDragActive(false);
          }}
        >
          <EllipsisHorizontalIcon />
        </button>
        <button>
          <MagnifyingGlassCircleIcon />
        </button>
      </div>

      {!hideAllDropDowns && (
        <div className={classes.settingsContainer}>
          <div className={classes.settingsSection}>
            <div
              className={classes.settingHeaderBar}
              onClick={() => setScaleDropDownActive(!scaleDropDownActive)}
            >
              <button
                onClick={() => setScaleDropDownActive(!scaleDropDownActive)}
              >
                {scaleDropDownActive ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
              <p>Scale</p>
            </div>
            {scaleDropDownActive && (
              <SettingsSliderInput {...SettingsMenuSubData.Scale.buttons[0]} />
            )}

            {scaleDropDownActive && (
              <div className={classes.settingsSectionLineSeperator} />
            )}
          </div>
          <div className={classes.settingsSection}>
            <div
              className={classes.settingHeaderBar}
              onClick={() => setColorDropDownActive(!colorDropDownActive)}
            >
              <button
                onClick={() => setColorDropDownActive(!colorDropDownActive)}
              >
                {colorDropDownActive ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
              <p>Color</p>
            </div>
            {colorDropDownActive && (
              <SettingsColorInput {...SettingsMenuSubData.Color.meshColor} />
            )}

            {colorDropDownActive && (
              <SettingsColorInput {...SettingsMenuSubData.Color.textColor} />
            )}

            {colorDropDownActive && (
              <div className={classes.settingsSectionLineSeperator} />
            )}
          </div>
          <div className={classes.settingsSection}>
            <div
              className={classes.settingHeaderBar}
              onClick={() =>
                setAnimationDropDownActive(!animationDropDownActive)
              }
            >
              <button
                onClick={() =>
                  setAnimationDropDownActive(!animationDropDownActive)
                }
              >
                {animationDropDownActive ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronUpIcon />
                )}
              </button>
              <p>Animation</p>
            </div>
            {animationDropDownActive && (
              <DropDownInput {...SettingsMenuSubData.Animation.direction} />
            )}
            {animationDropDownActive && (
              <div className={classes.settingsSectionLineSeperator} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default SettingsMenu;
