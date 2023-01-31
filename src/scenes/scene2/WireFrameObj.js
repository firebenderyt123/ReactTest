import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export const WireFrameObj = () => {

  const geom = useMemo(() => new THREE.IcosahedronGeometry(15, 1), []);
  const mat = useMemo(
    () => new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      wireframeLinecap: "square",
      wireframeLinewidth: 2,
      side: THREE.DoubleSide,
      emissive: 0xffffff,
      emissiveIntensity: 2,
      toneMapped: false
    }), []
  );

  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += -delta * 0.1;
    ref.current.rotation.y += -delta * 0.2;
  });

  return (
    <>
      <mesh
        ref={ref}
        geometry={geom}
        material={mat}
      />
    </>
  );
};
