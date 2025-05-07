"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, User, Video, ArrowRight } from "lucide-react"

export function RoleSelection() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"client" | "performer" | null>(null)

  const handleContinue = () => {
    if (selectedRole) {
      // In a real app, you would store the role in your auth/user state
      // For now, we'll use localStorage to simulate this
      localStorage.setItem("userRole", selectedRole)

      // Redirect to the appropriate onboarding flow
      if (selectedRole === "client") {
        router.push("/onboarding/client")
      } else {
        router.push("/onboarding/performer")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-rose-950 opacity-80 z-[-1]"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-rose-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Flame className="h-12 w-12 text-rose-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to HotConnect</h1>
          <p className="text-rose-100/70 text-lg max-w-xl mx-auto">
            Choose how you want to use our platform. You can always change your role later in settings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className={`bg-black/60 backdrop-blur-sm border-2 transition-all cursor-pointer hover:shadow-glow-sm ${
              selectedRole === "client"
                ? "border-rose-500 shadow-glow-sm"
                : "border-rose-900/30 hover:border-rose-500/50"
            }`}
            onClick={() => setSelectedRole("client")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center mb-6">
                <User className="h-10 w-10 text-rose-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Join as a Client</h2>
              <p className="text-rose-100/70 mb-6">
                Connect with stunning performers for private 1-on-1 video sessions. Experience intimate moments with the
                hottest performers online.
              </p>
              <ul className="text-left space-y-2 mb-6 w-full">
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Book private sessions with performers
                </li>
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Chat and connect with your favorites
                </li>
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Request custom experiences
                </li>
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Enjoy HD video quality
                </li>
              </ul>
              <Button
                className={`w-full ${
                  selectedRole === "client"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-rose-950/30 hover:bg-rose-950/50 border border-rose-500/30"
                } text-white`}
                onClick={() => setSelectedRole("client")}
              >
                Select Client Role
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`bg-black/60 backdrop-blur-sm border-2 transition-all cursor-pointer hover:shadow-glow-sm ${
              selectedRole === "performer"
                ? "border-rose-500 shadow-glow-sm"
                : "border-rose-900/30 hover:border-rose-500/50"
            }`}
            onClick={() => setSelectedRole("performer")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center mb-6">
                <Video className="h-10 w-10 text-rose-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Join as a Performer</h2>
              <p className="text-rose-100/70 mb-6">
                Monetize your charm and talents by offering private video sessions. Set your own rates and schedule to
                maximize your earnings.
              </p>
              <ul className="text-left space-y-2 mb-6 w-full">
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Set your own rates and schedule
                </li>
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Receive direct payments from clients
                </li>
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Build your fan base and reputation
                </li>
                <li className="flex items-center text-rose-100">
                  <span className="text-rose-500 mr-2">✓</span> Access premium tools and analytics
                </li>
              </ul>
              <Button
                className={`w-full ${
                  selectedRole === "performer"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-rose-950/30 hover:bg-rose-950/50 border border-rose-500/30"
                } text-white`}
                onClick={() => setSelectedRole("performer")}
              >
                Select Performer Role
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm px-8"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
