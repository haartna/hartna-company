"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface ContactPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactPopup({ open, onOpenChange }: ContactPopupProps) {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  const contactNumber = "+963992766200"
  const phoneNumberFormatted = "00963992766200"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md ${isRTL ? "text-right" : "text-left"}`}>
        <DialogHeader>
          <DialogTitle className={isRTL ? "text-right" : "text-left"}>{t("contactUs")}</DialogTitle>
        </DialogHeader>
        <div className={`flex flex-col gap-4 py-4 ${isRTL ? "flex-col-reverse" : ""}`}>
          <p className="text-sm text-muted-foreground">
            {language === "en"
              ? "We don't offer online purchases. Please contact us directly to place your order."
              : "نحن لا نقدم عمليات شراء عبر الإنترنت. يرجى التواصل معنا مباشرة لتقديم طلبك."}
          </p>

          <div className="space-y-3">
            {/* Phone Button */}
            <a href={`tel:${phoneNumberFormatted}`}>
              <Button className="w-full gap-2" size="lg">
                <Phone className="h-5 w-5" />
                <span dir="ltr">{contactNumber}</span>
              </Button>
            </a>

            {/* WhatsApp Button */}
            <a href={`https://wa.me/${contactNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-transparent" size="lg" variant="outline">
                <MessageCircle className="h-5 w-5" />
                <span>{t("whatsapp")}</span>
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
