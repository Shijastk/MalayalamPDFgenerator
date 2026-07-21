/**
 * Loads the binary assets the PDF engine needs (fonts + letterhead images)
 * and converts them to base64 exactly once per session.
 *
 * Everything is bundled by Vite, so there is no CDN / network dependency and
 * no version drift between the runtime and the build.
 */
import rachanaRegularUrl from "../fonts/Rachana-Regular.ttf?url";
import rachanaBoldUrl from "../fonts/Rachana-Bold.ttf?url";
import letterheadOneUrl from "../assets/image1.jpg";
import letterheadTwoUrl from "../assets/image2.jpg";

/** ArrayBuffer -> base64, chunked so we never blow the argument limit. */
function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

async function fetchBase64(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load asset "${url}" (${response.status})`);
  }
  return bufferToBase64(await response.arrayBuffer());
}

async function fetchDataUrl(url, mimeType) {
  return `data:${mimeType};base64,${await fetchBase64(url)}`;
}

export const FONT_FILES = {
  regular: "Rachana-Regular.ttf",
  bold: "Rachana-Bold.ttf",
};

let assetsPromise = null;

/**
 * Resolves to `{ vfs, backgrounds }` — both already base64 encoded.
 * Safe to call from anywhere; the work happens once.
 */
export function loadAssets() {
  if (!assetsPromise) {
    assetsPromise = Promise.all([
      fetchBase64(rachanaRegularUrl),
      fetchBase64(rachanaBoldUrl),
      fetchDataUrl(letterheadOneUrl, "image/jpeg"),
      fetchDataUrl(letterheadTwoUrl, "image/jpeg"),
    ])
      .then(([regular, bold, backgroundOne, backgroundTwo]) => ({
        vfs: {
          [FONT_FILES.regular]: regular,
          [FONT_FILES.bold]: bold,
        },
        backgrounds: {
          "letterhead-1": backgroundOne,
          "letterhead-2": backgroundTwo,
        },
      }))
      .catch((error) => {
        // Let the next attempt retry instead of caching a rejected promise.
        assetsPromise = null;
        throw error;
      });
  }
  return assetsPromise;
}

/** Thumbnail URLs for the picker — plain URLs are enough for <img>. */
export const BACKGROUND_THUMBNAILS = {
  "letterhead-1": letterheadOneUrl,
  "letterhead-2": letterheadTwoUrl,
};
