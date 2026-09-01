import { Link } from "react-router";
import { useCart } from "~/contexts/CartContext";
import type { Product } from "~/types";
import { formatCurrency } from "~/utils/formatCurrency";

const Card = ({ item }: { item: Product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItem = cart.items.find((i) => i.id === item.id);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    });
  };
  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="bg-white p-4 h-48">
        <img
          className="h-full"
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p className="truncate">{item.description}</p>
        <div className="badge badge-outline text-xs capitalize">
          <Link to={`category/${item.category}`}>{item.category}</Link>
        </div>
        <div className="card-actions justify-end">
          <span className="self-center text-xl">
            {formatCurrency(item.price)}
          </span>

          {!cartItem ? (
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to cart
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
              <span className="self-center text-xl">{cartItem.quantity}</span>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                +
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { Card };
