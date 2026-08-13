export const STORE_CONTACT = {
  address: "جديدة عرعر",
  region: "منطقة الحدود الشمالية، المملكة العربية السعودية",
  phone: "0550008800",
  phoneDisplay: "055 000 8800",
  email: "info@samih.sa",
};

export function phoneHref() {
  return `tel:+966${STORE_CONTACT.phone.replace(/^0/, "")}`;
}

export function mailHref() {
  return `mailto:${STORE_CONTACT.email}`;
}

export function whatsappHref() {
  return `https://wa.me/966${STORE_CONTACT.phone.replace(/^0/, "")}`;
}
