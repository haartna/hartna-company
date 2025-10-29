"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function AccessoriesPage() {
  const { t } = useLanguage()
  const accessories = products.filter((p) => p.category === "accessories")
  const category = categories.find((c) => c.id === "accessories")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("accessories")}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{t("accessoriesDesc")}</p>
          </div>
        </section>

        {/* Subcategories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3">
              <Link href="/products/accessories">
                <Button variant="default">{t("allAccessories")}</Button>
              </Link>
              {category?.subcategories?.map((sub) => (
                <Link key={sub.id} href={`/products/accessories/${sub.id}`}>
                  <Button variant="outline">{sub.name}</Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {accessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {accessories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("noProducts")}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
