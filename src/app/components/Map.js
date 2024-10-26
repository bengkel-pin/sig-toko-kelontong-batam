import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";

export default function Map() {
    const [map, setMap] = useState(null);

    const setContainerRef = (element) => {
        if (element && !map) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
            const mapInstance = new mapboxgl.Map({
                container: element,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [104.0354718802255, 1.1291339818308566],
                zoom: 14.5,
            });
            setMap(mapInstance);
        }
    };

    useEffect(() => {
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [map]);
    return <div id="map-container" ref={setContainerRef} style={{ height: "100%" }} className="flex-1"></div>;
}
