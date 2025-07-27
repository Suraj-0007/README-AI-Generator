"use client";

interface TemplateSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

const templates = ["Basic", "Professional", "Minimal"];

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Select a Template</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none"
      >
        {templates.map((tpl) => (
          <option key={tpl} value={tpl}>
            {tpl}
          </option>
        ))}
      </select>
    </div>
  );
}
