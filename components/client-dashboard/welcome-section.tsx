import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CreditCard } from "lucide-react"

export function WelcomeSection() {
  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <CardContent className="p-6 relative">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="h-24 w-24 border-2 border-rose-500/50 shadow-glow-sm">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
            <AvatarFallback className="bg-rose-950 text-rose-200 text-2xl">JD</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">Welcome back, John!</h2>
            <p className="text-rose-100/70 mb-4">Your next session is scheduled in 2 days.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-4 flex items-center">
                <Calendar className="h-8 w-8 text-rose-500 mr-3" />
                <div>
                  <p className="text-xs text-rose-100/70">Upcoming Sessions</p>
                  <p className="text-lg font-bold text-white">3</p>
                </div>
              </div>

              <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-4 flex items-center">
                <Clock className="h-8 w-8 text-rose-500 mr-3" />
                <div>
                  <p className="text-xs text-rose-100/70">Total Hours</p>
                  <p className="text-lg font-bold text-white">24.5</p>
                </div>
              </div>

              <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-4 flex items-center">
                <CreditCard className="h-8 w-8 text-rose-500 mr-3" />
                <div>
                  <p className="text-xs text-rose-100/70">Wallet Balance</p>
                  <p className="text-lg font-bold text-white">$149.99</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[140px]">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm w-full">Book Session</Button>
            <Button
              variant="outline"
              className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 w-full"
            >
              Browse Models
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
