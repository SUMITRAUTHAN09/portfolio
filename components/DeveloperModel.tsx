"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import SumnexTechMarquee from "./SumnexTechMarquee";

function Model() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/developer.glb"); // put your model in public/models

 useFrame((state, delta) => {
  if (!modelRef.current) return;

  const { x, y } = state.mouse;

  // Slow automatic rotation
  modelRef.current.rotation.y += delta * 1.5;

  // Smooth mouse interaction
  modelRef.current.rotation.y += (x * 0.1 - modelRef.current.rotation.y) * 0.02;
  modelRef.current.rotation.x += (-y * 0.1 - modelRef.current.rotation.x) * 0.02;
});

  return <primitive ref={modelRef} object={scene} scale={1.50} />;
}

export default function DeveloperModel() {
  return (
    <div className="w-full md:h-[500px] h-[350px]">
      <Canvas camera={{ position: [1, 2, 5], fov: 40
       }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 20]} />

        <Model />
      </Canvas>
      <SumnexTechMarquee/>
    </div>
  );
}
