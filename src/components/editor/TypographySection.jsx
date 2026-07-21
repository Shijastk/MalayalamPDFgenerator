import { Panel } from "../ui/Panel";
import { Slider } from "../ui/Slider";
import { ColorField } from "../ui/ColorField";
import { TypeIcon } from "../icons";
import { LIMITS } from "../../lib/constants";

/** One group = size slider + matching colour picker, for each text role. */
const ROLES = [
  {
    key: "heading",
    label: "Heading",
    sizeKey: "headingFontSize",
    colorKey: "headingColor",
  },
  {
    key: "description",
    label: "Description",
    sizeKey: "descriptionFontSize",
    colorKey: "descriptionColor",
  },
  {
    key: "subtext",
    label: "Subtext",
    sizeKey: "subtextFontSize",
    colorKey: "subtextColor",
  },
];

export function TypographySection({ settings, update }) {
  return (
    <Panel
      title="Typography"
      description="Sizes are in PDF points, not screen pixels"
      icon={TypeIcon}
    >
      {/* Roles are separated by rules rather than nested grey boxes. */}
      <div className="-mt-1 divide-y divide-line">
        {ROLES.map((role) => (
          <div key={role.key} className="space-y-3 py-4 first:pt-1 last:pb-1">
            <p className="eyebrow text-faint">{role.label}</p>
            <Slider
              label="Size"
              value={settings[role.sizeKey]}
              onChange={(value) => update({ [role.sizeKey]: value })}
              suffix=" pt"
              {...LIMITS[role.sizeKey]}
            />
            <ColorField
              label="Colour"
              value={settings[role.colorKey]}
              onChange={(value) => update({ [role.colorKey]: value })}
            />
          </div>
        ))}
      </div>

      <Slider
        label="Line height"
        value={settings.lineHeight}
        onChange={(value) => update({ lineHeight: value })}
        format={(value) => `${value.toFixed(2)}×`}
        {...LIMITS.lineHeight}
      />
    </Panel>
  );
}
