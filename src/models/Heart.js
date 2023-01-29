import * as THREE from "three";
import { useRef } from "react";
import { animated } from "@react-spring/three";

export const Heart = ({material, ...props}) => {
  const heartShape = new THREE.Shape();

  heartShape.moveTo(25, 25);
  heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
  heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
  heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
  heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
  heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
  heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);
  heartShape.moveTo(0, 0);

  const extrudeSettings = {
    depth: 8,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1
  };

  const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  if (material == undefined)
    material = new THREE.MeshPhongMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  const ref = useRef(mesh);

  geometry.center();

  return (
    <animated.mesh
      ref={ref}
      geometry={geometry}
      material={material}
      {...props}
    />
  );
};