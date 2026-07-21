import { useId } from "react";
import { cn } from "../../lib/cn";

/**
 * Label + control + optional hint. Wires the generated id to the child via a
 * render prop so every control stays accessible without extra boilerplate.
 */
export function Field({ label, hint, trailing, className, children }) {
  const id = useId();

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || trailing) && (
        <div className="flex min-h-4 items-center justify-between gap-3">
          {label && (
            <label
              htmlFor={id}
              className="text-[12px] leading-none font-medium text-muted"
            >
              {label}
            </label>
          )}
          {trailing}
        </div>
      )}
      {typeof children === "function" ? children(id) : children}
      {hint && <p className="text-[11.5px] leading-snug text-faint">{hint}</p>}
    </div>
  );
}
