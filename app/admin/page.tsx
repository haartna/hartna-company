"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useData } from "@/lib/data-context"
import { Package, FolderTree, ImageIcon, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function AdminDashboardPage() {
  const { t, language } = useLanguage()
  const { products, categories, heroSlides } = useData()
  const isRTL = language === "ar"

  const totalProducts = products.length
  const totalCategories = categories.length
  const totalSlides = heroSlides.length
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0)

  return (
    <div className={`p-8 ${isRTL ? "text-right" : ""}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("dashboard")}</h1>
        <p className="text-muted-foreground">{t("welcomeAdmin")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className={`flex flex-row items-center justify-between pb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <CardTitle className="text-sm font-medium">{t("totalProducts")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">{t("activeProducts")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={`flex flex-row items-center justify-between pb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <CardTitle className="text-sm font-medium">{t("categories")}</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">{t("productCategories")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={`flex flex-row items-center justify-between pb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <CardTitle className="text-sm font-medium">{t("heroSlider")}</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSlides}</div>
            <p className="text-xs text-muted-foreground">{t("activeSlides")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={`flex flex-row items-center justify-between pb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <CardTitle className="text-sm font-medium">{t("catalogValue")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{t("totalInventory")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>{t("recentProducts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
                </div>
                <div className={isRTL ? "text-left" : "text-right"}>
                  <p className="font-bold">${(product.price || 0).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{product.featured ? t("featured") : t("standard")}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
