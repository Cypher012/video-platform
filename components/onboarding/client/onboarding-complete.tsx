"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { OnboardingCompleteData } from "@/types/onboarding"

interface OnboardingCompleteProps {
  userData: OnboardingCompleteData
}

export function OnboardingComplete({ userData }: OnboardingCompleteProps) {
  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Welcome to the Platform!</CardTitle>
        <CardDescription className="text-rose-100/70">
          Your profile has been created successfully. You can now start booking performers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-rose-500" />
              </div>
              <span className="text-rose-100">Profile Created</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-rose-500" />
              </div>
              <span className="text-rose-100">Interests Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-rose-500" />
              </div>
              <span className="text-rose-100">Wallet Connected</span>
            </div>
          </div>

          <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
            Go to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
