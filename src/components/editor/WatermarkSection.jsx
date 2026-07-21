import { ActiveDot, Panel } from "../ui/Panel";
import { Slider } from "../ui/Slider";
import { TextInput } from "../ui/Input";
import { ColorField } from "../ui/ColorField";
import { DropletIcon } from "../icons";
import { LIMITS } from "../../lib/constants";

export function WatermarkSection({ settings, update }) {
  const active = Boolean(settings.watermarkText.trim());

  return (
    <Panel
      title="Watermark"
      description="Optional diagonal text behind the content"
      icon={DropletIcon}
      defaultOpen={false}
      badge={active ? <ActiveDot title="Watermark is on" /> : null}
    >
      <TextInput
        label="Watermark text"
        malayalam
        placeholder="DRAFT / COPY / രഹസ്യം"
        value={settings.watermarkText}
        maxLength={40}
        onChange={(event) => update({ watermarkText: event.target.value })}
        hint="Leave empty to remove the watermark."
      />

      <Slider
        label="Opacity"
        value={settings.watermarkOpacity}
        onChange={(value) => update({ watermarkOpacity: value })}
        format={(value) => `${Math.round(value * 100)}%`}
        disabled={!active}
        {...LIMITS.watermarkOpacity}
      />

      <Slider
        label="Size"
        value={settings.watermarkFontSize}
        onChange={(value) => update({ watermarkFontSize: value })}
        suffix=" pt"
        disabled={!active}
        {...LIMITS.watermarkFontSize}
      />

      <Slider
        label="Angle"
        value={settings.watermarkAngle}
        onChange={(value) => update({ watermarkAngle: value })}
        suffix="°"
        disabled={!active}
        {...LIMITS.watermarkAngle}
      />

      <ColorField
        label="Colour"
        value={settings.watermarkColor}
        onChange={(value) => update({ watermarkColor: value })}
      />
    </Panel>
  );
}
