import UserJoinedUseEffect from "./handlers/server-user-joined";
import PassEditorPrivilege from "./handlers/pass-editor-privilege";
import UpdatedGameSetting from "./handlers/updated-game-setting";
import DieRollServerHandler from "./handlers/die-roll-server-handler";
const ServerMessageHandlersTop = () => {
  return (
    <>
      <UserJoinedUseEffect />
      <PassEditorPrivilege />
      <UpdatedGameSetting />
      <DieRollServerHandler />
    </>
  );
};
export default ServerMessageHandlersTop;
