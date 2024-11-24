import Image from "next/image";
import { UpdateShop, DeleteShop } from "@/app/ui/shops/buttons";
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredShops } from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";

export default async function ShopsTable({ query, currentPage }) {
    const shops = await fetchFilteredShops(query, currentPage);

    if (!shops || shops.length === 0) {
        return <div className="mt-6 text-center text-gray-500">Toko tidak ditemukan</div>;
    }

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {shops?.map((shop) => (
                            <div key={shop.id} className="mb-2 w-full rounded-md bg-white p-4">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <img src={shop.default_image_url} className="mr-2 rounded-full" width={28} height={28} alt={shop.name} />
                                            <p>{shop.name}</p>
                                        </div>
                                        {/* <p className="text-sm text-gray-500">{shop.name}</p> */}
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">{shop.amount}</p>
                                        <p>{shop.date}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateShop id={shop.id} />
                                        <DeleteShop id={shop.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Nama
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Kecamatan
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Latitude
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Longitude
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Harga
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {shops?.map((shop) => (
                                <tr key={shop.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <img src={shop.default_image_url} className="rounded-full" width={28} height={28} alt={shop.name} />
                                            <p>{shop.name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">{shop.subdistrict}</td>
                                    <td className="whitespace-nowrap px-3 py-3">{shop.latitude}</td>
                                    <td className="whitespace-nowrap px-3 py-3">{shop.longitude}</td>
                                    <td className="whitespace-nowrap px-3 py-3">{`${formatCurrency(Number(shop.price_min))} - ${formatCurrency(Number(shop.price_max))}`}</td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateShop id={shop.id} />
                                            <DeleteShop id={shop.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
