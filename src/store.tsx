import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Size } from "./data";
import { createOrderId, shippingFee } from "./lib";

export interface CartItem {
  productId: string;
  quantity: number;
  size: Size;
}

export interface Address {
  name: string;
  phone: string;
  city: string;
  district: string;
  street: string;
  notes: string;
}

export type PaymentMethod = "cod" | "card";

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  payment: PaymentMethod;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}

interface Toast {
  id: number;
  message: string;
}

interface StoreValue {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (productId: string, size: Size, quantity: number) => void;
  removeFromCart: (productId: string, size: Size) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  checkoutItems: CartItem[];
  beginCheckout: (items?: CartItem[]) => void;
  address: Address;
  setAddress: (address: Address) => void;
  placeOrder: (payment: PaymentMethod) => Order;
  lastOrder: Order | null;
  toasts: Toast[];
  toast: (message: string) => void;
}

const EMPTY_ADDRESS: Address = {
  name: "",
  phone: "",
  city: "جديدة عرعر",
  district: "",
  street: "",
  notes: "",
};

const StoreContext = createContext<StoreValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("samiya-cart");
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function loadAddress(): Address {
  try {
    const raw = localStorage.getItem("samiya-address");
    return raw ? { ...EMPTY_ADDRESS, ...(JSON.parse(raw) as Address) } : EMPTY_ADDRESS;
  } catch {
    return EMPTY_ADDRESS;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [address, setAddressState] = useState<Address>(loadAddress);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem("samiya-cart", JSON.stringify(cart));
  }, [cart]);

  const toast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2800);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const i = prev.findIndex(
        (x) => x.productId === item.productId && x.size === item.size,
      );
      if (i === -1) return [...prev, item];
      const next = [...prev];
      next[i] = { ...next[i], quantity: next[i].quantity + item.quantity };
      return next;
    });
    toast("أُضيف الفستان إلى السلة");
  };

  const updateQty = (productId: string, size: Size, quantity: number) => {
    setCart((prev) =>
      prev
        .map((x) =>
          x.productId === productId && x.size === size ? { ...x, quantity } : x,
        )
        .filter((x) => x.quantity > 0),
    );
  };

  const removeFromCart = (productId: string, size: Size) => {
    setCart((prev) => prev.filter((x) => !(x.productId === productId && x.size === size)));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  const cartSubtotal = cart.reduce((n, i) => {
    const p = getProduct(i.productId);
    return n + (p ? p.price * i.quantity : 0);
  }, 0);

  const beginCheckout = (items?: CartItem[]) => {
    setCheckoutItems(items && items.length ? items : cart);
  };

  const setAddress = (next: Address) => {
    setAddressState(next);
    localStorage.setItem("samiya-address", JSON.stringify(next));
  };

  const placeOrder = (payment: PaymentMethod): Order => {
    const items = checkoutItems.length ? checkoutItems : cart;
    const subtotal = items.reduce((n, i) => {
      const p = getProduct(i.productId);
      return n + (p ? p.price * i.quantity : 0);
    }, 0);
    const shipping = shippingFee(address.city);
    const order: Order = {
      id: createOrderId(),
      items,
      address,
      payment,
      subtotal,
      shipping,
      total: subtotal + shipping,
      createdAt: new Date().toISOString(),
    };
    let prev: Order[] = [];
    try {
      prev = JSON.parse(localStorage.getItem("samiya-orders") || "[]") as Order[];
      if (!Array.isArray(prev)) prev = [];
    } catch {
      prev = [];
    }
    localStorage.setItem("samiya-orders", JSON.stringify([order, ...prev]));
    setLastOrder(order);
    if (!checkoutItems.length || items === cart) clearCart();
    else {
      setCart((c) =>
        c.filter(
          (x) =>
            !items.some((y) => y.productId === x.productId && y.size === x.size),
        ),
      );
    }
    setCheckoutItems([]);
    return order;
  };

  const value: StoreValue = {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    checkoutItems,
    beginCheckout,
    address,
    setAddress,
    placeOrder,
    lastOrder,
    toasts,
    toast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
