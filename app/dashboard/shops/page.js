import Search from "@/app/ui/search";
import Pagination from "@/app/ui/shops/pagination";
import ShopsTable from "@/app/ui/shops/tables";
import { CreateShop } from "@/app/ui/shops/buttons";
import { ShopsTableSkeleton } from "@/app/ui/skeletons";
import { fetchShopsPages } from "@/app/lib/data";
import { Suspense } from "react";

export const metadata = {
    title: "Daftar Toko Kelontong",
};

export default async function Page({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.query || "";
    const currentPage = Number(resolvedSearchParams?.page) || 1;
    const totalPages = await fetchShopsPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`text-2xl`}>Toko Kelontong</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Cari toko kelontong..." />
                <CreateShop />
            </div>
            <Suspense key={query + currentPage} fallback={<ShopsTableSkeleton />}>
                <ShopsTable query={query} currentPage={currentPage} />
            </Suspense>
            {totalPages > 0 && (
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            )}
        </div>
    );
}
