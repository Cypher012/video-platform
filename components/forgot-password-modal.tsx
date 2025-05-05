"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, Eye, EyeOff, Check, Flame } from "lucide-react"

interface ForgotPasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ForgotPasswordModal({ open, onOpenChange }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"request" | "verify" | "reset" | "success">("request")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset request logic here
    console.log({ email })
    // Move to verification step
    setStep("verify")
  }

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle verification logic here
    console.log({ verificationCode })
    // Move to reset password step
    setStep("reset")
  }

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log({ newPassword, confirmPassword })
    // Move to success step
    setStep("success")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after closing
    setTimeout(() => {
      setEmail("")
      setVerificationCode("")
      setNewPassword("")
      setConfirmPassword("")
      setStep("request")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black/95 border border-rose-900/50 text-white">
        {step === "request" && (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <Flame className="h-8 w-8 text-rose-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-white">Forgot Password</DialogTitle>
              <DialogDescription className="text-center text-rose-100/70">
                Enter your email address and we'll send you a verification code
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRequestSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-rose-100">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
              >
                Send Reset Code
              </Button>
              <div className="text-center text-sm">
                <Button
                  variant="link"
                  className="px-0 text-rose-400 hover:text-rose-300"
                  type="button"
                  onClick={handleClose}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "verify" && (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <Flame className="h-8 w-8 text-rose-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-white">Verify Your Identity</DialogTitle>
              <DialogDescription className="text-center text-rose-100/70">
                We've sent a verification code to {email}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleVerifySubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode" className="text-sm font-medium text-rose-100">
                  Verification Code
                </Label>
                <Input
                  id="verificationCode"
                  placeholder="Enter the 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-lg tracking-widest bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                  maxLength={6}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
              >
                Verify Code
              </Button>
              <div className="text-center text-sm text-rose-100">
                Didn't receive a code?{" "}
                <Button variant="link" className="px-0 text-rose-500 hover:text-rose-400" type="button">
                  Resend Code
                </Button>
              </div>
              <div className="text-center text-sm">
                <Button
                  variant="link"
                  className="px-0 text-rose-400 hover:text-rose-300"
                  type="button"
                  onClick={() => setStep("request")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go back
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <Flame className="h-8 w-8 text-rose-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-white">Reset Your Password</DialogTitle>
              <DialogDescription className="text-center text-rose-100/70">
                Create a new password for your account
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleResetSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-rose-100">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-rose-400 hover:text-rose-300"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                <p className="text-xs text-rose-100/50">
                  Password must be at least 8 characters with a number and special character
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-rose-100">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
              >
                Reset Password
              </Button>
              <div className="text-center text-sm">
                <Button
                  variant="link"
                  className="px-0 text-rose-400 hover:text-rose-300"
                  type="button"
                  onClick={() => setStep("verify")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go back
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-900/30 border border-rose-500/30">
                <Check className="h-6 w-6 text-rose-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center mt-4 text-white">
                Password Reset Successful
              </DialogTitle>
              <DialogDescription className="text-center text-rose-100/70">
                Your password has been reset successfully. You can now login with your new password.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center pt-4">
              <Button
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
                onClick={handleClose}
              >
                Back to Login
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
