"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

function Lens({
  position,
  color
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.42 + position[0]) * 0.18;
    ref.current.rotation.x = Math.cos(clock.elapsedTime * 0.34 + position[0]) * 0.08;
  });

  return (
    <group position={position}>
      <mesh scale={[1.03, 1.03, 0.03]}>
        <sphereGeometry args={[1.55, 72, 72]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      <mesh ref={ref} scale={[1, 1, 0.08]}>
        <sphereGeometry args={[1.55, 72, 72]} />
        <MeshTransmissionMaterial
          backside
          chromaticAberration={0.14}
          color={color}
          distortion={0.2}
          roughness={0.04}
          thickness={0.55}
          transmission={0.82}
          transparent
        />
      </mesh>
    </group>
  );
}

function LensRig({ pointer }: { pointer: { x: number; y: number } }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = pointer.x * 0.18;
    group.current.rotation.x = -pointer.y * 0.1;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.52) * 0.08;
  });

  return (
    <group ref={group}>
      <Lens position={[-1.35, 0.1, 0]} color="#19b9ff" />
      <Lens position={[0, 0, 0.18]} color="#df3bff" />
      <Lens position={[1.35, -0.1, 0]} color="#ff8a25" />
    </group>
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function LensScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [webgl] = useState(() => (typeof document === "undefined" ? true : canUseWebGL()));
  const [reduced] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "160px"
    });

    const current = wrapper.current;
    if (current) observer.observe(current);

    const onVisibility = () => setActive(document.visibilityState === "visible" && Boolean(current));
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  function move(clientX: number, clientY: number) {
    const rect = wrapper.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: (clientX - rect.left) / rect.width - 0.5,
      y: (clientY - rect.top) / rect.height - 0.5
    });
  }

  if (!webgl || reduced) {
    return (
      <div className="lensScene" ref={wrapper} aria-hidden="true">
        <div className="lensFallback">
          <span className="fallbackLens blue" />
          <span className="fallbackLens pink" />
          <span className="fallbackLens orange" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="lensScene"
      ref={wrapper}
      aria-hidden="true"
      onPointerMove={(event) => move(event.clientX, event.clientY)}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (touch) move(touch.clientX, touch.clientY);
      }}
    >
      {active ? (
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.35]} gl={{ preserveDrawingBuffer: true }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[2, 3, 5]} intensity={3} color="#f7f0df" />
        <LensRig pointer={pointer} />
      </Canvas>
      ) : (
        <div className="lensFallback">
          <span className="fallbackLens blue" />
          <span className="fallbackLens pink" />
          <span className="fallbackLens orange" />
        </div>
      )}
    </div>
  );
}
