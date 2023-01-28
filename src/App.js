import { Clump } from "./models/Clump";
import { Pointer } from "./models/Pointer";
import { getParams } from "./Parameters";

import * as THREE from "three";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import {
  Environment,
  Effects as EffectComposer
} from "@react-three/drei";
import { SSAOPass } from "three-stdlib";

extend({ SSAOPass });

export const App = () => {
  const params = getParams();

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
      <Physics
        gravity={
          [params.gravityX, params.gravityY, params.gravityZ]
        }
        iterations={10}
      >
        <Pointer radius={3} />
        <Clump objectCount={params.objectCount} mass={params.mass} />
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <Effects />
    </Canvas>
  );
};

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
