"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Plane, Users, CreditCard, Settings, LogOut, ChevronRight, Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Flights",
      icon: <Plane className="h-5 w-5" />,
      href: "/admin/flights",
      active: pathname?.startsWith("/admin/flights"),
    },
    {
      label: "Users",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
      active: pathname?.startsWith("/admin/users"),
    },
    {
      label: "Bookings",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/admin/bookings",
      active: pathname?.startsWith("/admin/bookings"),
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
      active: pathname?.startsWith("/admin/settings"),
    },
  ]

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden absolute left-4 top-3 z-50">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <MobileSidebar routes={routes} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>

      <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
        <DesktopSidebar routes={routes} />
      </aside>
    </>
  )
}

function MobileSidebar({
  routes,
  setIsOpen,
}: {
  routes: {
    label: string
    icon: React.ReactNode
    href: string
    active: boolean
  }[]
  setIsOpen: (open: boolean) => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold" onClick={() => setIsOpen(false)}>
          <Plane className="h-6 w-6" />
          <span>AirBangla Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={`justify-start ${route.active ? "bg-secondary" : ""}`}
              asChild
              onClick={() => setIsOpen(false)}
            >
              <Link href={route.href}>
                {route.icon}
                <span className="ml-2">{route.label}</span>
                {route.active && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-2">
        <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
          <Link href="/">
            <LogOut className="mr-2 h-5 w-5" />
            Exit Admin
          </Link>
        </Button>
      </div>
    </div>
  )
}

function DesktopSidebar({
  routes,
}: {
  routes: {
    label: string
    icon: React.ReactNode
    href: string
    active: boolean
  }[]
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Plane className="h-6 w-6" />
          <span>AirBangla Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={`justify-start ${route.active ? "bg-secondary" : ""}`}
              asChild
            >
              <Link href={route.href}>
                {route.icon}
                <span className="ml-2">{route.label}</span>
                {route.active && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-2">
        <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
          <Link href="/">
            <LogOut className="mr-2 h-5 w-5" />
            Exit Admin
          </Link>
        </Button>
      </div>
    </div>
  )
}

