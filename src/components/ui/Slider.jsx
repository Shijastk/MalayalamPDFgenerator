import { useId } from "react";
import { cn } from "../../lib/cn";

/**
 * Range input with a filled track and a live value readout.
 * `format` lets callers render "28 pt", "1.3×", "30%" etc.
 */
export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = "",
  format,
  disabled = false,
  className,
}) {
  const id = useId();
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  const display = format ? format(value) : `${value}${suffix}`;

  return (
    <div className={cn("space-y-2", disabled && "opacity-45", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[12px] font-medium text-muted">
          {label}
        </label>
        {/* Bare numerals, not a chip — keeps the column quiet while dragging. */}
        <span className="numeric text-ink">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range-input"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--ink) ${percent}%, var(--sunken) ${percent}%)`,
        }}
      />
    </div>
  );
}
