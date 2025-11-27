"use client"
import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "../../../components/Header/Header";
import { BottomNav } from "../../../components/BottomNav/Index";
import { PackageCard } from "../../../components/PackageCard/PackageCard";
import { useRouter } from "next/navigation";

type FilterType = "all" | "published" | "draft";

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "published", label: "Published" },
  { id: "draft", label: "Draft" },
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
  {
    id: 2,
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
  {
    id: 3,
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

export default function Index() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const router = useRouter()
  return (
    <div className="min-h-screen pb-24">
      <Header />
      <main className="max-w-[640px] mx-auto px-4 sm:px-0 pt-6">
        <div className="bg-white/90 backdrop-blur-sm border-b border-[#CDD5E1] sticky top-0 z-40">
          <div className="px-4 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
            <h2 className="font-roboto font-medium text-[18px] leading-7 text-black">
              My Chat Packages
            </h2>
            <button onClick={() => router.push('/create-package')} className="flex items-center justify-center gap-1 p-2.5 cursor-pointer bg-[#FF99C9] rounded-lg hover:bg-[#FF99C9]/90 transition-colors shadow-sm">
              <Plus className="w-5 h-5 text-green-dark" strokeWidth={1.67} />
              <span className="text-sm font-medium text-green-dark">
                Create New Package
              </span>
            </button>
          </div>

          <div className="px-4 pb-3 md:pb-4 pt-4 flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-1 md:flex-none px-5 py-1.5 border w-full max-w-[200px] rounded-[30px] cursor-pointer text-xs transition-all ${activeFilter === filter.id
                  ? "bg-[#FF99C9] border-[#FF99C9] text-[#000000] shadow-sm"
                  : "bg-white border-[#A2C7E5] text-[#303A2B] hover:bg-gray-50"
                  }`}
              >
                {filter.label}
              </button>
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
            />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
