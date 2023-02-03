import * as THREE from "three";

import { useState, createRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";

// const mat = new THREE.MeshStandardMaterial({
//   color: "red",
//   roughness: 0,
//   envMapIntensity: 0.2,
//   emissive: "#370037",
//   // color: 0xffffff,
//   transparent: true,
//   side: THREE.DoubleSide,
//   opacity: 0.05
// });

export const Pointer = ({radius = 3}) => {
  // const geo = new THREE.SphereGeometry(radius, 32, 32);
  // const texture = useTexture("/cross.jpg");
  const viewport = useThree((state) => state.viewport);
  const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [radius], position: [0, 0, 0] }));
  
  return useFrame((state) => {
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );
  });

  // return (
  //   <mesh
  //     ref={ref}
  //     geometry={geo}
  //     material={mat}
  //     material-map={texture}
  //   />
  // );
};