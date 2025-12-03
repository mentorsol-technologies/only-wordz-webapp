'use client';

import Button from '@/components/Button/Button';
import CommonInput from '@/components/CommonInput/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { resetPassword } from '@/lib/auth';

const resetPasswordSchema = z
    .object({
        new_password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        confirm_password: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Passwords don't match",
        path: ['confirm_password'],
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    const [formValues, setFormValues] = useState<ResetPasswordFormValues>({
        new_password: '',
        confirm_password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!uid || !token) {
            toast.error('Invalid reset link. Please try again.');
            router.push('/login');
        }
    }, [uid, token, router]);

    const {
        handleSubmit,
        formState: { isValid, errors },
        setValue,
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: formValues,
        mode: 'onChange',
    });

    const handleChange = (field: keyof ResetPasswordFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormValues(prev => ({ ...prev, [field]: value }));
        setValue(field, value, { shouldValidate: true });
    };

    const onSubmit = async (data: ResetPasswordFormValues) => {
        if (!uid || !token) {
            toast.error('Invalid reset link.');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await resetPassword(
                data.new_password,
                data.confirm_password,
                uid,
                token,
            );

            toast.success(res?.message || 'Password reset successfully');
            router.push('/login');
        } catch (err: unknown) {
            console.error('Reset error:', err);
            const message = err instanceof Error ? err.message : String(err);
            toast.error(message || 'Failed to reset password');
        } finally {
            setIsSubmitting(false);
        }
    };


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
                <h2 className="font-sans font-normal max-[321px]:text-xl text-2xl text-center text-[#0A0A0A] mb-6">
                    Reset Your Password
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <CommonInput
                        name="new_password"
                        label="Password"
                        minLength={8}
                        icon={<Image src={'/images/password.png'} width={21} height={21} alt='Lock Icon' />}
                        placeholder='Enter your password'
                        value={formValues.new_password}
                        onChange={handleChange('new_password')}
                        type="password"
                        error={!!errors.new_password}
                        errorMessage={errors.new_password?.message}
                    />

                    <CommonInput
                        name="confirm_password"
                        label="Confirm Password"
                        minLength={8}
                        placeholder="Confirm your password"
                        icon={<Image src={'/images/password.png'} width={21} height={21} alt="Lock Icon" />}
                        value={formValues.confirm_password}
                        onChange={handleChange('confirm_password')}
                        type="password"
                        error={!!errors.confirm_password}
                        errorMessage={errors.confirm_password?.message}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        size='lg'
                        className="w-full bg-[#FF99C9] text-[#212121] gap-2 rounded-lg text-sm disabled:opacity-50"
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset'} <ArrowRight size={16} className='text-[#212121]' />
                    </Button>
                </form>

                <div className="mt-6 text-center font-sans font-normal max-[321px]:text-[14px] text-[16px] text-[#4A5565]">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/role-selection"
                        className="font-sans font-normal text-[#E60076] text-center hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
