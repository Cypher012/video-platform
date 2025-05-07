"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, CreditCard, MessageSquare, Check, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      title: "Session Confirmed",
      message: "Your session with Jessica Diamond on May 10 at 7:00 PM has been confirmed.",
      date: new Date(2025, 4, 8), // May 8, 2025
      read: false,
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Successful",
      message: "Your wallet has been topped up with $100.00.",
      date: new Date(2025, 4, 5), // May 5, 2025
      read: true,
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      message: "You have a new message from Sophia Rose.",
      date: new Date(2025, 4, 4), // May 4, 2025
      read: false,
    },
    {
      id: 4,
      type: "booking",
      title: "Session Reminder",
      message: "Your session with Sophia Rose is scheduled for tomorrow at 8:30 PM.",
      date: new Date(2025, 4, 11), // May 11, 2025
      read: false,
    },
    {
      id: 5,
      type: "payment",
      title: "Session Payment",
      message: "Payment of $59.99 for your session with Sophia Rose was processed.",
      date: new Date(2025, 4, 3), // May 3, 2025
      read: true,
    },
  ])

  // Function to format date
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date)
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5 text-rose-500" />
      case "payment":
        return <CreditCard className="h-5 w-5 text-rose-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-rose-500" />
      default:
        return <Bell className="h-5 w-5 text-rose-500" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-white">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="bg-rose-950/20 border border-rose-900/30 mb-4">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:shadow-none text-rose-100"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:shadow-none text-rose-100"
            >
              Unread
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:shadow-none text-rose-100"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:shadow-none text-rose-100"
            >
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-0">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    notification.read
                      ? "bg-rose-950/10 border border-rose-900/20"
                      : "bg-rose-950/20 border border-rose-900/30"
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium ${notification.read ? "text-rose-100" : "text-white"}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-rose-100/50 whitespace-nowrap ml-2">
                        {formatDate(notification.date)}
                      </span>
                    </div>
                    <p className="text-sm text-rose-100/70 mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-rose-400 hover:text-rose-300 hover:bg-transparent shrink-0"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-rose-100/70">
                <Bell className="h-12 w-12 mx-auto text-rose-900/50 mb-3" />
                <p>No notifications</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3 mt-0">
            {notifications.filter((n) => !n.read).length > 0 ? (
              notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 p-3 bg-rose-950/20 border border-rose-900/30 rounded-lg"
                  >
                    <div className="h-10 w-10 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-white">{notification.title}</h4>
                        <span className="text-xs text-rose-100/50 whitespace-nowrap ml-2">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <p className="text-sm text-rose-100/70 mt-1">{notification.message}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-rose-400 hover:text-rose-300 hover:bg-transparent shrink-0"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-rose-100/70">
                <Bell className="h-12 w-12 mx-auto text-rose-900/50 mb-3" />
                <p>No unread notifications</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-3 mt-0">
            {notifications.filter((n) => n.type === "booking").length > 0 ? (
              notifications
                .filter((n) => n.type === "booking")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      notification.read
                        ? "bg-rose-950/10 border border-rose-900/20"
                        : "bg-rose-950/20 border border-rose-900/30"
                    }`}
                  >
                    <div className="h-10 w-10 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-medium ${notification.read ? "text-rose-100" : "text-white"}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-rose-100/50 whitespace-nowrap ml-2">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <p className="text-sm text-rose-100/70 mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-rose-400 hover:text-rose-300 hover:bg-transparent shrink-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-rose-100/70">
                <Calendar className="h-12 w-12 mx-auto text-rose-900/50 mb-3" />
                <p>No booking notifications</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="payments" className="space-y-3 mt-0">
            {notifications.filter((n) => n.type === "payment").length > 0 ? (
              notifications
                .filter((n) => n.type === "payment")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      notification.read
                        ? "bg-rose-950/10 border border-rose-900/20"
                        : "bg-rose-950/20 border border-rose-900/30"
                    }`}
                  >
                    <div className="h-10 w-10 rounded-full bg-rose-950/30 border border-rose-500/30 flex items-center justify-center shrink-0">
                      <CreditCard className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-medium ${notification.read ? "text-rose-100" : "text-white"}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-rose-100/50 whitespace-nowrap ml-2">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <p className="text-sm text-rose-100/70 mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-rose-400 hover:text-rose-300 hover:bg-transparent shrink-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-rose-100/70">
                <CreditCard className="h-12 w-12 mx-auto text-rose-900/50 mb-3" />
                <p>No payment notifications</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
