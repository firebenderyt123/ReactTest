import * as THREE from "three";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import { isMobile as isMob } from "../../DeviceChecker";
import { useStats } from '../../Stats';
import { HeartObj } from "./HeartObj";
import { IcosahedronObj } from "./IcosahedronObj";
import { WireFrameObj } from "./WireFrameObj";
import { Particles } from "./Particles";

import { CameraController } from "./CameraController";

const isMobile = isMob();

const Stats = () => useStats(0, true);

const App = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      className="app"
      frameloop="demand"
      dpr={dpr}
      camera={{
        position: [0, 0, 40],
        fov: 75,
        near: 1,
        far: 100
      }}
      gl={{
        powerPreference: "high-performance",
        alpha: true,
        antialias: true,
        stencil: false,
        depth: isMobile ? true : false
      }}
    >
      <Preload all />
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
        <CameraController />
        <HeartObj />
        {/*<IcosahedronObj />*/}
        <WireFrameObj />
        <Particles />
        <Stats />
        {!isMobile
          ? <>
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
              <Effects />
            </>
          : <></>
        }
      </PerformanceMonitor>
    </Canvas>
  );
};

const Effects = () => (
  <EffectComposer>
    <Bloom intensity={0.05} />
  </EffectComposer>
);

export default App;