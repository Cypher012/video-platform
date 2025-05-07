import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Download, MessageSquare } from "lucide-react"

export function SessionHistory() {
  // Sample past sessions data
  const pastSessions = [
    {
      id: 1,
      performerName: "Jessica Diamond",
      performerImage: "/placeholder.svg?height=40&width=40",
      date: new Date(2025, 3, 28, 19, 0), // April 28, 2025
      duration: 45,
      rating: 5,
      cost: 89.99,
    },
    {
      id: 2,
      performerName: "Sophia Rose",
      performerImage: "/placeholder.svg?height=40&width=40",
      date: new Date(2025, 3, 20, 20, 30), // April 20, 2025
      duration: 30,
      rating: 4,
      cost: 59.99,
    },
    {
      id: 3,
      performerName: "Emma Black",
      performerImage: "/placeholder.svg?height=40&width=40",
      date: new Date(2025, 3, 15, 18, 0), // April 15, 2025
      duration: 60,
      rating: 5,
      cost: 119.99,
    },
    {
      id: 4,
      performerName: "Lily White",
      performerImage: "/placeholder.svg?height=40&width=40",
      date: new Date(2025, 3, 10, 21, 0), // April 10, 2025
      duration: 30,
      rating: 4,
      cost: 59.99,
    },
  ]

  // Function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-white">Session History</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {pastSessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-rose-950/20 border border-rose-900/30 rounded-lg gap-4"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-rose-500/30">
                  <AvatarImage src={session.performerImage || "/placeholder.svg"} alt={session.performerName} />
                  <AvatarFallback className="bg-rose-950 text-rose-200">
                    {session.performerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{session.performerName}</p>
                  <p className="text-sm text-rose-100/70">{formatDate(session.date)}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs border-rose-500/30 text-rose-300 bg-rose-950/20">
                      <Clock className="h-3 w-3 mr-1" />
                      {session.duration} minutes
                    </Badge>
                    <div className="ml-2 flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < session.rating ? "text-rose-500 fill-rose-500" : "text-gray-500"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <div className="text-lg font-bold text-white">${session.cost.toFixed(2)}</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
                    Book Again
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
            >
              View All History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
