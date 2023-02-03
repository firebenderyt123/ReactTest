import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export const WireFrameObj = ({
  color=0xffffff,
  emissive=0xffffff,
  emissiveIntensity=2,
  ...props
}) => {

  const geom = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const mat = useMemo(
    () => new THREE.MeshPhongMaterial({
      color: color,
      wireframe: true,
      wireframeLinecap: "square",
      wireframeLinewidth: 2,
      side: THREE.DoubleSide,
      emissive: emissive,
      emissiveIntensity: emissiveIntensity,
      toneMapped: false
    }), [color, emissive, emissiveIntensity]
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
        scale={[150, 150, 150]}
        {...props}
      />
    </>
  );
};
