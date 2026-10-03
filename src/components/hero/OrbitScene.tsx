"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";
import { usePointerVector } from "@/lib/hooks";
import type { RenderTier } from "@/lib/hooks";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Dark cinematic palette — bright nodes on charcoal, not soft blue paper diagram */
const GROUND = "#07090d";
const CORE_COLOR = new THREE.Color("#f7f4ef");
const NODE_COLOR = new THREE.Color("#b33a2b");
const NODE_DEEP = new THREE.Color("#f7f4ef");
const LINK_NEAR = new THREE.Color("#b33a2b");
const LINK_FAR = new THREE.Color("#3a3428");

type RingSpec = {
  radius: number;
  count: number;
  tilt: [number, number, number];
  speed: number;
};

/** Mobile / low tier keeps a sparse orbital field; high stays cinematic but not dense. */
function ringSpecs(tier: RenderTier): RingSpec[] {
  if (tier === "low") {
    return [
      { radius: 2.45, count: 4, tilt: [0.42, 0, 0.16], speed: 0.038 },
      { radius: 3.55, count: 5, tilt: [-0.28, 0.6, -0.3], speed: -0.028 },
      { radius: 4.7, count: 6, tilt: [0.74, -0.4, 0.5], speed: 0.02 },
    ];
  }
  return [
    { radius: 2.45, count: 7, tilt: [0.42, 0, 0.16], speed: 0.048 },
    { radius: 3.55, count: 9, tilt: [-0.28, 0.6, -0.3], speed: -0.034 },
    { radius: 4.7, count: 10, tilt: [0.74, -0.4, 0.5], speed: 0.024 },
  ];
}

function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.55, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Core({ dot }: { dot: THREE.Texture }) {
  const shell = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.y = t * 0.07;
      shell.current.rotation.x = Math.sin(t * 0.12) * 0.1;
    }
  });

  return (
    <group>
      <sprite scale={[3.4, 3.4, 3.4]}>
        <spriteMaterial map={dot} color={NODE_COLOR} transparent opacity={0.22} depthWrite={false} />
      </sprite>

      <mesh>
        <sphereGeometry args={[0.155, 32, 32]} />
        <meshBasicMaterial color={CORE_COLOR} toneMapped={false} />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[0.66, 1]} />
        <meshBasicMaterial color={NODE_COLOR} wireframe transparent opacity={0.45} toneMapped={false} />
      </mesh>

      <mesh rotation={[Math.PI / 2.1, 0, 0.3]}>
        <torusGeometry args={[1.15, 0.005, 8, 128]} />
        <meshBasicMaterial color={NODE_COLOR} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, 0.7, -0.2]}>
        <torusGeometry args={[1.42, 0.004, 8, 128]} />
        <meshBasicMaterial color={NODE_COLOR} transparent opacity={0.32} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Ring({ spec, seed, dot }: { spec: RingSpec; seed: number; dot: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.Points>(null);

  const { nodes, linkGeometry, pulseGeometry, offsets } = useMemo(() => {
    const rand = mulberry32(seed);
    const nodes: { position: THREE.Vector3; size: number; deep: boolean }[] = [];

    for (let i = 0; i < spec.count; i += 1) {
      const angle = (i / spec.count) * Math.PI * 2 + rand() * 0.22;
      const radius = spec.radius + (rand() - 0.5) * 0.34;
      const deep = rand() < 0.26;
      nodes.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          (rand() - 0.5) * 0.42,
          Math.sin(angle) * radius,
        ),
        size: deep ? 0.055 : 0.038,
        deep,
      });
    }

    const positions = new Float32Array(nodes.length * 6);
    const colors = new Float32Array(nodes.length * 6);
    nodes.forEach((node, i) => {
      positions.set([0, 0, 0], i * 6);
      positions.set([node.position.x, node.position.y, node.position.z], i * 6 + 3);
      colors.set([LINK_NEAR.r, LINK_NEAR.g, LINK_NEAR.b], i * 6);
      colors.set([LINK_FAR.r, LINK_FAR.g, LINK_FAR.b], i * 6 + 3);
    });
    const linkGeometry = new THREE.BufferGeometry();
    linkGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    linkGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(nodes.length * 3), 3),
    );

    const offsets = nodes.map(() => rand());

    return { nodes, linkGeometry, pulseGeometry, offsets };
  }, [spec, seed]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = t * spec.speed;
    }

    if (!pulses.current) return;
    const attribute = pulses.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;

    for (let i = 0; i < nodes.length; i += 1) {
      const raw = (t * 0.13 + offsets[i]) % 1;
      const eased = raw * raw * (3 - 2 * raw);
      const k = 1 - eased;
      const p = nodes[i].position;
      array[i * 3] = p.x * k;
      array[i * 3 + 1] = p.y * k;
      array[i * 3 + 2] = p.z * k;
    }
    attribute.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={spec.tilt}>
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.7} depthWrite={false} toneMapped={false} />
      </lineSegments>

      <points ref={pulses} geometry={pulseGeometry}>
        <pointsMaterial
          map={dot}
          color={NODE_COLOR}
          size={0.085}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshBasicMaterial color={node.deep ? NODE_DEEP : NODE_COLOR} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * One strong product moment: scroll drives scale + yaw + depth parallax;
 * pointer adds a soft tilt on the same rig. Ambient ring spin stays quiet.
 */
