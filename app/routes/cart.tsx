import { formatCurrency } from "~/utils/formatCurrency";
import type { Route } from "./+types/cart";
import { useCart } from "~/contexts/CartContext";

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
    });
  };
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };
  const handleClearCart = () => clearCart();
  return (
    <div className="mx-8 mt-8">
      <ul className="list bg-base-200 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl tracking-wide opacity-60">
          Items in your cart
        </li>

        {cart.items.map((item) => (
          <li className="md:list-row" key={item.id}>
            <div className="flex size-20 justify-center bg-white p-2">
              <img
                className="h-full"
                alt={item.name}
                src={item.image}
                loading="lazy"
              />
            </div>
            <div>
              <div>{item.name}</div>
              <div className="text-xs font-semibold opacity-60">
                Unit price: {formatCurrency(item.price)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-primary btn-square"
                onClick={() => {
                  handleRemoveFromCart(item.id);
                }}
              >
                -
              </button>
              <span className="text-xl">{item.quantity}</span>
              <button
                className="btn btn-primary btn-square"
                onClick={() => {
                  handleAddToCart(item);
                }}
              >
                +
              </button>
              <span className="text-xl">
                {formatCurrency(item.quantity * item.price)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="p-4 text-right text-xl">TOTAL: {cart.total}</p>
      <div className="flex justify-end gap-4">
        <button className="btn btn-error" onClick={handleClearCart}>
          Clear cart
        </button>
        <button className="btn btn-info">Buy now</button>
      </div>
    </div>
  );
}
