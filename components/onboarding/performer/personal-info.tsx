"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Camera, User } from "lucide-react"
import { PersonalInfoData } from "@/types/onboarding"

interface PersonalInfoProps {
  onNext: (data: PersonalInfoData) => void
  initialData?: Partial<PersonalInfoData>
}

export function PersonalInfo({ onNext, initialData = {} }: PersonalInfoProps) {
  const [formData, setFormData] = useState<PersonalInfoData>({
    displayName: initialData.displayName || "",
    fullName: initialData.fullName || "",
    location: initialData.location || "",
    avatarUrl: initialData.avatarUrl || "",
    tagline: initialData.tagline || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Stage name is required"
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Legal name is required"
    }

    if (!formData.tagline.trim()) {
      newErrors.tagline = "Tagline is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Proceed to next step
    onNext(formData)
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Create Your Performer Profile</CardTitle>
        <CardDescription className="text-rose-100/70">
          Let's set up your performer profile. This information will be visible to potential clients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-rose-500/50">
                <AvatarImage src={formData.avatarUrl || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                <AvatarFallback className="bg-rose-950 text-rose-200 text-2xl">
                  {formData.displayName ? formData.displayName.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Upload avatar</span>
              </Button>
            </div>
            <p className="text-xs text-rose-100/70 mt-2">Upload a profile picture (required)</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-rose-100">
                Stage Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Sexy Rose"
                value={formData.displayName}
                onChange={handleChange}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
              {errors.displayName && <p className="text-xs text-rose-500 mt-1">{errors.displayName}</p>}
              <p className="text-xs text-rose-100/70">This is how you'll appear to clients on the platform</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-rose-100">
                Legal Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
              {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              <p className="text-xs text-rose-100/70">
                Your legal name is kept private and used for verification and payments only
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-rose-100">
                Location <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
              {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
              <p className="text-xs text-rose-100/70">
                Your general location helps clients find performers in their timezone
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline" className="text-rose-100">
                Tagline <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="tagline"
                name="tagline"
                placeholder="Your catchy one-liner"
                value={formData.tagline}
                onChange={handleChange}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                maxLength={60}
              />
              {errors.tagline && <p className="text-xs text-rose-500 mt-1">{errors.tagline}</p>}
              <p className="text-xs text-rose-100/70">
                A short, catchy phrase that appears under your name (max 60 chars)
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
