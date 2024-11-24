import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
// import Image from "next/image";
import { fetchLatestShops } from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";

export default async function LatestInvoices() {
    const latestShops = await fetchLatestShops();

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <h2 className={` mb-4 text-xl md:text-2xl`}>Toko yang baru ditemukan</h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {latestShops.map((shop, i) => {
                        return (
                            <div
                                key={shop.id}
                                className={clsx("flex flex-row items-center justify-between py-4", {
                                    "border-t": i !== 0,
                                })}>
                                <div className="flex items-center">
                                    <img src={shop.default_image_url} alt={`${shop.name}'s image`} className="mr-4 rounded-full" width={32} height={32} />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base">{shop.name}</p>
                                        <p className="hidden text-sm text-gray-500 sm:block">{shop.subdistrict}</p>
                                    </div>
                                </div>
                                <p className={`$ truncate text-sm font-medium md:text-base`}>
                                    {formatCurrency(Number(shop.price_min))} - {formatCurrency(Number(shop.price_max))}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                </div>
            </div>
        </div>
    );
}
