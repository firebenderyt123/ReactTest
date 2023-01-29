import * as THREE from "three";
import { createRef, useRef, useMemo, useEffect, useState, forwardRef } from "react";
import { Canvas, extend, useThree, useFrame, useResource } from "@react-three/fiber";
import { EffectComposer, SelectiveBloom, Bloom } from '@react-three/postprocessing'
import { useSpring } from "@react-spring/three";

import { Heart } from "./models/Heart";

let mostSide = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
if (mostSide > 1000) {
  mostSide /= 2;
}
const maxCount = 2000;
const count = mostSide < maxCount ? mostSide : maxCount;

export const App = () => (
  <Canvas
    dpr={[1, 2]}
    camera={{
      position: [0, 0, 400],
      fov: 75,
      near: 1,
      far: 1000
    }}
    gl={{
      powerPreference: "high-performance",
      alpha: true,
      antialias: true,
      stencil: false,
      depth: false
    }}
  >
    <spotLight 
      color={0xff0000}
      intensity={40}
      position={[0, 0, -10]}
    />
    <ambientLight color={0xff3366} intensity={2} />
    <directionalLight
      intensity={1}
      position={[1, 0, 0]}
      color={0xffffff}
    />
    <directionalLight
      intensity={1}
      position={[0.75, 1, 0.5]}
      color={0x11E8BB}
    />
    <directionalLight
      intensity={2}
      position={[-0.75, -1, 0.5]}
      color={0x8200C9}
    />
    <HeartObj />
    {/*<SolidObject />*/}
    <WireFrameObj />
    <Particles count={count} />
    <Effects />
  </Canvas>
);

const HeartObj = () => {

  const heartMat = new THREE.MeshPhongMaterial({
    color: 0xff3366,
    flatShading: true,
    emissive: 0xff0000,
    emissiveIntensity: 20,
    toneMapped: false
  });

  const config = {
    mass: 1,
    friction: 15,
    tension: 20
  };

  const distance = 10;
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config
  });

  // console.log(config);

  const elem = Heart({
    material: heartMat,
    position: [0, -10 + distance, 0],
    rotation: [110, 0, 0],
    onClick: () => setActive(!active),
    // onUpdate: () => console.log('props have been updated'),
    scale: scale
  });

  const ref = elem.ref;
  
  const [timer, setTimer] = useState(0);
  const [passedTime, setPassedTime] = useState(0);
  useFrame((state, delta) => {
    if (timer < 1) {
      setTimer(timer + delta);
    } else {
      setActive(!active);
      setTimer(0);
    }
    // console.log(ref.current.position.y);
    ref.current.position.y += -delta * distance * Math.sin(passedTime);
    // ref.current.rotation.x += -delta * Math.sin(1);
    ref.current.rotation.y += -delta * 1;
    setPassedTime(passedTime + delta);
  });

  return elem;
  // return (
  //   <Heart
  //     material={heartMat}
  //     position={[0, -10, 0]}
  //     rotation={[110, 0, 0]}
  //     scale={[1, 1, 1]}
  //   />
  // );
};

const WireFrameObj = () => {
  const ref = useRef();
  const geom = new THREE.IcosahedronGeometry(15, 1);
  const mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide,
    emissive: 0xffffff,
    emissiveIntensity: 2,
    toneMapped: false
  });

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
        scale={[10, 10, 10]}
      />
    </>
  );
};

const SolidObject = () => {
  const ref = useRef();
  const geom = new THREE.IcosahedronGeometry(7, 1);
  const mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true
    // emissive: 0x999999,
    // emissiveIntensity: 0,
    // toneMapped: false
  });

  useFrame((state, delta) => {
    ref.current.rotation.x += -delta * 0.2;
    ref.current.rotation.y += -delta * 0.3;
  });

  return (
    <mesh
      ref={ref}
      geometry={geom}
      material={mat}
      scale={[16, 16, 16]}
    />
  );
};

const Particles = ({ count }) => {
  const geometry = new THREE.TetrahedronGeometry(2, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
    emissive: 0x999999,
    emissiveIntensity: 2,
    toneMapped: false
  });

  const rfs = THREE.MathUtils.randFloatSpread;
  const ref = useRef();

  useEffect(() => {
    const tempParticles = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      tempParticles.position.set(
        rfs(mostSide),
        rfs(mostSide),
        rfs(mostSide)
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

const Effects = () => {
  const ref = useRef(new THREE.PointLight(0xfff));
  return (
    <EffectComposer>
      <SelectiveBloom lights={[ref]} intensity={0.5} />
    </EffectComposer>
  );
};