'use client';

import { LoginModal } from '@/components/auth/login-modal';
import { SignupModal } from '@/components/auth/signup/signup-modal';
import { useSignupStore } from '@/store/signup-store';
import { VerificationEmailModal } from './verification-email';

export function AuthComponent() {
  const { verificationModal } = useSignupStore();
  return (
    <div className="flex items-center gap-4">
      <LoginModal />
      <SignupModal />
      <VerificationEmailModal />
    </div>
  );
}
