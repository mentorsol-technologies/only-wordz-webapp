/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { Share2, Pencil, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import NavigateBack from "@/components/NavigateBack";
import { BottomNav } from "@/components/BottomNav/Index";
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
  "/images/img (4).png",
  "/images/img (3).png",
  "/images/img (2).png",
  "/images/img (1).png",
  "/images/img (3).png",
  "/images/img (2).png",
];

export default function Profile() {
  const [profileData, setProfileData] = useState<any>({
    fullName: "Sarah Mitchell",
    username: "sarahcreates",
    email: "onlywordz.com@sarahcreates",
    aboutMe:
      "✨ Digital marketing expert & content creator\n💬 Love helping people grow their brands\n🎨 Creative strategy | Social media tips | Business coaching\n☕ Coffee enthusiast | 🐕 Dog mom",
    photos: defaultPhotos,
    activeSocials: Object.keys(defaultSocialLinks),
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const stored = localStorage.getItem("profileData");
    if (stored) {
      setTimeout(() => setProfileData(JSON.parse(stored)), 0);
    }
  }, []);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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
          <button
            className="p-2 hover:bg-[#F8F7F9] rounded-lg transition-colors cursor-pointer relative"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MoreVertical className="w-6 h-6 text-[#303A2B]" />

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-32 z-50" ref={menuRef}>
                <div
                  onClick={() => router.push('/login')}
                  className="w-full bg-white border cursor-pointer border-[#C1BDDB] rounded-2xl px-4 py-3 text-base text-[#FF4444] hover:bg-gray-50 transition-colors text-center"
                >
                  Log Out
                </div>
              </div>
            )}
          </button>

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
                <Link
                  href="/profile/edit"
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-[10px] bg-[#FF99C9] flex items-center justify-center"
                >
                  <Pencil className="w-4 h-4 text-black" />
                </Link>
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

              <Link
                href="/profile/edit"
                className="w-7 h-7 rounded-[10px] bg-[#FF99C9] flex items-center justify-center"
              >
                <Pencil className="w-4 h-4 text-black" />
              </Link>
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
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden bg-[#E5E4E7]"
                  style={{
                    backgroundImage: `url('${url}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </main>
      <BottomNav />
    </div>
  );
}