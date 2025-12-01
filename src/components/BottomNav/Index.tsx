import { User, MessageCircle, Settings, Grid2x2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "chats", label: "Chats", icon: MessageCircle, path: "/chats" },
    { id: "packages", label: "My Packages", icon: Grid2x2, path: "/my-packages" },
    { id: "explore", label: "Explore Packages", icon: Grid2x2, path: "/explore-packages" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#C1BDDB] shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] z-50">
            <div className="max-w-[640px] mx-auto px-2 sm:px-0 py-2.5">
                <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.id}
                                href={item.path}
                                className={`flex flex-col items-center gap-1 sm:px-3 px-2 py-2 rounded-xl transition-all ${isActive ? "bg-[#FF99C91A]" : ""
                                    }`}
                            >
                                <Icon
                                    className={`sm:w-6 sm:h-5 w-4 h-5 ${isActive ? "text-[#FF99C9]" : "text-[#A2C7E5]"
                                        }`}
                                    strokeWidth={2}
                                />
                                <span
                                        className={`sm:text-xs text-[10px] whitespace-nowrap ${isActive ? "text-[#FF99C9]" : "text-[#A2C7E5]"
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
