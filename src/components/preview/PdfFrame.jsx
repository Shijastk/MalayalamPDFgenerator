import { AlertIcon, SpinnerIcon } from "../icons";
import { Button } from "../ui/Button";

/**
 * Renders the real PDF in the browser's built-in viewer.
 *
 * The native viewer chrome is switched off via the PDF open parameters
 * (`toolbar`, `navpanes`, `statusbar`) so the app can supply its own controls;
 * scrolling, text selection and search still come from the viewer itself.
 */
function viewerSrc(url, fitMode) {
  const view = fitMode === "page" ? "Fit" : "FitH";
  return `${url}#toolbar=0&navpanes=0&statusbar=0&messages=0&view=${view}`;
}

export function PdfFrame({ url, fitMode, status, error, onRetry }) {
  if (status === "error") {
    return (
      <div className="grid h-full place-items-center p-8">
        <div className="max-w-sm space-y-3 text-center">
          <span className="mx-auto grid size-10 place-items-center rounded-full border border-line bg-surface text-danger">
            <AlertIcon className="size-5" />
          </span>
          <p className="font-serif text-[15px] text-ink">
            Could not build the PDF
          </p>
          <p className="text-[12px] leading-relaxed break-words text-muted">
            {error?.message ?? "Unknown error"}
          </p>
          <Button variant="primary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {url && (
        <iframe
          // Keyed on fitMode only. The viewer reads the open parameters once,
          // on load, so changing the fit needs a fresh element — but a new
          // `url` must NOT remount, otherwise every keystroke tears the viewer
          // down and the page flashes white.
          key={fitMode}
          src={viewerSrc(url, fitMode)}
          title="Letterpad PDF preview"
          className="h-full w-full border-0 bg-transparent"
        />
      )}

      {(status === "loading" || status === "refreshing") && (
        <div
          className={
            status === "loading"
              ? "absolute inset-0 grid place-items-center bg-sunken"
              : "pointer-events-none absolute top-3 right-3"
          }
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] font-medium text-muted">
            <SpinnerIcon className="size-3.5" />
            {status === "loading" ? "Building preview…" : "Updating…"}
          </span>
        </div>
      )}
    </div>
  );
}
