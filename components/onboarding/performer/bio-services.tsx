"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Plus, Trash2 } from "lucide-react"
import type { BioServicesData, ServiceData } from "@/types/onboarding"

interface BioServicesProps {
  onNext: (data: BioServicesData) => void
  onBack: () => void
  initialData?: BioServicesData
}

export function BioServices({ onNext, onBack, initialData }: BioServicesProps) {
  const [services, setServices] = useState<ServiceData[]>(initialData?.services || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ services })
  }

  const handleAddService = () => {
    setServices([
      ...services,
      {
        name: "",
        description: "",
        price: 0,
        duration: 30
      }
    ])
  }

  const handleServiceChange = (index: number, field: keyof ServiceData, value: string | number) => {
    const newServices = [...services]
    newServices[index] = {
      ...newServices[index],
      [field]: value
    }
    setServices(newServices)
  }

  const handleRemoveService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index)
    setServices(newServices)
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Your Services</CardTitle>
        <CardDescription className="text-rose-100/70">
          Add the services you offer and set your rates. You can add multiple services with different durations and prices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Services</Label>
              <div className="space-y-2">
                {services.map((service, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Service {index + 1}</h3>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveService(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`service-name-${index}`}>Service Name</Label>
                      <Input
                        id={`service-name-${index}`}
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                        placeholder="Enter service name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`service-description-${index}`}>Description</Label>
                      <Textarea
                        id={`service-description-${index}`}
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                        placeholder="Describe your service"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`service-price-${index}`}>Price ($)</Label>
                        <Input
                          id={`service-price-${index}`}
                          type="number"
                          value={service.price}
                          onChange={(e) => handleServiceChange(index, "price", parseFloat(e.target.value))}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`service-duration-${index}`}>Duration (minutes)</Label>
                        <Input
                          id={`service-duration-${index}`}
                          type="number"
                          value={service.duration}
                          onChange={(e) => handleServiceChange(index, "duration", parseInt(e.target.value))}
                          min="15"
                          step="15"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddService}>
                  Add Service
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
