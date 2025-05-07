export interface PersonalInfoData {
  displayName: string;
  fullName: string;
  location: string;
  avatarUrl: string;
  tagline: string;
}

export interface ServiceData {
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface BioServicesData {
  services: ServiceData[];
}

export interface PricingAvailabilityData {
  hourlyRate: number;
  availability: {
    [key: string]: {
      start: string;
      end: string;
    }[];
  };
  startTime?: string;
  endTime?: string;
  timezone?: string;
}

export interface MediaUploadData {
  photos: string[];
  videos: string[];
  photoDescriptions: Record<string, string>;
  videoDescriptions: Record<string, string>;
}

export interface VerificationData {
  idDocument: string;
  selfieWithId: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface InterestsData {
  categories: string[];
  preferences: string[];
}

export interface WalletSetupData {
  walletAddress: string;
  paymentMethods: {
    type: string;
    details: Record<string, string>;
  }[];
}

export interface OnboardingCompleteData {
  userId: string;
  profileComplete: boolean;
  verificationComplete: boolean;
  walletSetup: boolean;
} 