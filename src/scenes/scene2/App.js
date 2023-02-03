import * as THREE from "three";
import { Suspense, lazy, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import { isMobile as isMob } from "../../DeviceChecker";
import { useStats } from '../../Stats';
import { HeartObj } from "./HeartObj";
import { IcosahedronObj } from "./IcosahedronObj";
import { WireFrameObj } from "./WireFrameObj";
import { Particles } from "./Particles";

import { CameraController } from "./CameraController";
const AR = lazy(() => import('./AR'));

const isMobile = isMob();

const Stats = () => useStats(0, true);

const App = () => {
  return (
    <>
      <Canvas
        className="app"
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
          depth: isMobile ? true : false
        }}
      >
        <Preload all />
        <AdaptiveDpr pixelated />
        <CameraController />
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
              <HeartObj />
              <WireFrameObj />
              <Effects />
            </>
          : <>
              <HeartObj
                emissive={0xff3366}
                emissiveIntensity={1}
              />
              <WireFrameObj
                emissiveIntensity={1}
              />
            </>
        }
        <Particles />
      </Canvas>
      <Suspense fallback={null}>
        <AR />
      </Suspense>
    </>
  );
};

const Effects = () => (
  <EffectComposer>
    <Bloom intensity={0.05} />
  </EffectComposer>
);

export default App;