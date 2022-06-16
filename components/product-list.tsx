import { ProductWithFavoritesCount } from 'pages';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
  kind: 'favorites' | 'sales' | 'purchases';
}

type Keys = 'favorites' | 'sales' | 'purchases';

interface Record {
  id: number;
  product: ProductWithFavoritesCount;
}

type ProductListResponse = {
  [key in Keys]: Record[];
} & {
  success: boolean;
};

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);

  return (
    <>
      {data
        ? data[kind]?.map((record) => (
            <Item
              id={record.id}
              key={record.id}
              title={record.product.name}
              price={record.product.price}
              hearts={record.product._count.favorites}
            />
          ))
        : null}
    </>
  );
}
