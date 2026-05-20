import React, { Suspense } from 'react';
import { Environment } from '@react-three/drei';

import RoomShell, { ROOM } from './RoomShell.jsx';
import BaristaCounter from './zones/BaristaCounter.jsx';
import WorldMapWall from './zones/WorldMapWall.jsx';
import PerformancesTV from './zones/PerformancesTV.jsx';
import LeadershipShelf from './zones/LeadershipShelf.jsx';
import RecipesCorner from './zones/RecipesCorner.jsx';
import MenuChalkboard from './zones/MenuChalkboard.jsx';
import BookshelfSkills from './zones/BookshelfSkills.jsx';
import LeftWallFoodTable from './zones/LeftWallFoodTable.jsx';
import MusicCorner from './zones/MusicCorner.jsx';
import ExperienceTable from './zones/ExperienceTable.jsx';
import AwardsCase from './zones/AwardsCase.jsx';
import CharactersGroup from './Characters/CharactersGroup.jsx';
import FloorHotspots from './FloorHotspots.jsx';

export default function CafeScene() {
  return (
    <group>
      {/* Warm ambient + a high amber key + a low purple kicker. */}
      <ambientLight intensity={0.45} color="#ffd6a5" />
      <directionalLight
        castShadow
        position={[8, 18, 10]}
        intensity={0.6}
        color="#ffb56a"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-8, 12, 4]} intensity={0.22} color="#9b6dff" />
      {/* Rim light through the left-wall night window */}
      <pointLight
        position={[ROOM.leftWallX + 0.25, 5.2, ROOM.floorCenterZ + 5.5]}
        intensity={0.72}
        distance={14}
        color="#9bb4ff"
      />
      {/* Counter-front warm wash */}
      <pointLight position={[0, 2.4, 2]} intensity={0.7} distance={8} color="#ffb46a" />
      {/* TV wall accent */}
      <pointLight position={[16, 4.2, 1]} intensity={0.5} distance={9} color="#a677ff" />

      <RoomShell />

      {/* Wall-mounted zones (back / left / right walls) */}
      <WorldMapWall />
      <LeadershipShelf />
      <PerformancesTV />
      <RecipesCorner />

      {/* Floor zones */}
      <BaristaCounter />
      <MenuChalkboard />
      <BookshelfSkills />
      <LeftWallFoodTable />
      <MusicCorner />
      <ExperienceTable />
      <AwardsCase />

      {/* Animated population (Vidhi + baristas + walkers + seated tables) */}
      <CharactersGroup />

      {/* Clickable floor rings — pulse softly at each vantage's approach
          point. Tapping one eases the camera into that view (see
          CameraVantageRig). Replaces the old "Views" tab. */}
      <FloorHotspots />

      {/* HDR loads from the network and suspends — keep it isolated so the cafe
          mounts immediately even on slow connections. */}
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>
    </group>
  );
}
