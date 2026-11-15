export function normalizeSkills(value: unknown) {
  if (typeof value !== "string" && !Array.isArray(value)) {
    return value;
  }

  const list = typeof value === "string" ? value.split(",") : value;
  const seen = new Set<string>();
  const skills: string[] = [];

  for (const item of list) {
    if (typeof item !== "string") {
      return value;
    }

    const skill = item.trim();

    if (!skill) {
      continue;
    }

    const key = skill.toLowerCase();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    skills.push(skill);
  }

  return skills;
}