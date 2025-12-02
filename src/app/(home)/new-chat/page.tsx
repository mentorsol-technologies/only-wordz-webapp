'use client'
import { useState } from "react";
import { Package, Phone, Video, Flag, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import NavigateBack from "@/components/NavigateBack";
import useToggle from "@/lib/hooks/useToggle";
import { PackageDetailsDialog } from "@/components/Dialogs/PackageDetailsDialog";
import { VoiceCallDialog } from "@/components/Dialogs/VoiceCallDialog";
import { ReportUserDialog } from "@/components/Dialogs/ReportUserDialog";
import { callerData, packageData } from "@/lib/constant";

interface Message {
  id: number;
  text: string;
  time: string;
  isSent: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! Thanks for getting the chat package 😊",
      time: "10:23 AM",
      isSent: true,
    },
    {
      id: 2,
      text: "Hi! I'm so excited to chat with you!",
      time: "10:24 AM",
      isSent: false,
    },
    {
      id: 3,
      text: "How's your day going?",
      time: "10:25 AM",
      isSent: true,
    },
    {
      id: 4,
      text: "It's going great! Just finished a workout. How about yours?",
      time: "10:28 AM",
      isSent: false,
    },
    {
      id: 5,
      text: "That's awesome! I'm planning to hit the gym later too 💪",
      time: "10:29 AM",
      isSent: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false)
  const showPackageDetail = useToggle()
  const showVoiceCall = useToggle();
  const showReport = useToggle();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        isSent: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F9] flex flex-col">
      <header className="bg-white border-b border-[#C1BDDB] shadow-[0_2px_4px_0_rgba(0,0,0,0.02)] sticky top-0 z-10">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <NavigateBack />
              <Image
                src="/images/Tim Anderson.jpg"
                alt="Tim Anderson"
                height={40}
                width={40}
                className="w-10 h-10 rounded-full border-2 border-[#C1BDDB] object-cover"
              />

              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-bold text-[#FF99C9] leading-4">
                  Lets get to know eachother
                </p>
                <p className="text-base text-[#303A2B] leading-6">
                  Tim Anderson
                </p>
                <p className="text-xs text-[#0CCFBC] leading-4">
                  Active now
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={showPackageDetail.open}
                className="flex items-center gap-2 px-6 py-2 cursor-pointer rounded-lg border border-[#C1BDDB] hover:bg-[#F8F7F9] transition-colors"
              >
                <Package className="w-5 h-5 text-[#FF99C9]" strokeWidth={1.67} />
                <span className="text-base font-bold text-[#303A2B] leading-6">
                  Package
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button onClick={showVoiceCall.open} className="w-9 h-9 cursor-pointer rounded-lg hover:bg-[#F8F7F9] transition-colors flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#303A2B]" strokeWidth={1.67} />
                </button>
                <button className="w-9 h-9 cursor-pointer rounded-lg hover:bg-[#F8F7F9] transition-colors flex items-center justify-center">
                  <Video className="w-5 h-5 text-[#303A2B]" strokeWidth={1.67} />
                </button>
                <button onClick={showReport.open} className="w-9 h-9 cursor-pointer rounded-lg hover:bg-[#F8F7F9] transition-colors flex items-center justify-center">
                  <Flag className="w-5 h-5 text-[#FF99C9]" strokeWidth={1.67} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-8">
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-1 ${message.isSent ? "items-end" : "items-start"
                  }`}
              >
                <div
                  className={`max-w-md px-4 py-2 ${message.isSent
                    ? "bg-[#FF99C9] rounded-[20px_20px_4px_20px]"
                    : "bg-white border border-[#C1BDDB] rounded-[20px_20px_20px_4px]"
                    }`}
                >
                  <p className="text-base text-[#303A2B] leading-6">
                    {message.text}
                  </p>
                </div>
                <p className="text-xs text-[#A2C7E5] px-2 leading-4">
                  {message.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-[#C1BDDB] shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-end gap-2">
            <button className="w-10 h-10 rounded-lg hover:bg-[#F8F7F9] transition-colors flex items-center justify-center">
              <Paperclip className="w-5 h-5 text-[#717171]" strokeWidth={1.67} />
            </button>

            <div className="flex-1 flex items-center px-4 py-2.5 rounded-full border-2 border-[#C1BDDB] bg-[#F8F7F9]">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-base text-[#303A2B] placeholder:text-[rgba(48,58,43,0.5)] outline-none"
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${newMessage.trim()
                ? "bg-[#FF99C9] hover:bg-[#FF99C9]/90"
                : "bg-[#FF99C9] opacity-50"
                }`}
            >
              <Send className="w-5 h-5 text-[#303A2B]" strokeWidth={1.67} />
            </button>
          </div>
        </div>
      </footer>
      <PackageDetailsDialog
        open={showPackageDetail.isOpen}
        onOpenChange={showPackageDetail.toggle}
        packageData={packageData}
        onClose={showPackageDetail.close}
      />
      <VoiceCallDialog
        open={showVoiceCall.isOpen}
        onOpenChange={showVoiceCall.toggle}
        callerData={callerData}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        onEndCall={showVoiceCall.close} />
      <ReportUserDialog
        open={showReport.isOpen}
        onOpenChange={showReport.toggle}
        userName="Tim Anderson"
        onReport={(reason) => {
          console.log("Reported for:", reason);
          showReport.close()
        }}
        onCancel={showReport.close}
      />
    </div>
  );
}
