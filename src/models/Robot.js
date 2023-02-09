import { useRef, useEffect, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from "@react-three/drei";

const modelPath = "/robot.glb";

export function Robot(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(modelPath);
  const { ref, actions, names, mixer } = useAnimations(animations, group);
  const [index, setIndex] = useState(0);

  useFrame((state, delta) => {
    mixer.update(delta);
  });
  
  useEffect(() => {
    if (actions) {
      // Reset and fade in animation after an index has been changed
      actions[names[index]].reset().fadeIn(0.5).play();
      // In the clean-up phase, fade it out
      return () => actions[names[index]].fadeOut(0.5);
    }
  }, [index, actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          onClick={() => setIndex((index + 1) % names.length)}
          name="Armature"
          position={[0, 0, 30]}
          rotation={[-Math.PI/5, Math.PI, 0]}
        >
          <primitive object={nodes.head} />
          <primitive object={nodes.root006} />
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.BodyMaterial}
            skeleton={nodes.body.skeleton}
          />
          <skinnedMesh
            name="head_1"
            geometry={nodes.head_1.geometry}
            material={materials.HeadMaterial}
            skeleton={nodes.head_1.skeleton}
          >
            <skinnedMesh
              name="lefteye"
              geometry={nodes.lefteye.geometry}
              material={materials["EyeMaterial.001"]}
              skeleton={nodes.lefteye.skeleton}
            />
            <skinnedMesh
              name="mouth"
              geometry={nodes.mouth.geometry}
              material={materials.MouthMaterial}
              skeleton={nodes.mouth.skeleton}
            />
            <skinnedMesh
              name="righteye"
              geometry={nodes.righteye.geometry}
              material={materials.EyeMaterial}
              skeleton={nodes.righteye.skeleton}
            />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);

