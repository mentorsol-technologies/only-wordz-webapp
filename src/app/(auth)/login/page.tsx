'use client';

import Button from '@/components/Button/Button';
import Checkbox from '@/components/CheckBox/Checkbox';
import CommonInput from '@/components/CommonInput/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setValue,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleChange = (field: keyof LoginFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormValues(prev => ({ ...prev, [field]: value }));
    setValue(field, value, { shouldValidate: true });
  };

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login data:', data);
    router.push('/my-packages');
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
        <p className="font-sans font-normal text-base text-black/80 text-center">
          Connect with creators and start chatting
        </p>
      </div>

      <div className="bg-white w-full max-w-md border border-black/10 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-6">
        <h2 className="font-sans font-normal max-[321px]:text-xl text-2xl text-center text-[#0A0A0A] mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <CommonInput
            name="email"
            label="Email Address"
            type="email"
            placeholder='you@example.com'
            icon={<Image src={'/images/mail.png'} width={20} height={20} alt='Icon' />}
            value={formValues.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <CommonInput
            name="password"
            label="Password"
            icon={<Image src={'/images/password.png'} width={21} height={21} alt='Icon' />}
            placeholder='Enter your password'
            value={formValues.password}
            onChange={handleChange('password')}
            type="password"
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              id="rememberMe"
              label="Remember me"
              checked={rememberMe}
              onChange={setRememberMe}
              className="text-base max-[321px]:text-[14px] text-[#4A5565]"
            />
            <Link
              href="/forget-password"
              className="font-sans font-normal max-[321px]:text-[14px] text-[16px] text-[#E60076] hover:underline transition-all duration-300 ease-in-out"
            >
              Forgot Password?
            </Link>

          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            size='lg'
            className="w-full bg-[#FF99C9] text-[#212121] gap-2 rounded-lg text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Signing In...' : 'Login'} <ArrowRight size={16} className='text-[#212121]' />
          </Button>

        </form>

        <div className="mt-6 text-center font-sans font-normal max-[321px]:text-[14px] text-[16px] text-[#4A5565]">
          Don&apos;t have an account?{' '}
          <Link
            href="/role-selection"
            className="font-sans font-normal text-[#E60076] text-center hover:underline"
          >
            {'  '} Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}