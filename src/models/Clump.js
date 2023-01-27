import * as THREE from "three";
import { useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import { Heart } from "./Heart";
import { getParams } from "../Parameters";

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "red", roughness: 0, envMapIntensity: 0.2, emissive: "#370037" });

// const heart = new Heart();
// const heartGemetry = heart.getGeometry();
// heart.setGeometryScale(0.015, 0.015, 0.015);

export const Clump = ({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) => {
  const params = getParams();
  const texture = useTexture("/cross.jpg");
  const [ref, api] = useSphere(() => ({ args: [1], mass: params.mass, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }), useRef());
  useFrame((state) => {
    for (let i = 0; i < params.objectCount; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat);
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0]);
      api.at(i).mass.set(params.mass);
    }
  });
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, params.objectCount]}
      geometry={sphereGeometry}
      material={baubleMaterial}
      material-map={texture}
    />
  );
};