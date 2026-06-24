/**
 * 动画模块统一导出
 *
 * 每个子文件夹对应一个页面区块的滚动动画，继承 AnimationBase。
 */

export { AnimationBase } from "./core/AnimationBase.js";
export { registerPortfolioEases } from "./core/registerEases.js";
export { scrollToSection } from "./core/scrollToSection.js";

export { IntroLoadAnimation } from "./introLoad/IntroLoadAnimation.js";
export { IntroExitAnimation } from "./introExit/IntroExitAnimation.js";
export { IntroSnapAnimation } from "./introSnap/IntroSnapAnimation.js";
export { KeyboardNavigationAnimation } from "./keyboardNavigation/KeyboardNavigationAnimation.js";
export { HorizontalJourneyAnimation } from "./horizontalJourney/HorizontalJourneyAnimation.js";
export { SkillsStageAnimation } from "./skillsStage/SkillsStageAnimation.js";
export { ProjectScenesAnimation } from "./projectScenes/ProjectScenesAnimation.js";
export { EducationStripAnimation } from "./educationStrip/EducationStripAnimation.js";
export { AiCapabilityAnimation } from "./aiCapability/AiCapabilityAnimation.js";
export { ContactBandAnimation } from "./contactBand/ContactBandAnimation.js";

import { IntroLoadAnimation } from "./introLoad/IntroLoadAnimation.js";
import { IntroExitAnimation } from "./introExit/IntroExitAnimation.js";
import { HorizontalJourneyAnimation } from "./horizontalJourney/HorizontalJourneyAnimation.js";
import { SkillsStageAnimation } from "./skillsStage/SkillsStageAnimation.js";
import { ProjectScenesAnimation } from "./projectScenes/ProjectScenesAnimation.js";
import { EducationStripAnimation } from "./educationStrip/EducationStripAnimation.js";
import { AiCapabilityAnimation } from "./aiCapability/AiCapabilityAnimation.js";
import { ContactBandAnimation } from "./contactBand/ContactBandAnimation.js";

/** 按页面滚动顺序排列的动画类列表 */
export const SCROLL_ANIMATIONS = [
  IntroLoadAnimation,
  IntroExitAnimation,
  HorizontalJourneyAnimation,
  SkillsStageAnimation,
  ProjectScenesAnimation,
  EducationStripAnimation,
  AiCapabilityAnimation,
  ContactBandAnimation,
];
