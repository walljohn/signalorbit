"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePointerVector } from "@/lib/hooks";
import type { RenderTier } from "@/lib/hooks";

/* ------------------------------------------------------------------ *
 * Deterministic pseudo-randomness so the constellation looks the same
 * on every load rather than reshuffling on each mount.
 * ------------------------------------------------------------------ */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CORE_COLOR = new THREE.Color("#bcdcff");
const NODE_COLOR = new THREE.Color("#8ec9ff");
const LINK_NEAR = new THREE.Color("#4da3ff");

type RingSpec = {
  radius: number;
  count: number;
  tilt: [number, number, number];
  speed: number;
};

function ringSpecs(tier: RenderTier): RingSpec[] {
  const dense = tier === "high";
  return [
    { radius: 2.45, count: dense ? 9 : 6, tilt: [0.42, 0, 0.16], speed: 0.052 },
    { radius: 3.55, count: dense ? 12 : 8, tilt: [-0.28, 0.6, -0.3], speed: -0.037 },
    { radius: 4.7, count: dense ? 15 : 9, tilt: [0.74, -0.4, 0.5], speed: 0.026 },
  ];
}

/** Soft radial sprite used for every glow in the scene. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(206,232,255,1)");
      gradient.addColorStop(0.06, "rgba(178,216,255,0.95)");
      gradient.addColorStop(0.16, "rgba(126,190,255,0.42)");
      gradient.addColorStop(0.34, "rgba(77,163,255,0.12)");
      gradient.addColorStop(0.62, "rgba(77,163,255,0.028)");
      gradient.addColorStop(1, "rgba(77,163,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/* ------------------------------------------------------------------ *
 * The client business at the centre of the system.
 * ------------------------------------------------------------------ */
function Core({ glow }: { glow: THREE.Texture }) {
  const shell = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Sprite>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.y = t * 0.09;
      shell.current.rotation.x = Math.sin(t * 0.16) * 0.16;
    }
    if (halo.current) {
      const s = 4.6 + Math.sin(t * 0.7) * 0.24;
      halo.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <sprite ref={halo} scale={[5.2, 5.2, 5.2]}>
        <spriteMaterial
          map={glow}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Tight inner bloom keeps the centre reading as a light source rather
          than a grey disc once the wide halo is layered under it. */}
      <sprite scale={[1.75, 1.75, 1.75]}>
        <spriteMaterial
          map={glow}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <mesh>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshBasicMaterial color={CORE_COLOR} toneMapped={false} />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial
          color={LINK_NEAR}
          wireframe
          transparent
          opacity={0.28}
          toneMapped={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.1, 0, 0.3]}>
        <torusGeometry args={[1.15, 0.004, 8, 128]} />
        <meshBasicMaterial color={LINK_NEAR} transparent opacity={0.3} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, 0.7, -0.2]}>
        <torusGeometry args={[1.42, 0.003, 8, 128]} />
        <meshBasicMaterial color={LINK_NEAR} transparent opacity={0.18} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * One orbital ring: prospect nodes, their links to the centre, and the
 * signal pulses travelling inward along those links.
 * ------------------------------------------------------------------ */
