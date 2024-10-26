import { useEffect, useState } from 'react';
import SubdistrictFilter from './SubdistrictFilter';
import ShopList from './ShopList';
import { fetchAllShops } from '@/app/lib/data';
import { fetchShopsBySubdistrict } from '@/app/lib/data';

export default function Sidebar () {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSubdistrict, setSelectedSubdistrict] = useState("All");

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
            } finally {
                setLoading(false);
            }
        };

        fetchShopsData();
    }, [selectedSubdistrict]);

    const handleSubdistrictChange = (e) => {
        setSelectedSubdistrict(e.target.value);
    };

    return (
        <div className="w-80 h-full bg-white md:flex hidden flex-col">
            <SubdistrictFilter
                selectedSubdistrict={selectedSubdistrict}
                handleSubdistrictChange={handleSubdistrictChange}
            />
            <ShopList shops={shops} loading={loading} error={error} />
        </div>
    );
};