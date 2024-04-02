import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { D20 } from "./library/assets/3d-models/d20";

import ResultPage from "./components/result-page/result-page";
import RollButton from "./components/roll-button/roll-button";
import {
  useAppDispatch,
  useAppSelector,
} from "./library/store/typescript-hooks";
import SettingsMenu from "./components/settings-menu/settings-menu";
import RoomSelection from "./components/popups/room-selection/room-selection";
import socket from "./library/socket-io-functions/socket-connection";
import { useEffect, useState } from "react";
import ErrorMessagePopup from "./components/popups/server-message/server-message-popup";
import DisconnectButton from "./components/connect-button/connect-button";
import UsernamePopup from "./components/popups/username/username-popup";
import { nameSpaceListener } from "./library/socket-io-functions/socket-connection";
import { userDataSettingsStoreActions } from "./library/store/users-data-store";
import { serverMessageHandler } from "./library/functions/serverMessageHandler";
import { popupSettingsStoreActions } from "./library/store/popup-settings-store";
import RoomEditorPrivilegePasser from "./components/popups/room-editor-privilege-passer/room-editor-privilege-passer";
// Importing Models with gltfjsx

// npx gltfjsx public/models/name.glb -o src/library/assets/3d-models/name.jsx -r public

// npx so you don't have to install package
// -0 location of file
// - r root directory

// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener("resize", updateSize);
//     updateSize();
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);
//   return size;
// }

export default function App() {
  const diceData = {
    meshColor: useAppSelector((state) => state.meshSettings.meshColor),
    meshHoverColor: useAppSelector(
      (state) => state.meshSettings.meshHoverColor
    ),

    textColor: useAppSelector((state) => state.meshSettings.textColor),

    scale: useAppSelector((state) => state.meshSettings.scale),
    animationDirection: useAppSelector(
      (state) => state.animationSettings.animationDirection
    ),
  };
  const serverMessagePopupActive = useAppSelector(
    (state) => state.popupSettings.serverMessagePopupActive
  );
  const usernamePopupActive = useAppSelector(
    (state) => state.popupSettings.usernamePopupActive
  );
  const username = useAppSelector((state) => state.userDataSettings.username);
  const roomSelectionPopupActive = useAppSelector(
    (state) => state.popupSettings.roomSelectPopupActive
  );
  const gameRoomJoined = useAppSelector(
    (state) => state.userDataSettings.gameRoomJoined
  );
  const isRoomEditor = useAppSelector(
    (state) => state.userDataSettings.isRoomEditor
  );
  const [listeners, setListeners] = useState<{
    leaveRoom: any[];
    userJoined: any[];
    updateRoomEditor: any[];
  }>({ leaveRoom: [], userJoined: [], updateRoomEditor: [] });

  const dispatch = useAppDispatch();

  useEffect(() => {
    //listen for perfData

    socket.on("connection", (data: any) => {
      console.log("Connected");
    });

    socket.on("sendingRoomData", async (data) => {
      const newListenersObject = { ...listeners };
      for (let i = 0; i < data.roomData.length; i++) {
        const typescriptNameSpace: any = nameSpaceListener;
        // if the connectionis new this variable will be null
        // if the connection ahs already been established this will be the id

        if (!newListenersObject.leaveRoom[i]) {
          typescriptNameSpace[`${data.roomData[i].roomId}`].on(
            "leaveRoom",
            (response: any) => {
              console.log(response);
            }
          );

          newListenersObject.leaveRoom[i] = "x";
        }

        if (!newListenersObject.userJoined[i]) {
          typescriptNameSpace[`${data.roomData[i].roomId}`].on(
            "userJoined",
            (response: {
              usernameThatJoined: string;
              gameRoomJoined: string;
              isFirstUser: boolean;
            }) => {
              if (!username && !gameRoomJoined) {
                dispatch(
                  userDataSettingsStoreActions.setGameRoomJoined(
                    response.gameRoomJoined
                  )
                );

                serverMessageHandler(dispatch, {
                  messageType: "Success",
                  messageText: `You've Joined ${data.roomData[i].roomId}!`,
                });

                if (response.isFirstUser) {
                  dispatch(userDataSettingsStoreActions.setIsRoomEditor(true));
                }
              } else if (
                response.usernameThatJoined !== username &&
                gameRoomJoined === response.gameRoomJoined
              ) {
                serverMessageHandler(dispatch, {
                  messageType: "Success",
                  messageText: `${data.usernameThatJoined} has joined !`,
                });
              }

              dispatch(
                popupSettingsStoreActions.setRoomSelectPopupUpdateActiveUsers(
                  true
                )
              );
            }
          );
        }

        if (!newListenersObject.updateRoomEditor[i]) {
          typescriptNameSpace[`${data.roomData[i].roomId}`].on(
            "updatedRoomEditor",
            (response: { newEditorUsername: string; room: string }) => {
              if (gameRoomJoined === response.room) {
                if (username === response.newEditorUsername) {
                  dispatch(userDataSettingsStoreActions.setIsRoomEditor(true));
                } else {
                  dispatch(userDataSettingsStoreActions.setIsRoomEditor(false));
                }
              }
              console.log(169);
            }
          );

          newListenersObject.updateRoomEditor[i] = "x";
        }

        setListeners(newListenersObject);

        // joining all the active rooms
      }
    });

    // Handeling if the user clicks off the browser / goes back or refreshes the browser
    document.addEventListener("visibilitychange", () => {
      // If Socket is active
      socket.emit(
        "userDisconnecting",
        username,
        (response: { messageType: string; messageText: string }) => {
          if (response.messageType === "Success") {
            dispatch(userDataSettingsStoreActions.setGameRoomJoined(""));
            dispatch(userDataSettingsStoreActions.setIsRoomEditor(false));
            dispatch(userDataSettingsStoreActions.setUsername(""));
          }
          serverMessageHandler(dispatch, response);
        }
      );
    });
  }, []); //run this once the component has rendered

  // const [windowWidth, windowHeight] = useWindowSize();

  const animationComplete = useAppSelector(
    (state) => state.animationSettings.animationComplete
  );

  // const DiceData = useMemo(() => {
  //   let scale = 0.8;

  //   return { scale: scale };
  // }, [windowHeight]);

  return (
    <>
      {/* </KeyboardControls> */}
      {animationComplete && <ResultPage />}

      {isRoomEditor && <RollButton />}
      {isRoomEditor && <SettingsMenu />}
      <RoomEditorPrivilegePasser />
      {username && roomSelectionPopupActive && <RoomSelection />}
      <DisconnectButton />
      {usernamePopupActive && <UsernamePopup />}
      {serverMessagePopupActive && <ErrorMessagePopup />}

      <Canvas camera={{ position: [0, 300, 0] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 100, 0]} intensity={1} />
        {/* <pointLight intensity={1000000} distance={1000} position={[0, 0, 0]} /> */}

        <axesHelper args={[200]} />

        <D20 {...diceData} />

        <Stats />
      </Canvas>
    </>
  );
}
