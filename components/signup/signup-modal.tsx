'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';
import { useState } from 'react';
import { SignupContent } from './signup-content';

export function SignupModal() {
  const [isOpen, setIsOpen] = useState(false);

  const resetForm = () => {
    // Optional: Reset logic when modal closes
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
        <SignupContent closeModal={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
