"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useData } from "@/lib/data-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function SlushMachinesPage() {
  const { t } = useLanguage()
  const { products, categories } = useData()

  const slushMachines = products.filter((p) => p.category === "slush-machines")
  const category = categories.find((c) => c.id === "slush-machines")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("slushMachines")}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {t("browseSelection")} {t("slushMachines").toLowerCase()}
            </p>
          </div>
        </section>

        {/* Subcategories */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3">
              <Link href="/products/slush-machines">
                <Button variant="default">{t("allMachines")}</Button>
              </Link>
              {category?.subcategories?.map((sub) => (
                <Link key={sub.id} href={`/products/slush-machines/${sub.id}`}>
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
              {slushMachines.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {slushMachines.length === 0 && (
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
