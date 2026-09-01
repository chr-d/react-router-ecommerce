import { Card } from "~/components/shared/Card";
import type { Route } from "./+types/category";
import { useFetch } from "~/utils/useFetch";

export default function Category() {
  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products",
  );
  const filteredData = data?.filter((item) => item.category === category);
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4 text-2xl capitalize">{category}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredData?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
