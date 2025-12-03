'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { verifyAccount } from '@/lib/auth';

export default function VerifyEmail() {
    const router = useRouter();
    const params = useParams();
    const [isVerifying, setIsVerifying] = useState(true);

    const uid = params.uid as string;
    const token = params.token as string;

    useEffect(() => {
        const verify = async () => {
            try {
                if (!uid || !token) {
                    toast.error('Invalid verification link.');
                    router.push('/login');
                    return;
                }
                await verifyAccount(uid, token);
                toast.success('Account verified successfully!');
                const role = localStorage.getItem('selectedRole');
                if (role === 'user') {
                    router.push('/discover');
                } else {
                    router.push('/my-packages');
                }
            } catch (err: unknown) {
                console.error('Verification error:', err);
                const message = err instanceof Error ? err.message : 'Verification failed';
                toast.error(message);
                router.push('/login');
            } finally {
                setIsVerifying(false);
            }
        };

        verify();
    }, [uid, token, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center mb-4 2xl:mb-8">
                <div className="flex justify-center mb-1">
                    <Image src={'/images/Logo.png'} width={197} height={58} alt='Logo' />
                </div>
                <h1 className="font-sans font-normal max-[321px]:text-xl text-2xl text-black text-center mb-1">
                    Welcome to Only Wordz
                </h1>
            </div>

            <div className="bg-white w-full max-w-md border border-black/10 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {isVerifying ? (
                        <>
                            <div className="animate-spin">
                                <Image src={'/images/Logo.png'} width={60} height={60} alt='Loading' />
                            </div>
                            <h2 className="font-sans font-normal text-2xl text-center text-[#0A0A0A]">
                                Verifying your Account
                            </h2>
                            <p className="font-sans text-[#4A5565]">
                                Please wait while we verify your email...
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="font-sans font-normal text-2xl text-center text-[#0A0A0A]">
                                Verification Complete
                            </h2>
                            <p className="font-sans text-[#4A5565]">
                                Redirecting you now...
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
