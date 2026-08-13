import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductCard, QuantitySelector, SizePicker } from "../components/ui";
import { getCategory, getProduct, relatedProducts, type Size } from "../data";
import { formatSar, img } from "../lib";
import { useStore } from "../store";

export function Product() {
  const { id } = useParams();
  const product = getProduct(id || "");
  const navigate = useNavigate();
  const { addToCart, beginCheckout } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<Size>("M");
  const [shot, setShot] = useState(0);

  if (!product) {
    return (
      <div className="container empty">
        <h1>الفستان غير موجود</h1>
        <Link to="/shop">العودة للمتجر</Link>
      </div>
    );
  }

  const cat = getCategory(product.category);
  const item = { productId: product.id, quantity: qty, size };

  const buyNow = () => {
    beginCheckout([item]);
    navigate("/checkout/address");
  };

  return (
    <div className="container">
      <p className="muted" style={{ paddingTop: 24 }}>
        <Link to="/">الرئيسية</Link> / <Link to="/shop">المتجر</Link> /{" "}
        <Link to={`/category/${product.category}`}>{cat?.name}</Link>
      </p>
      <div className="pdp">
        <div className="gallery">
          <div className="gallery-main">
            <img src={img(product.images[shot])} alt={product.name} />
          </div>
          {product.images.length > 1 ? (
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={shot === i ? "active" : ""}
                  onClick={() => setShot(i)}
                >
                  <img src={img(src)} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          {product.isNew ? <span className="pill">وصل حديثاً</span> : null}
          <h1>{product.name}</h1>
          <div className="price" style={{ fontSize: 26 }}>
            {formatSar(product.price)}
          </div>
          <p className="lead">{product.description}</p>
          <p>
            <strong>القماش:</strong> {product.fabric}
          </p>
          <p>
            <strong>اللون:</strong> {product.colors.join("، ")}
          </p>
          <label>
            <strong>المقاس</strong>
          </label>
          <SizePicker value={size} onChange={setSize} />
          <label>
            <strong>الكمية</strong>
          </label>
          <div className="qty-row">
            <QuantitySelector value={qty} onChange={setQty} />
          </div>
          <div className="actions" style={{ marginTop: 18 }}>
            <button className="btn btn-ghost" onClick={() => addToCart(item)}>
              أضف إلى السلة
            </button>
            <button className="btn btn-gold" onClick={buyNow}>
              اطلب الآن
            </button>
          </div>
          <ul className="specs">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-head">
        <h2>قد يعجبك أيضاً</h2>
      </div>
      <div className="product-grid" style={{ paddingBottom: 64 }}>
        {relatedProducts(product).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
