import * as THREE from "three";
import { Suspense, useState, useMemo, useRef, useEffect } from 'react';
import { XR, ARButton, Controllers, useHitTest, useXREvent } from '@react-three/xr';
import { Text, Box } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

import { HeartObj } from "./HeartObj";
import { WireFrameObj } from "./WireFrameObj";


const HitTest = () => {
  const ref = useRef();

  // const circleGeometry = useMemo(() => new THREE.CircleGeometry(0.1, 32), []);
  // const circleMaterial = useMemo(() => new THREE.MeshBasicMaterial({color: 0x6699ff}), []);
  // const geometry = useMemo(() => new THREE.TorusGeometry( 0.06, 0.012, 2, 10 ), []);
  // const material = useMemo(() => new THREE.MeshBasicMaterial( { color: 0x6688ff } ), []);
  useHitTest((hit) => {
    hit.decompose(ref.current.position, ref.current.rotation, ref.current.scale);
    // console.log(hit.getPosition());
  });

  return (
    <>
    <group ref={ref}>
      {/*<mesh
        geometry={geometry}
        material={material}
        // rotation={[90, 0, 0]}
      />*/}
      <HeartObj
        color={0x6688ff}
        emissive={0x6688ff}
        emissiveIntensity={1}
        scaleKoef={0.0005}
      />
      <WireFrameObj
        color={0x44aaff}
        emissive={0x44aaff}
        scale={[0.0005, 0.0005, 0.0005]}
      />
    </group>
    </>
  );
};

const onSelectEnd = (event) => {
  console.log(event);

  // console.log(obj);
  // event.target.add(obj);

};

const Events = () => {
  useXREvent('selectend', onSelectEnd);
};

export const App = () => {

  useEffect(() => {console.log("render")});

  return (
    <>
      <ARButton />
      <Canvas>
        <XR
          referenceSpace="local"
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
          {/*<RayGrab>
            <group position={[0.05, -0.1, -0.2]}>
              <HeartObj
                emissive={0xff3366}
                emissiveIntensity={1}
                scaleKoef={0.0005}
              />
              <WireFrameObj
                scale={[0.0005, 0.0005, 0.0005]}
              />
            </group>
          </RayGrab>*/}
          <HitTest />
          {/*<Button position={[0, 0, 0]} />*/}
          <Controllers />
          <Events />
        </XR>
      </Canvas>
    </>
  );
};