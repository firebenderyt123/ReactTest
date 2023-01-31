import * as THREE from "three";
import { useState, useMemo } from 'react';
import { useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

import { useHeart } from "../../models/Heart";

const config = {
  mass: 1,
  friction: 1,
  tension: 100
};

export const HeartObj = () => {

  const heartMat = useMemo(
    () => new THREE.MeshPhongMaterial({
      color: 0xff3366,
      flatShading: true,
      emissive: 0xff0000,
      emissiveIntensity: 20,
      toneMapped: false
    }), []
  );

  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { scale } = useSpring({
    scale: clicked ? (active ? 0.14 : 0.13) : (active ? 0.11 : 0.1),
    config: config
  });

  const elem = useHeart({
    material: heartMat,
    position: [0, 0, 0],
    rotation: [110, 0, 0],
    onClick: () => setClicked((c) => !c),
    scale: scale
  });
  
  useFrame((state, delta) => {
    setInterval(() => setActive((a) => !a), 2);
    elem.ref.current.rotation.y += -delta * 1;
  });

  return elem;
};