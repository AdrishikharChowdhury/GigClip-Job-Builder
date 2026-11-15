const DICEBEAR_BASE = "https://api.dicebear.com/10.x/glyphs/svg";

export function dicebearAvatar(seed: string) {
  return `${DICEBEAR_BASE}?seed=${encodeURIComponent(seed)}`;
}
