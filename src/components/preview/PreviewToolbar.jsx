import { Segmented } from "../ui/Segmented";
import { IconButton } from "../ui/Button";
import {
  ExternalLinkIcon,
  FitPageIcon,
  FitWidthIcon,
  RefreshIcon,
} from "../icons";
import { cn } from "../../lib/cn";

const FIT_OPTIONS = [
  { id: "width", icon: FitWidthIcon, title: "Fit width" },
  { id: "page", icon: FitPageIcon, title: "Fit whole page" },
];

const STATUS = {
  ready: { dot: "bg-ok", label: "Up to date" },
  refreshing: { dot: "bg-accent animate-pulse", label: "Updating" },
  loading: { dot: "bg-accent animate-pulse", label: "Building" },
  error: { dot: "bg-danger", label: "Failed" },
};

export function PreviewToolbar({
  status,
  fitMode,
  onFitModeChange,
  onRefresh,
  url,
}) {
  const state = STATUS[status] ?? STATUS.loading;

  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-line px-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className={cn("size-1.5 shrink-0 rounded-full", state.dot)} />
        <span className="eyebrow truncate">{state.label}</span>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Segmented
          value={fitMode}
          onChange={onFitModeChange}
          options={FIT_OPTIONS}
          size="sm"
        />
        <IconButton label="Rebuild preview" variant="ghost" onClick={onRefresh}>
          <RefreshIcon className="size-4" />
        </IconButton>
        <IconButton
          label="Open in a new tab"
          variant="ghost"
          disabled={!url}
          onClick={() => url && window.open(url, "_blank", "noopener,noreferrer")}
        >
          <ExternalLinkIcon className="size-4" />
        </IconButton>
      </div>
    </div>
  );
}
