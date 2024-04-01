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

  const [listeners, setListeners] = useState<{
    leaveRoom: any[];
    userJoined: any[];
  }>({ leaveRoom: [], userJoined: [] });

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

        if (!listeners.leaveRoom[i]) {
          typescriptNameSpace[`${data.roomData[i].roomId}`].on(
            "leaveRoom",
            (data: any) => {
              console.log(data);
            }
          );

          newListenersObject.leaveRoom[i] = "x";
        }

        if (!listeners.userJoined[i]) {
          typescriptNameSpace[`${data.roomData[i].roomId}`].on(
            "userJoined",
            (data: any) => {
              if (data.usernameThatJoined === username && !gameRoomJoined) {
                dispatch(
                  userDataSettingsStoreActions.setGameRoomJoined(
                    data.gameRoomJoined
                  )
                );

                serverMessageHandler(dispatch, {
                  messageType: "Success",
                  messageText: "You've Joined Room 1!",
                });
              } else if (
                data.usernameThatJoined !== username &&
                gameRoomJoined === data.gameRoomJoined
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

          newListenersObject.userJoined[i] = "x";
        }

        setListeners(newListenersObject);

        // joining all the active rooms
      }
    });

    // Handeling if the user clicks off the browser / goes back or refreshes the browser
    document.addEventListener("visibilitychange", () => {
      // If Socket is active
      socket.emit("userDisconnecting", "User1");
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
      <RollButton />
      <SettingsMenu />
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
