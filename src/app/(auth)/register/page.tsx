/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/Button/Button';
import Checkbox from '@/components/CheckBox/Checkbox';
import CommonInput from '@/components/CommonInput/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const signUpSchema = z
    .object({
        fullName: z.string().min(1, 'Full name is required').trim(),
        email: z.string().min(1, 'Email is required').email('Invalid email address'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        rememberMe: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function Register() {
    const [role] = useState<'user' | 'creator'>('user');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState<SignUpFormValues>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
    });

    const { handleSubmit, formState: { isValid, errors }, setValue } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: formValues,
        mode: 'onChange',
    });
    const handleChange = (field: keyof SignUpFormValues) => (e: React.ChangeEvent<HTMLInputElement> | boolean) => {
        const value = typeof e === 'boolean' ? e : e.target.value;
        setFormValues(prev => ({ ...prev, [field]: value }));
        setValue(field, value as any, { shouldValidate: true });
    };
    const onSubmit = (data: SignUpFormValues) => {
        setIsSubmitting(true);
        console.log('Sign up data:', data);
        console.log('Role:', role);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // In real app: redirect or show success
        }, 1500);
    };



    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                    <Image src={'/images/Logo.png'} width={197} height={58} alt='OnlyWordz Logo' />
                </div>
                <h1 className="font-normal max-[321px]:text-xl text-2xl text-black text-center mb-1">
                    Create Your Account
                </h1>
                <p className="font-sans font-normal text-[16px] leading-6 text-center text-[rgba(0,0,0,0.8)] mb-1">
                    Signing up as a {role === "user" ? "User" : "Creator"}
                </p>
                <Link
                    href={'/role-selection'}
                    className="cursor-pointer font-normal text-sm text-[#FF99C9] underline transition-all duration-300 ease-in-out"
                >
                    Change role
                </Link>
            </div>

            <div className="bg-white w-full max-w-md border border-black/10 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-6">
                <h2 className="font-sans font-normal text-xl text-center text-[#0A0A0A] mb-6">
                    Complete Your Profile
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <CommonInput
                        name="fullName"
                        label="Full Name"
                        placeholder='John Doe'
                        type="text"
                        icon={<Image src={'/images/avatar.png'} width={20} height={20} alt='User Icon' />}
                        value={formValues.fullName}
                        onChange={handleChange('fullName')}
                        error={!!errors.fullName}
                        errorMessage={errors.fullName?.message}
                    />

                    <CommonInput
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder='you@example.com'
                        icon={<Image src={'/images/mail.png'} width={20} height={20} alt='Mail Icon' />}
                        value={formValues.email}
                        onChange={handleChange('email')}
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                    />

                    <CommonInput
                        name="password"
                        label="Password"
                        placeholder='Create a strong password'
                        icon={<Image src={'/images/password.png'} width={21} height={21} alt='Lock Icon' />}
                        value={formValues.password}
                        onChange={handleChange('password')}
                        type='password'
                        error={!!errors.password}
                        errorMessage={errors.password?.message}
                    />

                    <CommonInput
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder='Confirm your password'
                        icon={<Image src={'/images/password.png'} width={21} height={21} alt='Lock Icon' />}
                        value={formValues.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        type='password'
                        error={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message}
                    />
                    <Checkbox
                        checked={formValues.rememberMe}
                        onChange={handleChange('rememberMe')}
                        label="I agree to the Terms of Service and Privacy Policy"
                        className="text-sm leading-5"
                    />
                    <Button
                        type="submit"
                        size='lg'
                        disabled={isSubmitting || !isValid}
                        className="w-full bg-[#FF99C9] text-[#212121] gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-sm disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Account'} <ArrowRight size={16} className='text-[#212121]' />
                    </Button>

                    <div className="relative mt-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-white font-sans font-normal text-sm text-[#6A7282]">
                                or sign up with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2.5">
                        <Button
                            type="button"
                            size='lg'
                            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg text-[#0A0A0A] bg-white hover:bg-gray-50 text-sm"
                        >
                            <Image src={'/images/google.png'} width={16} height={16} alt='Google' />
                            Google
                        </Button>
                        <Button
                            type="button"
                            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg text-[#0A0A0A] bg-white hover:bg-gray-50 text-sm"
                        >
                            <Image src={'/images/apple.png'} width={16} height={16} alt='Apple' />
                            Apple
                        </Button>
                    </div>

                    <div className="mt-7 text-center font-normal text-sm text-[#4A5565]">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-sans font-normal text-sm text-[#E60076] underline"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>

            <p className="mt-5 text-center font-sans font-normal max-[376px]:text-[14px] text-[16px] text-[#6A7282]">
                By continuing, you agree to our{' '}
                <Link
                    href=""
                    className="font-normal text-[#FF99C9] underline transition-all duration-300 ease-in-out"
                >
                    Terms of Service
                </Link>
                {' '}and{' '}
                <span className="max-[376px]:hidden">
                    <br />
                </span>
                <Link
                    href=""
                    className="font-normal text-[#FF99C9] underline transition-all duration-300 ease-in-out"
                >
                    Privacy Policy
                </Link>
            </p>
        </div>
    );
}