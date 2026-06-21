import React from "react";
import { AICapability } from "./components/AICapability";
import { ContactBand } from "./components/ContactBand";
import { ExperienceCompact } from "./components/ExperienceCompact";
import { Hero } from "./components/Hero";
import { IndustryCockpit } from "./components/IndustryCockpit";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { Navigation } from "./components/Navigation";
import { ScrollProgress } from "./components/ScrollProgress";
import { loadPortfolio } from "./services/portfolioApi";
import fallbackPortfolio from "./data/portfolio.json";

export function App() {
  const [portfolio, setPortfolio] = React.useState(fallbackPortfolio);

  React.useEffect(() => {
    let cancelled = false;

    loadPortfolio().then((nextPortfolio) => {
      if (!cancelled) {
        setPortfolio(nextPortfolio);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const { profile, industries, aiFlow, experiences, stack } = portfolio;

  return (
    <>
      <LoadingOverlay />
      <Navigation profile={profile} />
      <ScrollProgress />
      <main>
        <Hero profile={profile} />
        <IndustryCockpit industries={industries} />
        <AICapability aiFlow={aiFlow} />
        <ExperienceCompact experiences={experiences} stack={stack} />
        <ContactBand profile={profile} />
      </main>
    </>
  );
}