function Ring({
  spec,
  seed,
  glow,
}: {
  spec: RingSpec;
  seed: number;
  glow: THREE.Texture;
}) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.Points>(null);

  const { nodes, linkGeometry, pulseGeometry, offsets } = useMemo(() => {
    const rand = mulberry32(seed);
    const nodes: { position: THREE.Vector3; size: number }[] = [];

    for (let i = 0; i < spec.count; i += 1) {
      const angle = (i / spec.count) * Math.PI * 2 + rand() * 0.22;
      const radius = spec.radius + (rand() - 0.5) * 0.34;
      nodes.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          (rand() - 0.5) * 0.42,
          Math.sin(angle) * radius,
        ),
        size: 0.045 + (rand() < 0.22 ? 0.032 : 0) + rand() * 0.012,
      });
    }

    // Links: one segment per node, brightest where it meets the centre.
    const positions = new Float32Array(nodes.length * 6);
    const colors = new Float32Array(nodes.length * 6);
    nodes.forEach((node, i) => {
      positions.set([0, 0, 0], i * 6);
      positions.set([node.position.x, node.position.y, node.position.z], i * 6 + 3);
      colors.set([LINK_NEAR.r * 1.0, LINK_NEAR.g * 1.0, LINK_NEAR.b * 1.0], i * 6);
      colors.set([LINK_NEAR.r * 0.05, LINK_NEAR.g * 0.08, LINK_NEAR.b * 0.14], i * 6 + 3);
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
      // Travel outward-to-inward: the prospect signalling the business.
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
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>

      <points ref={pulses} geometry={pulseGeometry}>
        <pointsMaterial
          map={glow}
          size={0.24}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>

      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          <mesh>
            <sphereGeometry args={[node.size * 0.8, 12, 12]} />
            <meshBasicMaterial color={NODE_COLOR} toneMapped={false} />
          </mesh>
          <sprite scale={[node.size * 7, node.size * 7, node.size * 7]}>
            <spriteMaterial
              map={glow}
              transparent
              opacity={1}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        </group>
      ))}
    </group>
  );
}

/** Very sparse, very dim depth cue behind the network. */
function Dust({ count, glow }: { count: number; glow: THREE.Texture }) {
  const geometry = useMemo(() => {
    const rand = mulberry32(9001);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 11 + rand() * 16;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        map={glow}
        size={0.22}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * Scene root: cursor parallax, cinematic drift, responsive framing.
 * ------------------------------------------------------------------ */
function System({ tier, split }: { tier: RenderTier; split: boolean }) {
  const outer = useRef<THREE.Group>(null);
  const glow = useGlowTexture();
  const pointer = usePointerVector(true);
  const specs = useMemo(() => ringSpecs(tier), [tier]);
  const { viewport } = useThree();

  // Nudge the system off-centre on wide layouts so the headline column keeps
  // clean, uncluttered space to sit in.
  const offsetX = split ? Math.min(viewport.width * 0.24, 3.6) : 0;
  const offsetY = split ? 0 : -viewport.height * 0.3;
  const scale = split ? 1 : 0.58;

  useFrame((_, delta) => {
    if (!outer.current) return;
    const damp = 1 - Math.pow(0.0015, delta);
    const targetY = pointer.current.x * 0.26;
    const targetX = pointer.current.y * 0.16;
    outer.current.rotation.y += (targetY - outer.current.rotation.y) * damp;
    outer.current.rotation.x += (targetX - outer.current.rotation.x) * damp;
  });

  return (
    <group position={[offsetX, offsetY, 0]} scale={scale}>
      <group ref={outer}>
        <Core glow={glow} />
        {specs.map((spec, i) => (
          <Ring key={i} spec={spec} seed={1337 + i * 77} glow={glow} />
        ))}
        <Dust count={tier === "high" ? 420 : 180} glow={glow} />
      </group>
    </group>
  );
}

/** Slow breathing applied to the camera for a cinematic feel. */
function DriftingCamera() {
  const camera = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ clock }) => {
    const cam = camera.current;
    if (!cam) return;
    const t = clock.elapsedTime;
    cam.position.y = 0.35 + Math.sin(t * 0.19) * 0.16;
    cam.position.x = Math.sin(t * 0.11) * 0.22;
    cam.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={camera}
      makeDefault
      position={[0, 0.35, 9.6]}
      fov={42}
      near={0.1}
      far={60}
    />
  );
}

export default function OrbitScene({
  tier,
  split,
  paused,
}: {
  tier: RenderTier;
  split: boolean;
  paused: boolean;
}) {
  return (
    <Canvas
      flat
      frameloop={paused ? "never" : "always"}
      dpr={tier === "high" ? [1, 1.9] : [1, 1.4]}
      gl={{ antialias: tier === "high", powerPreference: "high-performance", alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#04060a", 17, 42]} />
      <DriftingCamera />
      <System tier={tier} split={split} />
    </Canvas>
  );
}
