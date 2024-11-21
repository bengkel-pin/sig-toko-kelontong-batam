import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Popup } from "maplibre-gl";

export default function Map({ shops, clickedShop }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markers = useRef([]); // Store markers in a ref
    const maplibreglAccessToken = "XoQ6qbUTMMydz2XxlWt3";

    MapboxDraw.constants.classes.CONTROL_BASE = "maplibregl-ctrl";
    MapboxDraw.constants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
    MapboxDraw.constants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${maplibreglAccessToken}`,
            center: [104.0354718802255, 1.1291339818308566],
            zoom: 14.5,
        });

        // Add Geolocate Control
        map.current.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );

        map.current.addControl(new maplibregl.NavigationControl());
        map.current.touchZoomRotate.disableRotation();

        // // Initialize Mapbox Draw and add it to the map
        // const draw = new MapboxDraw({
        //     displayControlsDefault: false,
        //     controls: {
        //         polygon: true,
        //         trash: true,
        //     },
        // });
        // map.current.addControl(draw);

        // // Event listener for draw events (create, update, delete)
        // map.current.on("draw.create", updateCoordinates);
        // map.current.on("draw.update", updateCoordinates);
        // map.current.on("draw.delete", updateCoordinates);

        // function updateCoordinates() {
        //     const data = draw.getAll();
        //     if (data.features.length > 0) {
        //         const coordinates = data.features[0].geometry.coordinates;
        //         console.log("Polygon Coordinates:", coordinates);
        //     }
        // }
    }, [maplibreglAccessToken, shops]);

    // Effect to update markers when shops change
    useEffect(() => {
        if (!map.current) return; // Ensure the map is initialized

        markers.current.forEach((marker) => marker.remove());
        markers.current = []; // Reset markers array

        shops.forEach((shop) => {
            const customMarker = document.createElement("img");
            customMarker.src = "https://f58yuoc1atpje7r2.public.blob.vercel-storage.com/assets/custom-marker-g05MH5R5s409radp7kyQhH0GLekCQn.png";
            customMarker.style.width = "1.5rem";
            customMarker.style.heigth = "1.5rem";

            const marker = new maplibregl.Marker({ element: customMarker, anchor: "bottom" })
                .setLngLat([shop.latitude, shop.longitude])
                .addTo(map.current);
            markers.current.push(marker);
        });
    }, [shops]);

    useEffect(() => {
        const flyToShop = (shop) => {
            if (shop) {
                map.current.flyTo({
                    center: [shop.latitude, shop.longitude],
                    zoom: 15, // Adjust zoom level as needed
                    essential: true, // Required to make the flyTo animation work
                });
            }
        };

        if (clickedShop) flyToShop(clickedShop);
    }, [clickedShop]);

    return <div ref={mapContainer} style={{ height: "100%" }} className="relative flex-1 mt-[54px]"></div>;
}
