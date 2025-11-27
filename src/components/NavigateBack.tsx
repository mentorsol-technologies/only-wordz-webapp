"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavigateBackProps {
    title?: string;
    className?: string;
    onClick?: () => void;
}

const NavigateBack = ({ title, className = "", onClick }: NavigateBackProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) return onClick();

        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        }
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Go back"
            className={`flex items-center gap-3 text-[#0A0A0A] cursor-pointer transition-all ${className}`}
        >
            <ArrowLeft size={18} />
            {title && (
                <span className="text-[14px] font-sans font-medium">{title}</span>
            )}
        </button>
    );
};

export default NavigateBack;
