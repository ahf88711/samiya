import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactInfo } from "../components/ContactInfo";
import { img } from "../lib";

export function About() {
  return (
    <div className="container" style={{ paddingBottom: 72 }}>
      <div className="page-title">
        <p className="eyebrow">قصتنا</p>
        <h1>سميه</h1>
        <p>دار صغيرة بذوق كبير، تختار الفستان كما تُختار الهدية.</p>
      </div>
      <div className="story">
        <img src={img("look.jpg")} alt="أجواء الدار بألوان بيج ناعمة" />
        <div>
          <p>
            وُلدت سميه في جديدة عرعر لتكون عنواناً واضحاً للأناقة الأنثوية: وردي ناعم، بيج دافئ،
            وأبيض مضيء، مع لمسات ذهبية خفيفة. لا نطارد كل صيحة، بل نختار ما يبقى جميلاً بعد الموسم.
          </p>
          <p className="muted">
            من فساتين السهرة إلى القطع اليومية الصيفية، تُعرض المجموعة بأسعار تبدأ من 600 ريال، مع
            تجربة طلب بسيطة: تختاري الكمية، تدخلين العنوان، ثم تُكملين الدفع.
          </p>
          <Link className="btn btn-primary" to="/shop">
            تسوّقي المجموعة
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container" style={{ paddingBottom: 72 }}>
      <div className="page-title">
        <h1>تواصل معنا</h1>
        <p>العنوان والجوال والبريد في مكان واحد.</p>
      </div>
      <div className="contact-grid">
        <div className="info-box">
          <ContactInfo />
          <h3>أوقات العمل</h3>
          <p>يومياً من الساعة 10 صباحاً حتى 10 مساءً</p>
        </div>
        {sent ? (
          <div className="card">
            <h3>وصلنا رسالتك</h3>
            <p>شكراً لتواصلك مع سميه. سنعود إليك في أقرب وقت.</p>
          </div>
        ) : (
          <form
            className="card form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>
              الاسم
              <input required name="name" />
            </label>
            <label>
              الجوال أو البريد
              <input required name="contact" />
            </label>
            <label>
              الرسالة
              <textarea required rows={5} name="message" />
            </label>
            <button className="btn btn-primary" type="submit">
              إرسال
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function Shipping() {
  return (
    <div className="container" style={{ paddingBottom: 72 }}>
      <div className="page-title">
        <p className="eyebrow">خدمة سميه</p>
        <h1>الشحن والتوصيل</h1>
        <p>نوصل طلبك داخل المملكة بعد تأكيد العنوان والدفع.</p>
      </div>
      <div className="card" style={{ maxWidth: 640 }}>
        <p>
          الشحن مجاني إلى <strong>جديدة عرعر</strong> ومدينة عرعر. بقية المناطق برسوم رمزية تُحسب
          عند إدخال عنوان التوصيل.
        </p>
        <p>مدة التوصيل عادة من يومين إلى خمسة أيام عمل حسب المدينة.</p>
        <p>يمكنكِ متابعة الطلب عبر رقم الجوال أو البريد الظاهر في صفحة التواصل.</p>
        <Link className="btn btn-primary" to="/shop">
          تسوّقي الآن
        </Link>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="container empty">
      <h1>الصفحة غير موجودة</h1>
      <Link className="btn btn-primary" to="/">
        العودة للرئيسية
      </Link>
    </div>
  );
}
