import { useReducer } from "react";
import { useEffect } from "react";
import { formatCurrency } from "~/utils/formatCurrency";
import { CartContext } from "./CartContext";
import type { CartAction, CartData, CartItem } from "~/types";

const defaultInitialState: CartData = {
  items: [],
  total: formatCurrency(0),
  itemCount: 0,
};

const getInitialState = () => {
  if (typeof window === "undefined") {
    return defaultInitialState;
  }
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : defaultInitialState;
  } catch (error) {
    console.error("Failed to get cart from localStorage:", error);
    return defaultInitialState;
  }
};

const cartReducer = (state: CartData, action: CartAction) => {
  const recalculateCart = (items: CartItem[]) => {
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const total = formatCurrency(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    );
    return { ...state, items, itemCount, total };
  };

  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id,
      );

      let newItems;
      if (existingProduct) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return recalculateCart(newItems);
    }

    case "REMOVE_FROM_CART": {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload,
      );

      if (!existingProduct) {
        return state;
      }

      let newItems;
      if (existingProduct.quantity === 1) {
        newItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        newItems = state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      return recalculateCart(newItems);
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        itemCount: 0,
        total: formatCurrency(0),
      };

    default:
      return state;
  }
};

const CartState = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, null, getInitialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext>
  );
};

export { CartState };
