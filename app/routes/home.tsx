import { useFetch } from "~/utils/useFetch";
import type { Route } from "./+types/home";
import { NavLink } from "react-router";
import { Card } from "~/components/shared/Card";

export default function Home() {
  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products",
  );
  const {
    data: categories_data,
    loading: categories_loading,
    error: categories_error,
  } = useFetch("https://fakestoreapi.com/products/categories");

  return (
    <div className="mt-4 flex flex-col items-center">
      <ul className="menu menu-horizontal">
        {categories_data?.map((category, index) => (
          <li className="bg-base-300 mx-2 capitalize" key={index}>
            <NavLink to={`category/${category}`}>{category}</NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
