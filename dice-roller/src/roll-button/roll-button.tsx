import classes from "./roll-button.module.css";
import { useAppDispatch } from "../library/store/typescript-hooks";
import { animationSettingsStoreActions } from "../library/store/animation-settings-store";
const RollButton = () => {
  const dispatch = useAppDispatch();
  const buttonHandler = () => {
    dispatch(animationSettingsStoreActions.setStartAnimation(true));

    const generatedNumber = Math.floor(Math.random() * 20) + 1;
    dispatch(animationSettingsStoreActions.setValueRolled(generatedNumber));
  };
  return (
    <button className={classes.rollButton} onClick={buttonHandler}>
      Roll
    </button>
  );
};
export default RollButton;
