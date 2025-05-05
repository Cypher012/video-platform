'use client';

import type React from 'react';

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
import { Eye, EyeOff, Mail, User, Flame } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icon';
import { useState } from 'react';

export function SignupModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    accountType: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAccountTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      accountType: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, show verification step
    setVerificationSent(true);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification logic here
    console.log({ ...formData, verificationCode });
    // Close the modal after successful verification
    setIsOpen(false);
    setVerificationSent(false);
    setVerificationCode('');
    setShowEmailForm(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
    console.log('Google signup');
  };

  const handleAppleSignup = () => {
    // Handle Apple signup
    console.log('Apple signup');
  };

  const resetForm = () => {
    setVerificationSent(false);
    setVerificationCode('');
    setShowEmailForm(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
          Join Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/95 border border-rose-900/50 text-white">
        {!verificationSent ? (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <Flame className="h-8 w-8 text-rose-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Create an Account
              </DialogTitle>
              <DialogDescription className="text-center text-rose-100/70">
                Join HotConnect to start connecting with hot performers
              </DialogDescription>
            </DialogHeader>

            {!showEmailForm ? (
              <div className="space-y-4 pt-4">
                <Button
                  variant="outline"
                  className="w-full border border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-500 text-gray-800transition-colors py-6"
                  onClick={handleGoogleSignup}
                >
                  <Icons.google className="mr-2 h-5 w-5" />
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full border border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-500 text-gray-800transition-colors py-6"
                  onClick={handleAppleSignup}
                >
                  <Icons.apple className="mr-2 h-5 w-5" />
                  Continue with Apple
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="bg-rose-900/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-rose-100/50">Or</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-rose-950/30 hover:bg-rose-950/50 text-rose-100 border border-rose-500/30 py-6"
                  onClick={() => setShowEmailForm(true)}
                >
                  <Mail className="mr-2 h-5 w-5 text-rose-500" />
                  Sign up with Email
                </Button>

                <div className="text-center text-sm text-rose-100/70">
                  By continuing, you confirm that you are at least 18 years old
                  and agree to our{' '}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-rose-500 hover:text-rose-400"
                    type="button"
                  >
                    Terms of Service
                  </Button>{' '}
                  and{' '}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-rose-500 hover:text-rose-400"
                    type="button"
                  >
                    Privacy Policy
                  </Button>
                </div>

                <div className="text-center text-sm text-rose-100">
                  Already have an account?{' '}
                  <Button
                    variant="link"
                    className="px-0 text-rose-500 hover:text-rose-400"
                    type="button"
                  >
                    Login
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-rose-100"
                  >
                    Display Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-500" />
                    <Input
                      id="fullName"
                      placeholder="HotUser69"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                      required
                    />
                  </div>
                </div>
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
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-rose-100"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
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
                  <p className="text-xs text-rose-100/50">
                    Password must be at least 8 characters with a number and
                    special character
                  </p>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="accountType"
                    className="text-sm font-medium text-rose-100"
                  >
                    Account Type
                  </Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={handleAccountTypeChange}
                    required
                  >
                    <SelectTrigger className="bg-rose-950/20 border-rose-500/30 text-white focus:ring-rose-500">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-rose-500/30">
                      <SelectItem
                        value="client"
                        className="text-rose-100 focus:bg-rose-950/50 focus:text-white"
                      >
                        Client - I want to book sessions
                      </SelectItem>
                      <SelectItem
                        value="performer"
                        className="text-rose-100 focus:bg-rose-950/50 focus:text-white"
                      >
                        Performer - I want to offer services
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="adult"
                    checked={isAdult}
                    onCheckedChange={(checked) =>
                      setIsAdult(checked as boolean)
                    }
                    className="mt-1 border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    required
                  />
                  <Label
                    htmlFor="adult"
                    className="text-sm font-normal text-rose-100"
                  >
                    I confirm that I am at least 18 years old
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) =>
                      setAgreeTerms(checked as boolean)
                    }
                    className="mt-1 border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    required
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal text-rose-100"
                  >
                    I agree to the{' '}
                    <Button
                      variant="link"
                      className="h-auto p-0 text-rose-500 hover:text-rose-400"
                      type="button"
                    >
                      Terms of Service
                    </Button>{' '}
                    and{' '}
                    <Button
                      variant="link"
                      className="h-auto p-0 text-rose-500 hover:text-rose-400"
                      type="button"
                    >
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
                  disabled={!agreeTerms || !isAdult}
                >
                  Create Account
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-rose-400 hover:text-rose-300"
                  onClick={() => setShowEmailForm(false)}
                >
                  Go Back
                </Button>
              </form>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <Flame className="h-8 w-8 text-rose-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Verify Your Account
              </DialogTitle>
              <DialogDescription className="text-center text-rose-100/70">
                We've sent a verification code to your email
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleVerificationSubmit}
              className="space-y-4 pt-4"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="verificationCode"
                  className="text-sm font-medium text-rose-100"
                >
                  Verification Code
                </Label>
                <Input
                  id="verificationCode"
                  placeholder="Enter the 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-lg tracking-widest bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                  maxLength={6}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
              >
                Verify Account
              </Button>
              <div className="text-center text-sm text-rose-100">
                Didn't receive a code?{' '}
                <Button
                  variant="link"
                  className="px-0 text-rose-500 hover:text-rose-400"
                  type="button"
                >
                  Resend Code
                </Button>
              </div>
              <div className="text-center text-sm">
                <Button
                  variant="link"
                  className="px-0 text-rose-400 hover:text-rose-300"
                  type="button"
                  onClick={resetForm}
                >
                  Go back
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
