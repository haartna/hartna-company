"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useData } from "@/lib/data-context"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ShoppingCart, Heart, Share2, Shield, Truck, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const { products } = useData()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                {t("home")}
              </Link>
              <span>/</span>
              <Link href={`/products/${product.category}`} className="hover:text-foreground capitalize">
                {product.category.replace("-", " ")}
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
              </div>

              {/* Product Info */}
              <div>
                <Link
                  href={`/products/${product.category}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("backTo")} {product.category.replace("-", " ")}
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {t("addToCart")}
                  </Button>
                  <Button size="lg" variant="outline">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <Card>
                    <CardContent className="flex flex-col items-center text-center p-4">
                      <Truck className="h-8 w-8 text-primary mb-2" />
                      <p className="text-sm font-medium">{t("freeShipping")}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex flex-col items-center text-center p-4">
                      <Shield className="h-8 w-8 text-primary mb-2" />
                      <p className="text-sm font-medium">{t("warranty")}</p>
                      <p className="text-xs text-muted-foreground">{t("warrantyDesc")}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Product Details */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">{t("productDetails")}</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{t("category")}:</dt>
                        <dd className="font-medium capitalize">{product.category.replace("-", " ")}</dd>
                      </div>
                      {product.subcategory && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">{t("type")}:</dt>
                          <dd className="font-medium capitalize">{product.subcategory.replace("-", " ")}</dd>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{t("productOrigin") || "Product Origin"}:</dt>
                        <dd className="font-medium">{product.productOrigin || "N/A"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">{t("availability")}:</dt>
                        <dd className="font-medium text-green-600">{t("inStock")}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("relatedProducts")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="overflow-hidden group">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/products/${relatedProduct.id}`}>
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
