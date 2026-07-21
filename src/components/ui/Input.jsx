import { cn } from "../../lib/cn";
import { Field } from "./Field";

const CONTROL_BASE =
  "w-full rounded-control border border-line bg-surface px-2.5 text-[13px] text-ink " +
  "placeholder:text-faint transition-[border-color,box-shadow] duration-150 " +
  "hover:border-line-strong " +
  "focus:border-accent focus:ring-[3px] focus:ring-accent/15 focus:outline-none " +
  "disabled:cursor-not-allowed disabled:opacity-45";

export function TextInput({
  label,
  hint,
  trailing,
  malayalam = false,
  className,
  ...rest
}) {
  return (
    <Field label={label} hint={hint} trailing={trailing}>
      {(id) => (
        <input
          id={id}
          className={cn(
            CONTROL_BASE,
            "h-9",
            malayalam && "font-malayalam",
            className,
          )}
          {...rest}
        />
      )}
    </Field>
  );
}

export function TextArea({
  label,
  hint,
  trailing,
  rows = 3,
  malayalam = false,
  className,
  ...rest
}) {
  return (
    <Field label={label} hint={hint} trailing={trailing}>
      {(id) => (
        <textarea
          id={id}
          rows={rows}
          className={cn(
            CONTROL_BASE,
            "resize-y py-2 leading-relaxed",
            malayalam && "font-malayalam",
            className,
          )}
          {...rest}
        />
      )}
    </Field>
  );
}

/* The caret is drawn as an inline SVG so it can inherit the muted token
   instead of the browser's default blue-grey select chrome. */
const CARET =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888078' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

export function Select({ label, hint, options, className, ...rest }) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <select
          id={id}
          className={cn(CONTROL_BASE, "h-9 appearance-none pr-8", className)}
          style={{
            backgroundImage: CARET,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.55rem center",
            backgroundSize: "0.95rem",
          }}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}
