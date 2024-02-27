import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls, Stats } from "@react-three/drei";
import { D20 } from "./library/assets/3d-models/d20";

import { Camera } from "three";

import { degreesToRadians } from "./library/functions/converstions";
import { useLayoutEffect, useMemo, useState, useEffect } from "react";
import ResultPage from "./result-page/result-page";
import RollButton from "./roll-button/roll-button";
import { useAppSelector } from "./library/store/typescript-hooks";
import SettingsMenu from "./settings-menu/settings-menu";

// Importing Models with gltfjsx

// npx gltfjsx public/models/name.glb -o src/library/assets/3d-models/name.jsx -r public

// npx so you don't have to install package
// -0 location of file
// - r root directory

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

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
