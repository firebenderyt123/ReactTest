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

export const HeartObj = ({
  color=0xff3366,
  emissive=0xff0000,
  emissiveIntensity=20,
  position=[0, 0, 0],
  rotation=[110, 0, 0],
  scaleKoef=1
}) => {

  const heartMat = useMemo(
    () => new THREE.MeshPhongMaterial({
      color: color,
      flatShading: true,
      emissive: emissive,
      emissiveIntensity: emissiveIntensity,
      toneMapped: false
    }), [color, emissive, emissiveIntensity]
  );

  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { scale } = useSpring({
    scale: clicked ? (active ? 1.4 * scaleKoef : 1.3 * scaleKoef) : (active ? 1.1 * scaleKoef : 1 * scaleKoef),
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