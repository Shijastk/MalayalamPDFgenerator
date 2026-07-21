import { cn } from "../../lib/cn";

/**
 * Radio-style segmented control.
 * `options` is `[{ id, label?, icon?, title? }]`; pass `icon` for icon-only tabs.
 */
export function Segmented({
  label,
  // Keeps `label` as the accessible name while dropping the visible caption —
  // useful where the options already say what the group is.
  hideLabel = false,
  value,
  onChange,
  options,
  size = "md",
  className,
}) {
  const control = (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex rounded-control border border-line bg-sunken p-0.5",
        // Labelled groups are form rows and span the column; bare ones (e.g.
        // the preview toolbar) size to their content.
        label && "w-full",
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.id === value;
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            title={option.title ?? option.label}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-chip font-medium",
              "transition-colors duration-150",
              size === "sm" ? "h-6 px-2 text-[11.5px]" : "h-7 px-3 text-[12px]",
              selected
                ? "bg-surface text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
                : "text-muted hover:text-ink",
            )}
          >
            {Icon && <Icon className="size-4" />}
            {option.label && <span className="truncate">{option.label}</span>}
          </button>
        );
      })}
    </div>
  );

  if (!label || hideLabel) return control;

  return (
    <div className="space-y-1.5">
      <span className="block text-[12px] leading-none font-medium text-muted">
        {label}
      </span>
      {control}
    </div>
  );
}
