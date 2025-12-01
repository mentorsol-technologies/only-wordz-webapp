import { Check } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogOptionalTitle } from "../Dialog";

interface AcceptOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buyerName: string;
  onAccept: () => void;
  onCancel: () => void;
  title?: string;
}

export function AcceptOrderDialog({
  open,
  onOpenChange,
  buyerName,
  onAccept,
  onCancel,
  title,
}: AcceptOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[394px] p-0 gap-0 border-0 shadow-[0_20px_60px_0_rgba(0,0,0,0.30)]">
        <DialogClose className="hidden" />
        <div className="flex flex-col items-center px-6 pt-6 pb-6">
          <div className="w-16 h-16 rounded-full bg-[rgba(88,252,236,0.10)] flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-[#FF99C9]" strokeWidth={2.67} />
          </div>

          <DialogOptionalTitle
            title={title || "Accept This Order?"}
            className="text-base font-bold text-[#303A2B] leading-6 text-center mb-3"
          />
          <p className="text-sm text-[#A2C7E5] text-center leading-5 mb-6">
            You&apos;ll start chatting with {buyerName} and the SLA timer will begin.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 cursor-pointer rounded-[14px] border-2 border-[#C1BDDB] bg-white text-base font-bold text-[#303A2B] leading-6 hover:bg-[#F8F7F9] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="flex-1 py-3 px-4 cursor-pointer rounded-[14px] bg-[#FF99C9] text-base font-bold text-[#303A2B] leading-6 hover:bg-[#FF99C9]/90 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
