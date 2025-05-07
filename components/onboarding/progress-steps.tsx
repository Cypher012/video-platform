import type React from "react"
import { Check } from "lucide-react"

interface ProgressStepsProps {
  steps: string[]
  currentStep: string
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  const currentIndex = steps.indexOf(currentStep)

  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex

        return (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                isCompleted
                  ? "bg-rose-600 border-rose-600"
                  : isCurrent
                  ? "border-rose-500 bg-rose-950/30"
                  : "border-rose-500/30 bg-rose-950/30"
              }`}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <span className={`text-sm ${isCurrent ? "text-rose-500" : "text-rose-100/70"}`}>{index + 1}</span>
              )}
            </div>
            <span
              className={`text-xs mt-2 ${
                isCompleted ? "text-rose-500" : isCurrent ? "text-white" : "text-rose-100/70"
              }`}
            >
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}
