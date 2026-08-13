export type CategoryId =
  | "evening"
  | "casual"
  | "formal"
  | "occasions"
  | "summer"
  | "new";

export type Size = "S" | "M" | "L" | "XL";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  images: string[];
  description: string;
  fabric: string;
  details: string[];
  featured?: boolean;
  isNew?: boolean;
  colors: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "evening",
    name: "فساتين سهرة",
    description: "قطع لامعة للمساء والمناسبات الخاصة",
    image: "cat-evening.jpg",
  },
  {
    id: "casual",
    name: "فساتين كاجوال",
    description: "أناقة يومية ناعمة وسهلة الارتداء",
    image: "cat-casual.jpg",
  },
  {
    id: "formal",
    name: "فساتين رسمية",
    description: "قصات راقية للعمل والمناسبات الهادئة",
    image: "cat-formal.jpg",
  },
  {
    id: "occasions",
    name: "فساتين مناسبات",
    description: "تطريز وتول لإطلالة لا تُنسى",
    image: "cat-occasions.jpg",
  },
  {
    id: "summer",
    name: "مجموعة الصيف",
    description: "أقمشة خفيفة بألوان دافئة ومشرقة",
    image: "cat-summer.jpg",
  },
  {
    id: "new",
    name: "وصل حديثاً",
    description: "أحدث إضافات سميه لهذا الموسم",
    image: "cat-new.jpg",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "yasmin",
    name: "فستان ياسمين الأحمر",
    price: 1650,
    category: "evening",
    images: ["yasmin.jpg", "yasmin-2.jpg"],
    description:
      "فستان سهرة أحمر حريري بطول الأرضية وحركة انسيابية ساحرة. قصة أميرة ناعمة تليق بحفلات المساء.",
    fabric: "ساتان حريري لامع",
    details: ["طول كامل", "قَصّة أميرة", "ظهر أنيق برباط خفي", "يُنصح بالتنظيف الجاف"],
    featured: true,
    colors: ["أحمر قرمزي"],
  },
  {
    id: "lamar",
    name: "فستان لمار الخمري",
    price: 1580,
    category: "evening",
    images: ["lamar.jpg"],
    description:
      "فستان سهرة خمري بكتفين مكشوفين وتموجات ناعمة عند الصدر. إطلالة ملكية هادئة مع أقراط ذهبية طويلة.",
    fabric: "كريب مطاطي فاخر",
    details: ["كتفان مكشوفان", "قصة ضيقة انسيابية", "قماش لا يتجعد بسهولة"],
    featured: true,
    colors: ["خمري"],
  },
  {
    id: "dahlia",
    name: "فستان داليا الدرابيه",
    price: 1720,
    category: "evening",
    images: ["dahlia.jpg"],
    description:
      "فستان سهرة أحمر بأكمام طويلة وياقة عالية وذيل درابيه ينسدل بأناقة. قطعة درامية للمساء الرسمي.",
    fabric: "جورسيه مطاطي",
    details: ["أكمام طويلة", "ياقة عالية", "ذيل درابيه", "قصة قصيرة من الأمام"],
    isNew: true,
    colors: ["أحمر ملكي"],
  },
  {
    id: "layla",
    name: "فستان ليلى الطويل",
    price: 1480,
    category: "evening",
    images: ["layla.jpg"],
    description:
      "فستان سهرة أحمر طويل بكتف واحد وطيات ناعمة عند الخصر. حركة القماش تمنحه حضوراً هادئاً وفخماً.",
    fabric: "شيفون مطاطي",
    details: ["كتف واحد", "طول كامل", "خصر مطوي", "خفيف ومريح"],
    colors: ["أحمر غامق"],
  },
  {
    id: "nada",
    name: "فستان ندى الليلكي",
    price: 1890,
    category: "evening",
    images: ["nada.jpg"],
    description:
      "فستان سهرة ليلكي من طبقات التول مع معطف فرو ناعم بلون متناسق. قطعة لافتة لحفلات الشتاء والمناسبات الكبرى.",
    fabric: "تول حريري مع فرو صناعي ناعم",
    details: ["طبقات تول", "معطف فرو قابل للفصل", "كعب عالٍ يُكمل الإطلالة"],
    featured: true,
    isNew: true,
    colors: ["ليلكي"],
  },
  {
    id: "rima",
    name: "فستان ريما الخمري اليومي",
    price: 620,
    category: "casual",
    images: ["rima.jpg"],
    description:
      "فستان كاجوال خمري بأزرار ذهبية ناعمة وقصة واسعة مريحة. مثالي لأيام العمل الهادئة والزيارات العائلية.",
    fabric: "قطن مخملي خفيف",
    details: ["أكمام ثلاثة أرباع", "أزرار أمامية", "قصة واسعة من الخصر", "سهل العناية"],
    colors: ["خمري داكن"],
  },
  {
    id: "hana",
    name: "فستان هناء المشجر",
    price: 680,
    category: "casual",
    images: ["hana.jpg"],
    description:
      "فستان كاجوال أحمر مشجر بزهور ذهبية وحزام خصر عريض. قطعة مرحة وأنيقة للخروج النهاري.",
    fabric: "قطن مخلوط مطرز",
    details: ["ياقة V ناعمة", "حزام خصر", "طول ميدي", "تطريز زهري"],
    colors: ["أحمر مشجر"],
  },
  {
    id: "reem",
    name: "فستان ريم القميص",
    price: 650,
    category: "casual",
    images: ["reem.jpg"],
    description:
      "فستان قميص كريمي بحزام خصر وأكمام طويلة. قصة صيفية خفيفة تناسب النهار والسفر.",
    fabric: "قطن فوال",
    details: ["قصة قميص", "حزام قابل للفك", "أكمام طويلة", "سهل الكي"],
    colors: ["كريمي"],
  },
  {
    id: "sarah",
    name: "فستان سارة الرسمي",
    price: 980,
    category: "formal",
    images: ["sarah.jpg"],
    description:
      "فستان رسمي فضي بقصة مستقيمة أنيقة وأكمام قصيرة. قطعة راقية للدوام والمناسبات النهارية.",
    fabric: "تويد لامع خفيف",
    details: ["قصة مستقيمة", "أكمام قصيرة", "قماش لا يتجعد", "طول ركبة"],
    featured: true,
    colors: ["فضي"],
  },
  {
    id: "lina",
    name: "فستان لينا المرجاني",
    price: 890,
    category: "formal",
    images: ["lina.jpg"],
    description:
      "فستان رسمي مرجاني بأكمام فراشة وقصة لف ناعمة. لون دافئ يضفي حضوراً أنثوياً في الاجتماعات والمناسبات.",
    fabric: "رايون ناعم",
    details: ["أكمام فراشة", "قصة لف", "طول ماكسي", "حزام خصر رفيع"],
    colors: ["مرجاني"],
  },
  {
    id: "ghada",
    name: "فستان غادة المشجر الرسمي",
    price: 920,
    category: "formal",
    images: ["ghada.jpg"],
    description:
      "فستان رسمي بأكمام طويلة بنفسجية وتنورة مطوية مشجرة. قطعة جريئة للمناسبات الفنية والاستقبالات.",
    fabric: "جاكار وتول مطوي",
    details: ["أكمام طويلة", "تنورة مطوية", "حزام أزرق متباين", "قصة ميدي"],
    colors: ["بنفسجي مشجر"],
  },
  {
    id: "noor",
    name: "فستان نور اللؤلؤي",
    price: 1890,
    category: "occasions",
    images: ["noor.jpg"],
    description:
      "فستان مناسبات لؤلؤي بتطريز كريستال ناعم وتنورة تول واسعة. قطعة احتفالية تليق بالزواجات والمناسبات الكبرى.",
    fabric: "تول مطرز باللؤلؤ",
    details: ["تطريز لؤلؤ وكريستال", "تنورة أميرة", "صدر شفاف مطرز", "يُنصح بالتنظيف الجاف"],
    featured: true,
    isNew: true,
    colors: ["عاجي لؤلؤي"],
  },
  {
    id: "amal",
    name: "فستان أمل الذهبي",
    price: 1750,
    category: "occasions",
    images: ["amal.jpg"],
    description:
      "فستان مناسبات ذهبي بتطريز نباتي كثيف على قماش دانتيل فاخر. قطعة خالدة بروح تراثية راقية.",
    fabric: "دانتيل ذهبي مطرز",
    details: ["تطريز نباتي كامل", "ياقة عالية", "تنورة واسعة", "بطانة حريرية"],
    featured: true,
    isNew: true,
    colors: ["ذهبي"],
  },
  {
    id: "warda",
    name: "فستان وردة الأخضر",
    price: 1280,
    category: "occasions",
    images: ["warda.jpg"],
    description:
      "فستان مناسبات أخضر مشجر بقصة واسعة راقصة. حضور مرح وأنيق لحفلات النهار والحدائق.",
    fabric: "جاكار مشجر",
    details: ["قصة واسعة راقصة", "بدون أكمام", "خصر محدد", "طول ميدي"],
    colors: ["أخضر مشجر"],
  },
  {
    id: "mira",
    name: "فستان ميرا البرتقالي",
    price: 650,
    category: "summer",
    images: ["mira.jpg"],
    description:
      "فستان صيفي برتقالي انسيابي بحمالات رفيعة. خفيف ومشرق لأيام الشمس والنزهات.",
    fabric: "شيفون خفيف",
    details: ["حمالات رفيعة", "قصة فضفاضة", "طول ماكسي", "سهل الغسل"],
    colors: ["برتقالي مشمش"],
  },
  {
    id: "dana",
    name: "فستان دانة المورد",
    price: 750,
    category: "summer",
    images: ["dana.jpg"],
    description:
      "فستان صيفي أبيض مورد بقصة لف وحركة هوائية ناعمة. قطعة رومانسية لأيام البحر والحدائق.",
    fabric: "كريب مطبوع",
    details: ["قصة لف", "أكمام قصيرة", "طبعة ورود", "شق جانبي ناعم"],
    featured: true,
    colors: ["أبيض مورد"],
  },
  {
    id: "joud",
    name: "فستان جود الأبيض",
    price: 620,
    category: "summer",
    images: ["joud.jpg"],
    description:
      "فستان صيفي أبيض قصير بأكتاف مكشوفة وتفاصيل كروشيه ناعمة. إطلالة منعشة وخفيفة.",
    fabric: "قطن مطرز",
    details: ["أكتاف مكشوفة", "تفاصيل كروشيه", "طول قصير", "خصر مطاطي"],
    isNew: true,
    colors: ["أبيض"],
  },
  {
    id: "tala",
    name: "فستان تالا المنقط",
    price: 720,
    category: "summer",
    images: ["tala.jpg"],
    description:
      "فستان صيفي خمري منقط بالأبيض بقصة منفوشة مرحة. قطعة حيوية للنزهات والأيام المشمسة.",
    fabric: "قطن بوبلين",
    details: ["نقاط بيضاء", "أكتاف مكشوفة", "قصة منفوشة", "خفيف ومريح"],
    isNew: true,
    colors: ["خمري منقط"],
  },
];

export const SIZES: Size[] = ["S", "M", "L", "XL"];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function productsByCategory(id: CategoryId) {
  if (id === "new") return PRODUCTS.filter((p) => p.isNew);
  return PRODUCTS.filter((p) => p.category === id);
}

export function featuredProducts() {
  return PRODUCTS.filter((p) => p.featured);
}

export function relatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured),
  ).slice(0, limit);
}
