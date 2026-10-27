/**
 * cn — tiny className combiner (no external deps).
 * Filters falsy values and joins with spaces.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
