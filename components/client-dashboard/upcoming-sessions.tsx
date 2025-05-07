"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export function UpcomingSessions() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")

  // Sample upcoming sessions data
  const upcomingSessions = [
    {
      id: 1,
      performerName: "Jessica Diamond",
      performerImage: "/placeholder.svg?height=40&width=40",
      date: new Date(2025, 4, 10, 19, 0), // May 10, 2025, 7:00 PM
      duration: 30,
      status: "confirmed",
    },
    {
      id: 2,
      performerName: "Sophia Rose",
      performerImage: "/placeholder.svg?height=40&width=40",
      date: new Date(2025, 4, 12, 20, 30), // May 12, 2025, 8:30 PM
      duration: 60,
      status: "confirmed",
    },
    {
      id: 3,
      performerName: "Emma Black",
      performerImage: "/placeholder.svg?height=40&width=40",
      date: new Date(2025, 4, 15, 18, 0), // May 15, 2025, 6:00 PM
      duration: 45,
      status: "pending",
    },
  ]

  // Function to format date and time
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Function to check if a session is on the selected date
  const isSessionOnSelectedDate = (sessionDate: Date, selectedDate: Date | undefined) => {
    if (!selectedDate) return false
    return (
      sessionDate.getDate() === selectedDate.getDate() &&
      sessionDate.getMonth() === selectedDate.getMonth() &&
      sessionDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  // Filter sessions for the selected date
  const sessionsOnSelectedDate = upcomingSessions.filter((session) => isSessionOnSelectedDate(session.date, date))

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-white">Upcoming Sessions</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-rose-500/30 ${view === "list" ? "bg-rose-950/30 text-rose-300" : "text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"}`}
              onClick={() => setView("list")}
            >
              List
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-rose-500/30 ${view === "calendar" ? "bg-rose-950/30 text-rose-300" : "text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"}`}
              onClick={() => setView("calendar")}
            >
              Calendar
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {view === "calendar" ? (
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border border-rose-900/30 rounded-md bg-black/60 text-white"
              classNames={{
                day_selected: "bg-rose-600 text-white hover:bg-rose-700 focus:bg-rose-700",
                day_today: "bg-rose-950/50 text-rose-300",
                day: "text-white hover:bg-rose-950/30 focus:bg-rose-950/30",
                day_disabled: "text-rose-900/50",
                nav_button: "border border-rose-900/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300",
                nav_button_previous: "border-rose-900/30",
                nav_button_next: "border-rose-900/30",
                caption: "text-rose-100",
                head_cell: "text-rose-400",
              }}
            />

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white">
                Sessions on {date?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </h3>

              {sessionsOnSelectedDate.length > 0 ? (
                <div className="space-y-3 mt-3">
                  {sessionsOnSelectedDate.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-rose-950/20 border border-rose-900/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-rose-500/30">
                          <AvatarImage src={session.performerImage || "/placeholder.svg"} alt={session.performerName} />
                          <AvatarFallback className="bg-rose-950 text-rose-200">
                            {session.performerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{session.performerName}</p>
                          <p className="text-sm text-rose-100/70">
                            <Clock className="inline-block h-3 w-3 mr-1" />
                            {session.date.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}{" "}
                            • {session.duration} min
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
                        <Video className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-rose-100/70">
                  <CalendarIcon className="h-12 w-12 mx-auto text-rose-900/50 mb-3" />
                  <p>No sessions scheduled for this date</p>
                  <Button variant="link" className="text-rose-500 hover:text-rose-400 mt-2">
                    Book a session
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-rose-950/20 border border-rose-900/30 rounded-lg"
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
                      <p className="text-sm text-rose-100/70">{formatDateTime(session.date)}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs border-rose-500/30 text-rose-300 bg-rose-950/20">
                          {session.duration} minutes
                        </Badge>
                        <Badge
                          className={`ml-2 text-xs ${session.status === "confirmed" ? "bg-green-600/80" : "bg-amber-600/80"}`}
                        >
                          {session.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
                      {new Date() > session.date ? "Join Now" : "Details"}
                    </Button>
                    {session.status === "confirmed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                      >
                        Reschedule
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-rose-100/70">
                <CalendarIcon className="h-12 w-12 mx-auto text-rose-900/50 mb-3" />
                <p>No upcoming sessions</p>
                <Button variant="link" className="text-rose-500 hover:text-rose-400 mt-2">
                  Book your first session
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
