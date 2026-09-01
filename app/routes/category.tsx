import { Card } from "~/components/shared/Card";
import type { Route } from "./+types/category";

export async function loader({ params }: Route.LoaderArgs) {
  const category = params.category;

  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  );
  const data = await res.json();

  return { data, category };
}

export default function Category({ loaderData }: Route.ComponentProps) {
  const { data, category } = loaderData;
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4 text-2xl capitalize">{category}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {data?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
