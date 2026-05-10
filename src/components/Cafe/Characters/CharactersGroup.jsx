import React from 'react';

import Vidhi from './Vidhi.jsx';
import Barista from './Barista.jsx';
import Customer from './Customer.jsx';
import CustomerTables from './CustomerTables.jsx';
import { customers } from '../../../data/portfolio.js';

// One place to drop every animated person in the cafe. The U-shaped counter
// is FLIPPED — main bar is closest to the user, wings extend toward the back.
// Each role is placed relative to that:
//   • Vidhi — main host, slightly LEFT of the laptop (so the laptop never
//     occludes her face/speech-bubble). Inside the U, facing +Z (the camera).
//   • Left wing barista — inside the U, between Vidhi and the left wing.
//     Faces -X to work the espresso machine on the left wing.
//   • Right wing barista — inside the U, between Vidhi and the right wing.
//     Faces +X to work the milk + tools on the right wing.
//   • Walking customers — orbit paths with opposite arm/leg gait.
//   • Customer tables — peripheral seating + clickable drinks on table tops.
//
// Characters are scaled up (1.25×) so their torso + arms read above the counter.
const STAFF_SCALE = 1.25;

export default function CharactersGroup() {
  return (
    <group>
      {/* Vidhi — inside the U, slightly off-axis from the laptop so her speech
          bubble has a clear line-of-sight from the camera. */}
      <group position={[-1.4, 0, -1.7]} scale={STAFF_SCALE}>
        <Vidhi />
      </group>

      {/* Left-wing barista — angled toward the espresso machine, but pulled BACK
          and ROTATED so his face/torso isn't buried in the equipment. */}
      <group position={[-2.0, 0, -2.4]} rotation={[0, -Math.PI / 3, 0]} scale={STAFF_SCALE}>
        <Barista
          mode="pour"
          offset={1.1}
          palette={{ body: '#1f1018', accent: '#3a1f5a', skin: '#a16b46', hair: '#1a0e08' }}
        />
      </group>

      {/* Right-wing barista — mirrored placement on the right side. */}
      <group position={[2.0, 0, -2.4]} rotation={[0, Math.PI / 3, 0]} scale={STAFF_SCALE}>
        <Barista
          mode="grind"
          offset={2.4}
          palette={{ body: '#1a0e22', accent: '#5b3a26', skin: '#c69876', hair: '#1a0e08' }}
        />
      </group>

      {customers.map((c) => (
        <Customer
          key={c.id}
          kind={c.kind}
          palette={c.palette}
          speed={c.speed}
          offset={c.offset}
          radius={c.radius}
          position={c.position}
          facing={c.facing}
          height={c.height}
        />
      ))}

      <CustomerTables />
    </group>
  );
}
