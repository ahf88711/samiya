import { Link } from "react-router-dom";
import { ProductCard } from "../components/ui";
import { CATEGORIES, featuredProducts } from "../data";
import { img } from "../lib";

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">دار فساتين · جديدة عرعر</p>
          <h1>سمية</h1>
          <p className="hero-lead">
            فساتين أنيقة بروح أنثوية ناعمة، تُختار بعناية للنساء اللواتي يحببن الحضور الهادئ والفخم.
          </p>
          <div className="hero-meta">
            <span>
              الموقع <b>جديدة عرعر</b>
            </span>
            <span>
              الأسعار من <b>600 ر.س</b>
            </span>
          </div>
          <div className="actions">
            <Link className="btn btn-primary" to="/shop">
              تسوّقي الآن
            </Link>
            <Link className="btn btn-ghost" to="/category/evening">
              فساتين السهرة
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img src={img("hero.jpg")} alt="فساتين سمية في المشغل" />
          <div className="hero-caption">مجموعة المناسبات · تطريز لؤلؤي</div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">التصنيفات</p>
              <h2>ستة عوالم من الأناقة</h2>
            </div>
            <Link to="/shop">كل الفساتين</Link>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.id} to={`/category/${c.id}`} className="cat-card">
                <img src={img(c.image)} alt="" />
                <figcaption>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </figcaption>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">مختارات الدار</p>
              <h2>فساتين مميزة</h2>
            </div>
          </div>
          <div className="product-grid">
            {featuredProducts().map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container story">
          <img src={img("about.jpg")} alt="فستان ذهبي مطرز من مجموعة سمية" />
          <div>
            <p className="eyebrow">من جديدة عرعر</p>
            <p className="quote">نؤمن أن الفستان الجميل يبدأ من اختيار هادئ، لا من ضجيج الموسم.</p>
            <p className="muted">
              سمية دار محلية في جديدة عرعر، تختار فساتين السهرة والكاجوال والمناسبات بألوان وردية
              وبيج وذهبية ناعمة. كل قطعة تبدأ من 600 ريال، وتُشحن بعناية إلى جميع مناطق المملكة.
            </p>
            <div className="stats">
              <div className="stat">
                <b>600+</b>
                تبدأ الأسعار من
              </div>
              <div className="stat">
                <b>6</b>
                تصنيفات أنيقة
              </div>
              <div className="stat">
                <b>عرعر</b>
                جذور محلية
              </div>
            </div>
            <div className="actions" style={{ marginTop: 22 }}>
              <Link className="btn btn-soft" to="/about">
                تعرّفي على الدار
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
