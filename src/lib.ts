export const BASE = import.meta.env.BASE_URL;

export function img(name: string) {
  return `${BASE}images/${name}`;
}

export function formatSar(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPhone(value: string) {
  return value.replace(/\s+/g, "");
}

export function isValidSaudiPhone(value: string) {
  return /^(05\d{8}|5\d{8}|\+9665\d{8})$/.test(formatPhone(value));
}

export function createOrderId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SM-${n}`;
}

export const CITIES = [
  "جديدة عرعر",
  "عرعر",
  "طريف",
  "رفحاء",
  "العويقيلة",
  "الرياض",
  "جدة",
  "الدمام",
  "الخبر",
  "تبوك",
  "حائل",
  "بريدة",
  "أبها",
  "مكة المكرمة",
  "المدينة المنورة",
] as const;

export function shippingFee(city: string) {
  return city === "جديدة عرعر" || city === "عرعر" ? 0 : 35;
}
