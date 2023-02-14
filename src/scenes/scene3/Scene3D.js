import { isMobile as isMob } from "../../DeviceChecker";
import { useStats } from "../../Stats";

import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr } from "@react-three/drei";

import { Robot } from "../../models/Robot";
import { CameraController } from "./CameraController";

const isMobile = isMob();

const Stats = () => useStats(0, false);

const App = () => {
  return (
    <Canvas
      className="app"
      camera={{
        position: [0, 0, 20],
        fov: 35,
        near: 1,
        far: 80
      }}
      gl={{
        powerPreference: "high-performance",
        alpha: true,
        antialias: true,
        stencil: false,
        depth: true
      }}
    >
      <Preload all />
      <AdaptiveDpr pixelated />
      <CameraController />
      <Stats />
      <ambientLight />
      <directionalLight
        intensity={2}
        position={[0.75, 1, 0.5]}
        color={0xffffff}
      />
      <directionalLight
        intensity={2}
        position={[-7.5, -10, -2]}
        color={0xffffff}
      />
      <Robot
        position={[0, -2, 0]}
        rotation={[-180, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
    </Canvas>
  );
};

export default App;