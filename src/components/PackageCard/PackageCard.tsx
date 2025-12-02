import { Clock, MessageSquare, Phone, Video, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PackageDetailsDialog } from "../Dialogs/PackageDetailsDialog";
import useToggle from "@/lib/hooks/useToggle";
import { packageData } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { DeletePackageDialog } from "../Dialogs/DeletePackage";

interface PackageCardProps {
    title: string;
    description: string;
    duration: string;
    price: number;
    active: number;
    earned: number;
    entitlements: {
        unlimitedTexts?: boolean;
        phoneMinutes?: string;
        videoMinutes?: string;
    };
    onBuyClick?: () => void;
    showBuyButton?: boolean;
    showTabButton?: boolean;
}

export function PackageCard({
    title,
    description,
    duration,
    price,
    active,
    earned,
    entitlements,
    showBuyButton = false,
    showTabButton = true,
    onBuyClick,
}: PackageCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const showPackageDetail = useToggle()
    const deletePackage = useToggle()
    const router = useRouter()
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_0_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="px-4 py-4 border-b border-[#E5E4E7] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-[60px] h-[60px] rounded-full flex justify-center items-center object-cover shrink-0 border border-gray-100">
                        <Image src={'/images/profile.png'} width={121} height={36} alt='Logo' />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-roboto font-medium text-[14px] leading-5 text-[#141414] mb-0.5 truncate">
                            {title}
                        </h3>
                        <p className="font-roboto font-normal text-[12px] leading-5 text-[#141414] mb-1 line-clamp-2">
                            {description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-[#4A5646]">
                            <Clock className="w-4 h-4" />
                            <span>{duration}</span>
                        </div>
                    </div>
                </div>
                {showTabButton && (
                    <button
                        className="p-2 hover:bg-[#F8F7F9] rounded-lg transition-colors cursor-pointer relative"
                        onClick={() => setMenuOpen(prev => !prev)}
                    >
                        <MoreVertical className="w-6 h-6 text-[#303A2B] rotate-90" />

                        {menuOpen && (
                            <div ref={menuRef}
                                className="absolute right-0 mt-3 w-32 z-50 border border-[#C1BDDB] rounded-2xl overflow-hidden bg-white shadow-lg">
                                <div
                                    className="px-5 py-2 text-left text-base cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={showPackageDetail.open}
                                >
                                    Veiw Detail
                                </div>
                                <div
                                    className="px-5 py-2 text-left text-base cursor-pointer hover:bg-gray-50 transition-colors  border-t border-[#C1BDDB]"
                                    onClick={() => router.push(`/create-package?mode=edit&title=${encodeURIComponent(title)}`)}
                                >
                                    Edit
                                </div>
                                <div
                                    className="px-5 py-2 text-left text-red-600 text-base cursor-pointer hover:bg-gray-50 transition-colors border-t border-[#C1BDDB]"
                                    onClick={deletePackage.open}
                                >
                                    Delete
                                </div>
                            </div>

                        )}
                    </button>
                )}
            </div>

            <div className="px-4 py-5">
                <div className="grid grid-cols-3 gap-1 md:gap-2.5 mb-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Image src={'/images/briefcase2.png'} width={14} height={14} alt='Icon' />
                            </div>
                            <span className="font-roboto font-normal text-sm md:text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Price
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[18px] md:text-[24px] leading-5 text-[#141414] align-middle">
                            ${price}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Image src={'/images/clock2.png'} width={16} height={16} alt='Icon' />
                            </div>
                            <span className="font-roboto font-normal text-sm md:text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Active
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[18px] md:text-[24px] leading-5 text-[#141414] align-middle">
                            {active}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Image src={'/images/wallet2.png'} width={14} height={14} alt='Icon' />
                            </div>
                            <span className="font-roboto font-normal text-sm md:text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Earned
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[18px] md:text-[24px] leading-5 text-[#141414] align-middle">
                            ${earned.toFixed(2)}
                        </span>
                    </div>
                </div>

                <div className="pt-5">
                    <h4 className="font-roboto font-normal text-[14px] leading-5 text-[#141414] mb-2.5 flex items-center">
                        Entitlements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {entitlements.unlimitedTexts && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-[#F8F7F9] rounded-lg">
                                <MessageSquare className="w-4 h-4 text-green-dark" />
                                <span className="text-sm text-green-dark">Unlimited texts</span>
                            </div>
                        )}
                        {entitlements.phoneMinutes && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-[#F8F7F9] rounded-lg">
                                <Phone className="w-4 h-4 text-green-dark" />
                                <span className="text-sm text-green-dark">
                                    {entitlements.phoneMinutes}
                                </span>
                            </div>
                        )}
                        {entitlements.videoMinutes && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-[#F8F7F9] rounded-lg">
                                <Video className="w-4 h-4 text-green-dark" />
                                <span className="text-sm text-green-dark">
                                    {entitlements.videoMinutes}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {showBuyButton && (
                    <button
                        onClick={onBuyClick}
                        className="mt-5 w-full cursor-pointer px-4 py-2 bg-[#FF99C9] rounded-lg text-sm text-[#0A0A0A] leading-5 hover:bg-[#FF99C9]/90 transition-colors"
                    >
                        Buy Package
                    </button>
                )}
            </div>
            <PackageDetailsDialog
                open={showPackageDetail.isOpen}
                onOpenChange={showPackageDetail.toggle}
                packageData={packageData}
                onClose={showPackageDetail.close}
            />
            <DeletePackageDialog
                open={deletePackage.isOpen}
                onOpenChange={deletePackage.toggle}
                onCancel={deletePackage.close}
                onConfirm={() => {
                    console.log("Package deleted!");
                    deletePackage.close()
                }}
            />
        </div>
    );
}
