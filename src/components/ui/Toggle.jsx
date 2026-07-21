import { cn } from "../../lib/cn";

/** Accessible switch built on a real button with `role="switch"`. */
export function Toggle({ checked, onChange, label, description, className }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        {description && (
          <p className="mt-0.5 text-[11.5px] leading-snug text-faint">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors duration-150",
          checked ? "bg-ink" : "bg-line-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-4 rounded-full bg-surface transition-transform duration-150",
            checked && "translate-x-4",
          )}
        />
      </button>
    </div>
  );
}
