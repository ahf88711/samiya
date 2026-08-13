import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES, getProduct } from "../data";
import { formatSar, img } from "../lib";
import { useStore } from "../store";
import { Toasts } from "./ui";

export function Layout() {
  const { cart, cartCount, cartSubtotal, updateQty, removeFromCart, toasts, beginCheckout } =
    useStore();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menu || open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, open]);

  const checkout = () => {
    beginCheckout();
    setOpen(false);
    navigate("/checkout/address");
  };

  return (
    <>
      <a className="skip" href="#main">
        تخطي إلى المحتوى
      </a>
      <div className="topbar">جديدة عرعر · شحن لكل المملكة · من 600 ر.س</div>
      <header className="header">
        <div className="container header-row">
          <Link to="/" className="logo" onClick={() => setMenu(false)}>
            سمية
            <span>جديدة عرعر</span>
          </Link>
          <nav className="nav" aria-label="القائمة الرئيسية">
            <NavLink to="/" end>
              الرئيسية
            </NavLink>
            <NavLink to="/shop">المتجر</NavLink>
            <div className="drop">
              <button className="linkish" type="button">
                التصنيفات
              </button>
              <div className="drop-menu">
                {CATEGORIES.map((c) => (
                  <Link key={c.id} to={`/category/${c.id}`}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <NavLink to="/about">عن سمية</NavLink>
            <NavLink to="/contact">تواصل معنا</NavLink>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setOpen(true)} aria-label="السلة">
              <CartIcon />
              {cartCount > 0 ? <span className="badge">{cartCount}</span> : null}
            </button>
            <button
              className="icon-btn burger"
              onClick={() => setMenu((v) => !v)}
              aria-label="القائمة"
            >
              ☰
            </button>
          </div>
        </div>
        <nav className={`mobile-nav ${menu ? "open" : ""}`} aria-label="قائمة الجوال">
          <p className="eyebrow">القائمة</p>
          <NavLink to="/" end>
            الرئيسية
          </NavLink>
          <NavLink to="/shop">المتجر</NavLink>
          <NavLink to="/about">عن سمية</NavLink>
          <NavLink to="/contact">تواصل معنا</NavLink>
          <p className="eyebrow" style={{ marginTop: 18 }}>
            التصنيفات
          </p>
          {CATEGORIES.map((c) => (
            <NavLink key={c.id} to={`/category/${c.id}`}>
              {c.name}
            </NavLink>
          ))}
        </nav>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="logo">
              سمية
              <span>جديدة عرعر</span>
            </div>
            <p>دار فساتين أنثوية من جديدة عرعر. قطع مختارة بعناية للمساء واليوم والمناسبات.</p>
          </div>
          <div>
            <h4>تسوّقي</h4>
            {CATEGORIES.map((c) => (
              <Link key={c.id} to={`/category/${c.id}`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div>
            <h4>الدار</h4>
            <Link to="/about">قصتنا</Link>
            <Link to="/contact">تواصل معنا</Link>
            <Link to="/shop">كل الفساتين</Link>
          </div>
          <div>
            <h4>الموقع</h4>
            <p>جديدة عرعر</p>
            <p>منطقة الحدود الشمالية</p>
            <p>المملكة العربية السعودية</p>
            <p>يومياً من 10 صباحاً حتى 10 مساءً</p>
          </div>
        </div>
        <div className="container footer-bottom">© {new Date().getFullYear()} سمية — جديدة عرعر</div>
      </footer>

      {open ? (
        <>
          <div className="overlay" onClick={() => setOpen(false)} />
          <aside className="drawer" role="dialog" aria-label="سلة التسوق">
            <header>
              <strong>سلتك</strong>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="إغلاق">
                ×
              </button>
            </header>
            <div className="list">
              {cart.length === 0 ? (
                <p className="muted">السلة فارغة حالياً.</p>
              ) : (
                cart.map((item) => {
                  const p = getProduct(item.productId);
                  if (!p) return null;
                  return (
                    <div className="cart-item" key={`${item.productId}-${item.size}`}>
                      <img src={img(p.images[0])} alt="" />
                      <div>
                        <strong>{p.name}</strong>
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
                      </div>
                      <div>
                        <div className="line-total">{formatSar(p.price * item.quantity)}</div>
                        <button
                          className="linkish"
                          onClick={() => removeFromCart(item.productId, item.size)}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <footer>
              <div className="summary-row">
                <span>المجموع</span>
                <strong>{formatSar(cartSubtotal)}</strong>
              </div>
              <div className="actions" style={{ marginTop: 12 }}>
                <Link className="btn btn-ghost" to="/cart" onClick={() => setOpen(false)}>
                  عرض السلة
                </Link>
                <button className="btn btn-primary" disabled={!cart.length} onClick={checkout}>
                  إتمام الطلب
                </button>
              </div>
            </footer>
          </aside>
        </>
      ) : null}

      <nav className="tabbar" aria-label="تنقل الجوال">
        <NavLink to="/" end>
          <HomeIcon />
          الرئيسية
        </NavLink>
        <NavLink to="/shop">
          <ShopIcon />
          المتجر
        </NavLink>
        <button type="button" className={open ? "active" : ""} onClick={() => setOpen(true)}>
          <span className="tab-cart">
            <CartIcon />
            {cartCount > 0 ? <span className="badge">{cartCount}</span> : null}
          </span>
          السلة
        </button>
        <NavLink to="/contact">
          <ChatIcon />
          تواصل
        </NavLink>
      </nav>

      <Toasts items={toasts} />
    </>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 8h14l-1.2 12H6.2L5 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 18.5 6.4 15A7.5 7.5 0 1 1 12 19.5H7.2L5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 7h15l-1.5 9h-12L5 4H2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
