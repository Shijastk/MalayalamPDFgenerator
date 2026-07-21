import { useId } from "react";
import { COLOR_PRESETS } from "../../lib/constants";
import { normaliseHex } from "../../lib/color";
import { cn } from "../../lib/cn";

export function ColorField({ label, value, onChange, className }) {
  const id = useId();
  const safeValue = normaliseHex(value);

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-[12px] font-medium text-muted">
        {label}
      </label>

      <div className="flex items-center gap-2">
        <input
          id={id}
          type="color"
          className="color-well"
          value={safeValue}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          type="text"
          aria-label={`${label} hex value`}
          value={value}
          spellCheck={false}
          onChange={(event) => onChange(event.target.value)}
          onBlur={(event) => onChange(normaliseHex(event.target.value, safeValue))}
          className={cn(
            "h-8 w-[5.25rem] rounded-control border border-line bg-surface px-2",
            "font-mono text-[11px] tracking-tight text-ink uppercase",
            "transition-[border-color,box-shadow] duration-150 hover:border-line-strong",
            "focus:border-accent focus:ring-[3px] focus:ring-accent/15 focus:outline-none",
          )}
        />

        {/* Presets sit flush as one ruled strip rather than eight floating pills. */}
        <div className="ml-auto flex overflow-hidden rounded-chip border border-line">
          {COLOR_PRESETS.map((preset) => {
            const selected = safeValue === preset;
            return (
              <button
                key={preset}
                type="button"
                title={preset}
                aria-label={`Use ${preset}`}
                aria-pressed={selected}
                onClick={() => onChange(preset)}
                className={cn(
                  "relative size-5 transition-transform duration-150",
                  selected && "z-10 scale-125 rounded-[3px] ring-2 ring-ink",
                )}
                style={{ backgroundColor: preset }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
