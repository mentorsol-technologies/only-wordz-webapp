'use client';

import Button from '@/components/Button/Button';
import CommonInput from '@/components/CommonInput/Input';
import NavigateBack from '@/components/NavigateBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<ForgotPasswordFormValues>({
        email: '',
    });
    const {
        handleSubmit,
        formState: { isValid, errors },
        setValue,
        reset,
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: formValues,
    });
    const handleChange = (field: keyof ForgotPasswordFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormValues(prev => ({ ...prev, [field]: value }));
        setValue(field, value, { shouldValidate: true });
    };
    const onSubmit = (data: ForgotPasswordFormValues) => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setEmailSent(data.email);
            reset(); // Clear form after submission
        }, 1500);
    };



    if (emailSent) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-white w-full max-w-md border border-black/10 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-6">
                    <div className="flex justify-center mb-5 mt-1">
                        <Image src={'/images/check.png'} width={76} height={76} alt='Check icon' />
                    </div>

                    <h2 className="font-sans font-normal max-[321px]:text-xl text-[24px] leading-6 text-center text-[#0A0A0A] mb-2">
                        Check Your Email
                    </h2>
                    <p className="font-sans font-normal max-[376px]:text-[14px] text-base text-[#4A5565] text-center mb-1">
                        We&apos;ve sent password reset instructions to:
                    </p>
                    <p className="font-sans font-medium text-base text-[#101828] text-center my-3">
                        {emailSent}
                    </p>

                    <div className="bg-[#EFF6FF] p-4 rounded-[10px] mb-8">
                        <h3 className="font-normal max-[376px]:text-[14px] text-[16px] text-[#1C398E] mb-2">
                            Didn&apos;t receive the email?
                        </h3>
                        <div className="font-normal max-[376px]:text-[14px] text-[16px] text-[#1447E6] space-y-1 pl-5">
                            <p>Check your spam folder</p>
                            <p>Make sure the email address is correct</p>
                            <p>Wait a few minutes and check again</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={() => (window.location.href = '/login')}
                            size='lg'
                            className="w-full bg-[#FF99C9] text-[#212121] gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-sm"
                        >
                            Back to Login
                        </Button>

                        <Button
                            onClick={() => {
                                setIsSubmitting(true);
                                // Simulate resend
                                setTimeout(() => setIsSubmitting(false), 1000);
                            }}
                            size='lg'
                            disabled={isSubmitting}
                            className="w-full bg-white text-[#0A0A0A] border border-[#D1D5DB] hover:bg-gray-50 gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-sm disabled:opacity-50"
                        >
                            {isSubmitting ? 'Resending...' : 'Resend Email'}
                        </Button>
                    </div>
                </div>

                <p className="mt-5 text-center font-normal max-[376px]:text-[14px] text-[16px] leading-6 text-[#6A7282]">
                    Need help?{' '}
                    <Link
                        href="#"
                        className="font-normal max-[376px]:text-[14px] text-[16px] text-[#FF99C9] underline hover:no-underline transition-all duration-300 ease-in-out"
                    >
                        Contact our support team
                    </Link>
                </p>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <h1 className="font-normal max-[321px]:text-xl text-2xl text-black text-center mb-2">
                    Reset Your Password
                </h1>
                <p className="font-normal text-base text-[#4A5565] text-center">
                    Enter your email to receive reset instructions
                </p>
            </div>

            <div className="bg-white w-full max-w-md border border-black/10 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-6">
                <div className="mb-6 pt-2 flex justify-center">
                    <NavigateBack title="Back to Login" />
                </div>

                <h2 className="text-[16px] leading-6 pt-4 text-[#0A0A0A]">Forgot Password?</h2>

                <p className="font-sans font-normal max-[321px]:text-[14px] text-base text-[#4A5565] leading-6 my-7">
                    No worries! Enter your email address and we&apos;ll send you instructions to reset your
                    password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <CommonInput
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        icon={<Image src={'/images/mail.png'} width={20} height={20} alt="Icon" />}
                        value={formValues.email}
                        onChange={handleChange('email')}
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                    />

                    <Button
                        type="submit"
                        size='lg'
                        disabled={isSubmitting || !isValid}
                        className="w-full bg-[#FF99C9] text-[#212121] gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-sm disabled:opacity-50"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}{' '}
                        <ArrowRight size={16} className="text-[#212121]" />
                    </Button>

                    <div className="max-[321px]:mt-4 mt-6 p-4 bg-[#F9FAFB] rounded-[10px] text-center">
                        <p className="text-[16px] max-[321px]:text-[14px] font-bold text-[#364153]">Remember your password?</p>
                        <Link
                            href="/login"
                            className="font-normal max-[321px]:text-[14px] text-[16px] text-[#E60076] hover:underline transition-all duration-300 ease-in-out"
                        >
                            Return to login
                        </Link>
                    </div>
                </form>
            </div>

            <p className="mt-5 text-center font-sans font-normal max-[321px]:text-[14px] text-[16px] leading-6 text-[#6A7282]">
                Protected by industry-standard security measures
            </p>
        </div>
    );
}