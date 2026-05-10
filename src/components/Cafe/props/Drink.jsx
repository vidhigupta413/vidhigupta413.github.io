import React, { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { favoriteDrinks } from '../../../data/portfolio.js';

// A single iced-coffee / drink mesh on a customer's table.
//
// Easter-egg behavior: clicking the cup briefly pops a small floating HTML
// tooltip with the drink's name + note. This DOES NOT open a main UI modal —
// it's a tiny moment of delight. Tooltip auto-dismisses after ~2.5s.
//
// Visual: a tall iced glass — translucent cylinder, an inner liquid cylinder,
// a sphere "ice" cap, and a thin straw that bobs as it floats in the drink.
export default function Drink({ id, position = [0, 0, 0] }) {
  const drink = favoriteDrinks[id];
  const [popped, setPopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const strawRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + position[0] * 0.7;
    if (groupRef.current) {
      // Hover float ON TOP of the table-surface Y from props (don't clobber it).
      groupRef.current.position.y = position[1] + (hovered ? 0.04 : 0) + Math.sin(t * 1.4) * 0.005;
    }
    if (strawRef.current) {
      strawRef.current.rotation.z = 0.18 + Math.sin(t * 1.1) * 0.015;
    }
  });

  // Auto-dismiss tooltip.
  useEffect(() => {
    if (!popped) return;
    const handle = setTimeout(() => setPopped(false), 2500);
    return () => clearTimeout(handle);
  }, [popped]);

  if (!drink) return null;

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPopped(true);
      }}
    >
      {/* Glass body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.13, 0.105, 0.36, 18]} />
        <meshStandardMaterial
          color="#fff5e9"
          transparent
          opacity={0.32}
          roughness={0.08}
          metalness={0.1}
        />
      </mesh>
      {/* Liquid */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.122, 0.1, 0.28, 18]} />
        <meshStandardMaterial
          color={drink.color}
          emissive={drink.color}
          emissiveIntensity={hovered ? 0.7 : 0.25}
          roughness={0.5}
          toneMapped={false}
        />
      </mesh>
      {/* Foam / cream cap (only when rim is light, i.e. cream-topped) */}
      {drink.rim === '#fff5e9' && (
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.13, 0.122, 0.05, 18]} />
          <meshStandardMaterial color="#fff5e9" roughness={0.85} />
        </mesh>
      )}
      {/* Ice cube hint (a small sphere just under the rim) */}
      <mesh position={[0.04, 0.08, 0.02]}>
        <boxGeometry args={[0.07, 0.07, 0.07]} />
        <meshStandardMaterial color="#cfe9ff" transparent opacity={0.55} roughness={0.05} />
      </mesh>
      {/* Straw */}
      <group ref={strawRef} position={[0.04, 0.18, 0]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.012, 0.36, 6]} />
          <meshStandardMaterial color={drink.rim} />
        </mesh>
      </group>

      {/* Hover ring */}
      {hovered && (
        <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial color="#ffb56a" transparent opacity={0.55} />
        </mesh>
      )}

      {/* Easter-egg tooltip */}
      {popped && (
        <Html position={[0, 0.5, 0]} center distanceFactor={6} zIndexRange={[20, 0]}>
          <div className="pointer-events-none animate-fade-in-up rounded-2xl border border-cafe-neon-purple/60 bg-[#100a1a]/90 px-3 py-2 shadow-glow-purple backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-widest text-cafe-neon-pink">
              ✦ a favorite ✦
            </p>
            <p className="text-sm font-semibold text-cafe-neon-glow whitespace-nowrap">
              {drink.name}
            </p>
            <p className="text-[10px] italic text-white/65 whitespace-nowrap">
              {drink.note}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}
