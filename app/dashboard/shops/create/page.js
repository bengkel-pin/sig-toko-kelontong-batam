import { fetchAllShops } from "@/app/lib/data";
import Form from "@/app/ui/shops/create-form";
import Breadcrumbs from "@/app/ui/shops/breadcrumbs";

export const metadata = {
    title: "Tambah Toko",
};

export default async function Page() {
    const shops = await fetchAllShops();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Toko Kelontong", href: "/dashboard/shops" },
                    {
                        label: "Tambah toko",
                        href: "/dashboard/shops/create",
                        active: true,
                    },
                ]}
            />
            <Form shops={shops} />
        </main>
    );
}
