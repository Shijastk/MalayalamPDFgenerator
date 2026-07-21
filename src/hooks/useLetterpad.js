import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_SETTINGS, STORAGE_KEY } from "../lib/constants";

function readStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    // Only keep keys we still know about, so an old draft can never
    // introduce unexpected fields into the document definition.
    return Object.fromEntries(
      Object.entries(parsed).filter(([key]) => key in DEFAULT_SETTINGS),
    );
  } catch {
    return null;
  }
}

/**
 * Owns every editor value. Components receive `settings` plus a single
 * `update({ key: value })` callback instead of two dozen setters.
 */
export function useLetterpad() {
  const [settings, setSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
    ...readStoredSettings(),
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch {
        // Storage full or blocked (private mode) — drafts simply aren't kept.
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [settings]);

  const update = useCallback((patch) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS });
  }, []);

  const isDirty = useMemo(
    () =>
      Object.keys(DEFAULT_SETTINGS).some(
        (key) => settings[key] !== DEFAULT_SETTINGS[key],
      ),
    [settings],
  );

  return { settings, update, reset, isDirty };
}
