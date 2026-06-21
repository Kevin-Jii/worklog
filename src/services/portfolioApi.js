import fallbackPortfolio from "../data/portfolio.json";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://portfolio-api.jeckwell.workers.dev";

function mergeProjectsIntoIndustries(projects) {
  if (!Array.isArray(projects) || projects.length === 0) {
    return fallbackPortfolio.industries;
  }

  return fallbackPortfolio.industries.map((industry) => {
    const project = projects.find((item) => item.industry === industry.label);

    if (!project) {
      return industry;
    }

    return {
      ...industry,
      title: project.title || industry.title,
      body: project.summary || industry.body,
      stack: project.stack || industry.stack,
    };
  });
}

export async function loadPortfolio() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Portfolio API responded with ${response.status}`);
    }

    const data = await response.json();

    return {
      ...fallbackPortfolio,
      industries: mergeProjectsIntoIndustries(data.projects),
      source: "api",
    };
  } catch (error) {
    console.warn("Using local portfolio fallback:", error);
    return {
      ...fallbackPortfolio,
      source: "local",
    };
  }
}
