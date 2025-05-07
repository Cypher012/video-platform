import { create } from 'zustand';

interface SignupStore {
  email: string;
  setEmail: (email: string) => void;
  verificationModal: boolean;
  setVerificationModal: (verificationModal: boolean) => void;
  closeVerificationModal: () => void;
  password: string
  setPassword: (password: string) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  email: '',
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  verificationModal: false,
  setVerificationModal: (verificationModal) => set({ verificationModal }),
  closeVerificationModal: () => set({ verificationModal: false }),
}));
