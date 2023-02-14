import * as THREE from "three";
import { useState, useMemo, useRef, cloneElement } from 'react';
import { AdaptiveDpr } from '@react-three/drei';
import { XR, ARButton, Controllers, useHitTest, useXREvent, Interactive } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';

import { HeartObj } from "./HeartObj";
import { WireFrameObj } from "./WireFrameObj";

const limitObjects = 1;
const offset = {x: 0, y: 0.175, z: 0};

const Obj = () => (
  <group>
    <HeartObj
      emissive={0xff3366}
      emissiveIntensity={1}
      scaleKoef={0.0005}
    />
    <WireFrameObj
      scale={[0.075, 0.075, 0.075]}
    />
  </group>
);

const App = () => {
  const [objects, setObjects] = useState([]);

  const hitTestRef = useRef();
  const geometryHitTest = useMemo(() => new THREE.TorusGeometry(0.062, 0.01, 2, 100), []);
  const materialHitTest = useMemo(() => new THREE.MeshBasicMaterial({color: 0xFF88DD}), []);

  const HitTest = () => {

    const objectsCount = objects.length;
    if (objectsCount < limitObjects) {
      useHitTest((hit) => {
        hit.decompose(hitTestRef.current.position, hitTestRef.current.rotation, hitTestRef.current.scale);
      });

      return (
        <>
        <group ref={hitTestRef}>
          <mesh
            geometry={geometryHitTest}
            material={materialHitTest}
            rotation={[90, 0, 0]}
            position={[0, -0.126, 0]}
          />
        </group>
        </>
      );
    }

    return <></>;
  };

  const addObject = () => {
    const objectsCount = objects.length;

    if (objectsCount < limitObjects) {
      const hitPos = hitTestRef.current.position;
      const clonedElement = cloneElement(
        Obj(),
        {
          key: objectsCount,
          position: [
            hitPos.x + offset.x,
            hitPos.y + offset.y,
            hitPos.z + offset.z
          ]
        }
      );
      setObjects((prev) => [
        ...prev,
        clonedElement
      ]);
    }
  };

  const onSelect = (event) => {
    addObject();
  };

  const Events = () => {
    useXREvent('select', onSelect);
  };

  const onSessionEnd = (event) => {
    setObjects([]);
  };

  const objOnSelect = (event) => {
    event.intersection.object.__r3f.parent.children[0].__r3f.handlers.onClick();
  };

  return (
    <>
      <Canvas
        className="AR-preview"
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: true,
          stencil: false,
          depth: true
        }}
      >
        <AdaptiveDpr pixelated />
        <XR
          referenceSpace="local"
          onSessionEnd={onSessionEnd}
        >
          <Controllers />
          {
            objects.length < limitObjects
            ? <HitTest />
            : <></>
          }
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
          {
            objects.length < limitObjects
            ? <>
                {[...objects]}
                <Events />
              </>
            : <Interactive onSelect={objOnSelect}>
                {[...objects]}
              </Interactive>
          }
        </XR>
      </Canvas>
    </>
  );
};

export default App;