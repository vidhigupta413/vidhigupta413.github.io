import React from 'react';

import { customerTables } from '../../../data/portfolio.js';
import SeatedAtTable from './SeatedAtTable.jsx';
import Drink from '../props/Drink.jsx';

// Two table sizes:
//  • 'sm' (default): radius 0.7, chair offset 0.85, drink ring radius 0.32.
//  • 'lg': radius 1.0, chair offset 1.15, drink ring radius 0.5 — used for
//    proper 4-top tables where every side is occupied.
const TABLE_PRESETS = {
  sm: {
    tableR: 0.7,
    seatTopR: 0.68,
    chairOffset: 0.85,
    drinkRingR: 0.32,
    surfaceY: 1.03,
  },
  lg: {
    tableR: 1.0,
    seatTopR: 0.97,
    chairOffset: 1.15,
    drinkRingR: 0.55,
    surfaceY: 1.03,
  },
};

const CHAIR_AXES = {
  far: { axis: 'z', sign: -1, rotY: 0 },
  near: { axis: 'z', sign: 1, rotY: Math.PI },
  left: { axis: 'x', sign: -1, rotY: Math.PI / 2 },
  right: { axis: 'x', sign: 1, rotY: -Math.PI / 2 },
};

function chairOffsets(side, offset) {
  const axis = CHAIR_AXES[side];
  if (!axis) return { x: 0, z: 0, rotY: 0 };
  if (axis.axis === 'x') return { x: axis.sign * offset, z: 0, rotY: axis.rotY };
  return { x: 0, z: axis.sign * offset, rotY: axis.rotY };
}

function Chair({ x = 0, z = 0, rotY = 0 }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.0, -0.3]} castShadow>
        <boxGeometry args={[0.7, 1.0, 0.1]} />
        <meshStandardMaterial color="#3a2418" roughness={0.95} />
      </mesh>
      {[
        [-0.3, 0.2, 0.3],
        [0.3, 0.2, 0.3],
        [-0.3, 0.2, -0.3],
        [0.3, 0.2, -0.3],
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
          <meshStandardMaterial color="#1a0e08" />
        </mesh>
      ))}
    </group>
  );
}

function Table({ preset }) {
  return (
    <group>
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[preset.tableR, preset.tableR, 0.06, 28]} />
        <meshStandardMaterial color="#5b3a26" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.035, 0]}>
        <cylinderGeometry args={[preset.seatTopR, preset.seatTopR, 0.005, 28]} />
        <meshStandardMaterial color="#7b4f2c" roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 12]} />
        <meshStandardMaterial color="#1a0e08" />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.36, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#1a0e08" />
      </mesh>
    </group>
  );
}

// Drinks sit ON the table top. Cup is 0.36 tall (origin at center) so the
// origin needs to be 0.18 above the table top to plant the cup bottom flush.
const DRINK_BASE_Y = 1.21;

function TableUnit({ table }) {
  const preset = TABLE_PRESETS[table.size === 'lg' ? 'lg' : 'sm'];

  return (
    <group position={table.position} rotation={[0, table.rotation, 0]}>
      <Table preset={preset} />

      {table.seats.map((seat, i) => {
        const off = chairOffsets(seat.side, preset.chairOffset);
        const yaw = seat.facingYaw ?? 0;
        // Character sits *just inboard* of the chair so they're touching the
        // table — 92% of the way from origin to the chair center.
        const charScale = 0.92;
        return (
          <group key={i}>
            <Chair x={off.x} z={off.z} rotY={off.rotY} />
            <group
              position={[off.x * charScale, 0.5, off.z * charScale]}
              rotation={[0, yaw, 0]}
            >
              <SeatedAtTable
                palette={seat.palette}
                height={seat.height}
                offset={i * 1.7}
                drinkSide={seat.drinkSide ?? 'right'}
              />
            </group>
          </group>
        );
      })}

      {table.drinkIds.map((id, i) => {
        const angle = (i / table.drinkIds.length) * Math.PI * 2 + Math.PI / 4;
        const r = preset.drinkRingR;
        return (
          <Drink
            key={id + i}
            id={id}
            position={[Math.cos(angle) * r, DRINK_BASE_Y, Math.sin(angle) * r]}
          />
        );
      })}
    </group>
  );
}

export default function CustomerTables() {
  return (
    <group>
      {customerTables.map((t) => (
        <TableUnit key={t.id} table={t} />
      ))}
    </group>
  );
}
