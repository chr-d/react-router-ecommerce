import { NavLink } from "react-router";
import { Card } from "~/components/shared/Card";
import { fetchData } from "~/utils/fetchData";
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const [productsData, categoriesData] = await Promise.all([
    fetchData("https://fakestoreapi.com/products", {
      signal: request.signal,
    }),
    fetchData("https://fakestoreapi.com/products/categories", {
      signal: request.signal,
    }),
  ]);

  return { productsData, categoriesData };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { productsData, categoriesData } = loaderData;
  return (
    <div className="mt-4 flex flex-col items-center">
      <ul className="menu menu-horizontal">
        {categoriesData?.map((category, index) => (
          <li className="bg-base-300 mx-2 capitalize" key={index}>
            <NavLink to={`category/${category}`}>{category}</NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {productsData?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
