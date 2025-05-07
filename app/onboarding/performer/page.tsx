"use client"

import { useState } from "react"
import { PersonalInfo } from "@/components/onboarding/performer/personal-info"
import { BioServices } from "@/components/onboarding/performer/bio-services"
import { PricingAvailability } from "@/components/onboarding/performer/pricing-availability"
import { MediaUpload } from "@/components/onboarding/performer/media-upload"
import { Verification } from "@/components/onboarding/performer/verification"
import { OnboardingComplete } from "@/components/onboarding/performer/onboarding-complete"
import { ProgressSteps } from "@/components/onboarding/progress-steps"
import type {
  PersonalInfoData,
  BioServicesData,
  PricingAvailabilityData,
  MediaUploadData,
  VerificationData,
  OnboardingCompleteData
} from "@/types/onboarding"

type OnboardingStep = "personal-info" | "bio-services" | "pricing-availability" | "media-upload" | "verification" | "complete"

export default function PerformerOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("personal-info")
  const [formData, setFormData] = useState<{
    personalInfo?: PersonalInfoData
    bioServices?: BioServicesData
    pricingAvailability?: PricingAvailabilityData
    mediaUpload?: MediaUploadData
    verification?: VerificationData
  }>({})

  const steps = ["Personal Info", "Bio & Services", "Pricing", "Media", "Verification", "Complete"]

  const handleNext = (data: PersonalInfoData | BioServicesData | PricingAvailabilityData | MediaUploadData | VerificationData) => {
    switch (currentStep) {
      case "personal-info":
        setFormData((prev) => ({ ...prev, personalInfo: data as PersonalInfoData }))
        setCurrentStep("bio-services")
        break
      case "bio-services":
        setFormData((prev) => ({ ...prev, bioServices: data as BioServicesData }))
        setCurrentStep("pricing-availability")
        break
      case "pricing-availability":
        setFormData((prev) => ({ ...prev, pricingAvailability: data as PricingAvailabilityData }))
        setCurrentStep("media-upload")
        break
      case "media-upload":
        setFormData((prev) => ({ ...prev, mediaUpload: data as MediaUploadData }))
        setCurrentStep("verification")
        break
      case "verification":
        setFormData((prev) => ({ ...prev, verification: data as VerificationData }))
        setCurrentStep("complete")
        break
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case "bio-services":
        setCurrentStep("personal-info")
        break
      case "pricing-availability":
        setCurrentStep("bio-services")
        break
      case "media-upload":
        setCurrentStep("pricing-availability")
        break
      case "verification":
        setCurrentStep("media-upload")
        break
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "personal-info":
        return <PersonalInfo onNext={handleNext} initialData={formData.personalInfo} />
      case "bio-services":
        return <BioServices onNext={handleNext} onBack={handleBack} initialData={formData.bioServices} />
      case "pricing-availability":
        return <PricingAvailability onNext={handleNext} onBack={handleBack} initialData={formData.pricingAvailability} />
      case "media-upload":
        return <MediaUpload onNext={handleNext} onBack={handleBack} initialData={formData.mediaUpload} />
      case "verification":
        return <Verification onNext={handleNext} onBack={handleBack} initialData={formData.verification} />
      case "complete":
        return <OnboardingComplete userData={{ userId: "123", profileComplete: true, verificationComplete: true, walletSetup: true }} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Performer Onboarding</h1>
        <p className="text-rose-100/70 text-center mb-8">Complete your profile to start accepting bookings</p>

        <ProgressSteps steps={steps} currentStep={currentStep} />
        {renderStep()}
      </div>
    </div>
  )
}
