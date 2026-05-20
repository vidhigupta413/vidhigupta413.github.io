import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { defaultCamera, vantagePoints } from '../../data/portfolio.js';
import { useCafeStore } from '../../hooks/useCafeStore.js';

const DURATION = 1.35;

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

/**
 * Smoothly animates the perspective camera + OrbitControls target toward a
 * preset when the user picks a vantage from the HTML bar.
 */
export default function CameraVantageRig({ controlsRef }) {
  const camera = useThree((s) => s.camera);
  const pendingId = useCafeStore((s) => s.pendingVantageId);

  const anim = useRef({
    active: false,
    t0: 0,
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    fromTgt: new THREE.Vector3(),
    toTgt: new THREE.Vector3(),
  });

  useEffect(() => {
    if (!pendingId || !controlsRef.current) return undefined;

    const preset =
      pendingId === 'overview'
        ? { position: defaultCamera.position, target: defaultCamera.target }
        : vantagePoints.find((v) => v.id === pendingId);

    if (!preset) {
      useCafeStore.getState().clearPendingVantage();
      return undefined;
    }

    anim.current.fromPos.copy(camera.position);
    anim.current.fromTgt.copy(controlsRef.current.target);
    anim.current.toPos.fromArray(preset.position);
    anim.current.toTgt.fromArray(preset.target);
    anim.current.t0 = performance.now() / 1000;
    anim.current.active = true;

    return undefined;
  }, [pendingId, camera, controlsRef]);

  useFrame(() => {
    if (!anim.current.active || !controlsRef.current) return;
    const now = performance.now() / 1000;
    const u = Math.min(1, (now - anim.current.t0) / DURATION);
    const e = easeOutCubic(u);
    camera.position.lerpVectors(anim.current.fromPos, anim.current.toPos, e);
    controlsRef.current.target.lerpVectors(anim.current.fromTgt, anim.current.toTgt, e);
    controlsRef.current.update();
    if (u >= 1) {
      anim.current.active = false;
      useCafeStore.getState().clearPendingVantage();
    }
  });

  return null;
}
