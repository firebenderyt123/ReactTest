import { ClumpObj } from "./ClumpObj";
import { Pointer } from "./Pointer";
import { getParams } from "./Parameters";
import { useStats } from "../../Stats";

import * as THREE from "three";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Environment } from "@react-three/drei";

const Stats = () => useStats(0, true);

const App = () => {
  const params = getParams();

  return (
    <Canvas
      shadows
      className="app"
      frameloop="demand"
      dpr={[1, 2]}
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
        gravity={
          [params.gravityX, params.gravityY, params.gravityZ]
        }
        iterations={10}
      >
        <Pointer radius={3} />
        <ClumpObj count={params.objectCount} mass={params.mass} />
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <Stats />
    </Canvas>
  );
};

export default App;