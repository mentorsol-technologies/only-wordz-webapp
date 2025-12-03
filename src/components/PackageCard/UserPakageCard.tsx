import { Clock, MessageSquare, Phone, Video } from "lucide-react";
import Image from "next/image";

interface PackageCardProps {
    title: string;
    description: string;
    duration: string;
    onBuyClick?: () => void;
    showBuyButton?: boolean;
}

export function UserPakageCard({
    title,
    description,
    duration,
    showBuyButton = false,
    onBuyClick,
}: PackageCardProps) {

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
            </div>

            <div className="px-4 py-5">
                <div className="grid grid-cols-3 gap-1 md:gap-2.5 mb-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-8 h-8 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 text-green-dark" />
                            </div>
                            <span className="font-roboto font-normal text-sm md:text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Texts
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[16px] md:text-[20px] leading-5 text-[#141414] align-middle">
                            13 out 25
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-8 h-8 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Phone className="w-4 h-4 text-green-dark" />
                            </div>
                            <span className="font-roboto font-normal text-sm md:text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Audio Calls
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[16px] md:text-[20px] leading-5 text-[#141414] align-middle">
                            10 out 50
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-8 h-8 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Video className="w-4 h-4 text-green-dark" />                                </div>
                            <span className="font-roboto font-normal text-sm md:text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Vedio Calls
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[16px] md:text-[20px] leading-5 text-[#141414] align-middle">
                            3 out 5
                        </span>
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
        </div>
    );
}
