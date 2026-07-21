import { Panel } from "../ui/Panel";
import { Slider } from "../ui/Slider";
import { Segmented } from "../ui/Segmented";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  LayoutIcon,
} from "../icons";
import { LIMITS, PAGE_HEIGHT } from "../../lib/constants";

const ALIGN_OPTIONS = [
  { id: "left", icon: AlignLeftIcon, title: "Align left" },
  { id: "center", icon: AlignCenterIcon, title: "Align centre" },
  { id: "right", icon: AlignRightIcon, title: "Align right" },
];

export function LayoutSection({ settings, update }) {
  return (
    <Panel
      title="Layout"
      description="Where the text block sits on the page"
      icon={LayoutIcon}
    >
      <Segmented
        label="Text alignment"
        value={settings.align}
        onChange={(value) => update({ align: value })}
        options={ALIGN_OPTIONS}
      />

      <Slider
        label="Distance from top"
        value={settings.verticalPosition}
        onChange={(value) => update({ verticalPosition: value })}
        format={(value) =>
          `${value} pt · ${Math.round((value / PAGE_HEIGHT) * 100)}%`
        }
        {...LIMITS.verticalPosition}
      />
    </Panel>
  );
}
