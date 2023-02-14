import { ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'

import { Robot } from '../../models/Robot';

function Test() {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <Controllers />
          <Robot
            rotation={[90, 0, 0]}
            scale={[0.05, 0.05, 0.05]}
          />
        </XR>
      </Canvas>
    </>
  )
};

export default Test;