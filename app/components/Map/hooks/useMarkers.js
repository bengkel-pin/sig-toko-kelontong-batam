import { useEffect } from "react";
import { fetchShopById } from "@/app/lib/data";

export function useMarkers(map, shops, setMarkerClicked, isDirectionEnabled, setIsDirectionEnabled) {
    useEffect(() => {
        if (!map.current || !shops.length) return;

        const shopsGeoJSON = {
            type: "FeatureCollection",
            features: shops.map((shop) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [shop.longitude, shop.latitude], // Fixed coordinates order
                },
                properties: {
                    id: shop.id,
                    name: shop.name,
                },
            })),
        };

        const onLoad = () => {
            const loadCustomMarkerImage = async () => {
                const customMarkerImage = await map.current.loadImage("./assets/custom-marker.png");
                if (!map.current.hasImage("custom-marker")) map.current.addImage("custom-marker", customMarkerImage.data);

                const customMarkerPersonImage = await map.current.loadImage("./assets/person.png");
                if (!map.current.hasImage("custom-marker-person")) map.current.addImage("custom-marker-person", customMarkerPersonImage.data);
            };

            loadCustomMarkerImage();

            if (map.current.getLayer("markers")) map.current.removeLayer("markers");

            if (map.current.getSource("shops")) map.current.removeSource("shops");

            map.current.addSource("shops", {
                type: "geojson",
                data: shopsGeoJSON,
            });

            map.current.addLayer({
                id: "markers",
                type: "symbol",
                source: "shops",
                layout: {
                    "text-field": ["get", "name"],
                    "icon-image": "custom-marker",
                    "icon-size": 0.8, // Adjust size if needed
                    "icon-anchor": "bottom",
                    "icon-allow-overlap": true,
                    "text-variable-anchor": ["left", "right"],
                    "text-variable-anchor-offset": ["left", [1.2, -1.2], "right", [-1.2, -1.2]],
                    "text-overlap": "cooperative",
                    "text-size": 12,
                },
            });
        };

        // Cek apakah peta sudah ter-load
        if (map.current.loaded()) {
            onLoad();
        } else {
            // Tambahkan event listener jika peta belum ter-load
            map.current.on("load", onLoad);
        }

        const handleMarkersClick = async (e) => {
            const id = e.features[0].properties.id;

            let shop;
            const fetchData = async () => {
                try {
                    shop = await fetchShopById(id);

                    setMarkerClicked(shop[0]);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        };

        function handleMouseEnterMarkers() {
            map.current.getCanvas().style.cursor = "pointer";
        }

        function handleMouseLeaveMarkers() {
            map.current.getCanvas().style.cursor = "";
        }

        if (isDirectionEnabled) {
            map.current.off("click", "markers", handleMarkersClick);

            map.current.off("mouseenter", "markers", handleMouseEnterMarkers);

            map.current.off("mouseleave", "markers", handleMouseLeaveMarkers);
        } else {
            map.current.on("click", "markers", handleMarkersClick);

            map.current.on("mouseenter", "markers", handleMouseEnterMarkers);

            map.current.on("mouseleave", "markers", handleMouseLeaveMarkers);
        }
        return () => {
            if (!isDirectionEnabled) {
                map.current.off("click", "markers", handleMarkersClick);

                map.current.off("mouseenter", "markers", handleMouseEnterMarkers);

                map.current.off("mouseleave", "markers", handleMouseLeaveMarkers);
            }
            map.current.off("load", onLoad);
        };
    }, [shops, isDirectionEnabled]);
}
