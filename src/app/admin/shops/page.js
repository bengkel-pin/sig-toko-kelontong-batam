import Search from "@/app/ui/search";
// import Pagination from "@/app/ui/invoices/pagination";
// import Table from "@/app/ui/invoices/table";
import { CreateShop } from "@/app/ui/shops/buttons";
// import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
// import { fetchInvoicesPages } from "@/app/lib/data";
// import { Suspense } from "react";

export const metadata = {
    title: "Toko Kelontong",
};

export default async function Page({ searchParams }) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`text-2xl`}>Toko Kelontong</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Cari toko kelontong..." />
                <CreateShop />
            </div>
            {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense> */}
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
        </div>
    );
}
