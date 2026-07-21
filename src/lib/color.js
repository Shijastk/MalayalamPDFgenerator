const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

/**
 * Expands "#333" to "#333333" and rejects anything else.
 *
 * `<input type="color">` silently falls back to black for shorthand or invalid
 * hex, which is how the original defaults ("#333") ended up showing as black.
 */
export function normaliseHex(value, fallback = "#000000") {
  if (typeof value !== "string") return fallback;

  const raw = value.trim();
  if (HEX_PATTERN.test(raw)) return raw.toLowerCase();

  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    const [, r, g, b] = raw;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return fallback;
}
