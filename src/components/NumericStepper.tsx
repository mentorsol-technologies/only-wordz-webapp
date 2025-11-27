import { Minus, Plus } from "lucide-react";

interface NumericStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
}

export function NumericStepper({
    value,
    onChange,
    min = 0,
    max = 999,
    label,
}: NumericStepperProps) {
    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={handleDecrement}
                disabled={value <= min}
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#C1BDDB] cursor-pointer bg-gray-bg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Minus className="w-4 h-4 text-[#303A2B]" strokeWidth={1.33} />
            </button>
            <div className="flex items-center justify-center gap-2 min-w-14">
                <span className="text-base text-[#303A2B] font-normal">{value}</span>
                {label && <span className="text-sm text-[#606060]">{label}</span>}
            </div>
            <button
                type="button"
                onClick={handleIncrement}
                disabled={value >= max}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF99C9] hover:bg-[#f48fbe] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Plus className="w-4 h-4 text-black" strokeWidth={1.33} />
            </button>
        </div>
    );
}
