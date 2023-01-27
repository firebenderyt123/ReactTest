import { Clump } from "./models/Clump";

import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from "@react-three/cannon";
import {
  Environment,
  Effects as EffectComposer,
  useTexture,
  OrbitControls
} from "@react-three/drei";
import { SSAOPass } from "three-stdlib";

extend({ SSAOPass });

export const App = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 20],
        fov: 35,
        near: 1,
        far: 40
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
      <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <Effects />
    </Canvas>
  );
};

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }));
  return useFrame((state) => {
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );
  });
}

function Effects(props) {
  const { size, scene, camera } = useThree();
  // const aspect = useMemo(
  //   () => new THREE.Vector2(size.width, size.height),
  //   [size]
  // );
  return (
    <EffectComposer {...props}>
      <sSAOPass args={[scene, camera, 100, 100]} kernelRadius={0.665} kernelSize={0} />
      {/*<unrealBloomPass attachArray="passes" args={[aspect, 0.4, 1, 0]} />*/}
    </EffectComposer>
  );
}
