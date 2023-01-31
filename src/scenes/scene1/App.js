import { ClumpObj } from "./ClumpObj";
import { Pointer } from "./Pointer";
import { CameraController } from "./CameraController";
import { isMobile as isMob } from "../../DeviceChecker";
import { useStats } from "../../Stats";

import * as THREE from "three";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { PerformanceMonitor, Environment } from "@react-three/drei";

const isMobile = isMob();

const Stats = () => useStats(0, true);

const App = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      shadows
      className="app"
      frameloop="demand"
      dpr={dpr}
      camera={{
        position: [0, 0, 20],
        fov: 35,
        near: 1,
        far: 40
      }}
      gl={{
        powerPreference: "high-performance",
        alpha: true,
        antialias: true,
        stencil: false,
        depth: true
      }}
    >
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
        <CameraController />
        <ambientLight intensity={0.25} />
        <spotLight
          intensity={1}
          angle={0.2}
          penumbra={1}
          position={[30, 30, 30]}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight
          intensity={5}
          position={[-10, -10, -10]}
          color="purple"
        />
        <Physics
          gravity={[0, 2, 0]}
          iterations={10}
        >
          <Pointer radius={3} />
          <ClumpObj count={isMobile ? 4 : 20} mass={1} />
        </Physics>
        <Environment files="/adamsbridge.hdr" />
        <Stats />
      </PerformanceMonitor>
    </Canvas>
  );
};

export default App;