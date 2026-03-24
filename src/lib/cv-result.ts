export type ResultSection = {
  title: string;
  content: string;
};

export const SECTION_TITLES = [
  "Optimized Professional Summary",
  "Optimized Experience Bullets",
  "Missing Keywords",
  "ATS Score",
] as const;

export function parseResultSections(markdown: string): ResultSection[] {
  return SECTION_TITLES.map((title) => {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `##\\s+${escapedTitle}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`,
      "i"
    );
    const match = markdown.match(pattern);
    return { title, content: match?.[1]?.trim() ?? "" };
  }).filter((section) => section.content);
}

export function getAtsScore(value: string): number | null {
  const match = value.match(/score:\s*(\d{1,3})\s*\/\s*100/i);
  if (!match) return null;
  const score = Number(match[1]);
  if (Number.isNaN(score)) return null;
  return Math.max(0, Math.min(100, score));
}

export function getMissingKeywordCount(value: string): number {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-") || line.startsWith("*")).length;
}

export function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