function System({
  tier,
  scroll,
}: {
  tier: RenderTier;
  scroll: MutableRefObject<number>;
}) {
  const outer = useRef<THREE.Group>(null);
  const rig = useRef<THREE.Group>(null);
  const dot = useDotTexture();
  const pointer = usePointerVector(true);
  const specs = useMemo(() => ringSpecs(tier), [tier]);
  const { viewport } = useThree();

  const baseScale = Math.min(1.15, Math.max(0.72, viewport.width / 14));

  useFrame((_, delta) => {
    if (!outer.current || !rig.current) return;

    const s = scroll.current;
    // Ease into the scroll response so the first flick feels deliberate.
    const scrollEase = s * s * (3 - 2 * Math.min(s, 1));

    const damp = 1 - Math.pow(0.0012, delta);

    // Pointer tilt — readable, not twitchy.
    const targetTiltY = pointer.current.x * 0.38;
    const targetTiltX = pointer.current.y * 0.22;

    outer.current.rotation.y += (targetTiltY - outer.current.rotation.y) * damp;
    outer.current.rotation.x += (targetTiltX - outer.current.rotation.x) * damp;

    // Scroll: scale up, yaw the field, and sink/parallax as you leave the hero.
    const targetScale = baseScale * (1 + scrollEase * 0.42);
    const targetYaw = scrollEase * 0.85;
    const targetZ = -scrollEase * 1.65;
    const targetY = -scrollEase * 0.55;

    const cur = rig.current.scale.x;
    const nextScale = cur + (targetScale - cur) * damp;
    rig.current.scale.setScalar(nextScale);
    rig.current.rotation.y += (targetYaw - rig.current.rotation.y) * damp;
    rig.current.position.z += (targetZ - rig.current.position.z) * damp;
    rig.current.position.y += (targetY - rig.current.position.y) * damp;
  });

  return (
    <group ref={rig} position={[0, 0.15, 0]} scale={baseScale}>
      <group ref={outer}>
        <Core dot={dot} />
        {specs.map((spec, i) => (
          <Ring key={i} spec={spec} seed={1337 + i * 77} dot={dot} />
        ))}
      </group>
    </group>
  );
}

function ProductCamera({ scroll }: { scroll: MutableRefObject<number> }) {
  const camera = useRef<THREE.PerspectiveCamera>(null);

  useFrame((_, delta) => {
    const cam = camera.current;
    if (!cam) return;
    const s = scroll.current;
    const scrollEase = s * s * (3 - 2 * Math.min(s, 1));
    const damp = 1 - Math.pow(0.0015, delta);

    // Subtle dolly tied to the same scroll moment — no free-floating drift.
    const targetZ = 10.2 - scrollEase * 1.1;
    const targetY = 0.18 + scrollEase * 0.35;
    cam.position.z += (targetZ - cam.position.z) * damp;
    cam.position.y += (targetY - cam.position.y) * damp;
    cam.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera ref={camera} makeDefault position={[0, 0.18, 10.2]} fov={40} near={0.1} far={60} />
  );
}

export default function OrbitScene({
  tier,
  paused,
  scroll,
}: {
  tier: RenderTier;
  /** Kept for API compatibility; hero is always centered. */
  mode?: "hero";
  split?: boolean;
  paused: boolean;
  scroll: MutableRefObject<number>;
}) {
  return (
    <Canvas
      flat
      frameloop={paused ? "never" : "always"}
      dpr={tier === "high" ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: tier === "high", powerPreference: "high-performance", alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={[GROUND, 14, 40]} />
      <ProductCamera scroll={scroll} />
      <System tier={tier} scroll={scroll} />
    </Canvas>
  );
}
