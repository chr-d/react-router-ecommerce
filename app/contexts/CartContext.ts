import { createContext, use } from "react";
import type { CartContextType } from "~/types";

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = use(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartState");
  }
  return context;
};

export { CartContext };
