import * as THREE from "three";
import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, SelectiveBloom, Bloom } from '@react-three/postprocessing';

import { useStats } from '../../Stats';
import { HeartObj } from "./HeartObj";
import { IcosahedronObj } from "./IcosahedronObj";
import { WireFrameObj } from "./WireFrameObj";
import { Particles } from "./Particles";

import { CameraController } from "./CameraController";

const Stats = () => useStats(0, true);

const App = () => (
  <Canvas
    className="app"
    frameloop="demand"
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
    <ambientLight color={0xff3366} intensity={2} />
    <directionalLight
      intensity={2}
      position={[1, 0, 0]}
      color={0xffffff}
    />
    <directionalLight
      intensity={2}
      position={[0.75, 1, 0.5]}
      color={0x11E8BB}
    />
    <directionalLight
      intensity={2}
      position={[-0.75, -1, 0.5]}
      color={0x8200C9}
    />
    <CameraController />
    <HeartObj />
    {/*<IcosahedronObj />*/}
    <WireFrameObj />
    <Particles />
    <Effects />
    <Stats />
  </Canvas>
);

const Effects = () => {
  const ref = useRef(
    useMemo(() => new THREE.DirectionalLight(0xfff, 0)), []
  );
  return (
    <EffectComposer>
      <SelectiveBloom lights={[ref]} intensity={0.5} />
    </EffectComposer>
  );
};

export default App;