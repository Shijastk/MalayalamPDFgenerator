# Letterpad Studio

A browser-based letterpad / letterhead PDF generator for **UP Usthad Memorial
Da'wa College**, with first-class Malayalam typesetting (Rachana font).

Everything runs client-side — no server, no upload, no runtime network calls.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
npm run lint
```

## What it does

- **Two-column editor** — controls on the left, live preview on the right.
  Below the `lg` breakpoint the two collapse into Edit / Preview tabs.
- **Live PDF preview** — the real PDF is rendered and shown in the browser's own
  viewer, so what you see is exactly what downloads. The viewer's native toolbar
  is hidden via PDF open parameters; the app supplies its own controls (fit
  width / fit page, rebuild, open in a new tab, print, download).
- **Content** — heading, description and subtext, in Malayalam or English.
- **Letterhead** — full college letterhead or a blank sheet; first page only or
  every page.
- **Typography** — per-role size and colour, plus line height.
- **Layout** — alignment and vertical position, in PDF points.
- **Date & time** — optional stamp with five formats (including Malayalam via
  `Intl`), placed above the heading or absolutely at the top-left / top-right.
- **Watermark** — text, colour, size, angle and opacity.
- **Dark mode** and automatic draft saving to `localStorage`.

## Layout of the code

```
src/
  lib/
    assets.js         base64 loading of the fonts + letterhead images
    pdfEngine.js      pdfmake setup (lazy-loaded), render / download / print
    docDefinition.js  settings -> pdfmake document definition
    constants.js      defaults, limits and option lists (no asset imports)
    format.js         date/time formatting, file-name sanitising
    color.js          hex normalising
  hooks/
    useLetterpad.js   the settings store (+ localStorage persistence)
    usePdfPreview.js  debounced blob-URL preview with race protection
    useTheme.js       light/dark
  components/
    ui/               Button, Field, Input, Slider, ColorField, Segmented,
                      Toggle, Panel — the reusable primitives
    icons/            inline SVG icon set
    editor/           one component per editor section + EditorPanel
    preview/          PreviewPane, PreviewToolbar, PdfFrame, ExportBar
```

`lib/constants.js` and `lib/docDefinition.js` deliberately import no assets, so
the PDF logic can be exercised outside a bundler.

## Notes on the PDF

- Page geometry is A4 in **points** (595.28 × 841.89), not pixels.
- Absolutely positioned text is wrapped in a fixed-width column so it wraps at
  the 40 pt page margin instead of running off the page.
- Fonts and letterhead images are bundled and base64-encoded at runtime — there
  is no CDN script tag and no prebuilt `vfs_fonts.js` to keep in sync.

## Stack

React 19 · Vite 6 · Tailwind CSS 4 · pdfmake 0.2
