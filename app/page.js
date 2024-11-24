"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Map from "./components/Map/Map";

export default function Home() {
    const [shops, setShops] = useState(null); 
    const [clickedShop, setClickedShop] = useState(null);
    const [shopDirection, setShopDirection] = useState(false);

    function onClickedShop (shop) {
        setClickedShop(shop);
    }

    return (
        <>
            <Topbar />
            <div className="w-screen h-screen fixed top-0 left-0 right-0 flex">
                <Sidebar shops={shops} setShops={setShops} clickedShop={clickedShop} onClickedShop={onClickedShop} setShopDirection={setShopDirection}/>
                <div className="w-full h-full pt-[54px]">
                    {shops ?  <Map shops={shops} clickedShop={clickedShop} onClickedShop={onClickedShop} shopDirection={shopDirection} setShopDirection={setShopDirection} /> : <div className="w-full h-full flex justify-center items-center bg-gray-200">Loading map...</div>}
                </div>
            </div>
        </>
    );
}