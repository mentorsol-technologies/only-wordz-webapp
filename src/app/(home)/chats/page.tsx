'use client'
import { BottomNav } from "@/components/BottomNav/Index";
import NavigateBack from "@/components/NavigateBack";
import { Search, SlidersHorizontal, MessageSquare } from "lucide-react";
import Image from "next/image";
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

const primaryMessages: Message[] = [
  {
    id: "1",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear form you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/7ce099fb64639b674ce791e47b56d7cf493e72d9?width=174",
    status: "new",
    badge: "NEW ORDER",
    timeLeft: "48h to accept",
    unreadCount: 1,
  },
  {
    id: "2",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear form you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6b7e50459fb56507d6b60005d174495af5885e2b?width=174",
    timeLeft: "15m left",
  },
  {
    id: "3",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear form you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6d3ed1f3ee599b9e71b96c429512231332e64126?width=174",
    timeLeft: "15m left",
  },
  {
    id: "4",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear form you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6b7e50459fb56507d6b60005d174495af5885e2b?width=174",
    timeLeft: "15m left",
  },
  {
    id: "5",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear form you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6d3ed1f3ee599b9e71b96c429512231332e64126?width=174",
    timeLeft: "15m left",
  },
  {
    id: "6",
    name: "Brooklyn Simmons",
    message: "Hey! It's so great to hear form you, I really loved the video you uploaded the other day! Did you...",
    time: "8:12pm",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9458eeffbfe69abfc3d194e024d0ac971cbe4040?width=174",
    status: "completed",
    timeLeft: "48h to Left",
  },
];

export default function Chats() {
  const [activeTab, setActiveTab] = useState<"primary" | "requests">("primary");

  return (
    <div className="min-h-screen bg-[#F8F7F9] flex flex-col">
      <header className="w-full h-[148px] bg-linear-to-b from-[rgba(255,255,255,0.80)] to-[rgba(251,251,251,0.80)] backdrop-blur-[7.5px] border-b border-[#CDD5E1] shadow-[0_5px_12px_0_rgba(0,0,0,0.10)]">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <NavigateBack />
            <h1 className="sm:text-lg text-[16px] font-bold italic text-[#141414] font-ubuntu">
              WordzMessenger
            </h1>
            <button className="flex items-center sm:gap-2.5 gap-1 sm:px-3.5 px-2 py-1.5 bg-[#FF99C9] rounded-md">
              <MessageSquare className="w-5 h-5 text-[#303A2B]" strokeWidth={1.33} />
              <span className="text-base text-[#303A2B]">New Chat</span>
            </button>
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
          <div className="flex flex-col gap-2.5 p-1 bg-white rounded-[18px] shadow-[0_2px_15px_0_rgba(0,0,0,0.10)]">
            <div className="flex h-7">
              <button
                onClick={() => setActiveTab("primary")}
                className={`flex-1 px-2 py-1 rounded-full cursor-pointer text-xs font-medium transition-colors ${activeTab === "primary"
                  ? "bg-[#FF99C9] text-[#303A2B]"
                  : "bg-transparent text-[#303A2B]"
                  }`}
              >
                Primary (4)
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`flex-1 px-2 py-1 rounded-full cursor-pointer text-xs font-medium transition-colors ${activeTab === "requests"
                  ? "bg-[#FF99C9] text-[#303A2B]"
                  : "bg-transparent text-[#303A2B]"
                  }`}
              >
                Requests (1)
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {primaryMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center gap-4 bg-white rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] overflow-hidden ${msg.status === "new" ? "border-2 border-[#FF99C9]" : ""
                  } ${msg.status === "completed" ? "opacity-60" : ""}`}
              >
                <Image
                  src={msg.image}
                  alt={msg.name}
                  width={87}
                  height={93}
                  className="w-[87px] h-[93px] object-cover shrink-0"
                />
                <div className="flex-1 flex flex-col gap-1 sm:py-4 pr-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-[#141414]">
                        {msg.name}
                      </h3>
                      {msg.badge && (
                        <span className="text-xs text-[#FF4444]">{msg.badge}</span>
                      )}
                      {msg.status === "completed" && (
                        <span className="text-xs font-medium text-[#22C55E]">
                          Completed
                        </span>
                      )}
                    </div>
                    {msg.unreadCount && (
                      <div className="w-5 h-5 rounded-full bg-[#FF99C9] flex items-center justify-center">
                        <span className="text-xs text-white">{msg.unreadCount}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] font-medium text-[#595959] line-clamp-2">
                    {msg.message}
                  </p>

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
