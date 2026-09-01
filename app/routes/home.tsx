import { useFetch } from "~/utils/useFetch";
import type { Route } from "./+types/home";
import { NavLink } from "react-router";
import { Card } from "~/components/shared/Card";

export async function loader() {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch("https://fakestoreapi.com/products"),
    fetch("https://fakestoreapi.com/products/categories"),
  ]);

  if (!productsRes.ok || !categoriesRes.ok) {
    throw new Response("Failed to load data", { status: 500 });
  }

  const data = await productsRes.json();
  const categories_data = await categoriesRes.json();

  return { data, categories_data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data, categories_data } = loaderData;
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
