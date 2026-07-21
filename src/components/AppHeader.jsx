import { Button, IconButton } from "./ui/Button";
import { MoonIcon, RotateLeftIcon, SunIcon } from "./icons";

/**
 * No logo tile, no gradient. The wordmark is set in the serif face and the
 * college name sits behind a hairline rule — a masthead, not a product badge.
 */
export function AppHeader({ theme, onToggleTheme, onReset, canReset }) {
  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-[1800px] items-center gap-3 px-4 sm:px-5">
        <h1 className="shrink-0 font-serif text-[17px] leading-none tracking-tight text-ink">
          Letterpad
        </h1>

        <p className="hidden min-w-0 items-center gap-3 text-[11.5px] text-muted sm:flex">
          <span aria-hidden className="h-3.5 w-px bg-line-strong" />
          <span className="truncate">
            UP Usthad Memorial Da&apos;wa College
          </span>
        </p>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={!canReset}
            title="Restore every setting to its default"
          >
            <RotateLeftIcon className="size-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <IconButton
            label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            variant="ghost"
            onClick={onToggleTheme}
          >
            {theme === "dark" ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
}
