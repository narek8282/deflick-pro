"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Lens({
  position,
  color,
  speed
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * speed;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * speed) * 0.22;
  });

  return (
    <Float speed={1.4 + speed} floatIntensity={0.9} rotationIntensity={0.45}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          chromaticAberration={0.18}
          color={color}
          distortion={0.35}
          roughness={0.08}
          thickness={0.8}
          transmission={0.78}
          transparent
        />
      </mesh>
    </Float>
  );
}

export function LensScene() {
  return (
    <div className="lensScene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.6]}>
        <ambientLight intensity={1.2} />
        <pointLight position={[2, 3, 5]} intensity={3} color="#f7f0df" />
        <Lens position={[-1.45, 0.2, 0]} color="#13baff" speed={0.28} />
        <Lens position={[0, 0, 0.2]} color="#e532ff" speed={0.34} />
        <Lens position={[1.45, -0.15, 0]} color="#ff8a22" speed={0.24} />
      </Canvas>
    </div>
  );
}
