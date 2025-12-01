"use client";

import { Dialog, DialogClose, DialogContent, DialogOptionalTitle } from "../Dialog";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (oldPass: string, newPass: string, confirmPass: string) => void;
  onCancel?: () => void;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  onSave,
  onCancel,
}: ChangePasswordDialogProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    onSave(oldPassword, newPassword, confirmPassword);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[394px] p-0 gap-0 border-0 shadow-[0_20px_60px_0_rgba(0,0,0,0.30)]">
        <DialogClose className="hidden" />

        <div className="flex flex-col items-center px-6 pt-6 pb-6">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,153,201,0.10)] flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-[#FF99C9]" strokeWidth={2.5} />
          </div>
          <DialogOptionalTitle
            title="Change Password"
            className="text-base font-bold text-[#303A2B] leading-6 text-center mb-5"
          />
          <div className="w-full space-y-3 mb-6">
            <PasswordField
              label="Old Password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={setOldPassword}
            />
            <PasswordField
              label="New Password"
              placeholder="New Password"
              value={newPassword}
              onChange={setNewPassword}
            />
            <PasswordField
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 cursor-pointer rounded-[14px] border-2 border-[#C1BDDB] bg-white text-base font-bold text-[#303A2B] leading-6 hover:bg-[#F8F7F9] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 cursor-pointer rounded-[14px] bg-[#FF99C9] text-base font-bold text-[#303A2B] leading-6 hover:bg-[#FF99C9]/90 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function PasswordField({ label, placeholder, value, onChange }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  const inputClass =
    "w-full px-4 py-2 pr-11 rounded-lg bg-[#F3F3F5] border border-transparent text-sm text-[#717182] placeholder-[#99A1AF] focus:border-[#FF99C9] focus:outline-none";

  const iconClass =
    "absolute right-3 top-1/2 -translate-y-1/2 text-[#99A1AF] w-5 h-5 cursor-pointer";

  return (
    <div>
      <label className="text-sm text-[#0A0A0A]">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        {show ? (
          <EyeOff className={iconClass} onClick={() => setShow(false)} />
        ) : (
          <Eye className={iconClass} onClick={() => setShow(true)} />
        )}
      </div>
    </div>
  );
}
