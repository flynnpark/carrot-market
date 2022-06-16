import type { NextPage } from 'next';
import Item from 'components/item';
import Layout from 'components/layout';
import useSWR from 'swr';
import { Product } from '@prisma/client';
import { ServiceNumberSelectionBehavior } from 'twilio/lib/rest/proxy/v1/service';
import { ProductWithFavoritesCount } from 'pages';
import ProductList from 'components/product-list';

interface Record {
  id: number;
  product: ProductWithFavoritesCount;
}

interface SalesResponse {
  [key: string]: Record[];
}

const Sold: NextPage = () => {
  const { data } = useSWR<SalesResponse>('/api/users/me/sales');

  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
