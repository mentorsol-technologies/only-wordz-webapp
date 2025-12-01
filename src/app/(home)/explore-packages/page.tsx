/* eslint-disable */
'use client'
import { BottomNav } from "@/components/BottomNav/Index";
import { PackagePurchaseDialog } from "@/components/Dialogs/PackagePurchaseDialog";
import { Header } from "@/components/Header/Header";
import useToggle from "@/lib/hooks/useToggle";
import { MessageSquare, Phone, Video, Clock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const featuresIcons: any = {
    messages: MessageSquare,
    calls: Phone,
    video: Video,
    days: Clock,
    reply: Zap,
};

function PackageCard({ title, subtitle, price, features, onOpenDialog }: any) {
    const router = useRouter();

    return (
        <div className="bg-white border border-[#C1BDDB] rounded-2xl p-5">
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl text-[#303A2B] font-normal">{title}</h3>
                    <p className="text-sm text-[#A2C7E5]">{subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {features.map((item: any, idx: number) => {
                        const Icon = featuresIcons[item.icon];
                        return (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FFF5FA] border border-[#FF99C9] rounded-[10px] text-sm text-[#303A2B]"
                            >
                                <Icon className="w-4 h-4 text-[#A2C7E5]" strokeWidth={1.33} />
                                {item.value}
                            </span>
                        );
                    })}
                </div>

                <div>
                    <div className="text-3xl text-[#303A2B]">{price}</div>
                    <div className="text-sm text-[#A2C7E5]">One-time purchase</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onOpenDialog}
                        className="flex-1 py-3.5 px-6 border-2 cursor-pointer border-[#FF99C9] text-[#FF99C9] rounded-2xl text-base font-normal hover:bg-[#FFF5FA] transition-colors">
                        What&apos;s Included
                    </button>
                    <button onClick={() => router.push('/new-chat')} className="flex-1 py-3.5 px-6 cursor-pointer bg-[#FF99C9] text-[#303A2B] rounded-2xl text-base font-normal hover:bg-[#FF99C9]/90 transition-colors shadow-[0_4px_12px_0_rgba(88,252,236,0.3)]">
                        Purchase Package
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ExplorePackages() {
    const purchasePakage = useToggle()

    const PACKAGE_DATA = [
        {
            title: "Package 1",
            subtitle: "Perfect for a quick question",
            price: "$29",
            features: [
                { icon: "messages", value: "20 messages" },
                { icon: "calls", value: "1 call" },
                { icon: "video", value: "0 calls" },
                { icon: "days", value: "7 days" },
                { icon: "reply", value: "2h reply" },
            ],
        },
        {
            title: "Package 2",
            subtitle: "Most popular choice",
            price: "$99",
            features: [
                { icon: "messages", value: "Unlimited" },
                { icon: "calls", value: "3 calls" },
                { icon: "video", value: "1 call" },
                { icon: "days", value: "7 days" },
                { icon: "reply", value: "30m reply" },
            ],
        },
        {
            title: "Package 3",
            subtitle: "Full access & priority support",
            price: "$349",
            features: [
                { icon: "messages", value: "Unlimited" },
                { icon: "calls", value: "Unlimited" },
                { icon: "video", value: "5 calls" },
                { icon: "days", value: "30 days" },
                { icon: "reply", value: "15m reply" },
            ],
        },
    ];
    const purchasePackageData = {
        name: "Lets get to know eachother",
        description: "Perfect for a quick question",
        whatYouGet: "This starter package is perfect for getting to know each other! We'll have fun, casual conversations where you can ask me anything. Whether you need advice, want to share your day, or just chat about life, I'm here for you. Get quick responses and genuine connection without any commitment.",
        experienceTags: ["Phone Calls", "Friends", "Sounding Board"],
        price: 29,
        duration: "7 days",
    };
    return (
        <div className="min-h-screen bg-[#F8F7F9] flex flex-col">
            <Header />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-[640px] mx-auto px-4 sm:px-0 pb-24 pt-6">
                    <div className="space-y-4">
                        {PACKAGE_DATA.map((item, idx) => (
                            <PackageCard key={idx} {...item}
                                onOpenDialog={purchasePakage.open}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav />
            <PackagePurchaseDialog
                open={purchasePakage.isOpen}
                onOpenChange={purchasePakage.toggle}
                packageData={purchasePackageData}
                onPurchase={() => {
                    console.log("Package purchased!");
                    purchasePakage.close()
                }}
                onClose={purchasePakage.close}
            />
        </div>
    );
}
