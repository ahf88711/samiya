import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Stepper } from "../components/ui";
import { getProduct } from "../data";
import { CITIES, formatSar, img, isValidSaudiPhone, shippingFee } from "../lib";
import { useStore, type Address, type Order, type PaymentMethod } from "../store";

function useLines() {
  const { cart, checkoutItems } = useStore();
  const items = checkoutItems.length ? checkoutItems : cart;
  const lines = items
    .map((i) => {
      const product = getProduct(i.productId);
      return product ? { ...i, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.quantity, 0);
  return { items, lines, subtotal };
}

export function CartPage() {
  const { cart, updateQty, removeFromCart, beginCheckout, cartSubtotal } = useStore();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="page-title">
        <h1>سلة التسوق</h1>
        <p>راجعي القطع ثم انتقلي إلى العنوان والدفع.</p>
      </div>
      {cart.length === 0 ? (
        <div className="empty">
          <p>سلتك فارغة.</p>
          <Link className="btn btn-primary" to="/shop">
            تسوّقي الفساتين
          </Link>
        </div>
      ) : (
        <div className="two-col" style={{ paddingBottom: 64 }}>
          <div className="card">
            {cart.map((item) => {
              const p = getProduct(item.productId);
              if (!p) return null;
              return (
                <div className="cart-item" key={`${item.productId}-${item.size}`}>
                  <img src={img(p.images[0])} alt="" />
                  <div>
                    <Link to={`/product/${p.id}`}>
                      <strong>{p.name}</strong>
                    </Link>
                    <div className="muted">المقاس {item.size}</div>
                    <div className="qty" style={{ marginTop: 8 }}>
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-ghost"
                      style={{ marginTop: 8, padding: "6px 12px" }}
                      onClick={() => removeFromCart(item.productId, item.size)}
                    >
                      حذف
                    </button>
                  </div>
                  <div className="line-total">{formatSar(p.price * item.quantity)}</div>
                </div>
              );
            })}
          </div>
          <aside className="card">
            <h3>ملخص الطلب</h3>
            <div className="summary-row">
              <span>المنتجات</span>
              <span>{formatSar(cartSubtotal)}</span>
            </div>
            <div className="summary-row">
              <span>الشحن</span>
              <span>يُحسب بعد العنوان</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 16 }}
              onClick={() => {
                beginCheckout();
                navigate("/checkout/address");
              }}
            >
              المتابعة إلى العنوان
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export function AddressPage() {
  const { address, setAddress } = useStore();
  const { items, lines, subtotal } = useLines();
  const navigate = useNavigate();
  const [form, setForm] = useState<Address>(address);
  const [error, setError] = useState("");

  if (!items.length) return <Navigate to="/cart" replace />;

  const ship = shippingFee(form.city);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.district.trim() || !form.street.trim()) {
      setError("يرجى تعبئة الاسم والحي والعنوان بالكامل.");
      return;
    }
    if (!isValidSaudiPhone(form.phone)) {
      setError("أدخلي رقم جوال سعودي صحيح يبدأ بـ 05.");
      return;
    }
    setAddress(form);
    navigate("/checkout/payment");
  };

  return (
    <div className="container">
      <Stepper step={2} />
      <div className="page-title">
        <h1>عنوان التوصيل</h1>
        <p>بعد اختيار الكمية، نحتاج عنوانك في المملكة لإكمال الطلب.</p>
      </div>
      <div className="two-col" style={{ paddingBottom: 64 }}>
        <form className="card form" onSubmit={submit}>
          <label>
            الاسم الكامل
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label>
            رقم الجوال
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="05xxxxxxxx"
              required
            />
          </label>
          <label>
            المدينة
            <select
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            >
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            الحي
            <input
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              required
            />
          </label>
          <label>
            الشارع وتفاصيل العنوان
            <textarea
              rows={3}
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              required
            />
          </label>
          <label>
            ملاحظات للتوصيل
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>
          {error ? <p style={{ color: "#9b2c3a" }}>{error}</p> : null}
          <div className="actions">
            <Link className="btn btn-ghost" to="/cart">
              رجوع
            </Link>
            <button className="btn btn-primary" type="submit">
              المتابعة إلى الدفع
            </button>
          </div>
        </form>
        <Summary lines={lines} subtotal={subtotal} shipping={ship} />
      </div>
    </div>
  );
}

export function PaymentPage() {
  const { address, placeOrder, lastOrder } = useStore();
  const { items, lines, subtotal } = useLines();
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [error, setError] = useState("");
  const ship = shippingFee(address.city);

  if (lastOrder && !items.length) return <Navigate to={`/order/${lastOrder.id}`} replace />;
  if (!items.length) return <Navigate to="/cart" replace />;
  if (!address.name || !address.street) return <Navigate to="/checkout/address" replace />;

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (digits.length < 16 || card.name.trim().length < 3 || !/^\d{2}\/\d{2}$/.test(card.exp) || card.cvv.length < 3) {
        setError("تحققي من بيانات البطاقة ثم أعيدي المحاولة.");
        return;
      }
    }
    const order = placeOrder(method);
    navigate(`/order/${order.id}`);
  };

  return (
    <div className="container">
      <Stepper step={3} />
      <div className="page-title">
        <h1>الدفع</h1>
        <p>اختاري طريقة الدفع لإكمال طلبك من سمية.</p>
      </div>
      <div className="two-col" style={{ paddingBottom: 64 }}>
        <form className="card" onSubmit={pay}>
          <div className="pay-options">
            <label className={`pay-option ${method === "cod" ? "active" : ""}`}>
              <input
                type="radio"
                name="pay"
                checked={method === "cod"}
                onChange={() => setMethod("cod")}
              />
              <div>
                <strong>الدفع عند الاستلام</strong>
                <div className="muted">ادفعي نقداً أو ببطاقة عند وصول الطلب.</div>
              </div>
            </label>
            <label className={`pay-option ${method === "card" ? "active" : ""}`}>
              <input
                type="radio"
                name="pay"
                checked={method === "card"}
                onChange={() => setMethod("card")}
              />
              <div>
                <strong>مدى / فيزا / ماستركارد</strong>
                <div className="muted">دفع آمن ببطاقة مصرفية.</div>
              </div>
            </label>
          </div>
          {method === "card" ? (
            <div className="form" style={{ marginTop: 16 }}>
              <label>
                رقم البطاقة
                <input
                  inputMode="numeric"
                  placeholder="ACCT-000003"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />
              </label>
              <label>
                الاسم على البطاقة
                <input
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label>
                  الانتهاء
                  <input
                    placeholder="MM/YY"
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: e.target.value })}
                  />
                </label>
                <label>
                  CVV
                  <input
                    inputMode="numeric"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </label>
              </div>
            </div>
          ) : null}
          {error ? <p style={{ color: "#9b2c3a" }}>{error}</p> : null}
          <div className="actions" style={{ marginTop: 18 }}>
            <Link className="btn btn-ghost" to="/checkout/address">
              رجوع للعنوان
            </Link>
            <button className="btn btn-gold" type="submit">
              تأكيد الطلب · {formatSar(subtotal + ship)}
            </button>
          </div>
        </form>
        <Summary lines={lines} subtotal={subtotal} shipping={ship} address={address} />
      </div>
    </div>
  );
}

