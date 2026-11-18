import Sqids from "sqids";

const FALLBACK_ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function resolveAlphabet(raw: string | undefined) {
  if (!raw) {
    return FALLBACK_ALPHABET;
  }

  const unique = Array.from(new Set(raw.split(""))).join("");

  return unique.length >= 10 ? unique : FALLBACK_ALPHABET;
}

const sqids = new Sqids({
  alphabet: resolveAlphabet(process.env.SQIDS_ALPHABET),
});

export function encodeDbUid(uid: string): string {
  const cleanHex = uid.trim().replace(/-/g, "").toLowerCase();

  if (!/^[0-9a-f]{24}$|^[0-9a-f]{32}$/.test(cleanHex)) {
    throw new Error(
      "Invalid UID: Expected a 24-char MongoDB ObjectID or 36-char UUID.",
    );
  }

  const chunks: number[] = [];
  for (let i = 0; i < cleanHex.length; i += 8) {
    chunks.push(parseInt(cleanHex.slice(i, i + 8), 16));
  }

  return sqids.encode(chunks);
}

export function decodeDbUid(slug: string): string | null {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  const chunks: number[] = sqids.decode(slug);

  if (
    (chunks.length !== 3 && chunks.length !== 4) ||
    sqids.encode(chunks) !== slug
  ) {
    return null;
  }

  const hex = chunks.map((num) => num.toString(16).padStart(8, "0")).join("");

  if (hex.length === 32) {
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  return hex;
}
