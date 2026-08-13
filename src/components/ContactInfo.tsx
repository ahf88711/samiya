import { mailHref, phoneHref, STORE_CONTACT, whatsappHref } from "../contact";

export function ContactInfo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "contact-lines" : "contact-block"}>
      {!compact ? <p className="eyebrow">للتواصل</p> : null}
      <p>
        <span>العنوان</span>
        <strong>{STORE_CONTACT.address}</strong>
      </p>
      <p>
        <span>الجوال</span>
        <a href={phoneHref()}>{STORE_CONTACT.phoneDisplay}</a>
      </p>
      <p>
        <span>البريد</span>
        <a href={mailHref()}>{STORE_CONTACT.email}</a>
      </p>
      {!compact ? (
        <a className="btn btn-soft" href={whatsappHref()} target="_blank" rel="noreferrer">
          واتساب
        </a>
      ) : null}
    </div>
  );
}
