import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

import { getMostSideLength } from "../../DeviceChecker";

const maxCount = 2560;

var mostSide = getMostSideLength();
if (mostSide < 768) {
  mostSide *= 1.5;
}
const particlesCount = mostSide < maxCount ? mostSide : maxCount;

var particlesSize = 0.2;
if (mostSide > 1920) {
  particlesSize = 0.4;
} else if (mostSide > 1440) {
  particlesSize = 0.3;
}

const rfs = THREE.MathUtils.randFloatSpread;
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  flatShading: true,
  emissive: 0x999999,
  emissiveIntensity: 2,
  toneMapped: false
});

export const Particles = ({ size = particlesSize, count = particlesCount }) => {

  const geometry = useMemo(() => new THREE.TetrahedronGeometry(size, 0), [size]);

  const ref = useRef();

  useEffect(() => {
    const tempParticles = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      tempParticles.position.set(
        rfs(mostSide * 0.1),
        rfs(mostSide * 0.1),
        rfs(mostSide * 0.1)
      );
      tempParticles.rotation.set(rfs(180), rfs(180), rfs(180));
      tempParticles.updateMatrix();
      ref.current.setMatrixAt(i, tempParticles.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  useFrame((state, delta) => {
    ref.current.rotation.y += -delta * 0.4;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, count]}
    />
  );
};