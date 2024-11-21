import { ClockIcon, BuildingStorefrontIcon, MapPinIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
    shops: BuildingStorefrontIcon,
    subdistrict: MapPinIcon,
    average: ChartBarIcon,
    open: ClockIcon,
};

export default async function CardWrapper() {
    const {
      numberOfShops,
      theMostShopsinSubdistrict,
      priceAverage,
      openShops,
    } = await fetchCardData();

    console.log(theMostShopsinSubdistrict)
    return (
        <>
            <Card title="Jumlah Toko" value={numberOfShops} type="shops" />
            <Card title="Kecamatan terbanyak" value={theMostShopsinSubdistrict} type="subdistrict" />
            <Card title="Rata-rata Harga" value={priceAverage} type="average" />
            <Card title="Toko Buka" value={openShops} type="open" />
        </>
    );
}

export function Card({ title, value, type }) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
                {value}
            </p>
        </div>
    );
}
