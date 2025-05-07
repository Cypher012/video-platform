"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Clock, DollarSign } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PricingAvailabilityData } from "@/types/onboarding"

interface PricingAvailabilityProps {
  onNext: (data: PricingAvailabilityData) => void
  onBack: () => void
  initialData?: Partial<PricingAvailabilityData>
}

type TimeSlot = {
  start: string;
  end: string;
}

export function PricingAvailability({ onNext, onBack, initialData = {} }: PricingAvailabilityProps) {
  const [formData, setFormData] = useState<PricingAvailabilityData>({
    hourlyRate: initialData.hourlyRate || 0,
    availability: initialData.availability || {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
    timezone: initialData.timezone || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

  const timezones = [
    { value: "UTC-8", label: "Pacific Time (UTC-8)" },
    { value: "UTC-7", label: "Mountain Time (UTC-7)" },
    { value: "UTC-6", label: "Central Time (UTC-6)" },
    { value: "UTC-5", label: "Eastern Time (UTC-5)" },
    { value: "UTC-4", label: "Atlantic Time (UTC-4)" },
    { value: "UTC+0", label: "Greenwich Mean Time (UTC+0)" },
    { value: "UTC+1", label: "Central European Time (UTC+1)" },
    { value: "UTC+2", label: "Eastern European Time (UTC+2)" },
    { value: "UTC+8", label: "China Standard Time (UTC+8)" },
    { value: "UTC+9", label: "Japan Standard Time (UTC+9)" },
  ]

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

  const handleDayChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: prev.availability[day as keyof typeof prev.availability].length > 0
          ? []
          : [{ start: "09:00", end: "17:00" }]
      },
    }))
  }

  const handleTimeChange = (day: string, index: number, field: "start" | "end", value: string) => {
    setFormData((prev) => {
      const dayAvailability = prev.availability[day as keyof typeof prev.availability];
      const updatedSlots = dayAvailability.map((slot: TimeSlot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      );

      return {
        ...prev,
        availability: {
          ...prev.availability,
          [day]: updatedSlots,
        },
      };
    });
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!formData.hourlyRate || Number.parseFloat(formData.hourlyRate.toString()) <= 0) {
      newErrors.hourlyRate = "Please enter a valid hourly rate"
    }

    if (Object.values(formData.availability).every((days) => days.length === 0)) {
      newErrors.availability = "Please select at least one day"
    }

    if (!formData.timezone) {
      newErrors.timezone = "Please select your timezone"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Proceed to next step
    onNext(formData)
  }

  // Calculate estimated earnings
  const calculateEarnings = () => {
    const hourlyRate = Number.parseFloat(formData.hourlyRate.toString()) || 0
    const daysPerWeek = Object.values(formData.availability).reduce((total, days) => total + days.length, 0)
    const hoursPerDay = calculateHoursPerDay()

    // Assuming 2 sessions per day at minimum duration
    const sessionsPerDay = 2
    const weeklyEarnings = hourlyRate * sessionsPerDay * daysPerWeek

    return weeklyEarnings.toFixed(2)
  }

  const calculateHoursPerDay = () => {
    if (!formData.startTime || !formData.endTime) return 0

    const start = formData.startTime.split(":").map(Number)
    const end = formData.endTime.split(":").map(Number)

    let hours = end[0] - start[0]
    const minutes = end[1] - start[1]

    hours += minutes / 60

    return hours > 0 ? hours : 24 + hours // Handle overnight shifts
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Pricing & Availability</CardTitle>
        <CardDescription className="text-rose-100/70">
          Set your hourly rate and availability for bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hourlyRate" className="text-rose-100">
              Hourly Rate ($)
            </Label>
            <Input
              id="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  hourlyRate: parseFloat(e.target.value),
                }))
              }
              min="0"
              step="0.01"
              className="bg-rose-950/20 border-rose-500/30 text-white"
            />
            <p className="text-xs text-rose-100/70">This is your base hourly rate for bookings</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Availability</h3>

            <div className="space-y-2">
              <Label className="text-rose-100">
                Available Days <span className="text-rose-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {days.map((day) => (
                  <div
                    key={day.id}
                    className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors ${
                      formData.availability[day.id as keyof typeof formData.availability].length > 0
                        ? "bg-rose-950/40 border-rose-500/50 text-white"
                        : "border-rose-900/30 text-rose-100/70 hover:border-rose-500/30 hover:bg-rose-950/20"
                    }`}
                  >
                    <Checkbox
                      id={`day-${day.id}`}
                      checked={formData.availability[day.id as keyof typeof formData.availability].length > 0}
                      onCheckedChange={() => handleDayChange(day.id)}
                      className="border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    />
                    <Label htmlFor={`day-${day.id}`} className="text-sm font-normal cursor-pointer flex-1">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.availability && <p className="text-xs text-rose-500 mt-1">{errors.availability}</p>}
            </div>

            {Object.entries(formData.availability).map(([day, slots]) =>
              slots.length > 0 ? (
                <div key={day} className="space-y-2">
                  <h4 className="text-white font-medium">{days.find((d) => d.id === day)?.label}</h4>
                  {slots.map((slot, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${day}-start-${index}`} className="text-rose-100">
                          Start Time
                        </Label>
                        <Input
                          id={`${day}-start-${index}`}
                          type="time"
                          value={slot.start}
                          onChange={(e) => handleTimeChange(day, index, "start", e.target.value)}
                          className="bg-rose-950/20 border-rose-500/30 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${day}-end-${index}`} className="text-rose-100">
                          End Time
                        </Label>
                        <Input
                          id={`${day}-end-${index}`}
                          type="time"
                          value={slot.end}
                          onChange={(e) => handleTimeChange(day, index, "end", e.target.value)}
                          className="bg-rose-950/20 border-rose-500/30 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null
            )}

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-rose-100">
                Your Timezone <span className="text-rose-500">*</span>
              </Label>
              <Select value={formData.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
                <SelectTrigger className="bg-rose-950/20 border-rose-500/30 text-white focus:ring-rose-500">
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-rose-500/30">
                  {timezones.map((timezone) => (
                    <SelectItem
                      key={timezone.value}
                      value={timezone.value}
                      className="text-rose-100 focus:bg-rose-950/50 focus:text-white"
                    >
                      {timezone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timezone && <p className="text-xs text-rose-500 mt-1">{errors.timezone}</p>}
            </div>
          </div>

          <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-100/70">Estimated Weekly Earnings</p>
                <p className="text-2xl font-bold text-white">${calculateEarnings()}</p>
              </div>
              <div className="h-12 w-12 bg-rose-900/30 rounded-full flex items-center justify-center border border-rose-500/30">
                <DollarSign className="h-6 w-6 text-rose-500" />
              </div>
            </div>
            <p className="text-xs text-rose-100/70 mt-2">
              Based on your pricing and availability. Actual earnings may vary depending on bookings.
            </p>
          </div>

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
