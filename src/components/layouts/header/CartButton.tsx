import { ShoppingCart } from "lucide-react";
import {  useEffect, useRef, useState } from "react";
import { useCartStore } from "../../../stores/cartStore";
import CartDropdown from "../../ui/cart/CartDropdown";



export default function CartButton() {
  const items = useCartStore((state) => state.items);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


 // đóng khi chuyển trang
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);
  
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:text-emerald-600 transition-colors rounded cursor-pointer"
      >
        <ShoppingCart size={20} />

        {items.length > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {open && <CartDropdown onClose={() => setOpen(false)} />}
    </div>
  );
}