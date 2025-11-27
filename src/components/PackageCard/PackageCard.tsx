import { Clock, MessageSquare, Phone, Video, MoreVertical } from "lucide-react";
import Image from "next/image";

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
}

export function PackageCard({
    title,
    description,
    duration,
    price,
    active,
    earned,
    entitlements,
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
                <button className="text-[#595959] hover:text-[#413f3f] cursor-pointer transition-colors shrink-0">
                    <MoreVertical className="w-5 h-5 rotate-90" />
                </button>
            </div>

            <div className="px-4 py-5">
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Image src={'/images/briefcase2.png'} width={14} height={14} alt='Icon' />
                            </div>
                            <span className="font-roboto font-normal text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Price
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[24px] leading-5 text-[#141414] align-middle">
                            ${price}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Image src={'/images/clock2.png'} width={16} height={16} alt='Icon' />
                            </div>
                            <span className="font-roboto font-normal text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Active
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[24px] leading-5 text-[#141414] align-middle">
                            {active}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#EFF1F5] flex items-center justify-center">
                                <Image src={'/images/wallet2.png'} width={14} height={14} alt='Icon' />
                            </div>
                            <span className="font-roboto font-normal text-[16px] leading-4 text-[#8C8C8C] align-middle">
                                Earned
                            </span>
                        </div>
                        <span className="font-roboto font-normal text-[24px] leading-5 text-[#141414] align-middle">
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
            </div>
        </div>
    );
}
