import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const rfs = THREE.MathUtils.randFloatSpread;

export const ClumpObj = ({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), mass = 1, count = 1 }) => {

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const baubleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xff0033,
    roughness: 0,
    envMapIntensity: 0.2,
    emissive: "#370037"
  }), []);
  const texture = useTexture("/cross.jpg");
  
  const [ref, api] = useSphere(() => ({ args: [1], mass: mass, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }), useRef());
  
  useMemo(() => {
    for (let i = 0; i < count; i++) {
      api.at(i).mass.set(mass);
    }
  }, [mass]);

  useFrame((state) => {
    for (let i = 0; i < count; i++) {
      ref.current.getMatrixAt(i, mat);
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0]);
    }
  });
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
      geometry={sphereGeometry}
      material={baubleMaterial}
      material-map={texture}
    />
  );
};