import { Panel } from "../ui/Panel";
import { Segmented } from "../ui/Segmented";
import { CheckIcon, ImageIcon } from "../icons";
import { BACKGROUNDS } from "../../lib/constants";
import { BACKGROUND_THUMBNAILS } from "../../lib/assets";
import { cn } from "../../lib/cn";

const SCOPE_OPTIONS = [
  { id: "first", label: "First page", title: "Letterhead on page 1 only" },
  { id: "all", label: "All pages", title: "Repeat the letterhead on every page" },
];

export function BackgroundSection({ settings, update }) {
  return (
    <Panel
      title="Letterhead"
      description="Pick the stationery for this document"
      icon={ImageIcon}
    >
      <div className="grid grid-cols-2 gap-3">
        {BACKGROUNDS.map((background) => {
          const selected = settings.background === background.id;
          return (
            <button
              key={background.id}
              type="button"
              aria-pressed={selected}
              onClick={() => update({ background: background.id })}
              className="group text-left"
            >
              {/* The sheet itself carries the selection, not a coloured glow. */}
              <span
                className={cn(
                  "relative block overflow-hidden rounded-chip border transition-colors duration-150",
                  selected
                    ? "border-ink"
                    : "border-line group-hover:border-line-strong",
                )}
              >
                <img
                  src={BACKGROUND_THUMBNAILS[background.id]}
                  alt={background.label}
                  loading="lazy"
                  className="aspect-[595/842] w-full bg-white object-cover object-top"
                />

                {selected && (
                  <span className="absolute top-1.5 right-1.5 grid size-5 place-items-center rounded-full bg-ink text-paper">
                    <CheckIcon className="size-3" />
                  </span>
                )}
              </span>

              <span className="mt-2 block">
                <span
                  className={cn(
                    "block text-[12px] font-medium transition-colors",
                    selected ? "text-ink" : "text-muted",
                  )}
                >
                  {background.label}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-faint">
                  {background.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <Segmented
        label="Apply to"
        value={settings.backgroundScope}
        onChange={(value) => update({ backgroundScope: value })}
        options={SCOPE_OPTIONS}
      />
    </Panel>
  );
}
