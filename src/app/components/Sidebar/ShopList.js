import { useRef, useState } from "react";

export default function ShopList({ shops, loading, error }) {
    if (loading) {
        return <p  className="h-min w-full flex px-4">Loading...</p>; // Show loading message while fetching shops
    }

    if (error) {
        return <p>Error: {error}</p>; // Show error message if fetching fails
    }

    const subdistrictListRef = useRef(null);
    const [hasShadow, setHasShadow] = useState(false);

    const handleScroll = () => {
        const scrollTop = subdistrictListRef.current.scrollTop;
        setHasShadow(scrollTop !== 0);
    };

    return (
        <div ref={subdistrictListRef} className={`flex flex-col overflow-x-hidden overflow-y-auto ${hasShadow ? "shadow-inner" : ""}`} onScroll={handleScroll}>
            {shops.map((item) => (
                <div key={item.name} className="h-min w-full flex pt-6 pb-4 px-4 border-b-2 hover:bg-gray-200 cursor-pointer">
                    <div className="flex-auto">
                        <h2 className="font-medium">{item.name}</h2>
                        <p className="font-light text-gray-500 text-sm">
                            Rp{item.priceRange.min} - Rp{item.priceRange.max}
                        </p>
                    </div>
                    <div className="flex-none px-2">
                        <img className="h-[84px] w-[84px] rounded" src={`./uploads/${item.defaultImage}`} alt="Default" />
                    </div>
                </div>
            ))}
        </div>
    );
}
