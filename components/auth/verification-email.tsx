'use client';

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
import { Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSignupStore } from '@/store/signup-store';

export function VerificationEmailModal() {
  const [verificationCode, setVerificationCode] = useState('');
  const {
    closeVerificationModal,
    verificationModal,
    email,
    setEmail,
    setVerificationModal,
  } = useSignupStore();

  const handleVerificationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const resetForm = () => {
    setVerificationCode('');
    setVerificationModal(false);
  };

  useEffect(() => {
    console.log('verification-email.tsx', verificationModal);
  }, [verificationModal]);

  return (
    <>
      <Dialog open={verificationModal} onOpenChange={setVerificationModal}>
        <DialogContent className="sm:max-w-[425px] bg-black/95 border border-rose-900/50 text-white">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <Flame className="h-8 w-8 text-rose-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center text-white">
              Verify Your Account
            </DialogTitle>
            <DialogDescription className="text-center text-rose-100/70">
              We've sent a verification code to {email}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVerificationSubmit} className="space-y-4 pt-4">
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
        </DialogContent>
      </Dialog>
    </>
  );
}
