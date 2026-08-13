import { Link } from "react-router-dom";
import { CATEGORIES, type Product, type Size, SIZES } from "../data";
import { formatSar, img } from "../lib";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="qty" role="group" aria-label="الكمية">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="إنقاص">
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label="زيادة">
        +
      </button>
    </div>
  );
}

export function SizePicker({
  value,
  onChange,
}: {
  value: Size;
  onChange: (s: Size) => void;
}) {
  return (
    <div className="size-row" role="group" aria-label="المقاس">
      {SIZES.map((s) => (
        <button
          key={s}
          type="button"
          className={value === s ? "active" : ""}
          onClick={() => onChange(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORIES.find((c) => c.id === product.category);
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="thumb">
        <img src={img(product.images[0])} alt={product.name} />
      </Link>
      <div className="body">
        {product.isNew ? <span className="pill">وصل حديثاً</span> : null}
        <p className="muted" style={{ margin: "0 0 4px", fontSize: 13 }}>
          {cat?.name}
        </p>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="price">{formatSar(product.price)}</div>
      </div>
    </article>
  );
}

export function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const items = [
    { n: 1, label: "الكمية" },
    { n: 2, label: "العنوان" },
    { n: 3, label: "الدفع" },
  ] as const;
  return (
    <div className="stepper" aria-label="خطوات الطلب">
      {items.map((s) => (
        <div
          key={s.n}
          className={`step ${step === s.n ? "current" : ""} ${step > s.n ? "done" : ""}`}
        >
          <b>{s.n}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Toasts({ items }: { items: { id: number; message: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="toasts" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="toast">
          {t.message}
        </div>
      ))}
    </div>
  );
}
