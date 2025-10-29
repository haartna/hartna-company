"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"
import { useData } from "@/lib/data-context"

export default function AdminSettingsPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const { settings, updateSettings } = useData()
  const isRTL = language === "ar"

  const [formData, setFormData] = useState({
    siteName: settings.siteName,
    siteNameAr: settings.siteNameAr,
    tagline: settings.tagline,
    taglineAr: settings.taglineAr,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    facebook: settings.facebook,
    instagram: settings.instagram,
    twitter: settings.twitter,
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFormData({
      siteName: settings.siteName,
      siteNameAr: settings.siteNameAr,
      tagline: settings.tagline,
      taglineAr: settings.taglineAr,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      facebook: settings.facebook,
      instagram: settings.instagram,
      twitter: settings.twitter,
    })
  }, [settings])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSaveChanges = async () => {
    setIsLoading(true)
    try {
      updateSettings(formData)
      toast({
        title: language === "ar" ? "تم الحفظ" : "Saved",
        description: language === "ar" ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully",
      })
    } catch (error) {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل حفظ التغييرات" : "Failed to save changes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`p-8 ${isRTL ? "text-right" : ""}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("settings")}</h1>
        <p className="text-muted-foreground">{t("manageSettings")}</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t("generalSettings")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">{t("siteName")}</Label>
                <Input
                  id="siteName"
                  value={formData.siteName}
                  onChange={handleInputChange}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteNameAr">{t("siteNameAr")}</Label>
                <Input id="siteNameAr" value={formData.siteNameAr} onChange={handleInputChange} dir="rtl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">{t("tagline")}</Label>
              <Input id="tagline" value={formData.tagline} onChange={handleInputChange} dir={isRTL ? "rtl" : "ltr"} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taglineAr">{t("taglineAr")}</Label>
              <Input id="taglineAr" value={formData.taglineAr} onChange={handleInputChange} dir="rtl" />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t("contactInformation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phoneNumber")}</Label>
                <Input id="phone" value={formData.phone} onChange={handleInputChange} dir={isRTL ? "rtl" : "ltr"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("emailAddress")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t("address")}</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>{t("socialMedia")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">{t("facebookUrl")}</Label>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/hartna"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">{t("instagramUrl")}</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/hartna"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">{t("twitterUrl")}</Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/hartna"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
          </CardContent>
        </Card>

        <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <Button onClick={handleSaveChanges} disabled={isLoading}>
            {isLoading ? (language === "ar" ? "جاري الحفظ..." : "Saving...") : t("saveChanges")}
          </Button>
        </div>
      </div>
    </div>
  )
}
