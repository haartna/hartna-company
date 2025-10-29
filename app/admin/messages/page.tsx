"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Mail, Trash2 } from "lucide-react"

interface Message {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  timestamp: string
}

export default function AdminMessagesPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error("[v0] Error fetching messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id))
  }

  return (
    <div className={`p-8 ${isRTL ? "text-right" : ""}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{language === "ar" ? "الرسائل" : "Messages"}</h1>
        <p className="text-muted-foreground">
          {language === "ar" ? "إدارة الرسائل المستلمة من الزوار" : "Manage messages received from visitors"}
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
          </CardContent>
        </Card>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {language === "ar" ? "لا توجد رسائل حتى الآن" : "No messages yet"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardHeader className={`flex flex-row items-start justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <CardTitle className="text-lg">
                    {message.firstName} {message.lastName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteMessage(message.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className={isRTL ? "text-right" : ""}>
                <div className="mb-4">
                  <p className="font-semibold mb-2">{message.subject}</p>
                  <p className="text-muted-foreground whitespace-pre-wrap">{message.message}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(message.timestamp).toLocaleString(language === "ar" ? "ar-SA" : "en-US")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
