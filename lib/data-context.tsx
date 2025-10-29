"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import {
  products as initialProducts,
  categories as initialCategories,
  heroSlides as initialHeroSlides,
} from "./mock-data"
import type { Product, Category } from "./mock-data"

export interface HeroSlide {
  id: string
  title: string
  titleAr: string
  subtitle: string
  subtitleAr: string
  image: string
  cta: string
  ctaAr: string
  link?: string
}

export interface SiteSettings {
  siteName: string
  siteNameAr: string
  tagline: string
  taglineAr: string
  phone: string
  email: string
  address: string
  facebook: string
  instagram: string
  twitter: string
}

interface DataContextType {
  // Products
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined

  // Categories
  categories: Category[]
  addCategory: (category: Category) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  addSubcategory: (categoryId: string, subcategory: { id: string; name: string; nameAr: string }) => void
  updateSubcategory: (categoryId: string, subcategoryId: string, subcategory: { name: string; nameAr: string }) => void
  deleteSubcategory: (categoryId: string, subcategoryId: string) => void

  // Hero Slides
  heroSlides: HeroSlide[]
  addHeroSlide: (slide: HeroSlide) => void
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void
  deleteHeroSlide: (id: string) => void

  // Settings
  settings: SiteSettings
  updateSettings: (settings: Partial<SiteSettings>) => void
  resetSettings: () => void
}

const defaultSettings: SiteSettings = {
  siteName: "HARTNA COMPANY",
  siteNameAr: "شركة هارتنا",
  tagline: "Premium Espresso & Coffee Machines",
  taglineAr: "آلات إسبريسو وقهوة فاخرة",
  phone: "00963412554899",
  email: "hartna111@gmail.com",
  address: "Syria - Lattakia, Port Said Street",
  facebook: "",
  instagram: "",
  twitter: "",
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initialHeroSlides)
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)

  // Load from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("hartna_products")
    const savedCategories = localStorage.getItem("hartna_categories")
    const savedHeroSlides = localStorage.getItem("hartna_hero_slides")
    const savedSettings = localStorage.getItem("hartna_settings")

    if (savedProducts) setProducts(JSON.parse(savedProducts))
    if (savedCategories) setCategories(JSON.parse(savedCategories))
    if (savedHeroSlides) setHeroSlides(JSON.parse(savedHeroSlides))
    if (savedSettings) setSettings(JSON.parse(savedSettings))
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("hartna_products", JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem("hartna_categories", JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem("hartna_hero_slides", JSON.stringify(heroSlides))
  }, [heroSlides])

  useEffect(() => {
    localStorage.setItem("hartna_settings", JSON.stringify(settings))
  }, [settings])

  // Product functions
  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product])
  }

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id)
  }

  // Category functions
  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category])
  }

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedCategory } : c)))
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const addSubcategory = (categoryId: string, subcategory: { id: string; name: string; nameAr: string }) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, subcategories: [...(c.subcategories || []), subcategory] } : c)),
    )
  }

  const updateSubcategory = (
    categoryId: string,
    subcategoryId: string,
    subcategory: { name: string; nameAr: string },
  ) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              subcategories: c.subcategories?.map((s) => (s.id === subcategoryId ? { ...s, ...subcategory } : s)),
            }
          : c,
      ),
    )
  }

  const deleteSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, subcategories: c.subcategories?.filter((s) => s.id !== subcategoryId) } : c,
      ),
    )
  }

  // Hero Slide functions
  const addHeroSlide = (slide: HeroSlide) => {
    setHeroSlides((prev) => [...prev, slide])
  }

  const updateHeroSlide = (id: string, updatedSlide: Partial<HeroSlide>) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedSlide } : s)))
  }

  const deleteHeroSlide = (id: string) => {
    setHeroSlides((prev) => prev.filter((s) => s.id !== id))
  }

  // Settings functions
  const updateSettings = (updatedSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updatedSettings }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <DataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubcategory,
        updateSubcategory,
        deleteSubcategory,
        heroSlides,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        settings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
