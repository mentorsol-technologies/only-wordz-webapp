'use client'
import { Search } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (showSearch) {
            inputRef.current?.focus();
        }
    }, [showSearch]);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowSearch(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="w-full bg-white border-b border-[#C1BDDB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-4 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h1 className="font-roboto font-medium text-[18px] leading-[21px] text-black">
                            Hello John
                        </h1>
                        <span className="text-base">👋</span>
                    </div>
                    <p className="font-roboto font-normal text-[12px] leading-3.5 text-[#777777] truncate">
                        Welcome back onlywordz!
                    </p>
                </div>
                <div className="shrink-0 hidden sm:block">
                    <Image src={'/images/Logo.png'} width={121} height={36} alt='Logo' />
                </div>

                <div className="flex items-center gap-3 relative" ref={containerRef}>
                    {showSearch ? (
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-3 rounded-lg bg-[#F3F3F5] border border-[rgba(193,189,219,0.5)] text-sm text-[#717182] focus:border-[#FF99C9] focus:outline-none"
                        />
                    ) : (
                        <button
                            onClick={() => setShowSearch(true)}
                            className="flex items-center gap-2.5 py-3 px-3 cursor-pointer rounded-lg border border-[rgba(193,189,219,0.5)] bg-[#F8F7F9]"
                        >
                            <Search className="w-5 h-5 text-gray-darker" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
