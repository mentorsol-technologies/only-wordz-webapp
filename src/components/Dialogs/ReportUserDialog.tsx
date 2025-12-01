import { X, AlertTriangle, MessageSquareX, UserX, Shield } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogOptionalTitle,
} from "../Dialog";

interface ReportUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userName: string;
    onReport: (reason: string) => void;
    onCancel: () => void;
}

const reportReasons = [
    {
        id: "harassment",
        icon: AlertTriangle,
        title: "Harassment or bullying",
        description: "Abusive or threatening behavior",
    },
    {
        id: "inappropriate",
        icon: MessageSquareX,
        title: "Inappropriate content",
        description: "Offensive messages or media",
    },
    {
        id: "spam",
        icon: UserX,
        title: "Spam or scam",
        description: "Unsolicited promotional content",
    },
    {
        id: "safety",
        icon: Shield,
        title: "Safety concern",
        description: "Threats or dangerous behavior",
    },
];

export function ReportUserDialog({
    open,
    onOpenChange,
    userName,
    onReport,
    onCancel,
}: ReportUserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md p-0 gap-0 border border-[#C1BDDB] shadow-none rounded-3xl">
                <DialogClose className="hidden" />

                <div className="border-b border-[#C1BDDB] bg-white px-6 py-4 flex items-center justify-between rounded-t-3xl">
                    <DialogOptionalTitle
                        title={`Report ${userName}`}
                        className="text-base text-[#303A2B] leading-6 font-normal"
                    />
                    <button
                        onClick={onCancel}
                        className="w-8 h-8 cursor-pointer rounded-lg hover:bg-[#F8F7F9] transition-colors flex items-center justify-center"
                    >
                        <X className="w-6 h-6 text-[#303A2B]" strokeWidth={2} />
                    </button>
                </div>

                <div className="px-6 pt-6 pb-0 space-y-6">
                    <p className="text-base text-[#787878] leading-6">
                        Help us understand what&apos;s happening. Your report is confidential.
                    </p>

                    <div className="space-y-3">
                        {reportReasons.map((reason) => (
                            <button
                                key={reason.id}
                                onClick={() => onReport(reason.id)}
                                className="w-full p-4 rounded-[14px] cursor-pointer border border-[#C1BDDB] hover:bg-[#F8F7F9] transition-colors flex items-start gap-3 text-left"
                            >
                                <div className="w-10 h-10 rounded-full bg-[rgba(255,153,201,0.10)] flex items-center justify-center shrink-0">
                                    <reason.icon className="w-5 h-5 text-[#FF99C9]" strokeWidth={1.67} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-base text-[#303A2B] leading-6">
                                        {reason.title}
                                    </p>
                                    <p className="text-sm text-[#787878] leading-5">
                                        {reason.description}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={onCancel}
                        className="w-full py-3 px-4 mb-5 cursor-pointer rounded-[14px] border border-[#C1BDDB] bg-white text-base text-[#303A2B] leading-6 hover:bg-[#F8F7F9] transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
