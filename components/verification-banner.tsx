"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function VerificationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            Your account is not fully verified. Please verify your identity to access all features.
          </AlertDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-amber-500 text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40"
          >
            Verify Now
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-amber-800 dark:text-amber-400"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </Alert>
  )
}
