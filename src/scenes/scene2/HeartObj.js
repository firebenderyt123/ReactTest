import * as THREE from "three";
import { useState, useMemo } from 'react';
import { useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

import { useHeart } from "../../models/Heart";

const distance = 10;
const config = {
  mass: 1,
  friction: 1, // 15,
  tension: 100 // 20
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
    scale: clicked ? (active ? 1.4 : 1.3) : (active ? 1.1 : 1),
    config: config
  });

  // console.log(config);

  const elem = useHeart({
    material: heartMat,
    position: [0, 10 + distance, 0],
    rotation: [110, 0, 0],
    onClick: () => setClicked(!clicked),
    scale: scale
  });
  
  // const [timer, setTimer] = useState(0);
  const [passedTime, setPassedTime] = useState(0);
  useFrame((state, delta) => {
    // if (timer < 2) {
    //   setTimer(timer + delta);
    // } else {
    //   setActive(!active);
    //   setTimer(0);
    // }
    setInterval(() => setActive(!active), 2);
    elem.ref.current.position.y += -delta * distance * Math.sin(passedTime) * 2;
    elem.ref.current.rotation.y += -delta * 1;
    setPassedTime(passedTime + delta);
  });

  return elem;
};