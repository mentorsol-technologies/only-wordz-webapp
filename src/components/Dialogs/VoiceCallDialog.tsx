import { Mic } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogOptionalTitle,
} from "../Dialog";
import Image from "next/image";

interface VoiceCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callerData: {
    name: string;
    image: string;
    callDuration: string;
  };
  isMuted: boolean;
  onToggleMute: () => void;
  onEndCall: () => void;
}

export function VoiceCallDialog({
  open,
  onOpenChange,
  callerData,
  onToggleMute,
  onEndCall,
  isMuted
}: VoiceCallDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 border border-[#C1BDDB] shadow-[0_20px_60px_0_rgba(0,0,0,0.30)] rounded-3xl">
        <DialogClose className="hidden" />
        <div className="flex flex-col items-center px-8 py-8">
          <Image
            src={callerData.image}
            alt={callerData.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full border-[3px] border-[#FF99C9] object-cover mb-4"
          />
          <DialogOptionalTitle
            title={callerData.name || ""}
            className="text-xl text-[#303A2B] text-center font-normal leading-[30px] mb-2" />
          <p className="text-xl text-[#606060] text-center leading-7 mb-8">
            {callerData.callDuration}
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={onToggleMute}
              className="w-16 h-16 cursor-pointer rounded-full bg-[#FF99C9] flex items-center justify-center hover:bg-[#FF99C9]/90 transition-colors"
            >
              <div className="relative">
                <Mic className="w-7 h-7 text-[#303A2B]" strokeWidth={2.33} />
                {isMuted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-7 bg-red-500 rotate-45"></div>
                  </div>
                )}
              </div>
            </button>
            <button
              onClick={onEndCall}
              className="w-16 h-16 cursor-pointer rounded-full bg-[#FF4444] flex items-center justify-center hover:bg-[#FF4444]/90 transition-colors"
            >
              <Image
                src={'/images/phone.png'}
                alt={'Icon'}
                width={39}
                height={39}
              />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
