import { LoginModal } from '@/components/auth/login-modal';
import { SignupModal } from '@/components/auth/signup/signup-modal';
import { VerificationEmailModal } from './verification-email';
import path from 'path';
import fs from 'fs';
export function AuthComponent() {


  return (
    <div className="flex items-center gap-4">
      <LoginModal />
      <SignupModal />
      <VerificationEmailModal />
    </div>
  );
}
