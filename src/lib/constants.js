/** A4 in PDF points. pdfmake works in points, not pixels. */
export const PAGE_WIDTH = 595.28;
export const PAGE_HEIGHT = 841.89;
export const PAGE_MARGIN_X = 40;
export const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN_X * 2;

// Thumbnails live in `assets.js`; this module stays free of asset imports so
// the PDF logic can run outside a bundler (tests, scripts).
export const BACKGROUNDS = [
  {
    id: "letterhead-1",
    label: "Full letterhead",
    hint: "Header, address & watermark crest",
  },
  {
    id: "letterhead-2",
    // image2.jpg is an intentionally blank sheet — useful for pre-printed
    // stationery, where the letterhead is already on the paper.
    label: "Blank sheet",
    hint: "No printed header",
  },
];

export const ALIGNMENTS = ["left", "center", "right"];

export const DATE_FORMATS = [
  { id: "long-en", label: "21 July 2026" },
  { id: "medium-en", label: "21 Jul 2026" },
  { id: "numeric-en", label: "21/07/2026" },
  { id: "iso", label: "2026-07-21" },
  { id: "long-ml", label: "2026 ജൂലൈ 21 (Malayalam)" },
];

export const DATE_PLACEMENTS = [
  { id: "top-right", label: "Top right" },
  { id: "top-left", label: "Top left" },
  { id: "inline", label: "Above heading" },
];

/** Muted print inks rather than screen-bright web colours — these end up on
 *  paper, where saturated blues and greens look cheap. */
export const COLOR_PRESETS = [
  "#1a1a1a",
  "#4a4a4a",
  "#767676",
  "#a8a29e",
  "#8c2f2a",
  "#1f3a5f",
  "#2f5d4f",
  "#8a5a2b",
];

export const LIMITS = {
  headingFontSize: { min: 12, max: 56, step: 1 },
  descriptionFontSize: { min: 8, max: 36, step: 1 },
  subtextFontSize: { min: 6, max: 28, step: 1 },
  dateFontSize: { min: 8, max: 24, step: 1 },
  verticalPosition: { min: 60, max: 720, step: 2 },
  dateTop: { min: 60, max: 760, step: 2 },
  lineHeight: { min: 1, max: 2.4, step: 0.05 },
  watermarkOpacity: { min: 0.05, max: 1, step: 0.05 },
  watermarkFontSize: { min: 20, max: 140, step: 2 },
  watermarkAngle: { min: -90, max: 90, step: 5 },
};

export function todayIso() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function nowTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export const DEFAULT_SETTINGS = {
  // Content
  heading: "Enter your heading here",
  description: "Description goes here.",
  subtext: "",

  // Background
  background: "letterhead-1",
  backgroundScope: "first", // "first" | "all"

  // Typography
  headingFontSize: 28,
  descriptionFontSize: 20,
  subtextFontSize: 16,
  headingColor: "#333333",
  descriptionColor: "#555555",
  subtextColor: "#777777",
  lineHeight: 1.3,

  // Layout
  align: "center",
  verticalPosition: 150,

  // Date & time
  dateEnabled: false,
  dateValue: todayIso(),
  timeEnabled: false,
  timeValue: nowTime(),
  dateFormat: "long-en",
  // "inline" sits directly above the heading, so it reads correctly whatever
  // the vertical position is. The top-left/top-right options are absolutely
  // placed and need `dateTop` tuned to the chosen letterhead.
  datePlacement: "inline",
  dateTop: 200,
  dateFontSize: 12,
  dateColor: "#555555",

  // Watermark
  watermarkText: "",
  watermarkOpacity: 0.3,
  watermarkColor: "#9ca3af",
  watermarkFontSize: 60,
  watermarkAngle: -45,

  // Export
  fileName: "letterpad",
};

export const STORAGE_KEY = "letterpad-studio:settings:v1";
export const THEME_STORAGE_KEY = "letterpad-studio:theme";
