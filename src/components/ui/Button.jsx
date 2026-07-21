import { cn } from "../../lib/cn";

/**
 * `primary` is ink — near-black on paper, near-white in dark mode. There is no
 * coloured call-to-action anywhere in the app; the clay accent is reserved for
 * selection and focus so the eye always knows what "chosen" means.
 */
const VARIANTS = {
  primary: "bg-ink text-paper hover:bg-ink-hover",
  secondary:
    "bg-surface text-ink border border-line hover:border-line-strong hover:bg-sunken",
  ghost: "text-muted hover:bg-sunken hover:text-ink",
  subtle: "bg-sunken text-muted hover:bg-line hover:text-ink",
  quiet: "text-muted hover:text-ink underline-offset-4 hover:underline",
};

const SIZES = {
  sm: "h-7 gap-1.5 px-2.5 text-[12px]",
  md: "h-9 gap-2 px-3.5 text-[13px]",
  lg: "h-10 gap-2 px-4 text-[13px]",
  icon: "size-8 justify-center",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  type = "button",
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-control font-medium",
        "transition-colors duration-150 select-none",
        "disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function IconButton({ label, className, ...rest }) {
  return (
    <Button
      size="icon"
      aria-label={label}
      title={label}
      className={cn("shrink-0", className)}
      {...rest}
    />
  );
}
