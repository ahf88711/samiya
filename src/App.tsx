import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AddressPage, CartPage, PaymentPage, SuccessPage } from "./pages/Checkout";
import { Home } from "./pages/Home";
import { About, Contact, NotFound } from "./pages/Info";
import { Product } from "./pages/Product";
import { Category, Shop } from "./pages/Shop";
import { StoreProvider } from "./store";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Navigate to="/checkout/address" replace />} />
            <Route path="checkout/address" element={<AddressPage />} />
            <Route path="checkout/payment" element={<PaymentPage />} />
            <Route path="order/:id" element={<SuccessPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
