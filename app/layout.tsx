import type React from "react"
import type { Metadata } from "next"
import { LanguageProvider } from "@/lib/language-context"
import { DataProvider } from "@/lib/data-context"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/lib/theme-context"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Hartna Company",
  description: "Your trusted partner for premium espresso and coffee machines, accessories, and spare parts.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Suspense fallback={null}>
          <ThemeProvider>
            <LanguageProvider>
              <DataProvider>
                <CartProvider>{children}</CartProvider>
              </DataProvider>
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
