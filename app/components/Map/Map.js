import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useMapInit } from "./hooks/useMapInit";
import { useMarkers } from "./hooks/useMarkers";
import DirectionsPanel from "@/app/ui/map/DirectionsPanel";
import { useDirections } from "./hooks/useDirections";

export default function Map({ shops, clickedShop, onClickedShop, shopDirection, setShopDirection }) {
    const mapContainer = useRef(null);

    // Initiate the map
    const map = useMapInit(mapContainer);

    // Create a marker clicked state
    const [markerClicked, setMarkerClicked] = useState(null);

    const [isDirectionEnabled, setIsDirectionEnabled] = useState(false);
    const [startCoordinate, setStartCoordinate] = useState("");

    useMarkers(map, shops, setMarkerClicked, isDirectionEnabled); // Add marker to the map based on the shop data

    // Hooks if there is a marker clicked
    useEffect(() => {
        onClickedShop(markerClicked);
    }, [markerClicked]);

    // Hooks if one of the shop in the sidebar clicked
    useEffect(() => {
        if (clickedShop) {
            setShopDirection(false);
            if (map.current.loaded()) {
                if (map.current.getSource("start")) {
                    map.current.removeLayer("start");
                    map.current.removeSource("start");
                }
                if (map.current.getSource("route")) {
                    map.current.removeLayer("route");
                    map.current.removeSource("route");
                }
            }
        }
        const flyToShop = (shop) => {
            if (shop) {
                map.current.flyTo({
                    center: [shop.longitude, shop.latitude],
                    zoom: 18, // Adjust zoom level as needed
                    essential: true, // Required to make the flyTo animation work
                    offset: [200, 0],
                });

                // const popUps = document.getElementsByClassName("maplibregl-popup");

                // if (popUps[0]) popUps[0].remove();

                // const popup = new Popup({ offset: [0, -40] }).setLngLat([shop.latitude, shop.longitude]).setHTML(`<h3>${shop.name}</h3>`).addTo(map.current);
            }
        };

        if (clickedShop) flyToShop(clickedShop);
    }, [clickedShop]);

    useDirections(map, shopDirection, setStartCoordinate, setIsDirectionEnabled, onClickedShop);

    return (
        <div ref={mapContainer} style={{ height: "100%" }} className="relative flex-1 pt-[54px">
            {isDirectionEnabled && (
                <DirectionsPanel
                    startCoordinate={startCoordinate}
                    setStartCoordinate={setStartCoordinate}
                    shopDirection={shopDirection}
                    setShopDirection={setShopDirection}
                />
            )}
        </div>
    );
}
