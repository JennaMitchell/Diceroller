import classes from "./result-page.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../library/store/typescript-hooks";
import { animationSettingsStoreActions } from "../library/store/animation-settings-store";
const ResultPage = (props: any) => {
  const dispatch = useAppDispatch();
  const valueRolled = useAppSelector(
    (state) => state.animationSettings.valueRolled
  );

  const closeButtonHandler = () => {
    dispatch(animationSettingsStoreActions.setAnimationComplete(false));
    dispatch(animationSettingsStoreActions.setStartAnimation(false));
    dispatch(animationSettingsStoreActions.setValueRolled(1));
  };

  return (
    <div className={classes.resultPage}>
      <p>{valueRolled}</p>
      <button className={classes.closingButton} onClick={closeButtonHandler}>
        X
      </button>

      <button className={classes.rollAgainButton} onClick={closeButtonHandler}>
        Roll Again
      </button>
    </div>
  );
};
export default ResultPage;
