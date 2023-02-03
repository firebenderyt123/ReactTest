import { useMemo, useEffect } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const CameraController = () => {
  const { camera, gl } = useThree();
  const controls = useMemo(() => new OrbitControls(camera, gl.domElement), [camera, gl]);
  useEffect(
    () => {
      controls.minDistance = 200;
      controls.maxDistance = 600;
      controls.enablePan = false;
      controls.rotateSpeed = .5;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );

  useFrame((state) => {
    controls.enableDamping = true;
    controls.dampingFactor = .1;
    controls.update();
  });

  return null;
};