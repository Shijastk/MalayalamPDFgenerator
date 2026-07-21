/** Tiny classnames helper — joins truthy values with a space. */
export function cn(...values) {
  return values.filter(Boolean).join(" ");
}
