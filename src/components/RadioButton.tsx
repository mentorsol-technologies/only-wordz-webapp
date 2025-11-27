interface RadioButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  name: string;
  value: string;
}

export function RadioButton({
  checked,
  onChange,
  label,
  description,
  name,
  value,
}: RadioButtonProps) {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
        checked ? "bg-[#F8F7F9]" : ""
      }`}
    >
      <div className="flex items-center justify-center w-5 h-5 mt-0.5">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(true)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            checked ? "border-[#FF99C9]" : "border-[#C1BDDB]"
          }`}
        >
          {checked && <div className="w-3 h-3 rounded-full bg-[#FF99C9]" />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-base text-[#303A2B] font-normal mb-0.5">{label}</div>
        {description && (
          <div className="text-sm text-[#606060]">{description}</div>
        )}
      </div>
    </label>
  );
}
