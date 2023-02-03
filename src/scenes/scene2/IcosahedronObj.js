import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export const IcosahedronObj = () => {
  const ref = useRef();
  const geom = useMemo(() => new THREE.IcosahedronGeometry(11.2, 1), []);
  const mat = useMemo(
    () => new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true
      // emissive: 0x999999,
      // emissiveIntensity: 0,
      // toneMapped: false
    }), []
  );

  useFrame((state, delta) => {
    ref.current.rotation.x += -delta * 0.2;
    ref.current.rotation.y += -delta * 0.3;
  });

  return (
    <mesh
      ref={ref}
      geometry={geom}
      material={mat}
    />
  );
};