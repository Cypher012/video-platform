import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Flame } from 'lucide-react';
import { useState } from 'react';
import { OAuthOptions } from './oauth-options';
import { EmailForm } from './email-form';

export function SignupContent({ closeModal }: { closeModal: () => void }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  return (
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
      {!verificationSent ? (
        !showEmailForm ? (
          <OAuthOptions onEmailClick={() => setShowEmailForm(true)} />
        ) : (
          <EmailForm
            setVerificationSent={setVerificationSent}
            closeEmailForm={() => setShowEmailForm(false)}
          />
        )
      ) : (
        <p className="text-center text-rose-100">Verification step here</p>
      )}
    </>
  );
}
