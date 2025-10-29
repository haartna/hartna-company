// Mock data for products and categories
export interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  image: string
  category: string
  subcategory?: string
  featured?: boolean
  productOrigin?: string
  productOriginAr?: string
}

export interface Category {
  id: string
  name: string
  nameAr: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  nameAr: string
}

export const categories: Category[] = [
  {
    id: "coffee-machines",
    name: "Coffee Machines",
    nameAr: "آلات القهوة",
    subcategories: [
      { id: "professional-espresso", name: "Professional Espresso Machines", nameAr: "آلات إسبريسو احترافية" },
      { id: "vending-machines", name: "Vending Machines", nameAr: "آلات البيع" },
      { id: "home-office", name: "Home-Office Machines", nameAr: "آلات المنزل والمكتب" },
    ],
  },
  {
    id: "slush-machines",
    name: "Slush Machines",
    nameAr: "آلات السلاش",
    subcategories: [
      { id: "elmec", name: "ELMEC", nameAr: "إلميكو" },
      { id: "spm", name: "SPM", nameAr: "إس بي إم" },
    ],
  },
  {
    id: "coffee-grinder",
    name: "Coffee Grinder",
    nameAr: "مطاحن القهوة",
    subcategories: [
      { id: "espresso", name: "Espresso Coffee Grinder", nameAr: "مطحنة قهوة إسبريسو" },
      { id: "fine", name: "Fine Coffee Grinder", nameAr: "مطحنة قهوة ناعمة" },
    ],
  },
  {
    id: "others-machines",
    name: "Others Machines",
    nameAr: "آلات أخرى",
    subcategories: [
      { id: "blenders", name: "Blenders Machines", nameAr: "آلات الخلاط" },
      { id: "cooling", name: "Cooling Machines", nameAr: "آلات التبريد" },
      { id: "others", name: "Others Machines", nameAr: "آلات أخرى" },
    ],
  },
  {
    id: "spare-parts",
    name: "Spare Parts",
    nameAr: "قطع الغيار",
    subcategories: [
      { id: "coffee-machines", name: "Spare Parts Coffee Machines", nameAr: "قطع غيار آلات القهوة" },
      { id: "slush-machines", name: "Spare Parts Slush Machines", nameAr: "قطع غيار آلات السلاش" },
      { id: "coffee-grinder", name: "Spare Parts Coffee Grinder", nameAr: "قطع غيار مطاحن القهوة" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    nameAr: "الإكسسوارات",
    subcategories: [
      { id: "grinders", name: "Grinders", nameAr: "مطاحن" },
      { id: "filters", name: "Filters", nameAr: "فلاتر" },
      { id: "cups", name: "Cups & Mugs", nameAr: "أكواب وفناجين" },
      { id: "cleaning", name: "Cleaning Supplies", nameAr: "مستلزمات التنظيف" },
    ],
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Professional Espresso Machine Pro X1",
    nameAr: "آلة إسبريسو احترافية برو X1",
    description: "High-end professional espresso machine with dual boiler system",
    descriptionAr: "آلة إسبريسو احترافية عالية الجودة مع نظام غلاية مزدوجة",
    price: 2999,
    image: "/professional-espresso-machine.jpg",
    category: "coffee-machines",
    subcategory: "professional-espresso",
    featured: true,
    productOrigin: "Italy",
    productOriginAr: "إيطاليا",
  },
  {
    id: "2",
    name: "Automatic Coffee Maker Elite",
    nameAr: "صانعة قهوة أوتوماتيكية إيليت",
    description: "Fully automatic coffee machine with built-in grinder",
    descriptionAr: "آلة قهوة أوتوماتيكية بالكامل مع مطحنة مدمجة",
    price: 1899,
    image: "/automatic-coffee-maker.jpg",
    category: "coffee-machines",
    subcategory: "vending-machines",
    featured: true,
    productOrigin: "Germany",
    productOriginAr: "ألمانيا",
  },
  {
    id: "3",
    name: "Commercial Espresso Station",
    nameAr: "محطة إسبريسو تجارية",
    description: "Heavy-duty commercial espresso machine for cafes",
    descriptionAr: "آلة إسبريسو تجارية للاستخدام المكثف في المقاهي",
    price: 4599,
    image: "/commercial-espresso-machine.jpg",
    category: "coffee-machines",
    subcategory: "home-office",
    featured: true,
    productOrigin: "Switzerland",
    productOriginAr: "سويسرا",
  },
  {
    id: "7",
    name: "ELMEC Slush Machine BIG BIZ ",
    nameAr: "آلة صنع سلاش إلميكو بيك بيز",
    description: "ELMEC professional slush machine with 2tanks(6Liter), dual motor (cooling and freezing), and environmentally friendly",
    descriptionAr: "آلة صنع سلاش الاحترافية مع خزانين (6 لترًا)، ومحرك مزدوج (تبريد وتجميد)، وصديقة للبيئة",
    price: 3499,
    image: "/ELMECO BIG BIZ.jpg",
    category: "slush-machines",
    subcategory: "elmec",
    featured: true,
    productOrigin: "Italian",
    productOriginAr: "ايطالية المنشأ",
  },
  {
    id: "15",
    name: "ELMEC Slush Machine FC3 ",
    nameAr: "آلة صنع سلاش إلميكو إف سي 3",
    description: "ELMEC professional slush machine with 3tanks(12Liter), dual motor (cooling and freezing), and environmentally friendly",
    descriptionAr: "آلة صنع سلاش الاحترافية مع ثلاث خزانات (12 لترًا)، ومحرك مزدوج (تبريد وتجميد)، وصديقة للبيئة",
    price: 3000,
    image: "/ELMECO FC3.jpg",
    category: "slush-machines",
    subcategory: "elmec",
    featured: true,
    productOrigin: "Italian",
    productOriginAr: "ايطالية المنشأ",
  },
  {
    id: "8",
    name: "SPM Slush Frosty Dream",
    nameAr: " آلة صنع سلاش إس بي إم فروستي دريم",
    description: "SPM professional slush machine with two tanks(12Liter), dual motor (cooling and freezing), and environmentally friendly",
    descriptionAr: "آلة صنع سلاش الاحترافية مع خزانين (12 لترًا)، ومحرك مزدوج (تبريد وتجميد)، وصديقة للبيئة",
    price: 2899,
    image: "/SPM Frosty Dream 2.jpg",
    category: "slush-machines",
    subcategory: "spm",
    featured: false,
    productOrigin: "Italian",
    productOriginAr: "ايطالية المنشأ",
  },
  {
    id: "9",
    name: "Espresso Grinder Pro",
    nameAr: "مطحنة إسبريسو برو",
    description: "Professional espresso grinder with precision burrs",
    descriptionAr: "مطحنة إسبريسو احترافية مع شفرات دقيقة",
    price: 599,
    image: "/CUNCILL BRASIL.png",
    category: "coffee-grinder",
    subcategory: "espresso",
    featured: false,
    productOrigin: "Espain",
    productOriginAr: "اسبانيا",
  },
  {
    id: "10",
    name: "Fine Coffee Grinder",
    nameAr: "مطحنة قهوة ناعمة",
    description: "Fine grind coffee grinder for Turkish coffee",
    descriptionAr: "مطحنة قهوة ناعمة للقهوة التركية",
    price: 399,
    image: "/vintage-coffee-grinder.png",
    category: "coffee-grinder",
    subcategory: "fine",
    featured: false,
    productOrigin: "Turkey",
    productOriginAr: "تركيا",
  },
  {
    id: "11",
    name: "Commercial Blender",
    nameAr: "خلاط تجاري",
    description: "Heavy-duty commercial blender for smoothies",
    descriptionAr: "خلاط تجاري للاستخدام المكثف للعصائر",
    price: 799,
    image: "/commercial-blender.jpg",
    category: "others-machines",
    subcategory: "blenders",
    featured: false,
    productOrigin: "USA",
    productOriginAr: "الولايات المتحدة",
  },
  {
    id: "12",
    name: "Cooling Machine",
    nameAr: "آلة تبريد",
    description: "Professional cooling machine for beverages",
    descriptionAr: "آلة تبريد احترافية للمشروبات",
    price: 1299,
    image: "/cooling-machine.jpg",
    category: "others-machines",
    subcategory: "cooling",
    featured: false,
    productOrigin: "Netherlands",
    productOriginAr: "هولندا",
  },
  {
    id: "13",
    name: "Coffee Machine Spare Parts Kit",
    nameAr: "طقم قطع غيار آلة القهوة",
    description: "Complete spare parts kit for coffee machines",
    descriptionAr: "طقم قطع غيار كامل لآلات القهوة",
    price: 199,
    image: "/spare-parts.jpg",
    category: "spare-parts",
    subcategory: "coffee-machines",
    featured: false,
    productOrigin: "Germany",
    productOriginAr: "ألمانيا",
  },
  {
    id: "14",
    name: "Slush Machine Parts",
    nameAr: "قطع غيار آلة السلاش",
    description: "Replacement parts for slush machines",
    descriptionAr: "قطع غيار بديلة لآلات السلاش",
    price: 149,
    image: "/machine-parts.jpg",
    category: "spare-parts",
    subcategory: "slush-machines",
    featured: false,
    productOrigin: "Spain",
    productOriginAr: "إسبانيا",
  },
  {
    id: "4",
    name: "Premium Coffee Grinder",
    nameAr: "مطحنة قهوة فاخرة",
    description: "Precision burr grinder with 40 grind settings",
    descriptionAr: "مطحنة دقيقة مع 40 إعداد طحن",
    price: 399,
    image: "/vintage-coffee-grinder.png",
    category: "accessories",
    subcategory: "grinders",
    featured: false,
    productOrigin: "Japan",
    productOriginAr: "اليابان",
  },
  {
    id: "5",
    name: "Water Filter System",
    nameAr: "نظام فلتر المياه",
    description: "Advanced water filtration for better coffee taste",
    descriptionAr: "نظام ترشيح مياه متقدم لطعم قهوة أفضل",
    price: 149,
    image: "/water-filter-kitchen.png",
    category: "accessories",
    subcategory: "filters",
    featured: false,
    productOrigin: "USA",
    productOriginAr: "الولايات المتحدة",
  },
  {
    id: "6",
    name: "Espresso Cup Set",
    nameAr: "طقم فناجين إسبريسو",
    description: "Premium porcelain espresso cups, set of 6",
    descriptionAr: "فناجين إسبريسو فاخرة من البورسلان، طقم من 6",
    price: 79,
    image: "/colorful-espresso-cups.png",
    category: "accessories",
    subcategory: "cups",
    featured: false,
    productOrigin: "Portugal",
    productOriginAr: "البرتغال",
  },
]

export const heroSlides = [
  {
    id: "1",
    title: "Premium Espresso Machines",
    titleAr: "آلات إسبريسو فاخرة",
    subtitle: "Crafted for perfection, designed for excellence",
    subtitleAr: "مصنوعة للكمال، مصممة للتميز",
    image: "/premium-espresso-machine-hero.jpg",
    cta: "Shop Now",
    ctaAr: "تسوق الآن",
  },
  {
    id: "2",
    title: "Professional Coffee Solutions",
    titleAr: "حلول قهوة احترافية",
    subtitle: "Elevate your coffee experience",
    subtitleAr: "ارتقِ بتجربة القهوة الخاصة بك",
    image: "/professional-coffee-machine.jpg",
    cta: "Explore",
    ctaAr: "استكشف",
  },
  {
    id: "3",
    title: "Complete Accessories Range",
    titleAr: "مجموعة إكسسوارات كاملة",
    subtitle: "Everything you need for the perfect brew",
    subtitleAr: "كل ما تحتاجه للتحضير المثالي",
    image: "/coffee-accessories.jpg",
    cta: "Discover",
    ctaAr: "اكتشف",
  },
]
