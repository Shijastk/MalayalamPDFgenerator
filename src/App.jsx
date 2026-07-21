import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { EditorPanel } from "./components/editor/EditorPanel";
import { PreviewPane } from "./components/preview/PreviewPane";
import { Segmented } from "./components/ui/Segmented";
import { FileTextIcon, ImageIcon } from "./components/icons";
import { useLetterpad } from "./hooks/useLetterpad";
import { useTheme } from "./hooks/useTheme";
import { cn } from "./lib/cn";

const MOBILE_TABS = [
  { id: "edit", label: "Edit", icon: FileTextIcon },
  { id: "preview", label: "Preview", icon: ImageIcon },
];

export default function App() {
  const { settings, update, reset, isDirty } = useLetterpad();
  const { theme, toggle } = useTheme();
  const [mobileTab, setMobileTab] = useState("edit");

  return (
    <div className="flex h-dvh flex-col">
      <AppHeader
        theme={theme}
        onToggleTheme={toggle}
        onReset={reset}
        canReset={isDirty}
      />

      {/* Editor / preview switch — desktop shows both columns at once. */}
      <div className="shrink-0 border-b border-line px-4 py-2 lg:hidden">
        <Segmented
          value={mobileTab}
          onChange={setMobileTab}
          options={MOBILE_TABS}
          label="View"
          hideLabel
          className="w-full"
        />
      </div>

      <main className="mx-auto grid min-h-0 w-full max-w-[1800px] flex-1 gap-4 p-3 sm:p-5 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] xl:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]">
        <div
          className={cn(
            "scroll-slim min-h-0 overflow-y-auto pb-6 lg:block",
            mobileTab === "edit" ? "block" : "hidden",
          )}
        >
          <EditorPanel settings={settings} update={update} />
        </div>

        <div
          className={cn(
            "min-h-0 lg:flex",
            mobileTab === "preview" ? "flex" : "hidden",
          )}
        >
          <PreviewPane settings={settings} update={update} className="flex-1" />
        </div>
      </main>
    </div>
  );
}
