"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Flame } from "lucide-react"

interface OnboardingLayoutProps {
  children: React.ReactNode
  role: "client" | "performer"
}

export function OnboardingLayout({ children, role }: OnboardingLayoutProps) {
  const router = useRouter()
  const [storedRole, setStoredRole] = useState<string | null>(null)

  useEffect(() => {
    // Check if user has selected a role
    const userRole = localStorage.getItem("userRole")
    setStoredRole(userRole)

    // If no role is selected or role doesn't match, redirect to role selection
    if (!userRole || (role !== userRole && userRole !== "admin")) {
      router.push("/onboarding/role-selection")
    }
  }, [router, role])

  if (!storedRole) {
    return null // Don't render anything while checking
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-rose-950 opacity-80 z-[-1]"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-rose-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-pulse animation-delay-2000"></div>
      </div>

      <header className="border-b border-rose-900/30 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold text-white">HotConnect</span>
          </div>
        </div>
      </header>

      <main className="container py-8">{children}</main>
    </div>
  )
}
