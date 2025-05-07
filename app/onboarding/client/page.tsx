"use client"

import { useState } from "react"
import { PersonalInfo } from "@/components/onboarding/client/personal-info"
import { Interests } from "@/components/onboarding/client/interests"
import { WalletSetup } from "@/components/onboarding/client/wallet-setup"
import { OnboardingComplete } from "@/components/onboarding/client/onboarding-complete"
import { ProgressSteps } from "@/components/onboarding/progress-steps"
import type { PersonalInfoData, InterestsData, WalletSetupData, OnboardingCompleteData } from "@/types/onboarding"

type OnboardingStep = "personal-info" | "interests" | "wallet-setup" | "complete"

export default function ClientOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("personal-info")
  const [formData, setFormData] = useState<{
    personalInfo?: PersonalInfoData
    interests?: InterestsData
    walletSetup?: WalletSetupData
  }>({})

  const steps = ["Personal Info", "Interests", "Wallet", "Complete"]

  const handleNext = (data: PersonalInfoData | InterestsData | WalletSetupData) => {
    switch (currentStep) {
      case "personal-info":
        setFormData((prev) => ({ ...prev, personalInfo: data as PersonalInfoData }))
        setCurrentStep("interests")
        break
      case "interests":
        setFormData((prev) => ({ ...prev, interests: data as InterestsData }))
        setCurrentStep("wallet-setup")
        break
      case "wallet-setup":
        setFormData((prev) => ({ ...prev, walletSetup: data as WalletSetupData }))
        setCurrentStep("complete")
        break
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case "interests":
        setCurrentStep("personal-info")
        break
      case "wallet-setup":
        setCurrentStep("interests")
        break
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "personal-info":
        return <PersonalInfo onNext={handleNext} initialData={formData.personalInfo} />
      case "interests":
        return <Interests onNext={handleNext} onBack={handleBack} initialData={formData.interests} />
      case "wallet-setup":
        return <WalletSetup onComplete={handleNext} initialData={formData.walletSetup} />
      case "complete":
        return <OnboardingComplete userData={{ userId: "123", profileComplete: true, verificationComplete: true, walletSetup: true }} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Client Onboarding</h1>
        <p className="text-rose-100/70 text-center mb-8">Complete your profile to start booking performers</p>

        <ProgressSteps steps={steps} currentStep={currentStep} />
        {renderStep()}
      </div>
    </div>
  )
}
