'use client';

import Button from '@/components/Button/Button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RoleSelection() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<'user' | 'creator' | null>(null);

    const handleSelectUser = () => setSelectedRole('user');
    const handleSelectCreator = () => setSelectedRole('creator');

    const handleContinue = () => {
        if (selectedRole) {
            localStorage.setItem("selectedRole", selectedRole);
            router.push(`/register?role=${selectedRole}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">
            <div className="text-center mb-6 2xl:mb-10">
                <div className="flex justify-center mb-2 2xl:mb-3">
                    <Image src={'/images/Logo.png'} width={197} height={58} alt="OnlyWordz Logo" />
                </div>
                <h1 className="text-2xl font-normal text-black mb-1 max-[321px]:text-xl">
                    Join Only Wordz
                </h1>
                <p className="text-base font-normal text-[#6A7282]">
                    Choose how you want to get started
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div
                    onClick={handleSelectUser}
                    className={`bg-white border cursor-pointer rounded-[14px] p-6 transition-all duration-300 ease-in-out flex flex-col items-center text-center ${selectedRole === 'user'
                        ? 'border-[#FF99C9] ring-2 ring-[#FF99C9]'
                        : 'border-gray-100 hover:border-gray-200'
                        }`}
                >
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-18 h-18 flex items-center justify-center mb-3 rounded-full bg-[linear-gradient(135deg,#FCE7F3_0%,#F3E8FF_100%)]">
                            <Image src={'/images/user-icon.png'} width={32} height={32} alt="User Icon" />
                        </div>
                        <h3 className="text-base font-normal text-[#0A0A0A] mb-1">I&apos;m a User</h3>
                        <p className="text-base font-normal text-[#6A7282] leading-5">
                            Connect with talented creators and get
                            <br className="max-[376px]:hidden" />
                            personalized advice for your projects
                        </p>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-[10px] p-4 mb-5 w-full">
                        <ul className="space-y-2 text-left">
                            {[
                                'Browse and discover creators',
                                'Purchase chat packages',
                                'Get expert guidance',
                                'Direct messaging access',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-base max-[321px]:text-[14px] text-[#364153]">
                                    <Image src={'/images/Text.png'} width={13} height={22} alt="" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button
                        onClick={handleContinue}
                        size="lg"
                        disabled={selectedRole !== 'user'}
                        className={`w-full gap-2 rounded-lg py-3 px-5 text-sm flex justify-center items-center ${selectedRole === 'user'
                            ? 'bg-[#FF99C9] text-[#212121]'
                            : 'bg-[#FF99C9] cursor-not-allowed'
                            }`}
                    >
                        Continue as User <ArrowRight size={16} className="text-current" />
                    </Button>
                </div>

                <div
                    onClick={handleSelectCreator}
                    className={`bg-white border cursor-pointer rounded-[14px] p-6 transition-all duration-300 ease-in-out flex flex-col items-center text-center ${selectedRole === 'creator'
                        ? 'border-[#FF99C9] ring-2 ring-[#FF99C9]'
                        : 'border-gray-100 hover:border-gray-200'
                        }`}
                >
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-18 h-18 flex items-center justify-center mb-3 rounded-full bg-[linear-gradient(135deg,#F3E8FF_0%,#E0E7FF_100%)]">
                            <Image src={'/images/creater-icon.png'} width={32} height={32} alt="Creator Icon" />
                        </div>
                        <h3 className="text-base font-normal text-[#0A0A0A] mb-1">I&apos;m a Creator</h3>
                        <p className="text-base font-normal text-[#6A7282] leading-5">
                            Share your expertise, build your audience,
                            <br className="max-[376px]:hidden" />
                            and monetize your knowledge
                        </p>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-[10px] p-4 mb-5 w-full">
                        <ul className="space-y-2 text-left">
                            {[
                                'Create custom packages',
                                'Set your own pricing',
                                'Connect with clients',
                                'Flexible scheduling',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-base max-[321px]:text-[14px] text-[#364153]">
                                    <Image src={'/images/Text.png'} width={13} height={22} alt="" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button
                        onClick={handleContinue}
                        size="lg"
                        disabled={selectedRole !== 'creator'}
                        className={`w-full gap-2 rounded-lg py-3 px-5 text-sm flex justify-center items-center ${selectedRole === 'user'
                            ? 'bg-[#FF99C9] text-[#212121]'
                            : 'bg-[#FF99C9] cursor-not-allowed'
                            }`}
                    >
                        Continue as Creator <ArrowRight size={16} className="text-current" />
                    </Button>
                </div>
            </div>

            {/* Login Link */}
            <div className="mt-8 w-full bg-white border border-[#0000001A] rounded-[14px] p-4 text-center">
                <p className="max-[321px]:text-[14px] text-base font-normal text-[#6A7282]">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#E60076] underline cursor-pointer">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
