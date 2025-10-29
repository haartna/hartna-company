"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, FolderTree, ImageIcon, Settings, Home, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function AdminSidebar() {
  const pathname = usePathname()
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  const menuItems = [
    {
      title: t("dashboard"),
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: t("products"),
      href: "/admin/products",
      icon: Package,
    },
    {
      title: t("categories"),
      href: "/admin/categories",
      icon: FolderTree,
    },
    {
      title: t("heroSlider"),
      href: "/admin/hero-slider",
      icon: ImageIcon,
    },
    {
      title: language === "ar" ? "الرسائل" : "Messages",
      href: "/admin/messages",
      icon: Mail,
    },
    {
      title: t("settings"),
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={`flex h-full w-64 flex-col border-r bg-muted/40 ${isRTL ? "border-l border-r-0" : ""}`}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          HARTNA
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Home className="h-5 w-5" />
          {t("backToWebsite")}
        </Link>
      </div>
    </div>
  )
}
