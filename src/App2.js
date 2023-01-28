import * as THREE from "three";
import { createRef, useRef, useMemo, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

export const App = () => (
  <Canvas
    shadows
    dpr={[1, 2]}
    camera={{
      position: [0, 0, 400],
      fov: 75,
      near: 1,
      far: 1000
    }}
  >
    <ambientLight color="#999" />
    <directionalLight
      intensity={1}
      position={[1, 0, 0]}
      color="#fff"
    />
    <directionalLight
      intensity={1}
      position={[0.75, 1, 0.5]}
      color="#11e8bb"
    />
    <directionalLight
      intensity={1}
      position={[-0.75, -1, 0.5]}
      color="#8200c9"
    />
    {/*<CentralObject />*/}
    <Particles count={1000} />
    {/*<Physics>
      <Objects />
    </Physics>*/}
  </Canvas>
);

const CentralObject = () => {
  const ref1 = useRef();
  const ref2 = useRef();

  const geom1 = new THREE.IcosahedronGeometry(7, 1);
  const geom2 = new THREE.IcosahedronGeometry(15, 1);

  const mat1 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true
  });
  const mat2 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });

  return (
    <>
      <mesh
        ref={ref1}
        geometry={geom1}
        material={mat1}
        scale={[16, 16, 16]}
      />
      <mesh
        ref={ref2}
        geometry={geom2}
        material={mat2}
        scale={[10, 10, 10]}
      />
    </>
  );
};

const Particles = (props) => {
  const { count } = props;
  // const { scene } = useThree();

  const geometry = new THREE.TetrahedronGeometry(2, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true
  });

  // const geometry = new THREE.SphereGeometry(1, 32, 32);
  // const material = new THREE.MeshStandardMaterial({ color: "red", roughness: 0, envMapIntensity: 0.2, emissive: "#370037" });

  const rfs = THREE.MathUtils.randFloatSpread;
  const meshRef = useRef(null);

  const position = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++) {
        pos.push(rfs(500), rfs(500), rfs(500));
    }
    return pos;
  }, [count]);

  useEffect(() => {
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < count; i++) {
        matrix.setPosition(position[i * 3], position[i * 3 + 1], position[i * 3 + 2]);
        meshRef.current.setMatrixAt(i, matrix);
    }
  }, [count, position]);

  console.log(meshRef);

  return (
    <instancedMesh
      ref={meshRef}
      castShadow receiveShadow
      args={[null, null, count]}
    >
      <boxGeometry args={[100, 100, 100]}>
          <instancedBufferAttribute
              attachObject={['attributes', 'a_pos']}
              args={[Float32Array.from(position), 3]}
          />
      </boxGeometry>
    </instancedMesh>
  );
};

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('root').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  circle = new THREE.Object3D();
  skelet = new THREE.Object3D();
  particle = new THREE.Object3D();

  scene.add(circle);
  scene.add(skelet);
  scene.add(particle);

  var geometry = new THREE.TetrahedronGeometry(2, 0);
  var geom = new THREE.IcosahedronGeometry(7, 1);
  var geom2 = new THREE.IcosahedronGeometry(15, 1);

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  var mat2 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide

  });

  var planet = new THREE.Mesh(geom, mat);
  planet.scale.x = planet.scale.y = planet.scale.z = 16;
  circle.add(planet);

  var planet2 = new THREE.Mesh(geom2, mat2);
  planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
  skelet.add(planet2);

  var ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);
  
  var lights = [];
lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
lights[0].position.set( 1, 0, 0 );
lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
lights[1].position.set( 0.75, 1, 0.5 );
lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
lights[2].position.set( -0.75, -1, 0.5 );
scene.add( lights[0] );
scene.add( lights[1] );
scene.add( lights[2] );
  

  window.addEventListener('resize', onWindowResize, false);

};

function animate() {
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  circle.rotation.x -= 0.0020;
  circle.rotation.y -= 0.0030;
  skelet.rotation.x -= 0.0010;
  skelet.rotation.y += 0.0020;
  renderer.clear();

  renderer.render( scene, camera )
};
