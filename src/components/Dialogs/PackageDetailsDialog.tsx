import { X, Clock, MessageCircle, Phone, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogOptionalTitle,
} from "../Dialog";

interface PackageDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: {
    name: string;
    description: string;
    duration: string;
    remaining: {
      messages: number;
      voiceCalls: { count: number; minutes: number };
      videoCalls: number;
    };
  };
  onClose: () => void;
  title?: string;
}

export function PackageDetailsDialog({
  open,
  onOpenChange,
  packageData,
  onClose,
  title
}: PackageDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 border-0 shadow-[0_20px_60px_0_rgba(0,0,0,0.30)]">
        <DialogClose className="hidden" />

        <div className="border-b border-[#C1BDDB] px-6 py-4 flex items-center justify-between">
          <DialogOptionalTitle
            title={title || "Package Details"}
            className="text-sm sm:text-[20px] font-bold text-[#303A2B] leading-6 text-center mb-3"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg cursor-pointer hover:bg-[#F8F7F9] transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#303A2B]" strokeWidth={1.67} />
          </button>
        </div>

        <div className="px-6 pt-6 pb-4 space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#606060] uppercase tracking-wide leading-4">
              Current Package
            </p>
            <h3 className="text-xl font-bold text-[#FF99C9] leading-7">
              {packageData.name}
            </h3>
            <p className="text-sm text-[#303A2B] leading-[22.75px]">
              {packageData.description}
            </p>
          </div>

          <div className="bg-[#F8F7F9] rounded-lg px-4 py-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FF99C9]" strokeWidth={1.67} />
            <div>
              <p className="text-xs text-[#606060] leading-4">Duration</p>
              <p className="text-base font-bold text-[#303A2B] leading-6">
                {packageData.duration}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#606060] uppercase tracking-wide leading-4">
              What&apos;s Remaining
            </p>
            <div className="space-y-3">
              <div className="bg-[#F8F7F9] rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#FF99C9]" strokeWidth={1.67} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#303A2B] leading-5">Messages</p>
                    <p className="text-xs text-[#606060] leading-4">Text chat</p>
                  </div>
                </div>
                <p className="text-base font-bold text-[#303A2B] leading-6">
                  {packageData.remaining.messages}
                </p>
              </div>

              <div className="bg-[#F8F7F9] rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#FF99C9]" strokeWidth={1.67} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#303A2B] leading-5">Voice Calls</p>
                    <p className="text-xs text-[#606060] leading-4">Audio only</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-base font-bold text-[#303A2B] leading-6">
                    {packageData.remaining.voiceCalls.count}
                  </p>
                  <p className="text-xs text-[#606060] leading-4">
                    ({packageData.remaining.voiceCalls.minutes} minutes)
                  </p>
                </div>
              </div>

              <div className="bg-[#F8F7F9] rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#FF99C9]" strokeWidth={1.67} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#303A2B] leading-5">Video Calls</p>
                    <p className="text-xs text-[#606060] leading-4">Face to face</p>
                  </div>
                </div>
                <p className="text-base font-bold text-[#303A2B] leading-6">
                  {packageData.remaining.videoCalls}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#C1BDDB]">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 cursor-pointer rounded-[14px] bg-[#FF99C9] text-base font-bold text-[#303A2B] leading-6 hover:bg-[#FF99C9]/90 transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
