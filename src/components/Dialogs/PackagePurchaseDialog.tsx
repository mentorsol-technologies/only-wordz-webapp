import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogOptionalTitle,
} from "../Dialog";

interface PackagePurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: {
    name: string;
    description: string;
    whatYouGet: string;
    experienceTags: string[];
    price: number;
    duration: string;
  };
  onPurchase: () => void;
  onClose: () => void;
}

export function PackagePurchaseDialog({
  open,
  onOpenChange,
  packageData,
  onPurchase,
  onClose,
}: PackagePurchaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 border border-[rgba(0,0,0,0.10)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] rounded-xl">
        <DialogClose className="hidden" />

        <div className="relative px-6 pt-10 pb-6 space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 rounded-md cursor-pointer right-4 w-6 h-6 hover:bg-[#F8F7F9] text-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-5 h-5 text-[#0A0A0A] text-center mx-auto" strokeWidth={1.33} />
          </button>

          <div className="space-y-2">
            <DialogOptionalTitle
              title={packageData.name}
              className="text-2xl text-[#303A2B] leading-8 font-normal"
            />
            <p className="text-sm text-[#606060] leading-5">
              {packageData.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base text-[#303A2B] leading-6">
              What You&apos;ll Get
            </h3>
            <p className="text-base text-[#303A2B] leading-[25.6px]">
              {packageData.whatYouGet}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base text-[#303A2B] leading-6">
              Experience Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {packageData.experienceTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[rgba(255,153,201,0.10)] border border-[#FF99C9] rounded-full text-sm text-[#212121] leading-5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-4 pt-4 pb-0 bg-[#F8F7F9] rounded-[14px] space-y-1">
            <p className="text-[30px] text-[#303A2B] leading-9">
              ${packageData.price}
            </p>
            <p className="text-sm text-[#212121] leading-5 pb-4">
              One-time purchase • {packageData.duration}
            </p>
          </div>

          <button
            onClick={onPurchase}
            className="w-full py-2 px-4 cursor-pointer rounded-lg bg-[#FF99C9] shadow-[0_4px_12px_0_rgba(88,252,236,0.30)] text-sm text-[#303A2B] leading-5 hover:bg-[#FF99C9]/90 transition-colors"
          >
            Purchase Package
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