export function SuccessPage() {
  const { lastOrder } = useStore();
  const { id } = useParams();
  const order =
    lastOrder && lastOrder.id === id
      ? lastOrder
      : (JSON.parse(localStorage.getItem("samiya-orders") || "[]") as Order[]).find(
          (o) => o.id === id,
        );

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="container success">
      <p className="eyebrow">تم استلام طلبك</p>
      <h1>شكراً لكِ</h1>
      <div className="order-id">رقم الطلب {order.id}</div>
      <p className="muted">
        سيصلك الطلب إلى {order.address.district}، {order.address.city}. طريقة الدفع:{" "}
        {order.payment === "cod" ? "عند الاستلام" : "بطاقة"}.
      </p>
      <div className="card" style={{ maxWidth: 460, margin: "24px auto", textAlign: "right" }}>
        {order.items.map((i) => {
          const p = getProduct(i.productId);
          if (!p) return null;
          return (
            <div className="summary-row" key={`${i.productId}-${i.size}`}>
              <span>
                {p.name} × {i.quantity}
              </span>
              <span>{formatSar(p.price * i.quantity)}</span>
            </div>
          );
        })}
        <div className="summary-row">
          <span>الشحن</span>
          <span>{order.shipping === 0 ? "مجاني" : formatSar(order.shipping)}</span>
        </div>
        <div className="summary-row">
          <strong>الإجمالي</strong>
          <strong>{formatSar(order.total)}</strong>
        </div>
      </div>
      <Link className="btn btn-primary" to="/shop">
        متابعة التسوّق
      </Link>
    </div>
  );
}

function Summary({
  lines,
  subtotal,
  shipping,
  address,
}: {
  lines: ReturnType<typeof useLines>["lines"];
  subtotal: number;
  shipping: number;
  address?: Address;
}) {
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);
  return (
    <aside className="card">
      <h3>طلبك</h3>
      {lines.map((l) => (
        <div className="cart-item" key={`${l.productId}-${l.size}`}>
          <img src={img(l.product.images[0])} alt="" />
          <div>
            <strong>{l.product.name}</strong>
            <div className="muted">
              {l.size} · الكمية {l.quantity}
            </div>
          </div>
          <div className="line-total">{formatSar(l.product.price * l.quantity)}</div>
        </div>
      ))}
      <div className="summary-row">
        <span>المجموع</span>
        <span>{formatSar(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>الشحن</span>
        <span>{shipping === 0 ? "مجاني داخل عرعر وجديدة عرعر" : formatSar(shipping)}</span>
      </div>
      <div className="summary-row">
        <strong>الإجمالي</strong>
        <strong>{formatSar(total)}</strong>
      </div>
      {address?.name ? (
        <p className="muted" style={{ marginTop: 12 }}>
          يُرسل إلى {address.name} — {address.district}، {address.city}
        </p>
      ) : null}
    </aside>
  );
}
