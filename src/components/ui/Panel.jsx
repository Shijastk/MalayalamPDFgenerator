import { useState } from "react";
import { ChevronDownIcon } from "../icons";
import { cn } from "../../lib/cn";

/**
 * A collapsible section of the editor column.
 *
 * Deliberately borderless: the sections stack inside one surface and are
 * separated by a single hairline, so the sidebar reads as one document rather
 * than a stack of floating cards.
 */
export function Panel({
  title,
  description,
  icon: Icon,
  badge,
  defaultOpen = true,
  children,
  className,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={cn("border-b border-line last:border-b-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-sunken"
      >
        {Icon && (
          <Icon className="size-4 shrink-0 text-faint transition-colors group-hover:text-muted" />
        )}

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="eyebrow truncate text-ink">{title}</span>
            {badge}
          </span>
          {description && (
            <span className="mt-1 block truncate text-[11.5px] leading-snug text-faint">
              {description}
            </span>
          )}
        </span>

        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-faint transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && <div className="space-y-4 px-4 pt-1 pb-5">{children}</div>}
    </section>
  );
}

/** A single clay dot — replaces the loud "On" pill. */
export function ActiveDot({ title = "Active" }) {
  return (
    <span
      title={title}
      aria-label={title}
      className="size-1.5 shrink-0 rounded-full bg-accent"
    />
  );
}
