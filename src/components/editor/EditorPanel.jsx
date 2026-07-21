import { ContentSection } from "./ContentSection";
import { BackgroundSection } from "./BackgroundSection";
import { TypographySection } from "./TypographySection";
import { LayoutSection } from "./LayoutSection";
import { DateTimeSection } from "./DateTimeSection";
import { WatermarkSection } from "./WatermarkSection";

/**
 * The left column: every editing control in one ruled surface.
 * Scrolls independently of the preview on desktop.
 */
export function EditorPanel({ settings, update }) {
  const sectionProps = { settings, update };

  return (
    <div className="overflow-hidden rounded-panel border border-line bg-surface">
      <ContentSection {...sectionProps} />
      <BackgroundSection {...sectionProps} />
      <TypographySection {...sectionProps} />
      <LayoutSection {...sectionProps} />
      <DateTimeSection {...sectionProps} />
      <WatermarkSection {...sectionProps} />
    </div>
  );
}
