import { useState } from "react";
import { PreviewToolbar } from "./PreviewToolbar";
import { PdfFrame } from "./PdfFrame";
import { ExportBar } from "./ExportBar";
import { usePdfPreview } from "../../hooks/usePdfPreview";
import { cn } from "../../lib/cn";

/**
 * The right column: toolbar, the real PDF in the browser viewer, and the
 * custom export controls.
 */
export function PreviewPane({ settings, update, className }) {
  const [fitMode, setFitMode] = useState("width");
  const { url, status, error, refresh } = usePdfPreview(settings);

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-panel border border-line bg-surface",
        className,
      )}
    >
      <PreviewToolbar
        status={status}
        fitMode={fitMode}
        onFitModeChange={setFitMode}
        onRefresh={refresh}
        url={url}
      />

      {/* Plain sunken well — the page itself should be the only bright thing. */}
      <div className="min-h-0 flex-1 bg-sunken">
        <PdfFrame
          url={url}
          fitMode={fitMode}
          status={status}
          error={error}
          onRetry={refresh}
        />
      </div>

      <ExportBar settings={settings} update={update} />
    </div>
  );
}
