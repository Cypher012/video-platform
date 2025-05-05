import { create } from 'zustand';

interface SignupStore {
  email: string;
  setEmail: (email: string) => void;
  verificationModal: boolean;
  setVerificationModal: (verificationModal: boolean) => void;
  closeVerificationModal: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
  verificationModal: false,
  setVerificationModal: (verificationModal) => set({ verificationModal }),
  closeVerificationModal: () => set({ verificationModal: false }),
}));
