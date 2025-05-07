"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { WalletSetupData } from "@/types/onboarding"

interface WalletSetupProps {
  onComplete: (data: WalletSetupData) => void
  initialData?: Partial<WalletSetupData>
}

export function WalletSetup({ onComplete, initialData = {} }: WalletSetupProps) {
  const [formData, setFormData] = useState<WalletSetupData>({
    walletAddress: initialData.walletAddress || "",
    paymentMethods: initialData.paymentMethods || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Set Up Your Wallet</CardTitle>
        <CardDescription className="text-rose-100/70">
          Connect your wallet to start making payments and receiving tips.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="walletAddress" className="text-rose-100">
              Wallet Address
            </Label>
            <Input
              id="walletAddress"
              value={formData.walletAddress}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  walletAddress: e.target.value,
                }))
              }
              placeholder="Enter your wallet address"
              className="bg-rose-950/20 border-rose-500/30 text-white"
            />
            <p className="text-xs text-rose-100/70">This is where you'll receive payments and tips</p>
          </div>

          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
            Complete Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
