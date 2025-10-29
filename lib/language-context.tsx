"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  toArabicNumerals: (num: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
      document.documentElement.lang = savedLanguage
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  const toArabicNumerals = (num: string) => {
    if (language !== "ar") return num
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
    return num.replace(/\d/g, (digit) => arabicNumerals[Number.parseInt(digit)])
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toArabicNumerals }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    coffeeMachines: "Coffee Machines",
    accessories: "Accessories",
    aboutUs: "About Us",
    contact: "Contact",
    admin: "Admin",
    slushMachines: "Slush Machines",
    coffeeGrinder: "Coffee Grinder",
    othersMachines: "Others Machines",
    spareParts: "Spare Parts",

    // Coffee Machines subcategories
    professionalEspresso: "Professional Espresso Machines",
    vendingMachines: "Vending Machines",
    homeOfficeMachines: "Home-Office Machines",

    // Slush Machines subcategories
    elmec: "ELMEC",
    spm: "SPM",

    // Coffee Grinder subcategories
    espressoCoffeeGrinder: "Espresso Coffee Grinder",
    fineCoffeeGrinder: "Fine Coffee Grinder",

    // Others Machines subcategories
    blendersMachines: "Blenders Machines",
    coolingMachines: "Cooling Machines",
    othersMachinesCategory: "Others Machines",

    // Spare Parts subcategories
    sparePartsCoffeeMachines: "Spare Parts Coffee Machines",
    sparePartsSlushMachines: "Spare Parts Slush Machines",
    sparePartsCoffeeGrinder: "Spare Parts Coffee Grinder",

    // Hero
    shopNow: "Shop Now",
    explore: "Explore",
    discover: "Discover",

    // Features
    premiumQuality: "Premium Quality",
    premiumQualityDesc: "Top-tier machines from leading brands",
    expertSelection: "Expert Selection",
    expertSelectionDesc: "Carefully curated for excellence",
    support247: "24/7 Support",
    support247Desc: "Always here to help you",
    fastDelivery: "Fast Delivery",
    fastDeliveryDesc: "Quick and reliable shipping",

    // Products
    featuredProducts: "Featured Products",
    featuredProductsDesc: "Discover our handpicked selection of premium coffee machines and accessories",
    viewAllProducts: "View All Products",
    viewDetails: "View Details",
    allMachines: "All Machines",
    allAccessories: "All Accessories",
    browseCollection: "Browse our complete collection",
    completeSetup: "Complete your setup",
    coffeeMachinesDesc: "Explore our premium collection of professional espresso and coffee machines",
    accessoriesDesc: "Complete your coffee setup with our range of premium accessories and spare parts",
    noProducts: "No products found",

    // CTA
    readyToElevate: "Ready to Elevate Your Coffee Experience?",
    readyToElevateDesc: "Explore our complete range of professional coffee machines and accessories",
    shopMachines: "Shop Machines",
    contactUs: "Contact Us",

    // Footer
    footerTagline:
      "Hartna Company - Your trusted partner for premium espresso and coffee machines. Quality, reliability, and excellence in every cup.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Us",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    phone: "Phone: 00963412554899",
    mobile: "Mobile: 00963992766200",
    fax: "Fax: 00963412550699",
    addressFooter: "Syria - Lattakia - Salibah, Port Said Street",
    // About Page
    aboutTitle: "About Hartna Company",
    aboutSubtitle:
      "Your trusted partner in premium espresso and coffee machine solutions. We bring excellence, quality, and passion to every cup.",
    ourStory: "Our Story",
    ourValues: "Our Values",
    qualityFirst: "Quality First",
    qualityFirstDesc: "We never compromise on the quality of our products",
    customerFocus: "Customer Focus",
    customerFocusDesc: "Your satisfaction is our top priority",
    excellence: "Excellence",
    excellenceDesc: "Striving for perfection in everything we do",
    passion: "Passion",
    passionDesc: "Driven by our love for great coffee",
    whyChoose: "Why Choose Hartna Company?",
    aboutStory1:
      "Founded with a passion for exceptional coffee, Hartna has been serving coffee enthusiasts and businesses for over a decade.",
    aboutStory2:
      "Our mission is to make professional-grade espresso machines accessible to everyone who appreciates quality coffee.",
    aboutStory3:
      "From home baristas to commercial cafes, we provide high-quality machines and support for every coffee lover.",
    aboutWhy1: "With years of experience, our experts help you find the perfect equipment for your needs.",
    aboutWhy2: "We provide full support and maintenance — when you choose Hartna, you gain a coffee partner.",

    // Contact Page
    contactTitle: "Contact Us",
    contactSubtitle:
      "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    sendMessage: "Send us a Message",
    getInTouch: "Get in Touch",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    businessHours: "Business Hours",

    // Product Details
    addToCart: "Add to Cart",
    freeShipping: "Free Shipping",
    freeShippingDesc: "On orders over $100",
    warranty: "1 Year Warranty",
    warrantyDesc: "Full coverage",
    productDetails: "Product Details",
    category: "Category",
    type: "Type",
    sku: "SKU",
    availability: "Availability",
    inStock: "In Stock",
    relatedProducts: "Related Products",
    backTo: "Back to",
    shoppingCart: "Shopping Cart",
    productOrigin: "Product Origin",

    // Admin
    dashboard: "Dashboard",
    products: "Products",
    categories: "Categories",
    heroSlider: "Hero Slider",
    settings: "Settings",
    backToWebsite: "Back to Website",
    welcomeAdmin: "Welcome to Hartna Company Admin Panel",
    totalProducts: "Total Products",
    activeProducts: "Active products in catalog",
    productCategories: "Product categories",
    activeSlides: "Active hero slides",
    catalogValue: "Catalog Value",
    totalInventory: "Total inventory value",
    recentProducts: "Recent Products",
    manageProducts: "Manage your product catalog",
    addProduct: "Add Product",
    searchProducts: "Search products...",
    image: "Image",
    name: "Name",
    price: "Price",
    status: "Status",
    actions: "Actions",
    featured: "Featured",
    standard: "Standard",

    // Admin - Additional translations
    manageCategories: "Manage product categories and subcategories",
    addCategory: "Add Category",
    addSubcategory: "Add Subcategory",
    subcategories: "Subcategories",
    manageHeroSlider: "Manage homepage hero slider content",
    addSlide: "Add Slide",
    slide: "Slide",
    cta: "CTA",
    manageSettings: "Manage your website settings and configuration",
    generalSettings: "General Settings",
    siteName: "Site Name (English)",
    siteNameAr: "Site Name (Arabic)",
    tagline: "Tagline (English)",
    taglineAr: "Tagline (Arabic)",
    contactInformation: "Contact Information",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    address: "Address",
    socialMedia: "Social Media",
    facebookUrl: "Facebook URL",
    instagramUrl: "Instagram URL",
    twitterUrl: "Twitter URL",
    saveChanges: "Save Changes",
    resetToDefaults: "Reset to Defaults",
    areYouSure: "Are you sure you want to delete this product?",
    edit: "Edit",
    delete: "Delete",
    allCoffeeMachines: "All Coffee Machines",
    allSlushMachines: "All Slush Machines",
    allCoffeeGrinders: "All Coffee Grinders",
    allOthersMachines: "All Others Machines",
    allSpareParts: "All Spare Parts",
    send: "Send",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    coffeeMachines: "آلات القهوة",
    accessories: "الإكسسوارات",
    aboutUs: "من نحن",
    contact: "اتصل بنا",
    admin: "الإدارة",
    slushMachines: "آلات السلاش",
    coffeeGrinder: "مطاحن القهوة",
    othersMachines: "آلات أخرى",
    spareParts: "قطع الغيار",

    // Coffee Machines subcategories
    professionalEspresso: "آلات إسبريسو احترافية",
    vendingMachines: "آلات البيع",
    homeOfficeMachines: "آلات المنزل والمكتب",

    // Slush Machines subcategories
    elmec: "إلميك",
    spm: "إس بي إم",

    // Coffee Grinder subcategories
    espressoCoffeeGrinder: "مطحنة قهوة إسبريسو",
    fineCoffeeGrinder: "مطحنة قهوة ناعمة",

    // Others Machines subcategories
    blendersMachines: "آلات الخلاط",
    coolingMachines: "آلات التبريد",
    othersMachinesCategory: "آلات أخرى",

    // Spare Parts subcategories
    sparePartsCoffeeMachines: "قطع غيار آلات القهوة",
    sparePartsSlushMachines: "قطع غيار آلات السلاش",
    sparePartsCoffeeGrinder: "قطع غيار مطاحن القهوة",

    // Hero
    shopNow: "تسوق الآن",
    explore: "استكشف",
    discover: "اكتشف",

    // Features
    premiumQuality: "جودة فاخرة",
    premiumQualityDesc: "آلات من الدرجة الأولى من العلامات التجارية الرائدة",
    expertSelection: "اختيار خبراء",
    expertSelectionDesc: "منتقاة بعناية للتميز",
    support247: "دعم على مدار الساعة",
    support247Desc: "دائماً هنا لمساعدتك",
    fastDelivery: "توصيل سريع",
    fastDeliveryDesc: "شحن سريع وموثوق",

    // Products
    featuredProducts: "منتجات مميزة",
    featuredProductsDesc: "اكتشف مجموعتنا المختارة من آلات القهوة والإكسسوارات الفاخرة",
    viewAllProducts: "عرض جميع المنتجات",
    viewDetails: "عرض التفاصيل",
    allMachines: "جميع الآلات",
    allAccessories: "جميع الإكسسوارات",
    browseCollection: "تصفح مجموعتنا الكاملة",
    completeSetup: "أكمل إعدادك",
    coffeeMachinesDesc: "استكشف مجموعتنا الفاخرة من آلات الإسبريسو والقهوة الاحترافية",
    accessoriesDesc: "أكمل إعداد القهوة الخاص بك مع مجموعتنا من الإكسسوارات وقطع الغيار الفاخرة",
    noProducts: "لم يتم العثور على منتجات",

    // CTA
    readyToElevate: "هل أنت مستعد لتحسين تجربة القهوة الخاصة بك؟",
    readyToElevateDesc: "استكشف مجموعتنا الكاملة من آلات القهوة والإكسسوارات الاحترافية",
    shopMachines: "تسوق الآلات",
    contactUs: "اتصل بنا",

    // Footer
    footerTagline: "شركة حارتنا - شريكك الموثوق لآلات الإسبريسو والقهوة الفاخرة. الجودة والموثوقية والتميز في كل كوب.",
    quickLinks: "روابط سريعة",
    contactInfo: "اتصل بنا",
    followUs: "تابعنا",
    allRightsReserved: "جميع الحقوق محفوظة.",
    phone: "هاتف: ٠٠٩٦٣٤١٢٥٥٤٨٩٩",
    mobile: "موبايل: ٠٠٩٦٣٩٩٢٧٦٦٢٠٠",
    fax: "فاكس: ٠٠٩٦٣٤١٢٥٥٠٦٩٩",
    addressFooter: "سوريا - اللاذقية - الصليبة شارع بور سعيد",

    // About Page
    aboutTitle: "عن شركة حارتنا",
    aboutSubtitle: "شريكك الموثوق في حلول آلات الإسبريسو والقهوة الفاخرة. نقدم التميز والجودة والشغف في كل كوب.",
    ourStory: "قصتنا",
    ourValues: "قيمنا",
    qualityFirst: "الجودة أولاً",
    qualityFirstDesc: "لا نتنازل أبداً عن جودة منتجاتنا",
    customerFocus: "التركيز على العملاء",
    customerFocusDesc: "رضاك هو أولويتنا القصوى",
    excellence: "التميز",
    excellenceDesc: "نسعى للكمال في كل ما نقوم به",
    passion: "الشغف",
    passionDesc: "مدفوعون بحبنا للقهوة الرائعة",
    whyChoose: "لماذا تختار شركة حارتنا؟",
    aboutStory1: "تأسست بشغف القهوة المميزة، وقد خدمت حارتنا عشاق القهوة والشركات لأكثر من عقد من الزمان.",
    aboutStory2: "مهمتنا هي جعل آلات الإسبريسو الاحترافية في متناول كل من يقدر القهوة الجيدة.",
    aboutStory3: "من محبي القهوة في المنزل إلى المقاهي التجارية، نقدم آلات عالية الجودة ودعم مستمر للجميع.",
    aboutWhy1: "بخبرة سنوات، يساعدك خبراؤنا في العثور على الجهاز المثالي لاحتياجاتك.",
    aboutWhy2: "نقدم دعمًا وصيانة متكاملة — عند اختيارك حارتنا، فإنك تكسب شريكًا في رحلتك مع القهوة.",

    // Contact Page
    contactTitle: "اتصل بنا",
    contactSubtitle: "هل لديك أسئلة؟ نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
    sendMessage: "أرسل لنا رسالة",
    getInTouch: "تواصل معنا",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    businessHours: "ساعات العمل",

    // Product Details
    addToCart: "أضف إلى السلة",
    freeShipping: "يوجد شحن",
    freeShippingDesc: "للطلبات فوق 100 دولار",
    warranty: "ضمان سنة واحدة",
    warrantyDesc: "تغطية كاملة",
    productDetails: "تفاصيل المنتج",
    category: "الفئة",
    type: "النوع",
    sku: "رمز المنتج",
    availability: "التوفر",
    inStock: "متوفر",
    relatedProducts: "منتجات ذات صلة",
    backTo: "العودة إلى",
    shoppingCart: "عربة التسوق",
    productOrigin: "بلد المنشأ",

    // Admin
    dashboard: "لوحة التحكم",
    products: "المنتجات",
    categories: "الفئات",
    heroSlider: "شريط البطل",
    settings: "الإعدادات",
    backToWebsite: "العودة إلى الموقع",
    welcomeAdmin: "مرحباً بك في لوحة إدارة شركة حارتنا",
    totalProducts: "إجمالي المنتجات",
    activeProducts: "المنتجات النشطة في الكتالوج",
    productCategories: "فئات المنتجات",
    activeSlides: "الشرائح النشطة",
    catalogValue: "قيمة الكتالوج",
    totalInventory: "إجمالي قيمة المخزون",
    recentProducts: "المنتجات الأخيرة",
    manageProducts: "إدارة كتالوج المنتجات",
    addProduct: "إضافة منتج",
    searchProducts: "البحث عن المنتجات...",

    // Admin - Additional translations
    manageCategories: "إدارة فئات المنتجات والفئات الفرعية",
    addCategory: "إضافة فئة",
    addSubcategory: "إضافة فئة فرعية",
    subcategories: "الفئات الفرعية",
    manageHeroSlider: "إدارة محتوى شريط البطل الرئيسي",
    addSlide: "إضافة شريحة",
    slide: "شريحة",
    cta: "دعوة للعمل",
    manageSettings: "إدارة إعدادات الموقع والتكوين",
    generalSettings: "الإعدادات العامة",
    siteName: "اسم الموقع (الإنجليزية)",
    siteNameAr: "اسم الموقع (العربية)",
    tagline: "الشعار (الإنجليزية)",
    taglineAr: "الشعار (العربية)",
    contactInformation: "معلومات الاتصال",
    phoneNumber: "رقم الهاتف",
    emailAddress: "عنوان البريد الإلكتروني",
    address: "العنوان",
    socialMedia: "وسائل التواصل الاجتماعي",
    facebookUrl: "رابط فيسبوك",
    instagramUrl: "رابط إنستجرام",
    twitterUrl: "رابط تويتر",
    saveChanges: "حفظ التغييرات",
    resetToDefaults: "إعادة تعيين إلى الافتراضي",
    areYouSure: "هل أنت متأكد من رغبتك في حذف هذا المنتج؟",
    edit: "تعديل",
    delete: "حذف",
    allCoffeeMachines: "جميع آلات القهوة",
    allSlushMachines: "جميع آلات السلاش",
    allCoffeeGrinders: "جميع مطاحن القهوة",
    allOthersMachines: "جميع الآلات الأخرى",
    allSpareParts: "جميع قطع الغيار",
    send: "إرسال",
    image: "الصورة",
    name: "الاسم",
    price: "السعر",
    status: "الحالة",
    actions: "الإجراءات",
    featured: "مميز",
    standard: "قياسي",
  },
}
