'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav/Index";
import Button from "@/components/Button/Button";
import NavigateBack from "@/components/NavigateBack";
import { PackageCard } from "@/components/PackageCard/PackageCard";
import Image from "next/image";

interface Creator {
    id: number;
    name: string;
    category: string;
    image: string;
}

export default function PackageDetails() {
    const router = useRouter();
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

    const suggestedCreators: Creator[] = [
        {
            id: 1,
            name: "Sarah Chen",
            category: "Fashion & Lifestyle",
            image: "/images/img (2).png",
        },
    ];

    const packages = [
        {
            id: 1,
            title: "Lets get to know eachother",
            description: "Perfect for quick conversations and getting to know each other!",
            duration: "7 days • 1h SLA",
            price: 30,
            active: 3,
            earned: 389.98,
            entitlements: {
                unlimitedTexts: true,
                phoneMinutes: "10 × 15min",
                videoMinutes: "5 × 10min",
            },
        },
    ];

    const handleBuyNow = () => {
        setIsPaymentSuccess(true);
        setTimeout(() => {
            router.push("/new-chat");
        }, 1000);
    };

    if (isPaymentSuccess) {
        return (
            <div className="min-h-screen bg-[#F8F7F9] flex flex-col items-center justify-center p-6">
                <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
                    <div className="flex justify-center mb-4 2xl:mb-5 mt-1">
                        <Image src={'/images/check.png'} width={76} height={76} alt='Check icon' />
                    </div>
                    <h1 className="text-xl font-medium text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-base text-gray-600 mb-6">
                        Your chat with Sarah Chen is now active. Redirecting to chat...
                    </p>
                    <div className="animate-spin w-6 h-6 border-2 border-[#F6339A] border-t-transparent rounded-full mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F7F9]">
            <header className="bg-white border-b border-[#C1BDDB] shadow-sm sticky top-0 z-50">
                <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-4 flex items-center justify-start">
                    <NavigateBack />
                    <h1 className="text-lg font-medium text-black text-center mx-auto font-roboto">Package Details</h1>
                </div>
            </header>
            <main className="max-w-[640px] mx-auto px-4 sm:px-0 py-6 pb-24">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-4">
                            {suggestedCreators.map((creator) => (
                                <div
                                    key={creator.id}
                                    className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-4 flex items-start gap-4"
                                >
                                    <Image
                                        src={creator.image}
                                        alt={creator.name}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 rounded-full object-cover shrink-0"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-base text-[#0A0A0A] leading-6">
                                                {creator.name}
                                            </h3>
                                        </div>
                                        <p className="text-base text-[#4A5565] leading-6">
                                            {creator.category}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-base text-[#0A0A0A] leading-6">
                            Selected Package
                        </h2>
                        <div className="space-y-4 md:space-y-6 mt-5">
                            {packages.map((pkg) => (
                                <PackageCard
                                    key={pkg.id}
                                    title={pkg.title}
                                    description={pkg.description}
                                    duration={pkg.duration}
                                    price={pkg.price}
                                    active={pkg.active}
                                    earned={pkg.earned}
                                    entitlements={pkg.entitlements}
                                    showTabButton={false}
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className="bg-[#EFF6FF] rounded-[10px] p-4 flex items-start gap-4"
                    >
                        <Image
                            src={'/images/payment-icon.png'}
                            alt={'Icon'}
                            width={20}
                            height={20}
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                        />
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base text-[#1C398E] leading-6">
                                    Secure Payment
                                </h3>
                            </div>
                            <p className="text-base text-[#1447E6] leading-6">
                                Your payment is protected. Start chatting immediately after purchase.
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#FFFFFF] border-t border-[#E5E7EB] p-4 flex justify-between items-center gap-3 flex-wrap md:flex-nowrap">
                        <Button
                            onClick={() => router.push('/view-profile')}
                            size='lg'
                            className="w-full bg-white text-[#0A0A0A] border border-[#D1D5DB] hover:bg-gray-50 gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-sm disabled:opacity-50"
                        >
                            Back to Profile
                        </Button>
                        <Button
                            onClick={handleBuyNow}
                            size='lg'
                            className="w-full bg-[#FF99C9] text-[#212121] gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-sm"
                        >
                            Buy Now - $29
                        </Button>
                    </div>
                </div>
            </main >
            <BottomNav />
        </div >
    );
}
