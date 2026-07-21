import {
  CONTENT_WIDTH,
  PAGE_HEIGHT,
  PAGE_MARGIN_X,
  PAGE_WIDTH,
} from "./constants";
import { formatStamp } from "./format";
import { normaliseHex } from "./color";

/**
 * A text block placed at an exact point on the page.
 *
 * pdfmake's `absolutePosition` takes the node out of the normal flow, and a
 * bare `text` node then has no width to wrap against — long lines run straight
 * off the page. Wrapping it in a single fixed-width column restores wrapping
 * at the page margin.
 */
function positionedBlock(stack, y) {
  return {
    columns: [{ width: CONTENT_WIDTH, stack }],
    absolutePosition: { x: PAGE_MARGIN_X, y },
  };
}

function textNode(text, { fontSize, color, alignment, lineHeight, bold, marginBottom }) {
  return {
    text,
    fontSize,
    // The hex fields are free-text, so a half-typed value can reach us here.
    // pdfmake would throw on it; fall back to a readable grey instead.
    color: normaliseHex(color, "#333333"),
    alignment,
    lineHeight,
    ...(bold ? { bold: true } : null),
    ...(marginBottom ? { margin: [0, 0, 0, marginBottom] } : null),
  };
}

/**
 * Translates the editor settings into a pdfmake document definition.
 *
 * @param settings  the flat settings object from `useLetterpad`
 * @param assets    resolved base64 assets from `loadAssets()`
 */
export function buildDocDefinition(settings, assets) {
  const {
    heading,
    description,
    subtext,
    background,
    backgroundScope,
    headingFontSize,
    descriptionFontSize,
    subtextFontSize,
    headingColor,
    descriptionColor,
    subtextColor,
    lineHeight,
    align,
    verticalPosition,
    dateEnabled,
    dateValue,
    timeEnabled,
    timeValue,
    dateFormat,
    datePlacement,
    dateTop,
    dateFontSize,
    dateColor,
    watermarkText,
    watermarkOpacity,
    watermarkColor,
    watermarkFontSize,
    watermarkAngle,
  } = settings;

  const stamp = dateEnabled
    ? formatStamp({ dateValue, timeValue, dateFormat, includeTime: timeEnabled })
    : "";

  const mainStack = [];

  if (stamp && datePlacement === "inline") {
    mainStack.push(
      textNode(stamp, {
        fontSize: dateFontSize,
        color: dateColor,
        alignment: align,
        lineHeight,
        marginBottom: 14,
      }),
    );
  }

  if (heading?.trim()) {
    mainStack.push(
      textNode(heading, {
        fontSize: headingFontSize,
        color: headingColor,
        alignment: align,
        lineHeight,
        bold: true,
        marginBottom: 20,
      }),
    );
  }

  if (description?.trim()) {
    mainStack.push(
      textNode(description, {
        fontSize: descriptionFontSize,
        color: descriptionColor,
        alignment: align,
        lineHeight,
        marginBottom: 15,
      }),
    );
  }

  if (subtext?.trim()) {
    mainStack.push(
      textNode(subtext, {
        fontSize: subtextFontSize,
        color: subtextColor,
        alignment: align,
        lineHeight,
      }),
    );
  }

  const content = [];

  // pdfmake refuses to render an empty content array.
  content.push(
    mainStack.length
      ? positionedBlock(mainStack, verticalPosition)
      : { text: "", absolutePosition: { x: PAGE_MARGIN_X, y: verticalPosition } },
  );

  if (stamp && datePlacement !== "inline") {
    content.push(
      positionedBlock(
        [
          textNode(stamp, {
            fontSize: dateFontSize,
            color: dateColor,
            alignment: datePlacement === "top-left" ? "left" : "right",
            lineHeight: 1.2,
          }),
        ],
        dateTop,
      ),
    );
  }

  const backgroundImage = assets.backgrounds[background];

  return {
    pageSize: "A4",
    pageMargins: [PAGE_MARGIN_X, PAGE_MARGIN_X, PAGE_MARGIN_X, PAGE_MARGIN_X],
    content,
    background(currentPage) {
      if (!backgroundImage) return null;
      if (backgroundScope === "first" && currentPage !== 1) return null;
      return {
        image: backgroundImage,
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        absolutePosition: { x: 0, y: 0 },
      };
    },
    defaultStyle: {
      font: "Rachana",
      lineHeight,
    },
    watermark: watermarkText?.trim()
      ? {
          text: watermarkText,
          color: normaliseHex(watermarkColor, "#9ca3af"),
          opacity: watermarkOpacity,
          bold: true,
          fontSize: watermarkFontSize,
          angle: watermarkAngle,
        }
      : undefined,
    info: {
      title: heading?.trim() || "Letterpad",
      creator: "Letterpad Studio",
    },
  };
}
