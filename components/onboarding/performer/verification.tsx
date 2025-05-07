"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Upload, Check, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { VerificationData } from "@/types/onboarding"

interface VerificationProps {
  onNext: (data: VerificationData) => void
  onBack: () => void
  initialData?: Partial<VerificationData>
}

export function Verification({ onNext, onBack, initialData = {} }: VerificationProps) {
  const [formData, setFormData] = useState<VerificationData>({
    idDocument: initialData.idDocument || "",
    selfieWithId: initialData.selfieWithId || "",
    verificationStatus: initialData.verificationStatus || "pending",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({
    idFront: 0,
    idBack: 0,
    selfie: 0,
  })
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({
    idFront: false,
    idBack: false,
    selfie: false,
  })

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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))

    // Clear error when user checks
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const simulateUpload = (field: string) => {
    setIsUploading((prev) => ({ ...prev, [field]: true }))
    setUploadProgress((prev) => ({ ...prev, [field]: 0 }))

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = Math.min(prev[field] + 10, 100)

        if (newProgress === 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading((prev) => ({ ...prev, [field]: false }))
            setFormData((prev) => ({ ...prev, [`${field}Uploaded`]: true }))
          }, 500)
        }

        return { ...prev, [field]: newProgress }
      })
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.idDocument.trim()) {
      newErrors.idDocument = "ID document is required"
    }

    if (!formData.selfieWithId.trim()) {
      newErrors.selfieWithId = "Selfie with ID is required"
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
        <CardTitle className="text-2xl text-white">Identity Verification</CardTitle>
        <CardDescription className="text-rose-100/70">
          Please upload your ID and a selfie to verify your identity. This information is kept secure and private.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-rose-500/30 rounded-lg">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-rose-500" />
                  <p className="mt-2 text-sm text-rose-100/70">Upload ID Document</p>
                </div>
              </div>
              <p className="text-xs text-rose-100/70 text-center">
                {formData.idDocument ? "ID Document uploaded" : "No document uploaded"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-rose-500/30 rounded-lg">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-rose-500" />
                  <p className="mt-2 text-sm text-rose-100/70">Upload Selfie with ID</p>
                </div>
              </div>
              <p className="text-xs text-rose-100/70 text-center">
                {formData.selfieWithId ? "Selfie uploaded" : "No selfie uploaded"}
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
