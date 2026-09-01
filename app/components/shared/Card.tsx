import { Link } from "react-router";
import { useCart } from "~/contexts/CartContext";
import { formatCurrency } from "~/utils/formatCurrency";

const Card = ({ item }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
    });
  };
  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="bg-white p-4">
        <img className="max-h-48" src={item.image} alt={item.title} />
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

          {!cart.items.some((i) => i.id === item.id) ? (
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
              <span className="self-center text-xl">
                {cart.items.find((i) => i.id === item.id).quantity}
              </span>
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
