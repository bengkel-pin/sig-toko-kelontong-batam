import { useState, useRef, useEffect } from "react";
import { ShopsSideBarSkeleton } from "@/app/ui/skeletons";
import { fetchAllShops, fetchShopsBySubdistrict } from "@/app/lib/data";
import { BanknotesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/app/lib/utils";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Sidebar({ shops, setShops, clickedShop, onClickedShop }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSubdistrict, setSelectedSubdistrict] = useState("All");

    const subdistrictListRef = useRef(null);
    const [hasShadow, setHasShadow] = useState(false);

    const handleScroll = () => {
        const scrollTop = subdistrictListRef.current.scrollTop;
        setHasShadow(scrollTop !== 0);
    };

    const handleSubdistrictChange = (e) => {
        onClickedShop(null);
        setSelectedSubdistrict(e.target.value);
    };

    useEffect(() => {
        const fetchShopsData = async () => {
            setLoading(true); // Ensure loading is true before the fetch starts

            try {
                let res;

                // Simulating network delay using setTimeout
                // await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay

                // Check if a specific subdistrict is selected
                if (selectedSubdistrict !== "All") {
                    res = await fetchShopsBySubdistrict(selectedSubdistrict);
                } else {
                    res = await fetchAllShops(); // Fetch all shops if 'All' is selected
                }

                setShops(res);
            } catch (error) {
                setError(error.message);
                // }
            } finally {
                setLoading(false);
            }
        };

        fetchShopsData();
    }, [selectedSubdistrict, setShops]);

    const isShopOpen = (opens, closes) => {
        const now = new Date();
        const currentTime = now.getHours() + now.getMinutes() / 60;

        const openingTime = parseFloat(opens.replace(":", "."));
        const closingTime = parseFloat(closes.replace(":", "."));

        if (closingTime < openingTime) {
            // Handle overnight hours (e.g., 06:00 to 01:00)
            return currentTime >= openingTime || currentTime < closingTime;
        }
        return currentTime >= openingTime && currentTime < closingTime;
    };

    return (
        <div className="relative w-80 flex-none h-full bg-white md:flex hidden flex-col">
            <div className="mt-14 p-4">
                <p className="font-bold">Pilih Kecamatan</p>
                <select name="subdistrict" id="subdistrict-filter" className="border-[2px] w-full p-2 rounded outline-none mt-2 cursor-pointer" value={selectedSubdistrict} onChange={handleSubdistrictChange}>
                    <option value="All">Semua</option>
                    <option value="Batu Aji">Batu Aji</option>
                    <option value="Batu Ampar">Batu Ampar</option>
                </select>
            </div>
            <div ref={subdistrictListRef} className={`flex flex-col overflow-x-hidden overflow-y-auto ${hasShadow ? "shadow-inner" : ""}`} onScroll={handleScroll}>
                {loading ? (
                    // Show skeletons only while loading
                    <ShopsSideBarSkeleton />
                ) : error ? (
                    // Show error if loading fails
                    <div>Error: {error}</div>
                ) : (
                    // Show shops only after loading is complete
                    shops.map((shop) => {
                        const openStatus = isShopOpen(shop.opens, shop.closes);

                        return (
                            <div key={shop.id} className="h-min w-full flex pt-6 pb-4 px-4 border-b-2 hover:bg-gray-200 cursor-pointer" onClick={() => onClickedShop(shop)}>
                                <div className="flex-auto">
                                    <h2 className="font-medium">{shop.name}</h2>
                                    <p className="font-light text-gray-500 text-sm">{shop.subdistrict}</p>
                                    <p className="text-sm">
                                        <span className={`${openStatus ? "text-green-500" : "text-red-500"}`}>{openStatus ? "Buka" : "Tutup"}</span>
                                        <span className="text-gray-500">{openStatus ? ` • Tutup jam ${shop.closes}` : ` • Buka jam ${shop.opens}`}</span>
                                    </p>
                                    <p className="font-light text-gray-500 text-sm">
                                        <BanknotesIcon className="h-4 w-4 inline mr-2" />
                                        {formatCurrency(Number(shop.price_min))} - {formatCurrency(Number(shop.price_max))}
                                    </p>
                                </div>
                                <div className="flex-none px-2">
                                    <img className="h-[84px] w-[84px] rounded" src={shop.default_image_url} alt="Default" />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {clickedShop && (
                <div key={clickedShop.id} className="absolute top-20 -right-[26rem] bg-white h-min w-96 z-10 rounded-3xl">
                    <div className="relative w-full">
                        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="w-full aspect-square rounded-tl-3xl rounded-tr-3xl">
                            <SwiperSlide>
                                <img className="w-full object-cover object-center" src={clickedShop.default_image_url} alt="Default" />
                            </SwiperSlide>
                            {clickedShop.image_2_url && (
                            <SwiperSlide>
                                <img className="w-full object-cover object-center" src={clickedShop.image_2_url} alt="Image 2" />
                            </SwiperSlide>)}
                            {clickedShop.image_3_url && (
                            <SwiperSlide>
                                <img className="w-full object-cover object-center" src={clickedShop.image_3_url} alt="Image 3" />
                            </SwiperSlide>)}
                        </Swiper>
                        <button type="button" title="Close" className="absolute z-10 top-4 right-4 bg-white hover:bg-gray-200 text-black p-1 h-8 w-8 rounded-full" onClick={() => onClickedShop(null)}>
                            <XMarkIcon />
                        </button>
                    </div>
                    <div className="flex flex-col py-4 px-4">
                        <h2 className="font-medium text-2xl">{clickedShop.name}</h2>
                        <p className="font-light text-gray-500 text-md">{clickedShop.subdistrict}</p>
                        <p className="text-md">
                            <span className={`${isShopOpen(clickedShop.opens, clickedShop.closes) ? "text-green-500" : "text-red-500"}`}>{isShopOpen(clickedShop.opens, clickedShop.closes) ? "Buka" : "Tutup"}</span>
                            <span className="text-gray-500">{isShopOpen(clickedShop.opens, clickedShop.closes) ? ` • Tutup jam ${clickedShop.closes}` : ` • Buka jam ${clickedShop.opens}`}</span>
                        </p>
                        <p className="font-light text-gray-500 text-md">
                            <BanknotesIcon className="h-4 w-4 inline mr-2" />
                            {formatCurrency(Number(clickedShop.price_min))} - {formatCurrency(Number(clickedShop.price_max))}
                        </p>
                    </div>
                    <div className="px-4 py-4 border-t-2 border-t-blue-500">
                        <Link href={"/data-collecting"} className="text-blue-500 text-sm font-medium">
                            Tentang data ini
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
