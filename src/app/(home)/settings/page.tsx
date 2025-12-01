/* eslint-disable */
'use client'
import { BottomNav } from "@/components/BottomNav/Index";
import { ChangePasswordDialog } from "@/components/Dialogs/ChangePasswordDialog";
import useToggle from "@/lib/hooks/useToggle";
import { User, Phone, Mail, Lock, Shield, CreditCard, FileText, Bell, Grid, Globe, MessageSquare, LogOut, Trash2, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Settings() {
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [slaAlerts, setSlaAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const openChangePass = useToggle(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F7F9] flex flex-col">
      <header className="bg-white border-b border-[#C1BDDB] shadow-sm">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0">
          <div className="flex items-center justify-center h-[65px]">
            <h1 className="text-lg font-bold text-[#303A2B]">Settings</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-[640px] mx-auto px-4 sm:px-0 py-6 lg:py-8">
          <div className="space-y-5">
            <div className="bg-white border border-[#C1BDDB] rounded-2xl p-4 flex items-center gap-3">
              <Image
                src={'/images/img (2).png'}
                alt={"Profile Image"}
                width={64}
                height={64}
                className="rounded-full w-16 h-16 object-cover"
              />
              <div>
                <div className="text-base font-bold text-[#303A2B]">Sarah Mitchell</div>
                <div className="text-sm text-[#5C5C5C]">@sarahm</div>
              </div>
            </div>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">Account Settings</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <SettingItem onClick={() => router.push('/profile/edit')} icon={User} label="User Profile" value="Sarah Mitchell" subtitle="Non Unique name everyone will see" />
                {/* <SettingItem icon={User} label="Username" value="@sarahm" subtitle="Unique Identifier everyone will see" /> */}
                {/* <SettingItem icon={Phone} label="Phone Number" value="+1 (555) 123-4567" subtitle="This will NEVER be shown to the public" /> */}
                {/* <SettingItem icon={Mail} label="Email Address" value="sarah@example.com" subtitle="This will NEVER be shown to the public" /> */}
                <SettingItem
                  onClick={openChangePass.open}
                  icon={Lock} label="Change Password" />
                <SettingItem icon={Shield} label="Two-Factor Authentication" value="On" isLast />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">Payments</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <SettingItem icon={CreditCard} label="Payouts (Stripe Connect)" />
                <SettingItem icon={FileText} label="Earnings Summary" value="$2,450" />
                <SettingItem icon={FileText} label="Tax Information / W9" />
                <SettingItem icon={FileText} label="Transfer History" isLast />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">Notifications</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <ToggleItem
                  icon={Bell}
                  label="Message Notifications"
                  checked={messageNotifications}
                  onChange={setMessageNotifications}
                />
                <ToggleItem
                  icon={Bell}
                  label="New Order Alerts"
                  checked={orderAlerts}
                  onChange={setOrderAlerts}
                />
                <ToggleItem
                  icon={Bell}
                  label="SLA Warning Alerts"
                  checked={slaAlerts}
                  onChange={setSlaAlerts}
                  isLast
                />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">Privacy + Safety</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <SettingItem icon={Shield} label="Blocked Users" />
                <SettingItem icon={FileText} label="Report Center" isLast />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">Security</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <SettingItem icon={Grid} label="Device History" />
                <SettingItem icon={Shield} label="Login Activity" />
                <SettingItem icon={LogOut} label="Logout of All Devices" isLast />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">App Preferences</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <ToggleItem
                  icon={Globe}
                  label="Dark Mode"
                  checked={darkMode}
                  onChange={setDarkMode}
                />
                <SettingItem icon={Globe} label="Language" value="English" isLast />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">Support</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <SettingItem icon={FileText} label="Tutorials" />
                <SettingItem icon={MessageSquare} label="Contact Support" isLast />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-normal text-gray-600 uppercase tracking-wider mb-2">Danger Zone</h2>
              <div className="bg-white border border-[#C1BDDB] rounded-2xl overflow-hidden">
                <button className="w-full flex items-center cursor-pointer gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors">
                  <Trash2 className="w-5 h-5 text-[#FF4444]" strokeWidth={1.67} />
                  <span className="flex-1 text-left text-base text-[#FF4444]">Delete Account</span>
                  <ChevronRight className="w-5 h-5 text-blue-light" strokeWidth={1.67} />
                </button>
              </div>
            </section>

            <button onClick={() => router.push('/login')} className="w-full bg-white border cursor-pointer border-[#C1BDDB] rounded-2xl px-4 py-4 text-base text-[#FF4444] hover:bg-gray-50 transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </main>
      <BottomNav />
      <ChangePasswordDialog
        open={openChangePass.isOpen}
        onOpenChange={openChangePass.toggle}
        onSave={(oldPass, newPass, confirmPass) => {
          console.log("SAVE:", oldPass, newPass, confirmPass);
          openChangePass.close();
        }}
        onCancel={openChangePass.close}
      />

    </div>
  );
}

interface SettingItemProps {
  icon: any;
  label: string;
  value?: string;
  subtitle?: string;
  isLast?: boolean;
  onClick?: () => void;
}

function SettingItem({ icon: Icon, label, value, subtitle, isLast, onClick }: SettingItemProps) {
  return (
    <div className={`${!isLast ? 'border-b border-[#C1BDDB]' : ''}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors">
        <Icon className="w-5 h-5 text-[#303A2B] shrink-0" strokeWidth={1.67} />
        <span className="flex-1 text-left text-base text-[#303A2B]">{label}</span>
        {value && (
          <span className="text-sm text-gray-600">{value}</span>
        )}
        <ChevronRight className="w-5 h-5 text-blue-light shrink-0" strokeWidth={1.67} />
      </button>
      {subtitle && (
        <div className="px-4 pb-3 text-xs text-gray-600 opacity-80">
          {subtitle}
        </div>
      )}
    </div>
  );
}

interface ToggleItemProps {
  icon: any;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isLast?: boolean;
}

function ToggleItem({ icon: Icon, label, checked, onChange, isLast }: ToggleItemProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${!isLast ? 'border-b border-[#C1BDDB]' : ''}`}>
      <Icon className="w-5 h-5 text-[#303A2B]" strokeWidth={1.67} />
      <span className="flex-1 text-base text-[#303A2B]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-7 rounded-full transition-colors cursor-pointer ${checked ? 'bg-[#FF99C9]' : 'bg-[#C1BDDB]'
          } relative`}
      >
        <div
          className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
      </button>
    </div>
  );
}
