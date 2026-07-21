import { useMemo } from "react";
import { ActiveDot, Panel } from "../ui/Panel";
import { Toggle } from "../ui/Toggle";
import { Slider } from "../ui/Slider";
import { Select, TextInput } from "../ui/Input";
import { ColorField } from "../ui/ColorField";
import { Segmented } from "../ui/Segmented";
import { Button } from "../ui/Button";
import { CalendarIcon } from "../icons";
import {
  DATE_FORMATS,
  DATE_PLACEMENTS,
  LIMITS,
  nowTime,
  todayIso,
} from "../../lib/constants";
import { formatStamp } from "../../lib/format";

export function DateTimeSection({ settings, update }) {
  const {
    dateEnabled,
    dateValue,
    timeEnabled,
    timeValue,
    dateFormat,
    datePlacement,
  } = settings;

  // Show each format rendered with the date the user actually picked.
  const formatOptions = useMemo(
    () =>
      DATE_FORMATS.map((option) => ({
        id: option.id,
        label:
          formatStamp({
            dateValue,
            timeValue,
            dateFormat: option.id,
            includeTime: false,
          }) || option.label,
      })),
    [dateValue, timeValue],
  );

  const stamp = formatStamp({
    dateValue,
    timeValue,
    dateFormat,
    includeTime: timeEnabled,
  });

  return (
    <Panel
      title="Date & time"
      description="Stamp the letter with a date, optionally a time"
      icon={CalendarIcon}
      badge={dateEnabled ? <ActiveDot title="Date is on" /> : null}
    >
      <Toggle
        label="Show date on the document"
        description="Adds a dated stamp to the generated PDF"
        checked={dateEnabled}
        onChange={(value) => update({ dateEnabled: value })}
      />

      {dateEnabled && (
        <div className="space-y-4 border-t border-line pt-4">
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="Date"
              type="date"
              value={dateValue}
              onChange={(event) => update({ dateValue: event.target.value })}
              trailing={
                <Button
                  size="sm"
                  variant="subtle"
                  className="h-6 px-2 text-[11px]"
                  onClick={() => update({ dateValue: todayIso() })}
                >
                  Today
                </Button>
              }
            />
            <TextInput
              label="Time"
              type="time"
              value={timeValue}
              disabled={!timeEnabled}
              onChange={(event) => update({ timeValue: event.target.value })}
              className={!timeEnabled ? "opacity-50" : undefined}
              trailing={
                <Button
                  size="sm"
                  variant="subtle"
                  className="h-6 px-2 text-[11px]"
                  disabled={!timeEnabled}
                  onClick={() => update({ timeValue: nowTime() })}
                >
                  Now
                </Button>
              }
            />
          </div>

          <Toggle
            label="Include the time"
            checked={timeEnabled}
            onChange={(value) => update({ timeEnabled: value })}
          />

          <Select
            label="Format"
            value={dateFormat}
            options={formatOptions}
            onChange={(event) => update({ dateFormat: event.target.value })}
          />

          <Segmented
            label="Placement"
            value={datePlacement}
            onChange={(value) => update({ datePlacement: value })}
            options={DATE_PLACEMENTS}
            size="sm"
          />

          {datePlacement !== "inline" && (
            <Slider
              label="Distance from top"
              value={settings.dateTop}
              onChange={(value) => update({ dateTop: value })}
              suffix=" pt"
              {...LIMITS.dateTop}
            />
          )}

          <Slider
            label="Size"
            value={settings.dateFontSize}
            onChange={(value) => update({ dateFontSize: value })}
            suffix=" pt"
            {...LIMITS.dateFontSize}
          />

          <ColorField
            label="Colour"
            value={settings.dateColor}
            onChange={(value) => update({ dateColor: value })}
          />

          <div className="flex items-baseline justify-between gap-3 rounded-control border border-line bg-sunken px-3 py-2">
            <span className="eyebrow text-faint">Stamp</span>
            <span className="font-malayalam truncate text-[13px] text-ink">
              {stamp || "— pick a valid date —"}
            </span>
          </div>
        </div>
      )}
    </Panel>
  );
}
