/**
 * Date / time helpers.
 *
 * Note: we deliberately parse "YYYY-MM-DD" by hand instead of
 * `new Date("2026-07-21")`, because the string form is parsed as UTC midnight
 * and renders as the *previous* day for anyone west of Greenwich.
 */

function parseDateTime(dateValue, timeValue) {
  const [year, month, day] = String(dateValue || "")
    .split("-")
    .map(Number);
  if (!year || !month || !day) return null;

  const [hours, minutes] = String(timeValue || "00:00")
    .split(":")
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    day,
    Number.isFinite(hours) ? hours : 0,
    Number.isFinite(minutes) ? minutes : 0,
  );
  return Number.isNaN(date.getTime()) ? null : date;
}

const DATE_FORMATTERS = {
  "long-en": { locale: "en-GB", options: { day: "numeric", month: "long", year: "numeric" } },
  "medium-en": { locale: "en-GB", options: { day: "numeric", month: "short", year: "numeric" } },
  "numeric-en": { locale: "en-GB", options: { day: "2-digit", month: "2-digit", year: "numeric" } },
  "long-ml": { locale: "ml-IN", options: { day: "numeric", month: "long", year: "numeric" } },
};

function formatDatePart(date, format, rawValue) {
  if (format === "iso") return rawValue;

  const config = DATE_FORMATTERS[format] ?? DATE_FORMATTERS["long-en"];
  try {
    return new Intl.DateTimeFormat(config.locale, config.options).format(date);
  } catch {
    // Some locales (ml-IN) may be missing in trimmed ICU builds.
    return new Intl.DateTimeFormat("en-GB", config.options).format(date);
  }
}

function formatTimePart(date, format) {
  const locale = format === "long-ml" ? "ml-IN" : "en-GB";
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }
}

/**
 * Builds the stamp that goes on the document, e.g. "21 July 2026 · 09:30 am".
 * Returns "" when there is nothing valid to show.
 */
export function formatStamp({ dateValue, timeValue, dateFormat, includeTime }) {
  const date = parseDateTime(dateValue, timeValue);
  if (!date) return "";

  const datePart = formatDatePart(date, dateFormat, dateValue);
  if (!includeTime) return datePart;

  return `${datePart} · ${formatTimePart(date, dateFormat)}`;
}

/** Turns any heading into a safe, readable file name. */
export function toSafeFileName(value, fallback = "letterpad") {
  const cleaned = String(value ?? "")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80);
  return cleaned || fallback;
}
