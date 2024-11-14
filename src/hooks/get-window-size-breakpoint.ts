/**
 * Get the current window width and return a breakpoint prefix string.
 *
 * Breakpoints are defined as:
 * - `sm`: 640px and up
 * - `md`: 768px and up
 * - `lg`: 1024px and up
 * - `xl`: 1280px and up
 * - `2xl`: 1536px and up
 *
 * If the window width is smaller than the smallest breakpoint (`sm`), it will return `xs`.
 *
 * @returns {enum} A enum representing the current breakpoint (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
 */
export function getWindowSizeBreakpoint():
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl" {
  const width = window.innerWidth;

  if (width >= 1536) {
    return "2xl";
  } else if (width >= 1280) {
    return "xl";
  } else if (width >= 1024) {
    return "lg";
  } else if (width >= 768) {
    return "md";
  } else if (width >= 640) {
    return "sm";
  } else {
    return "xs"; // For widths smaller than the `sm` breakpoint.
  }
}
