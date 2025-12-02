/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import NavigateBack from "@/components/NavigateBack";
import { BottomNav } from "@/components/BottomNav/Index";
import { PackageCard } from "@/components/PackageCard/PackageCard";
import { packages } from "../my-packages/page";
import { useRouter } from "next/navigation";

const defaultSocialLinks: Record<
  string,
  { id: string; name: string; icon: ReactNode }
> = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    icon: (
      <Image
        src="/images/instagram.png"
        width={16}
        height={16}
        alt="Instagram"
      />
    ),
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    icon: (
      <Image src="/images/tiktok.png" width={16} height={16} alt="TikTok" />
    ),
  },
  twitter: {
    id: "twitter",
    name: "Twitter",
    icon: (
      <Image src="/images/twitter.png" width={16} height={16} alt="Twitter" />
    ),
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    icon: (
      <Image src="/images/youtube.png" width={16} height={16} alt="YouTube" />
    ),
  },
};

const defaultPhotos = [
  "/images/img (2).png",
  "/images/img (1).png",
  "/images/img (4).png",
];

export default function ViewProfile() {
  const [profileData] = useState<any>({});
  const router = useRouter()
  const {
    fullName = "Sarah Mitchell",
    username = "sarahcreates",
    email = "onlywordz.com@sarahcreates",
    aboutMe = "✨ Digital marketing expert & content creator\n💬 Love helping people grow their brands\n🎨 Creative strategy | Social media tips | Business coaching\n☕ Coffee enthusiast | 🐕 Dog mom",
    photos = defaultPhotos,
    activeSocials = [],
  } = profileData;
  const activeSocialsWithDefaults =
    (activeSocials && activeSocials.length > 0)
      ? activeSocials
      : Object.keys(defaultSocialLinks);
  return (
    <div className="min-h-screen bg-[#F8F7F9] flex flex-col">
      <header className="bg-white border-b border-[#C1BDDB] shadow-sm sticky top-0 z-50">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-4 flex items-center justify-start">
          <NavigateBack />
          <h1 className="text-lg font-medium text-black text-center mx-auto">@{username}</h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center gap-4 px-4 py-6 pb-32">
        <div className="w-full max-w-[640px] mx-auto px-4 sm:px-0 flex flex-col gap-4">
          <div className="bg-white border-b border-[#C1BDDB]">
            <div className="flex flex-col items-center pt-8 pb-6 px-4">
              <div className="relative mb-4">
                <div
                  className="w-28 h-28 rounded-full border-4 border-white shadow-[0_0_20px_rgba(88,252,236,0.4)] bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/img (2).png')`,
                  }}
                />
              </div>

              <h2 className="text-2xl text-[#303A2B] mb-2">{fullName}</h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FF99C9]" />
                <span className="text-base text-[#303A2B]">Online</span>
              </div>

              <button className="flex items-center gap-2 px-[17px] py-[9px] cursor-pointer rounded-full border border-[#FF99C9] bg-[rgba(88,252,236,0.10)]">
                <span className="text-sm text-[#303A2B]">{email}</span>
                <Share2 className="w-4 h-4 text-[#FF99C9]" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#C1BDDB] p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-[#303A2B]">About Me</h3>
            </div>

            <p className="text-base text-[#303A2B] leading-[25.6px] whitespace-pre-line">
              {aboutMe}
            </p>

            <h3 className="text-base text-[#303A2B] mt-1">Social Links</h3>
            <div className="flex flex-wrap gap-2">
              {activeSocialsWithDefaults.map((id: string) => (
                <div
                  key={id}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full border border-[#C1BDDB] bg-[#F8F7F9] hover:bg-[#E5E4E7] transition-colors"
                >
                  {defaultSocialLinks[id]?.icon}
                  <span className="text-sm text-[#303A2B]">
                    {defaultSocialLinks[id]?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#303A2B]">Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((url: string, index: number) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-[#E5E4E7] relative">
                  <Image
                    src={url}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
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
                showBuyButton
                showTabButton={false}
                onBuyClick={() => router.push('/package-detail')}
              />
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}