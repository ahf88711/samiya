import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ui";
import {
  CATEGORIES,
  PRODUCTS,
  getCategory,
  productsByCategory,
  type CategoryId,
} from "../data";

export function Shop() {
  return <Catalog title="المتجر" subtitle="كل فساتين سميه في مكان واحد" products={PRODUCTS} />;
}

export function Category() {
  const { id } = useParams();
  const cat = getCategory(id || "");
  if (!cat) {
    return (
      <div className="container empty">
        <h1>التصنيف غير موجود</h1>
        <Link to="/shop">العودة للمتجر</Link>
      </div>
    );
  }
  return (
    <Catalog
      title={cat.name}
      subtitle={cat.description}
      products={productsByCategory(cat.id)}
      active={cat.id}
    />
  );
}

function Catalog({
  title,
  subtitle,
  products,
  active,
}: {
  title: string;
  subtitle: string;
  products: typeof PRODUCTS;
  active?: CategoryId;
}) {
  return (
    <div className="container">
      <div className="page-title">
        <p className="eyebrow">سميه</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="filter-row">
        <Link to="/shop" className={!active ? "active" : ""}>
          الكل
        </Link>
        {CATEGORIES.map((c) => (
          <Link key={c.id} to={`/category/${c.id}`} className={active === c.id ? "active" : ""}>
            {c.name}
          </Link>
        ))}
      </div>
      <div className="product-grid" style={{ paddingBottom: 64 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
