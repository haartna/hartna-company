"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useData } from "@/lib/data-context"
import { useLanguage } from "@/lib/language-context"

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const { heroSlides } = useData()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const slide = heroSlides[currentSlide]

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-muted">
      {/* Slide Content */}
      <div className="relative h-full w-full">
        <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {language === "en" ? slide.title : slide.titleAr}
            </h1>
            <p className="text-base md:text-lg mb-8 text-balance max-w-2xl mx-auto">
              {language === "en" ? slide.subtitle : slide.subtitleAr}
            </p>
            <Link href={slide.link || "/shop-now"}>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 border-white hover:border-white/90"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderColor: "#ffffff",
                }}
              >
                {language === "en" ? slide.cta : slide.ctaAr}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
