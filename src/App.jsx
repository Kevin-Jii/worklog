import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AICapability } from "./components/AICapability";
import { ContactBand } from "./components/ContactBand";
import { DockNav } from "./components/DockNav";
import { ExperienceCompact } from "./components/ExperienceCompact";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { PortfolioIntro } from "./components/PortfolioIntro";
import { ResumeDetails } from "./components/ResumeDetails";
import { ScrollChoreography } from "./components/ScrollChoreography";
import { SkillsStage } from "./components/SkillsStage";
import { loadPortfolio } from "./services/portfolioApi";
import fallbackPortfolio from "./data/portfolio.json";

export function App() {
  const [portfolio, setPortfolio] = React.useState(fallbackPortfolio);
  const pageRef = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;

    loadPortfolio().then((nextPortfolio) => {
      if (!cancelled) {
        setPortfolio(nextPortfolio);
        window.requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const { profile, industries, aiFlow, experiences, stack, skills, projects, education } = portfolio;

  return (
    <>
      <LoadingOverlay />
      <DockNav />
      <div id="smooth-wrapper" className="smooth-wrapper">
        <main id="smooth-content" className="scroll-page" ref={pageRef}>
          <PortfolioIntro profile={profile} />
          <ExperienceCompact experiences={experiences} />
          <SkillsStage skills={skills} stack={stack} />
          <ResumeDetails projects={projects} education={education} />
          <AICapability aiFlow={aiFlow} />
          <ContactBand profile={profile} />
        </main>
      </div>
      <ScrollChoreography scope={pageRef} />
    </>
  );
}
