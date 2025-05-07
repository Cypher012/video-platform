'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Flame } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ForgotPasswordModal } from './forgot-password-modal';
import { Icons } from '@/components/icon';
import { LoginInput, loginSchema } from '@/lib/validations/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/actions/auth-action';
import { useRouter } from 'next/navigation';

export function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    setIsPending(true);
    try {
      const { success, errorMessage } = await signIn(data);
      if (success) {
        setIsOpen(false);
        router.push('/dashboard');
      } else {
        setError('email', {
          type: 'server',
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setIsOpen(false);
    setForgotPasswordOpen(true);
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    // Handle Apple login
    console.log('Apple login');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-rose-500/50 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-black/95 border border-rose-900/50 text-white">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <Flame className="h-8 w-8 text-rose-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center text-white">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-center text-rose-100/70">
              Login to your HotConnect account to continue
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full border border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-500 text-gray-800 transition-colors"
                onClick={handleGoogleLogin}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full border  border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-500 text-gray-800 transition-colors"
                onClick={handleAppleLogin}
              >
                <Icons.apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-rose-900/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-rose-100/50">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-rose-100"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register('email')}
                    className="pl-10 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-rose-100"
                  >
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-rose-400 hover:text-rose-300"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button
                  variant="link"
                  className="px-0 text-rose-500 h-auto p-0 hover:text-rose-400"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>
              <Button
                type="submit"
                disabled={isPending || !watch('email') || !watch('password')}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
              >
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="text-center text-sm text-rose-100">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="px-0 text-rose-500 hover:text-rose-400"
                type="button"
              >
                Sign up
              </Button>
            </div>
            <div className="text-center text-xs text-rose-100/50">
              By logging in, you confirm that you are at least 18 years old
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ForgotPasswordModal
        open={forgotPasswordOpen}
        onOpenChange={setForgotPasswordOpen}
      />
    </>
  );
}
