import React from 'react';

import { useCafeStore } from '../../hooks/useCafeStore.js';
import AboutPanel from './panels/AboutPanel.jsx';
import ProjectsPanel from './panels/ProjectsPanel.jsx';
import AIResearchPanel from './panels/AIResearchPanel.jsx';
import SkillsPanel from './panels/SkillsPanel.jsx';
import ExperiencePanel from './panels/ExperiencePanel.jsx';
import LeadershipPanel from './panels/LeadershipPanel.jsx';
import JourneyPanel from './panels/JourneyPanel.jsx';
import PerformancesPanel from './panels/PerformancesPanel.jsx';
import RecipesPanel from './panels/RecipesPanel.jsx';
import ContactPanel from './panels/ContactPanel.jsx';
import CoffeeChatPanel from './panels/CoffeeChatPanel.jsx';
import WoodwindsPanel from './panels/WoodwindsPanel.jsx';
import PianoMusicPanel from './panels/PianoMusicPanel.jsx';

const PANELS = {
  about: AboutPanel,
  projects: ProjectsPanel,
  aiResearch: AIResearchPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  leadership: LeadershipPanel,
  journey: JourneyPanel,
  performances: PerformancesPanel,
  recipes: RecipesPanel,
  contact: ContactPanel,
  coffeeChat: CoffeeChatPanel,
  woodwindsDisplay: WoodwindsPanel,
  pianoMusic: PianoMusicPanel,
};

export default function OverlayRouter() {
  const activeZone = useCafeStore((s) => s.activeZone);
  if (!activeZone) return null;

  const Panel = PANELS[activeZone];
  if (!Panel) return null;
  return <Panel />;
}
