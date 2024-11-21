import CardWrapper from "@/app/ui/dashboard/cards";
import ShopDistributionPieChart from "@/app/ui/dashboard/distribution-chart";
import LatestShops from "@/app/ui/dashboard/latest-shops";
// import { lusitana } from '@/app/ui/fonts';
import { Suspense } from "react";
import { CardsSkeleton, LatestShopsSkeleton } from "@/app/ui/skeletons";

export default async function Page() {

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <ShopDistributionPieChart />
                <Suspense fallback={<LatestShopsSkeleton />}>
                    <LatestShops />
                </Suspense>
            </div>
        </main>
    );
}
