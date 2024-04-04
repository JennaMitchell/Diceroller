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

import RoomEditorPrivilegePasser from "./components/popups/room-editor-privilege-passer/room-editor-privilege-passer";

import { serverMessageSettingsStoreActions } from "./library/store/server-message-store";
import ServerMessageHandlersTop from "./library/server-message-handlers/server-message-handlers-top-component";
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

  const isRoomEditor = useAppSelector(
    (state) => state.userDataSettings.isRoomEditor
  );

  const [listeners, setListeners] = useState<{
    leaveRoom: any[];
    userJoined: any[];
    updateRoomEditor: any[];
    updatedMeshColor: any[];
    updatedMeshColorIntensity: any[];
    updatedMeshTextColor: any[];
    updatedMeshTextColorIntensity: any[];
    updatedMeshScale: any[];
    updatedAnimationDirection: any[];
    updatedAnimationStart: any[];
    newDieRolled: any[];
    dieRollReset: any[];
  }>({
    leaveRoom: [],
    userJoined: [],
    updateRoomEditor: [],
    updatedMeshColor: [],
    updatedMeshColorIntensity: [],
    updatedMeshTextColor: [],
    updatedMeshTextColorIntensity: [],
    updatedMeshScale: [],
    updatedAnimationDirection: [],
    updatedAnimationStart: [],
    newDieRolled: [],
    dieRollReset: [],
  });

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

        if (!newListenersObject.dieRollReset[i]) {
          newListenersObject.dieRollReset[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on("dieRollReset", (response: { room: string }) => {
            dispatch(
              serverMessageSettingsStoreActions.setServerMessageName(
                "dieRollReset"
              )
            );
            dispatch(
              serverMessageSettingsStoreActions.setUpdatedDieRollData({
                animationStarted: false,
                dieResult: 1,
                room: response.room,
              })
            );
          });
        }

        if (!newListenersObject.newDieRolled[i]) {
          newListenersObject.newDieRolled[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on(
            "newDieRolled",
            (response: {
              newStartAnimation: boolean;
              newValueRolled: number;
              room: string;
            }) => {
              console.log(146);
              console.log(response);
              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "newDieRolled"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUpdatedDieRollData({
                  animationStarted: response.newStartAnimation,
                  dieResult: response.newValueRolled,
                  room: response.room,
                })
              );
            }
          );
        }

        if (!newListenersObject.updatedMeshColor[i]) {
          newListenersObject.updatedMeshColor[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on(
            "updatedMeshColor",
            (response: { newMeshColor: string; room: string }) => {
              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "updatedGameSetting"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUpdatedGameSettingsData({
                  variableName: "meshColor",
                  variableValue: response.newMeshColor,
                  room: response.room,
                })
              );
            }
          );
        }

        if (!newListenersObject.updatedMeshColorIntensity[i]) {
          newListenersObject.updatedMeshColorIntensity[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on(
            "updatedMeshColorIntensity",
            (response: { newMeshColorIntensity: number; room: string }) => {
              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "updatedGameSetting"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUpdatedGameSettingsData({
                  variableName: "meshColorIntensity",
                  variableValue: response.newMeshColorIntensity,
                  room: response.room,
                })
              );
            }
          );
        }

        if (!newListenersObject.updatedMeshTextColor[i]) {
          newListenersObject.updatedMeshTextColor[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on(
            "updatedMeshTextColor",
            (response: { newMeshTextColor: string; room: string }) => {
              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "updatedGameSetting"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUpdatedGameSettingsData({
                  variableName: "meshTextColor",
                  variableValue: response.newMeshTextColor,
                  room: response.room,
                })
              );
            }
          );
        }

        if (!newListenersObject.updatedMeshTextColorIntensity[i]) {
          newListenersObject.updatedMeshTextColorIntensity[i] =
            typescriptNameSpace[`${data.roomData[i].roomId}`].on(
              "updatedMeshTextColorIntensity",
              (response: {
                newMeshTextColorIntensity: number;
                room: string;
              }) => {
                dispatch(
                  serverMessageSettingsStoreActions.setServerMessageName(
                    "updatedGameSetting"
                  )
                );
                dispatch(
                  serverMessageSettingsStoreActions.setUpdatedGameSettingsData({
                    variableName: "meshTextColorIntensity",
                    variableValue: response.newMeshTextColorIntensity,
                    room: response.room,
                  })
                );
              }
            );
        }

        if (!newListenersObject.updatedMeshScale[i]) {
          newListenersObject.updatedMeshScale[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on(
            "updatedMeshScale",
            (response: { newMeshScale: number; room: string }) => {
              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "updatedGameSetting"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUpdatedGameSettingsData({
                  variableName: "meshScale",
                  variableValue: response.newMeshScale,
                  room: response.room,
                })
              );
            }
          );
        }

        if (!newListenersObject.updatedAnimationDirection[i]) {
          newListenersObject.updatedAnimationDirection[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on(
            "updatedAnimationDirection",
            (response: { newAnimationDirection: string; room: string }) => {
              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "updatedGameSetting"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUpdatedGameSettingsData({
                  variableName: "animationDirection",
                  variableValue: response.newAnimationDirection,
                  room: response.room,
                })
              );
            }
          );
        }

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
              // These are cached so it won;t get teh updated variable when you run it so we create a useEffect Above to Handle the logic of the function

              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "userJoined"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUserJoinedData(response)
              );
            }
          );
        }

        if (!newListenersObject.updateRoomEditor[i]) {
          newListenersObject.updateRoomEditor[i] = typescriptNameSpace[
            `${data.roomData[i].roomId}`
          ].on(
            "updatedRoomEditor",
            (response: { newEditorUsername: string; room: string }) => {
              //////

              dispatch(
                serverMessageSettingsStoreActions.setServerMessageName(
                  "updatedRoomEditor"
                )
              );
              dispatch(
                serverMessageSettingsStoreActions.setUpdatedRoomEditorData(
                  response
                )
              );
            }
          );
        }

        setListeners(newListenersObject);

        // joining all the active rooms
      }
    });

    // Handeling if the user clicks off the browser / goes back or refreshes the browser
    // document.addEventListener("visibilitychange", () => {
    //   // If Socket is active
    //   socket.emit(
    //     "userDisconnecting",
    //     username,
    //     (response: { messageType: string; messageText: string }) => {
    //       if (response.messageType === "Success") {
    //         dispatch(userDataSettingsStoreActions.setGameRoomJoined(""));
    //         dispatch(userDataSettingsStoreActions.setIsRoomEditor(false));
    //         dispatch(userDataSettingsStoreActions.setUsername(""));
    //         dispatch(userDataSettingsStoreActions.setAttemptedToJoinRoom(false));
    //       }
    //       serverMessageHandler(dispatch, response);
    //     }
    //   );
    // });
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
      {isRoomEditor && <RoomEditorPrivilegePasser />}
      {username && roomSelectionPopupActive && <RoomSelection />}
      <DisconnectButton />
      <ServerMessageHandlersTop />
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
