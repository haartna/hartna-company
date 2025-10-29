"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { language, t, toArabicNumerals } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: language === "ar" ? "تم الإرسال" : "Message Sent",
          description: language === "ar" ? "شكراً لك! سنرد عليك قريباً" : "Thank you! We'll get back to you soon.",
        })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        toast({
          title: language === "ar" ? "خطأ" : "Error",
          description: language === "ar" ? "فشل إرسال الرسالة" : "Failed to send message",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "حدث خطأ أثناء الإرسال" : "An error occurred while sending",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("contactTitle")}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("contactSubtitle")}</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("sendMessage")}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        {t("firstName")}
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        {t("lastName")}
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t("phone")}
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      {t("subject")}
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t("message")}
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (language === "ar" ? "جاري الإرسال..." : "Sending...") : t("send")}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t("getInTouch")}</h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {language === "en"
                      ? "Whether you have a question about our products, need technical support, or just want to say hello, our team is ready to answer all your questions."
                      : "سواء كان لديك سؤال حول منتجاتنا، أو تحتاج إلى دعم فني، أو تريد فقط أن تقول مرحباً، فريقنا جاهز للإجابة على جميع أسئلتك."}
                  </p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{language === "en" ? "Phone" : "الهاتف"}</h3>
                        <p className="text-sm text-muted-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
                          {language === "en" ? "Phone: 00963412554899" : "هاتف: ٠٠٩٦٣٤١٢٥٥٤٨٩٩"}
                        </p>
                        <p className="text-sm text-muted-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
                          {language === "en" ? "Mobile: 00963992766200" : "موبايل: ٠٠٩٦٣٩٩٢٧٦٦٢٠٠"}
                        </p>
                        <p className="text-sm text-muted-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
                          {language === "en" ? "Fax: 00963412550699" : "فاكس: ٠٠٩٦٣٤١٢٥٥٠٦٩٩"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{language === "en" ? "Email" : "البريد الإلكتروني"}</h3>
                        <p className="text-sm text-muted-foreground">info@hartna-co.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{language === "en" ? "Address" : "العنوان"}</h3>
                        <p className="text-sm text-muted-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
                          {language === "en"
                            ? "Syria - Lattakia - Salibah, Port Said Street"
                            : "سوريا - اللاذقية - الصليبة شارع بور سعيد"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{t("businessHours")}</h3>
                        <p className="text-sm text-muted-foreground">
                          {language === "en"
                            ? "Monday - Friday: 9:00 AM - 6:00 PM"
                            : "الإثنين - الجمعة: ٩:٠٠ ص - ٦:٠٠ م"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Saturday: 10:00 AM - 4:00 PM" : "السبت: ١٠:٠٠ ص - ٤:٠٠ م"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Sunday: Closed" : "الأحد: مغلق"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
