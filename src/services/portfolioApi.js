import fallbackPortfolio from "../data/portfolio.json";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function mergeByTitle(localItems = [], remoteItems = []) {
  const remoteByTitle = new Map(remoteItems.map((item) => [item.title, item]));
  const localTitles = new Set(localItems.map((item) => item.title));
  const mergedLocalItems = localItems.map((localItem) => ({
    ...localItem,
    ...(remoteByTitle.get(localItem.title) || {}),
  }));
  const remoteOnlyItems = remoteItems.filter((item) => !localTitles.has(item.title));

  return [...mergedLocalItems, ...remoteOnlyItems];
}

export async function loadPortfolio() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/portfolio`, {
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
      ...data,
      projects: mergeByTitle(fallbackPortfolio.projects, data.projects),
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
