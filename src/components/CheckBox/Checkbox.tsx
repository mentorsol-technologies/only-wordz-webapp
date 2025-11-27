'use client';

import { cn } from '@/lib/constant';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export default function Checkbox(props: CheckboxProps) {
  const {
    label,
    checked: isChecked = false,
    onChange,
    className,
    id,
    disabled = false,
  } = props;

  const handleChange = () => {
    if (disabled) return;
    onChange?.(!isChecked);
  };

  return (
    <label
      htmlFor={id}
      onClick={handleChange}
      className={cn(
        'flex select-none items-center max-[376px]:items-start gap-2 max-[321px]:gap-1',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <span
        className={cn(
          'flex h-[18px] w-[18px] shrink-0 items-center justify-center max-[376px]:items-start rounded-sm border border-gray-700',
          isChecked && !disabled ? 'bg-[#FF99C9] text-black border-[#FF99C9]' : '',
          disabled ? 'opacity-60' : ''
        )}
      >
        {isChecked && <Check className="h-4 w-4" strokeWidth={2} />}
      </span>

      {/* Apply text styling here */}
      {label && (
        <span className={cn('font-sans font-normal text-[16px] text-[#4A5565] max-[376px]:-mt-0.5', className)}>
          {label}
        </span>
      )}
    </label>
  );
}
