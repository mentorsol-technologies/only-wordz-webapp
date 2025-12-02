"use client";

import { Dialog, DialogClose, DialogContent, DialogOptionalTitle } from "../Dialog";
import { Trash2 } from "lucide-react";

interface DeletePackageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    onCancel?: () => void;
}

export function DeletePackageDialog({
    open,
    onOpenChange,
    onConfirm,
    onCancel,
}: DeletePackageDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[394px] p-0 gap-0 border-0 shadow-[0_20px_60px_0_rgba(0,0,0,0.30)]">
                <DialogClose className="hidden" />

                <div className="flex flex-col items-center px-6 pt-6 pb-6">
                    <div className="w-16 h-16 rounded-full bg-[rgba(255,153,201,0.10)] flex items-center justify-center mb-4">
                        <Trash2 className="w-8 h-8 text-[#FF4444]" strokeWidth={2.5} />
                    </div>
                    <DialogOptionalTitle
                        title="Are you sure you want to delete this package?"
                        className="text-base font-normal text-[#A2C7E5] leading-6 text-center mb-5"
                    />
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-3 px-4 cursor-pointer rounded-[14px] border-2 border-[#C1BDDB] bg-white text-base font-bold text-[#303A2B] leading-6 hover:bg-[#F8F7F9] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 px-4 cursor-pointer rounded-[14px] bg-[#FF4444] text-base font-bold text-white leading-6 hover:bg-[#FF3333] transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
