import EditForm from '@/app/ui/shops/edit-form';
import Breadcrumbs from '@/app/ui/shops/breadcrumbs';
import { fetchShopById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Toko',
};

export default async function Page(props) {
  const params = await props.params;
  const id = params.id;
  const shop = await fetchShopById(id);

  if (!shop) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Toko Kelontong', href: '/dashboard/shops' },
          {
            label: 'Edit Toko',
            href: `/dashboard/shops/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm shop={shop[0]}/>
    </main>
  );
}