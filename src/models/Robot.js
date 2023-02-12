import { useRef, useEffect, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from "@react-three/drei";

const modelPath = "/robot.glb";

export function Robot(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(modelPath);
  const { ref, actions, mixer } = useAnimations(animations, group);
  const [index, setIndex] = useState(0);

  const names = ["Init", "Hello"];

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[names[index]].reset().fadeIn(0.5).setEffectiveTimeScale(2).play();
    // In the clean-up phase, fade it out
    return () => actions[names[index]].fadeOut(0.5).stop();
  }, [index, actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" onClick={() => setIndex((index + 1) % names.length)}>
        <group
          name="Armature"
          rotation={[-Math.PI/5, Math.PI, 0]}
        >
          <primitive object={nodes.head} />
          <primitive object={nodes.root006} />
          <skinnedMesh
            name="head_1"
            geometry={nodes.head_1.geometry}
            material={materials.HeadMaterial}
            skeleton={nodes.head_1.skeleton}
          >
            <skinnedMesh
              name="mouth"
              geometry={nodes.mouth.geometry}
              material={materials.MouthMaterial}
              skeleton={nodes.mouth.skeleton}
            />
            <skinnedMesh
              name="righteye_1"
              geometry={nodes.righteye_1.geometry}
              material={materials.EyeMaterial}
              skeleton={nodes.righteye_1.skeleton}
            />
            <skinnedMesh
              name="lefteye_1"
              geometry={nodes.lefteye_1.geometry}
              material={materials["EyeMaterial.001"]}
              skeleton={nodes.lefteye_1.skeleton}
            />
          </skinnedMesh>
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.BodyMaterial}
            skeleton={nodes.body.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
