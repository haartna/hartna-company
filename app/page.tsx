"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSlider } from "@/components/hero-slider"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useData } from "@/lib/data-context"
import Link from "next/link"
import { Coffee, Award, Headphones, Truck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
  const { t } = useLanguage()
  const { products } = useData()
  const featuredProducts = products.filter((p) => p.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("premiumQuality")}</h3>
                <p className="text-sm text-muted-foreground">{t("premiumQualityDesc")}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("expertSelection")}</h3>
                <p className="text-sm text-muted-foreground">{t("expertSelectionDesc")}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Headphones className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("support247")}</h3>
                <p className="text-sm text-muted-foreground">{t("support247Desc")}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t("fastDelivery")}</h3>
                <p className="text-sm text-muted-foreground">{t("fastDeliveryDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("featuredProducts")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("featuredProductsDesc")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/products/coffee-machines">
                <Button size="lg" variant="outline">
                  {t("viewAllProducts")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("readyToElevate")}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">{t("readyToElevateDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products/coffee-machines">

<Button
  size="lg"
  variant="secondary"
  className="bg-gray-900 text-white hover:bg-gray-800"
>
  {t("shopMachines")}
</Button>

                
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  {t("contactUs")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
