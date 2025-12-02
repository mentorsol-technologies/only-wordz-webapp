'use client'
import { BottomNav } from "@/components/BottomNav/Index";
import NavigateBack from "@/components/NavigateBack";
import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Message {
  id: string;
  name: string;
  message: string;
  time: string;
  image: string;
  status?: "new" | "completed";
  badge?: string;
  timeLeft?: string;
  unreadCount?: number;
}

const messages: Message[] = [
  {
    id: "1",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear from you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "/images/img (2).png",
    status: "new",
    badge: "NEW ORDER",
    timeLeft: "48h to accept",
    unreadCount: 1,
  },
  {
    id: "2",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear from you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "/images/img (1).png",
    timeLeft: "15m left",
  },
  {
    id: "3",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear from you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "/images/img (3).png",
    timeLeft: "15m left",
  },
  {
    id: "4",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear from you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "/images/img (4).png",
    timeLeft: "15m left",
  },
  {
    id: "5",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear from you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "/images/img (2).png",
    timeLeft: "15m left",
  },
  {
    id: "6",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear from you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "/images/img (1).png",
    status: "completed",
    timeLeft: "48h to Left",
  },
];

export default function Chats() {
  const router = useRouter();
  const [role] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedRole");
    }
    return null;
  });

  const handleMessageClick = (msg: Message) => {
    if (msg.status === "new") {
      router.push(`/chats/new-order/${msg.id}`);
    }
  };
  if (role === null && typeof window !== "undefined") {
    return null;
  }
  const filteredMessages = messages.filter(msg => !(role === "user" && msg.badge === "NEW ORDER"));

  return (
    <div className="min-h-screen bg-[#F8F7F9] flex flex-col">
      <header className="w-full bg-linear-to-b from-[rgba(255,255,255,0.80)] to-[rgba(251,251,251,0.80)] backdrop-blur-[7.5px] border-b border-[#CDD5E1] shadow-[0_5px_12px_0_rgba(0,0,0,0.10)]">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-7 flex flex-col gap-3">
          <div className="flex items-center justify-start">
            <NavigateBack />
            <h1 className="sm:text-lg text-[16px] font-bold italic text-[#141414] text-center mx-auto font-ubuntu">
              WordzMessenger
            </h1>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1">
              <div className="flex-1 flex items-center gap-1.5 px-2.5 py-2 rounded-[18px] bg-[rgba(57,83,125,0.07)]">
                <Search className="w-[18px] h-[18px] text-[#39537D]" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 bg-transparent text-sm text-[#8F9FB8] placeholder-[#8F9FB8] outline-none border-none"
                />
                <SlidersHorizontal className="w-[18px] h-[18px] text-[#8F9FB8]" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-2.5 pb-32">
        <div className="w-full max-w-[640px] mx-auto px-4 sm:px-0 flex flex-col gap-6">
          <div className="flex flex-col gap-5 pt-4">
            {filteredMessages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleMessageClick(msg)}
                className={`flex items-center gap-4 bg-white rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] overflow-hidden 
                  ${msg.status === "new" ? "border-2 border-[#FF99C9] cursor-pointer" : ""} 
                  ${msg.status === "completed" ? "opacity-60" : ""}`}
              >
                <Image
                  src={msg.image}
                  alt={msg.name}
                  width={87}
                  height={93}
                  className="w-[87px] h-[93px] object-cover shrink-0"
                />
                <div className="flex-1 flex flex-col sm:py-4 pr-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center flex-wrap gap-1 sm:gap-2 min-w-0">
                      <h3 className="text-sm font-medium text-[#141414] truncate">{msg.name}</h3>
                      {msg.badge && <span className="text-xs text-[#FF4444] shrink-0">{msg.badge}</span>}
                      {msg.status === "completed" && <span className="text-xs font-medium text-[#22C55E] shrink-0">Completed</span>}
                    </div>
                    {msg.unreadCount && (
                      <div className="min-w-5 min-h-5 rounded-full bg-[#FF99C9] flex items-center justify-center px-1 ml-2">
                        <span className="text-xs text-white">{msg.unreadCount}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] font-medium text-[#595959] line-clamp-2">{msg.message}</p>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#8C8C8C]">{msg.time}</span>
                    {msg.timeLeft && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF99C9]"></div>
                        <span className="text-xs text-[#A2C7E5]">{msg.timeLeft}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
