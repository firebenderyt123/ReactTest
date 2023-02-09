import { useMemo, useEffect } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const CameraController = () => {
  const { camera, gl } = useThree();
  const controls = useMemo(() => new OrbitControls(camera, gl.domElement), [camera, gl]);
  useEffect(
    () => {
      controls.minDistance = 10;
      controls.maxDistance = 100;
      controls.enablePan = false;
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