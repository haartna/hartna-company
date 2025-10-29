"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useData } from "@/lib/data-context"
import { Plus, Pencil, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"
import type { HeroSlide } from "@/lib/data-context"

export default function AdminHeroSliderPage() {
  const { t, language } = useLanguage()
  const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide } = useData()
  const { toast } = useToast()
  const isRTL = language === "ar"

  const [isAddingSlide, setIsAddingSlide] = useState(false)
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    titleAr: "",
    subtitle: "",
    subtitleAr: "",
    cta: "",
    ctaAr: "",
    image: "",
    link: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSlide = () => {
    if (!formData.title || !formData.image) {
      toast({
        title: "Error",
        description: "Please fill in title and image",
        variant: "destructive",
      })
      return
    }

    if (editingSlideId) {
      updateHeroSlide(editingSlideId, {
        title: formData.title,
        titleAr: formData.titleAr,
        subtitle: formData.subtitle,
        subtitleAr: formData.subtitleAr,
        cta: formData.cta,
        ctaAr: formData.ctaAr,
        image: formData.image,
        link: formData.link,
      })
      toast({
        title: "Success",
        description: "Slide updated successfully",
      })
    } else {
      const newSlide: HeroSlide = {
        id: `slide-${Date.now()}`,
        title: formData.title,
        titleAr: formData.titleAr,
        subtitle: formData.subtitle,
        subtitleAr: formData.subtitleAr,
        cta: formData.cta,
        ctaAr: formData.ctaAr,
        image: formData.image,
        link: formData.link,
      }
      addHeroSlide(newSlide)
      toast({
        title: "Success",
        description: "Slide added successfully",
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      titleAr: "",
      subtitle: "",
      subtitleAr: "",
      cta: "",
      ctaAr: "",
      image: "",
      link: "",
    })
    setImagePreview(null)
    setIsAddingSlide(false)
    setEditingSlideId(null)
  }

  const handleEditSlide = (slide: HeroSlide) => {
    setFormData({
      title: slide.title,
      titleAr: slide.titleAr,
      subtitle: slide.subtitle,
      subtitleAr: slide.subtitleAr,
      cta: slide.cta,
      ctaAr: slide.ctaAr,
      image: slide.image,
      link: slide.link || "",
    })
    setImagePreview(slide.image)
    setEditingSlideId(slide.id)
    setIsAddingSlide(true)
  }

  const handleDeleteSlide = (id: string) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      deleteHeroSlide(id)
      toast({
        title: "Success",
        description: "Slide deleted successfully",
      })
    }
  }

  return (
    <div className={`p-8 ${isRTL ? "text-right" : ""}`}>
      <div className={`flex items-center justify-between mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("heroSlider")}</h1>
          <p className="text-muted-foreground">{t("manageHeroSlider")}</p>
        </div>
        {!isAddingSlide && (
          <Button onClick={() => setIsAddingSlide(true)}>
            <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t("addSlide")}
          </Button>
        )}
      </div>

      {/* Add/Edit Slide Form */}
      {isAddingSlide && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingSlideId ? "Edit Slide" : "Add New Slide"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title (English)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter slide title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleAr">Title (Arabic)</Label>
                <Input
                  id="titleAr"
                  value={formData.titleAr}
                  onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  placeholder="أدخل عنوان الشريحة"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle (English)</Label>
                <Textarea
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter slide subtitle"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitleAr">Subtitle (Arabic)</Label>
                <Textarea
                  id="subtitleAr"
                  value={formData.subtitleAr}
                  onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
                  placeholder="أدخل الترجمة"
                  rows={2}
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cta">CTA Text (English)</Label>
                <Input
                  id="cta"
                  value={formData.cta}
                  onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                  placeholder="e.g., Shop Now"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaAr">CTA Text (Arabic)</Label>
                <Input
                  id="ctaAr"
                  value={formData.ctaAr}
                  onChange={(e) => setFormData({ ...formData, ctaAr: e.target.value })}
                  placeholder="مثل: تسوق الآن"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link (Optional)</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Slide Image</Label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Choose Image
                  </Button>
                </div>
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveSlide}>{editingSlideId ? "Update Slide" : "Add Slide"}</Button>
              <Button variant="outline" onClick={resetForm} className="bg-transparent">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slides List */}
      <div className="space-y-4">
        {heroSlides.map((slide, index) => (
          <Card key={slide.id}>
            <CardContent className="p-4">
              <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="relative h-24 w-40 rounded overflow-hidden bg-muted flex-shrink-0">
                  <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className={`flex items-start justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={isRTL ? "text-right" : ""}>
                      <h3 className="font-semibold">{slide.title}</h3>
                      <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditSlide(slide)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteSlide(slide.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-4 text-sm text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <span>
                      {t("slide")} {index + 1}
                    </span>
                    <span>•</span>
                    <span>
                      {t("cta")}: {slide.cta}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
