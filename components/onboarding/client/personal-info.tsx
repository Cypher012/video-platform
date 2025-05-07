"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Camera, User } from "lucide-react"

interface PersonalInfoProps {
  onNext: (data: any) => void
  initialData?: any
}

export function PersonalInfo({ onNext, initialData = {} }: PersonalInfoProps) {
  const [formData, setFormData] = useState({
    displayName: initialData.displayName || "",
    fullName: initialData.fullName || "",
    location: initialData.location || "",
    avatarUrl: initialData.avatarUrl || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      newErrors.displayName = "Display name is required"
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
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
        <CardTitle className="text-2xl text-white">Tell us about yourself</CardTitle>
        <CardDescription className="text-rose-100/70">
          Let's set up your profile information. This helps us personalize your experience.
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
            <p className="text-xs text-rose-100/70 mt-2">Upload a profile picture (optional)</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-rose-100">
                Display Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="HotUser69"
                value={formData.displayName}
                onChange={handleChange}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
              {errors.displayName && <p className="text-xs text-rose-500 mt-1">{errors.displayName}</p>}
              <p className="text-xs text-rose-100/70">This is how you'll appear to others on the platform</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-rose-100">
                Full Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
              {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              <p className="text-xs text-rose-100/70">Your full name is kept private and used for verification only</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-rose-100">
                Location (Optional)
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
              />
              <p className="text-xs text-rose-100/70">Helps match you with performers in your timezone</p>
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
