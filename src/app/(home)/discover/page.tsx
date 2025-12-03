'use client'
import { BottomNav } from "@/components/BottomNav/Index";
import { Header } from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";

interface Creator {
  id: number;
  name: string;
  category: string;
  badge?: "Top Rated" | "Verified";
  image: string;
}

export default function Discover() {
  const suggestedCreators: Creator[] = [
    {
      id: 1,
      name: "Sarah Chen",
      category: "Fashion & Lifestyle",
      badge: "Top Rated",
      image: "/images/img (2).png",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      category: "Fitness & Wellness",
      badge: "Verified",
      image: "/images/img (1).png",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      category: "Beauty & Skincare",
      badge: "Top Rated",
      image: "/images/img (3).png",
    },
    {
      id: 4,
      name: "Liam Thompson",
      category: "Photography",
      badge: "Verified",
      image: "/images/img (4).png",
    },
    {
      id: 5,
      name: "Ava Patel",
      category: "Travel & Adventure",
      badge: "Top Rated",
      image: "/images/img (2).png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F9]">
      <Header />
      <main className="max-w-[640px] mx-auto px-4 sm:px-0 py-6 pb-24">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-base text-[#0A0A0A] leading-6">
              Suggested Creators
            </h2>

            <div className="space-y-4">
              {suggestedCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-4 flex items-center gap-4"
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
                      {creator.badge && (
                        <span className="px-2 py-0.5 bg-[#FCE7F3] border border-transparent rounded-lg text-xs text-[#C6005C] leading-4">
                          {creator.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-base text-[#4A5565] leading-6">
                      {creator.category}
                    </p>
                  </div>

                  <Link
                    href={`/view-profile`}
                    className="px-4 py-2 bg-[#FF99C9] rounded-lg text-sm text-[#0A0A0A] leading-5 hover:bg-[#FF99C9]/90 transition-colors whitespace-nowrap"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
