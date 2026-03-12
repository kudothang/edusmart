import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Course } from "../types/index";

interface CartItem extends Course {
  quantity: number;
}

interface CartState {
  items: CartItem[];
    isOpen: boolean;

  addToCart: (course: Course) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,


      addToCart: (course) => {
        const items = get().items;

        const exist = items.find((i) => i.id === course.id);

        if (exist) {
          set({
            items: items.map((i) =>
              i.id === course.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...course, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
     closeCart: () => set({ isOpen: false }),
    }),
    
    {
      name: "cart-storage", // key localStorage
    }
  )
);