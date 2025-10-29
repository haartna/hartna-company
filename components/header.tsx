"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button-simple"
import { useData } from "@/lib/data-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CartSheet } from "@/components/cart-sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/lib/language-context"

const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H7m6-4h.01M9 20h6"
    />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { categories } = useData()

  const isRTL = language === "ar"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <Image src="/logo.jpg" alt="Hartna Logo" width={110} height={110} className="shrink-0" />
            <div className="text-3xl font-bold text-primary whitespace-nowrap">
              {language === "en" ? "Hartna Company" : "شركة حارتنا"}
            </div>
          </Link>

          {/* Desktop Navigation - Using independent DropdownMenu components */}
          <nav className={`hidden lg:flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Home Link */}
            <Link href="/">
              <Button variant="ghost" className="text-base">
                {t("home")}
              </Button>
            </Link>

            {/* Coffee Machines Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base">
                  {t("coffeeMachines")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/products/coffee-machines" className="cursor-pointer font-semibold">
                    {t("allCoffeeMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/coffee-machines/professional-espresso" className="cursor-pointer">
                    {t("professionalEspresso")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/coffee-machines/vending-machines" className="cursor-pointer">
                    {t("vendingMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/coffee-machines/home-office" className="cursor-pointer">
                    {t("homeOfficeMachines")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Slush Machines Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base">
                  {t("slushMachines")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/products/slush-machines" className="cursor-pointer font-semibold">
                    {t("allSlushMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/slush-machines/elmec" className="cursor-pointer">
                    {t("elmec")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/slush-machines/spm" className="cursor-pointer">
                    {t("spm")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Coffee Grinder Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base">
                  {t("coffeeGrinder")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/products/coffee-grinder" className="cursor-pointer font-semibold">
                    {t("allCoffeeGrinders")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/coffee-grinder/espresso" className="cursor-pointer">
                    {t("espressoCoffeeGrinder")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/coffee-grinder/fine" className="cursor-pointer">
                    {t("fineCoffeeGrinder")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Others Machines Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base">
                  {t("othersMachines")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/products/others-machines" className="cursor-pointer font-semibold">
                    {t("allOthersMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/others-machines/blenders" className="cursor-pointer">
                    {t("blendersMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/others-machines/cooling" className="cursor-pointer">
                    {t("coolingMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/others-machines/others" className="cursor-pointer">
                    {t("othersMachinesCategory")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Spare Parts Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base">
                  {t("spareParts")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/products/spare-parts" className="cursor-pointer font-semibold">
                    {t("allSpareParts")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/spare-parts/coffee-machines" className="cursor-pointer">
                    {t("sparePartsCoffeeMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/spare-parts/slush-machines" className="cursor-pointer">
                    {t("sparePartsSlushMachines")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/spare-parts/coffee-grinder" className="cursor-pointer">
                    {t("sparePartsCoffeeGrinder")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About Us Link */}
            <Link href="/about">
              <Button variant="ghost" className="text-base">
                {t("aboutUs")}
              </Button>
            </Link>

            {/* Contact Link */}
            <Link href="/contact">
              <Button variant="ghost" className="text-base">
                {t("contact")}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </Button>
        </div>

        {/* Bottom Bar */}
        <div
          className={`hidden lg:flex items-center justify-center gap-3 py-3 border-t ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <ThemeToggle />
          <CartSheet />

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <GlobeIcon />
                <span className="text-sm">{language === "en" ? "English" : "العربية"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Admin Link */}
          <Link href="/admin">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ShieldIcon />
              <span className="text-sm">{t("admin")}</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className={`flex flex-col gap-4 ${isRTL ? "flex-col-reverse" : ""}`}>
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("home")}
              </Link>

              <div className="flex flex-col gap-2 pl-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("coffeeMachines")}</div>
                <Link
                  href="/products/coffee-machines"
                  className="text-sm hover:text-primary font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("allCoffeeMachines")}
                </Link>
                <Link
                  href="/products/coffee-machines/professional-espresso"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("professionalEspresso")}
                </Link>
                <Link
                  href="/products/coffee-machines/vending-machines"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("vendingMachines")}
                </Link>
                <Link
                  href="/products/coffee-machines/home-office"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("homeOfficeMachines")}
                </Link>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("slushMachines")}</div>
                <Link
                  href="/products/slush-machines"
                  className="text-sm hover:text-primary font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("allSlushMachines")}
                </Link>
                <Link
                  href="/products/slush-machines/elmec"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("elmec")}
                </Link>
                <Link
                  href="/products/slush-machines/spm"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("spm")}
                </Link>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("coffeeGrinder")}</div>
                <Link
                  href="/products/coffee-grinder"
                  className="text-sm hover:text-primary font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("allCoffeeGrinders")}
                </Link>
                <Link
                  href="/products/coffee-grinder/espresso"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("espressoCoffeeGrinder")}
                </Link>
                <Link
                  href="/products/coffee-grinder/fine"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("fineCoffeeGrinder")}
                </Link>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("othersMachines")}</div>
                <Link
                  href="/products/others-machines"
                  className="text-sm hover:text-primary font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("allOthersMachines")}
                </Link>
                <Link
                  href="/products/others-machines/blenders"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("blendersMachines")}
                </Link>
                <Link
                  href="/products/others-machines/cooling"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("coolingMachines")}
                </Link>
                <Link
                  href="/products/others-machines/others"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("othersMachinesCategory")}
                </Link>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("spareParts")}</div>
                <Link
                  href="/products/spare-parts"
                  className="text-sm hover:text-primary font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("allSpareParts")}
                </Link>
                <Link
                  href="/products/spare-parts/coffee-machines"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("sparePartsCoffeeMachines")}
                </Link>
                <Link
                  href="/products/spare-parts/slush-machines"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("sparePartsSlushMachines")}
                </Link>
                <Link
                  href="/products/spare-parts/coffee-grinder"
                  className="text-sm hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("sparePartsCoffeeGrinder")}
                </Link>
              </div>

              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("aboutUs")}
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contact")}
              </Link>

              <div className={`flex items-center gap-3 pt-4 border-t ${isRTL ? "flex-row-reverse" : ""}`}>
                <ThemeToggle />
                <CartSheet />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <GlobeIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    {t("admin")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
