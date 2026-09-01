type Categories = string[];

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type CartItem = Pick<Product, "id" | "title" | "price" | "image"> & {
  quantity: number;
};

type CartData = {
  items: CartItem[];
  total: string;
  itemCount: number;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" };

type CartContextType = {
  cart: CartData;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

export type {
  Categories,
  Product,
  CartItem,
  CartData,
  CartAction,
  CartContextType,
};
