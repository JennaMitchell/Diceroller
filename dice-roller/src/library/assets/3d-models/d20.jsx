/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/d20.glb -o src/library/assets/3d-models/d20.jsx -r public 
*/

import { useRef, useState, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { d20SideRotationData } from "../../../die-sides-data/dies-sides-data";
import { useAppDispatch, useAppSelector } from "../../store/typescript-hooks";
import { useControls } from "leva";
import { animationSettingsStoreActions } from "../../store/animation-settings-store";
import { hexColorConverter } from "../../functions/converstions";

// type d20PropsType = {
//   meshColor: string;
//   meshHoverColor: string;
//   meshColorIntensity: number;
//   textColor: string;
//   textColorIntensity: number;
//   scale: number;
//   animationDirection: string;
// };

export function D20({
  meshColor,
  meshHoverColor,
  textColor,
  scale,
  animationDirection,
}) {
  const dispatch = useAppDispatch();
  const { nodes, materials } = useGLTF("/models/d20.glb");
  const d20Ref = useRef(null);
  const d20TextRef = useRef(null);
  const startAnimation = useAppSelector(
    (state) => state.animationSettings.startAnimation
  );
  const animationComplete = useAppSelector(
    (state) => state.animationSettings.animationComplete
  );
  const valueGenerated = useAppSelector(
    (state) => state.animationSettings.valueRolled
  );
  const [resolveTriggered, setResolvedTriggered] = useState(0);
  // let { x, z, rotationX, rotationZ, rotationY } = [0,0,0,0];

  // RIGHT

  const rightSpring = useSpring({
    from: {
      x: 3000,
      z: 0,
      rotationX: 350,
      rotationZ: 350,
      rotationY: 350,
    },

    to: [
      {
        x: startAnimation ? 0 : 3000,
        z: startAnimation ? 0 : 0,
        rotationX: startAnimation ? d20SideRotationData[valueGenerated].x : 0,
        rotationZ: startAnimation ? d20SideRotationData[valueGenerated].z : 0,
        rotationY: startAnimation ? d20SideRotationData[valueGenerated].y : 0,
      },
    ],

    config: {
      mass: 1,
      friction: 75,
    },
    onResolve: () => {
      if (resolveTriggered !== 2 && startAnimation && !animationComplete) {
        setResolvedTriggered(2);
      }
      if (resolveTriggered === 2 && startAnimation && !animationComplete) {
        setTimeout(() => {
          dispatch(animationSettingsStoreActions.setAnimationComplete(true));
          setResolvedTriggered(1);
        }, 2000);
      }
    },

    immediate: false,
  });

  // LEFT
  const leftSpring = useSpring({
    from: {
      x: -3000,
      z: 0,
      rotationX: 350,
      rotationZ: 350,
      rotationY: 350,
    },

    to: [
      {
        x: startAnimation ? 0 : -3000,
        z: startAnimation ? 0 : 0,
        rotationX: startAnimation ? d20SideRotationData[valueGenerated].x : 0,
        rotationZ: startAnimation ? d20SideRotationData[valueGenerated].z : 0,
        rotationY: startAnimation ? d20SideRotationData[valueGenerated].y : 0,
      },
    ],

    config: {
      mass: 1,
      friction: 75,
    },
    onResolve: () => {
      if (resolveTriggered !== 2 && startAnimation && !animationComplete) {
        setResolvedTriggered(2);
      }
      if (resolveTriggered === 2 && startAnimation && !animationComplete) {
        setTimeout(() => {
          dispatch(animationSettingsStoreActions.setAnimationComplete(true));
          setResolvedTriggered(1);
        }, 2000);
      }
    },

    immediate: false,
  });

  // // UP

  const upSpring = useSpring({
    from: {
      x: 0,
      z: 0,
      rotationX: 350,
      rotationZ: 350,
      rotationY: 350,
    },

    to: [
      {
        x: startAnimation ? 0 : 0,
        z: startAnimation ? 0 : -3000,
        rotationX: startAnimation ? d20SideRotationData[valueGenerated].x : 0,
        rotationZ: startAnimation ? d20SideRotationData[valueGenerated].z : 0,
        rotationY: startAnimation ? d20SideRotationData[valueGenerated].y : 0,
      },
    ],

    config: {
      mass: 1,
      friction: 75,
    },
    onResolve: () => {
      if (resolveTriggered !== 2 && startAnimation && !animationComplete) {
        setResolvedTriggered(2);
      }
      if (resolveTriggered === 2 && startAnimation && !animationComplete) {
        setTimeout(() => {
          dispatch(animationSettingsStoreActions.setAnimationComplete(true));
          setResolvedTriggered(1);
        }, 2000);
      }
    },

    immediate: false,
  });
  // // DOWN

  const downSpring = useSpring({
    from: {
      x: 0,
      z: 0,
      rotationX: 350,
      rotationZ: 350,
      rotationY: 350,
    },

    to: [
      {
        x: startAnimation ? 0 : 0,
        z: startAnimation ? 0 : 3000,
        rotationX: startAnimation ? d20SideRotationData[valueGenerated].x : 0,
        rotationZ: startAnimation ? d20SideRotationData[valueGenerated].z : 0,
        rotationY: startAnimation ? d20SideRotationData[valueGenerated].y : 0,
      },
    ],

    config: {
      mass: 1,
      friction: 75,
    },
    onResolve: () => {
      if (resolveTriggered !== 2 && startAnimation && !animationComplete) {
        setResolvedTriggered(2);
      }
      if (resolveTriggered === 2 && startAnimation && !animationComplete) {
        setTimeout(() => {
          dispatch(animationSettingsStoreActions.setAnimationComplete(true));
          setResolvedTriggered(1);
        }, 2000);
      }
    },

    immediate: false,
  });

  // // const { rotationX, rotationY, rotationZ } = useControls({
  //   rotationX: { value: 0, min: -360, max: 360, step: 0.1 },
  //   rotationY: { value: 0, min: -360, max: 360, step: 0.1 },
  //   rotationZ: { value: 0, min: -360, max: 360, step: 0.1 },
  // });

  useEffect(() => {
    const possibleNullRef = d20Ref.current;
    const possibleNullTextRef = d20TextRef.current;
    if (possibleNullRef && possibleNullTextRef) {
      const notNullRef = possibleNullRef;
      const notNullTextRef = possibleNullTextRef;
      const convertedColor = hexColorConverter(meshColor);
      const convertedTextColor = hexColorConverter(textColor);

      notNullRef.material.color = {
        r: convertedColor[0] / 255,
        g: convertedColor[1] / 255,
        b: convertedColor[2] / 255,
        isColor: true,
      };

      notNullTextRef.material.color = {
        r: convertedTextColor[0] / 255,
        g: convertedTextColor[1] / 255,
        b: convertedTextColor[2] / 255,
        isColor: true,
      };
    }
  }, [meshColor, textColor]);

  let x = 0;
  let z = 0;
  let rotationX = 0;
  let rotationY = 0;
  let rotationZ = 0;
  switch (animationDirection) {
    case "Right":
      x = rightSpring.x;
      z = rightSpring.z;
      rotationX = rightSpring.rotationX;
      rotationY = rightSpring.rotationY;
      rotationZ = rightSpring.rotationZ;

      break;

    case "Left":
      x = leftSpring.x;
      z = leftSpring.z;
      rotationX = leftSpring.rotationX;
      rotationY = leftSpring.rotationY;
      rotationZ = leftSpring.rotationZ;
      break;

    case "Up":
      x = upSpring.x;
      z = upSpring.z;
      rotationX = upSpring.rotationX;
      rotationY = upSpring.rotationY;
      rotationZ = upSpring.rotationZ;
      break;

    case "Down":
      x = downSpring.x;
      z = downSpring.z;
      rotationX = downSpring.rotationX;
      rotationY = downSpring.rotationY;
      rotationZ = downSpring.rotationZ;
      break;

    default:
      break;
  }

  return (
    <animated.group
      dispose={null}
      rotation-x={rotationX}
      rotation-z={rotationZ}
      rotation-y={rotationY}
      position-x={x}
      position-z={z}
      scale={scale}
    >
      <group rotation={[-0.609, 0.195, -0.647]}>
        <mesh
          geometry={nodes.d20_v2_1.geometry}
          material={materials["Material.001"]}
          ref={d20Ref}
        />
        <mesh
          geometry={nodes.d20_v2_2.geometry}
          material={materials["Material.002"]}
          ref={d20TextRef}
        />
      </group>
    </animated.group>
  );
}

useGLTF.preload("/models/d20.glb");