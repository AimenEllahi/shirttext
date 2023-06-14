import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { suspend } from "suspend-react";
import {
  useGLTF,
  useCursor,
  useTexture,
  Text,
  Decal,
  Environment,
  OrbitControls,
  RenderTexture,
  RandomizedLight,
  PerspectiveCamera,
  AccumulativeShadows,
  Html,
} from "@react-three/drei";
import { useControls } from "leva";

const bunny = import("./cloth_jacket.glb");

function Bun(props) {
  const textRef = useRef();
  const [text, setText] = useState("hello");
  const [pmndrs, react, three] = useTexture([
    "/pmndrs.png",
    "/react.png",
    "/three.png",
  ]);

  const { position, rotation } = useControls({
    position: { value: [0, 0, 0], step: 0.2 },
    rotation: { value: [0, 0, 0], step: 0.2 },
    //add text
    text: { value: "hello", step: 0.2 },
  });

  const scene = useGLTF("/cloth_jacket.glb");

  console.log(scene);
  const { nodes, materials } = useGLTF("/cloth_jacket-transformed.glb");
  // useFrame(
  //   (state) =>
  //     (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 5.5)
  // );
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.JacketAndShirt}
        position={[0, -6, -2]}
      >
        {/* <meshStandardMaterial color='black' roughness={0} metalness={0.5} /> */}
        {/* <Decal position={position} rotation={rotation} scale={[0.9, 0.25, 1]}>
          <meshStandardMaterial
            roughness={0.6}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
          >
            <RenderTexture attach='map' anisotropy={16}>
              {/* <PerspectiveCamera
                makeDefault
                manual
                aspect={0.9 / 0.25}
                position={[0, 0, 5]}
              /> */}
        {/* <color attach='background' args={["#af2040"]} /> */}
        {/* <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <Text
                rotation={[0, Math.PI, 0]}
                ref={textRef}
                fontSize={4}
                color='white'
                position={[0, 0, 0]}
              >
                hello from drei
              </Text>
              <Dodecahedron />
            </RenderTexture>
          </meshStandardMaterial>
        </Decal>  */}
        {/* <Decal
          position={position}
          rotation={rotation}
          scale={0.02}
          map={pmndrs}
          map-anisotropy={16}
        /> */}
        <Decal
          position={[0.6, 6.2, 0.2]}
          rotation={rotation}
          scale={0.5}
          map={react}
          map-anisotropy={16}
        >
          <meshStandardMaterial
            roughness={0.1}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
            position={[0, -10, 0]}
          >
            <RenderTexture attach='map' anisotropy={16}>
              <PerspectiveCamera makeDefault manual position={[0, 0, 10]} />
              {/* <color attach='background' args={["#af2040"]} /> */}
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              <Text
                rotation={[0, 0, 0]}
                ref={textRef}
                fontSize={2}
                color='white'
                position={[0, 0, 0]}
              >
                {text}
              </Text>
              {/* <Dodecahedron /> */}
            </RenderTexture>
          </meshStandardMaterial>
        </Decal>
      </mesh>
      <Html>
        <input type='text' onChange={(e) => setText(e.target.value)}></input>
      </Html>
    </group>
  );
}

// <mesh
//   castShadow
//   receiveShadow
//   // geometry={nodes.mesh.geometry}
//   {...props}
//   dispose={null}
// >
//   <meshStandardMaterial color='black' roughness={0} metalness={0.5} />
//   <Decal
//     position={[0, 0, 0.75]}
//     rotation={[-0.4, Math.PI, 0]}
//     scale={[0.9, 0.25, 1]}
//   >
//     <meshStandardMaterial
//       roughness={0.6}
//       transparent
//       polygonOffset
//       polygonOffsetFactor={-10}
//     >
//       <RenderTexture attach='map' anisotropy={16}>
//         <PerspectiveCamera
//           makeDefault
//           manual
//           aspect={0.9 / 0.25}
//           position={[0, 0, 5]}
//         />
//         <color attach='background' args={["#af2040"]} />
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} />
//         <Text
//           rotation={[0, Math.PI, 0]}
//           ref={textRef}
//           fontSize={4}
//           color='white'
//         >
//           hello from drei
//         </Text>
//         <Dodecahedron />
//       </RenderTexture>
//     </meshStandardMaterial>
//   </Decal>
//   <Decal
//     position={[-0.7, 0.55, 0.3]}
//     rotation={[1, 0, Math.PI]}
//     scale={0.2}
//     map={pmndrs}
//     map-anisotropy={16}
//   />
//   <Decal
//     position={[0.2, 0.2, 0.2]}
//     rotation={0}
//     scale={0.25}
//     map={react}
//     map-anisotropy={16}
//   />
// </mesh>

function Dodecahedron(props) {
  const meshRef = useRef();
  const texture = useTexture("/react.png");
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useCursor(hovered);
  useFrame(
    (state, delta) =>
      (meshRef.current.rotation.x = meshRef.current.rotation.y += delta)
  );
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={clicked ? 2.25 : 1.75}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <dodecahedronGeometry args={[0.75]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "goldenrod"} />
      <Decal
        position={[0, -0.2, 0.5]}
        scale={0.75}
        map={texture}
        map-anisotropy={16}
      />
    </mesh>
  );
}

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas shadows camera={{ position: [-5, 5, 10], fov: 15 }}>
        <ambientLight intensity={0.25} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -5, -10]} />
        <group position={[0, -0.75, 0]}>
          <Bun position={[0, 0.9, 0]} />
          <AccumulativeShadows
            frames={80}
            color='black'
            opacity={1}
            scale={12}
            position={[0, 0.04, 0]}
          >
            <RandomizedLight
              amount={8}
              radius={5}
              ambient={0.5}
              position={[5, 5, -10]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </group>
        <Environment preset='city' resolution={512} />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default App;
