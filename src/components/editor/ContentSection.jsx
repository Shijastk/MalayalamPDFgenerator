import { Panel } from "../ui/Panel";
import { TextArea, TextInput } from "../ui/Input";
import { FileTextIcon } from "../icons";

function CharCount({ value, max }) {
  const near = max ? value.length / max > 0.9 : false;
  return (
    <span className={`numeric ${near ? "text-accent" : "text-faint"}`}>
      {value.length}
      {max ? `/${max}` : ""}
    </span>
  );
}

export function ContentSection({ settings, update }) {
  return (
    <Panel
      title="Content"
      description="Malayalam and English both supported"
      icon={FileTextIcon}
    >
      <TextInput
        label="Heading"
        malayalam
        placeholder="Enter your heading here"
        value={settings.heading}
        trailing={<CharCount value={settings.heading} max={120} />}
        maxLength={120}
        onChange={(event) => update({ heading: event.target.value })}
      />

      <TextArea
        label="Description"
        malayalam
        rows={5}
        placeholder="Write the body of the letter…"
        value={settings.description}
        trailing={<CharCount value={settings.description} />}
        onChange={(event) => update({ description: event.target.value })}
      />

      <TextInput
        label="Subtext"
        malayalam
        placeholder="Signature, designation, note…"
        value={settings.subtext}
        trailing={<CharCount value={settings.subtext} max={160} />}
        maxLength={160}
        onChange={(event) => update({ subtext: event.target.value })}
      />
    </Panel>
  );
}
