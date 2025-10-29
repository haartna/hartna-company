"use client"

import { useLanguage } from "@/lib/language-context"
import { useData } from "@/lib/data-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShopNowPage() {
  const { t } = useLanguage()
  const { products } = useData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("shopNow")}</h1>
            <p className="text-lg text-muted-foreground mb-8">{t("shopNowDesc")}</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noProducts")}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("needHelp")}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t("needHelpDesc")}</p>
          <Link href="/contact">
            <Button size="lg">{t("contactUs")}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
