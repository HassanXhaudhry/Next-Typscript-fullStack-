'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { login } from '@/lib/redux/authSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginForm) => {
    await dispatch(login(data));
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 px-12 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="w-full h-9 border border-gray-400 pl-4 sm:text-sm text-md focus:outline-none focus:ring-0 transition"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className='relative flex'>
              <Input
                {...register('password')}
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                className="w-full h-9 border border-gray-400 pl-4 sm:text-sm text-md focus:outline-none focus:ring-0 transition"
              />
              <div className="absolute text-md right-[20px] top-[10px] text-[#6C6C6C] cursor-pointer">
                {showPassword ? (
                  <FiEye onClick={togglePassword} />
                ) : (
                  <FiEyeOff onClick={togglePassword} />
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="text-xs text-right">
            <Link
              href="/auth/forgotPassword"
              className="font-medium text-gray-500 hover:text-gray-700"
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Dont have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}