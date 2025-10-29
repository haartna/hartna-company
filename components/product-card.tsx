"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage()

  return (
    <Card className="overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={language === "en" ? product.name : product.nameAr}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {language === "en" ? product.name : product.nameAr}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {language === "en" ? product.description : product.descriptionAr}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button className="w-full">{t("viewDetails")}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
