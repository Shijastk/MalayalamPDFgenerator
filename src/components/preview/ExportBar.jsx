import { useState } from "react";
import { Button } from "../ui/Button";
import { AlertIcon, DownloadIcon, PrinterIcon, SpinnerIcon } from "../icons";
import { downloadPdf, printPdf } from "../../lib/pdfEngine";
import { toSafeFileName } from "../../lib/format";

/**
 * Custom export controls — the browser's own PDF toolbar is hidden, so these
 * are the buttons that actually save and print the document.
 */
export function ExportBar({ settings, update }) {
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState(null);

  const fileName = toSafeFileName(settings.fileName || settings.heading);

  async function run(action, task) {
    setBusy(action);
    setError(null);
    try {
      await task();
    } catch (actionError) {
      console.error(`PDF ${action} failed`, actionError);
      setError(actionError.message || "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="shrink-0 space-y-2 border-t border-line px-3 py-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Own row on narrow screens so the file name stays readable. */}
        <div className="flex h-9 w-full min-w-0 items-center rounded-control border border-line bg-surface pr-2.5 transition-[border-color,box-shadow] focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent/15 sm:w-auto sm:flex-1">
          <input
            value={settings.fileName}
            onChange={(event) => update({ fileName: event.target.value })}
            placeholder="letterpad"
            aria-label="File name"
            spellCheck={false}
            className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[13px] text-ink placeholder:text-faint focus:outline-none"
          />
          <span className="numeric shrink-0 text-faint">.pdf</span>
        </div>

        <Button
          variant="secondary"
          className="flex-1 sm:flex-none"
          onClick={() => run("print", () => printPdf(settings))}
          disabled={Boolean(busy)}
        >
          {busy === "print" ? (
            <SpinnerIcon className="size-4" />
          ) : (
            <PrinterIcon className="size-4" />
          )}
          Print
        </Button>

        <Button
          variant="primary"
          className="flex-1 sm:flex-none"
          onClick={() => run("download", () => downloadPdf(settings, fileName))}
          disabled={Boolean(busy)}
        >
          {busy === "download" ? (
            <SpinnerIcon className="size-4" />
          ) : (
            <DownloadIcon className="size-4" />
          )}
          Download PDF
        </Button>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-[12px] text-danger">
          <AlertIcon className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
