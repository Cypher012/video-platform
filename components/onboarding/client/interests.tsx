"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { InterestsData } from "@/types/onboarding"

interface InterestsProps {
  onNext: (data: InterestsData) => void
  onBack: () => void
  initialData?: Partial<InterestsData>
}

export function Interests({ onNext, onBack, initialData = {} }: InterestsProps) {
  const [formData, setFormData] = useState<InterestsData>({
    categories: initialData.categories || [],
    preferences: initialData.preferences || [],
  })
  const [error, setError] = useState("")

  const interestCategories = [
    {
      name: "Conversation Types",
      interests: [
        { id: "casual", label: "Casual Chat" },
        { id: "deep", label: "Deep Conversations" },
        { id: "roleplay", label: "Roleplay" },
        { id: "fantasy", label: "Fantasy Scenarios" },
      ],
    },
    {
      name: "Performance Styles",
      interests: [
        { id: "dancing", label: "Dancing" },
        { id: "singing", label: "Singing" },
        { id: "asmr", label: "ASMR" },
        { id: "gaming", label: "Gaming" },
      ],
    },
    {
      name: "Performer Traits",
      interests: [
        { id: "energetic", label: "Energetic" },
        { id: "calm", label: "Calm & Relaxed" },
        { id: "dominant", label: "Dominant" },
        { id: "submissive", label: "Submissive" },
      ],
    },
    {
      name: "Appearance Preferences",
      interests: [
        { id: "blonde", label: "Blonde" },
        { id: "brunette", label: "Brunette" },
        { id: "redhead", label: "Redhead" },
        { id: "tattoos", label: "Tattoos" },
        { id: "piercings", label: "Piercings" },
      ],
    },
  ]

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, interest],
    }))
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.categories.length === 0) {
      setError("Please select at least one interest")
      return
    }

    onNext(formData)
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Select Your Interests</CardTitle>
        <CardDescription className="text-rose-100/70">
          Choose what you're interested in to help us match you with the right performers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-rose-950/30 border border-rose-500/50 text-rose-200 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {interestCategories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h3 className="text-lg font-medium text-white">{category.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {category.interests.map((interest) => (
                  <div
                    key={interest.id}
                    className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors ${
                      formData.categories.includes(interest.id)
                        ? "bg-rose-950/40 border-rose-500/50 text-white"
                        : "border-rose-900/30 text-rose-100/70 hover:border-rose-500/30 hover:bg-rose-950/20"
                    }`}
                  >
                    <Checkbox
                      id={`interest-${interest.id}`}
                      checked={formData.categories.includes(interest.id)}
                      onCheckedChange={() => handleInterestChange(interest.id)}
                      className="border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    />
                    <Label htmlFor={`interest-${interest.id}`} className="text-sm font-normal cursor-pointer flex-1">
                      {interest.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
