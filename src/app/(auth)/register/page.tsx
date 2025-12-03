/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from '@/components/Button/Button';
import CommonInput from '@/components/CommonInput/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { register as registerApi } from '@/lib/auth';
import toast from 'react-hot-toast';

const signUpSchema = z
  .object({
    full_name: z
      .string()
      .min(3, 'Full name must be at least 3 characters')
      .regex(/^[A-Za-z ]+$/, 'Full name can only contain letters and spaces')
      .trim(),
    username: z
      .string()
      .min(3, 'User name must be at least 3 characters')
      .regex(/^[A-Za-z ]+$/, 'User name can only contain letters and spaces')
      .trim(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirm_password: z.string().min(1, 'Please confirm your password'),
    rememberMe: z.boolean().optional(),
    role: z.enum(['user', 'creator']),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function Register() {
  const [role] = useState<'user' | 'creator'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('selectedRole') as 'user' | 'creator') || 'user';
    }
    return 'user';
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState<SignUpFormValues>({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    rememberMe: false,
    role,
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: formValues,
    mode: 'onChange',
  });

  const handleChange =
    (field: keyof SignUpFormValues) =>
      (e: React.ChangeEvent<HTMLInputElement> | boolean) => {
        const value = typeof e === 'boolean' ? e : e.target.value;
        setFormValues((prev) => ({ ...prev, [field]: value }));
        setValue(field, value as any, { shouldValidate: true });
      };
  const onSubmit = async (data: SignUpFormValues) => {
    setIsSubmitting(true);

    try {
      const payload = {
        full_name: data.full_name,
        username: data.username,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
        role: data.role,
      };
      const res = await registerApi(payload);
      toast.success(res?.message || 'Account created. Activation email sent.');
    } catch (err: unknown) {
      console.error('Register error:', err);
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4 2xl:mb-6">
        <div className="flex justify-center mb-3 2xl:mb-4">
          <Image src={'/images/Logo.png'} width={197} height={58} alt="OnlyWordz Logo" />
        </div>
        <h1 className="font-normal max-[321px]:text-xl text-2xl text-black text-center mb-1">
          Create Your Account
        </h1>
        <p className="font-sans font-normal text-[16px] leading-6 text-center text-[rgba(0,0,0,0.8)] mb-1">
          Signing up as a {role === 'user' ? 'User' : 'Creator'}
        </p>
      </div>

      <div className="bg-white w-full max-w-md border border-black/10 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-6">
        <h2 className="font-sans font-normal text-xl text-center text-[#0A0A0A] mb-4 2xl:mb-6">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <CommonInput
            name="full_name"
            label="Full Name"
            placeholder="Enter Name"
            type="text"
            icon={<Image src={'/images/avatar.png'} width={20} height={20} alt="User Icon" />}
            value={formValues.full_name}
            onChange={handleChange('full_name')}
            error={!!errors.full_name}
            errorMessage={errors.full_name?.message}
          />

          <CommonInput
            name="username"
            label="User Name"
            placeholder="Enter UserName"
            type="text"
            icon={<Image src={'/images/avatar.png'} width={20} height={20} alt="User Icon" />}
            value={formValues.username}
            onChange={handleChange('username')}
            error={!!errors.username}
            errorMessage={errors.username?.message}
          />

          <CommonInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={<Image src={'/images/mail.png'} width={20} height={20} alt="Mail Icon" />}
            value={formValues.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <CommonInput
            name="password"
            label="Password"
            minLength={8}
            placeholder="Create a strong password"
            icon={<Image src={'/images/password.png'} width={21} height={21} alt="Lock Icon" />}
            value={formValues.password}
            onChange={handleChange('password')}
            type="password"
            error={!!errors.password}
            errorMessage={errors.password?.message}
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
            size="lg"
            disabled={isSubmitting || !isValid}
            className="w-full bg-[#FF99C9] text-[#212121] gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Account'}{' '}
            <ArrowRight size={16} className="text-[#212121]" />
          </Button>

          <div className="mt-4 text-center font-normal text-sm text-[#4A5565]">
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
    </div>
  );
}
