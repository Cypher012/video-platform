"use client"

import type React from "react"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Calendar, CreditCard, Home, LogOut, Search, Settings, User, Clock, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VerificationBanner } from "@/components/verification-banner"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-black">
        <Sidebar className="border-rose-900/30">
          <SidebarHeader className="border-b border-rose-900/30 pb-2">
            <div className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8 border border-rose-500/30">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-rose-950 text-rose-200">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">John Doe</span>
                <span className="text-xs text-rose-400">Premium Member</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/performers">
                    <Search className="h-4 w-4" />
                    <span>Find Performers</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/sessions">
                    <Calendar className="h-4 w-4" />
                    <span>My Sessions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/history">
                    <Clock className="h-4 w-4" />
                    <span>Session History</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/wallet">
                    <CreditCard className="h-4 w-4" />
                    <span>My Wallet</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/notifications">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-rose-900/30 pt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/logout">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-rose-900/30 bg-black/80 px-6 backdrop-blur-sm">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-white">Client Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="relative border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-xs text-white">
                  3
                </span>
              </Button>
              <Avatar className="h-8 w-8 border border-rose-500/30">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-rose-950 text-rose-200">JD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {showBanner && <VerificationBanner />}
            <div className="container py-6 md:py-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
