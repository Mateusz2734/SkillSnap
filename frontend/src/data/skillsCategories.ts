// Hardcoded for now, but will be fetched from the backend if I have time to implement it

export type SkillsCategories = {
  [key: string]: string[];
};

export const skillsCategories: SkillsCategories = {
  "JavaScript Programming": ["Programming", "Computers", "Tech"],
  "TypeScript Programming": ["Programming", "Computers", "Tech"],
  "Java Programming": ["Programming", "Computers", "Tech"],
  "Golang Programming": ["Programming", "Computers", "Tech"],
  Skateboarding: ["Sports", "Outdoors"],
  Snowboarding: ["Sports", "Outdoors"],
  Skiing: ["Sports", "Outdoors"],
  "Mountain Biking": ["Sports", "Outdoors"],
  "Game Development": ["Games", "Software"],
  "Software Development": ["Software", "Computers", "Tech"],
  "Web Design": ["Software", "Computers", "Tech"],
};
