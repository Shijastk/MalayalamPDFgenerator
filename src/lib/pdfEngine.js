import { FONT_FILES, loadAssets } from "./assets";
import { buildDocDefinition } from "./docDefinition";

let enginePromise = null;

/**
 * Registers the Malayalam font with pdfmake and resolves to `{ pdfMake, assets }`
 * once the engine is usable. Idempotent — every caller shares the same promise.
 *
 * pdfmake is imported dynamically so its ~1.5 MB browser build lands in its own
 * chunk and the editor UI can paint first.
 */
export function initEngine() {
  if (!enginePromise) {
    enginePromise = Promise.all([
      import("pdfmake/build/pdfmake"),
      loadAssets(),
    ])
      .then(([module, assets]) => {
        // The browser build is UMD; normalise however the bundler hands it over.
        const pdfMake = module?.default ?? module;

        pdfMake.vfs = assets.vfs;
        pdfMake.fonts = {
          Rachana: {
            normal: FONT_FILES.regular,
            bold: FONT_FILES.bold,
            // pdfmake throws if a style it is asked for has no mapping,
            // so point the italic slots at the upright faces.
            italics: FONT_FILES.regular,
            bolditalics: FONT_FILES.bold,
          },
        };

        return { pdfMake, assets };
      })
      .catch((error) => {
        enginePromise = null;
        throw error;
      });
  }
  return enginePromise;
}

async function createDocument(settings) {
  const { pdfMake, assets } = await initEngine();
  return pdfMake.createPdf(buildDocDefinition(settings, assets));
}

/** Renders the current settings to a Blob (used by the live preview). */
export async function renderToBlob(settings) {
  const doc = await createDocument(settings);
  return new Promise((resolve, reject) => {
    try {
      doc.getBlob(resolve);
    } catch (error) {
      reject(error);
    }
  });
}

/** Triggers a browser download. */
export async function downloadPdf(settings, fileName) {
  const doc = await createDocument(settings);
  doc.download(`${fileName}.pdf`);
}

/** Opens the OS/browser print dialog for the generated document. */
export async function printPdf(settings) {
  const doc = await createDocument(settings);
  doc.print();
}
