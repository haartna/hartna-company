"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useLanguage } from "@/lib/language-context"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex h-screen overflow-hidden ${isRTL ? "flex-row-reverse" : ""}`}>
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  )
}
