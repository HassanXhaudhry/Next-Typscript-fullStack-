'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { register as registerUser } from '@/lib/redux/authSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from 'next/link';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine(
      (value) => /[A-Z]/.test(value),
      'Password must contain at least one uppercase letter'
    )
    .refine(
      (value) => /[#$*&@%!]/.test(value),
      'Password must contain at least one special characters'
    )
    .refine(
      (value) => /\d/.test(value),
      'Password must contain at least one number'
    ),
  confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: RegisterForm) => {
    const { confirmPassword, ...userData } = data;
    await dispatch(registerUser(userData));
  };
  const toggleSignupPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6 px-12 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                {...register('name')}
                type="text"
                placeholder="Name"
                className="w-full h-9 border border-gray-400 pl-4 sm:text-sm text-md focus:outline-none focus:ring-0 transition"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="w-full h-9 border border-gray-400 pl-4 sm:text-sm text-md focus:outline-none focus:ring-0 transition"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className='relative flex sm:w-[300px] w-[200px]'>
              <Input
                {...register('password')}
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
              />
              <div className="absolute text-md right-[20px] top-[10px] text-[#6C6C6C] cursor-pointer">
                {showPassword ? (
                  <FiEye onClick={toggleSignupPassword} />
                ) : (
                  <FiEyeOff onClick={toggleSignupPassword} />
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className='relative flex'>
              <Input
                {...register('confirmPassword')}
                type={showConfirmPassword ? "password" : "text"}
                placeholder="Confirm Password"
                className="w-full h-9 border border-gray-400 pl-4 sm:text-sm text-md focus:outline-none focus:ring-0 transition"
              />
              <div className="absolute text-md right-[20px] top-[10px] text-[#6C6C6C] cursor-pointer">
                {showConfirmPassword ? (
                  <FiEye onClick={toggleConfirmPassword} />
                ) : (
                  <FiEyeOff onClick={toggleConfirmPassword} />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}