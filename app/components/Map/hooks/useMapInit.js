"use client";

import maplibregl from "maplibre-gl";
import { useRef, useEffect } from "react";

export function useMapInit(containerRef) {
    const map = useRef(null);
    const maplibreglAccessToken = "XoQ6qbUTMMydz2XxlWt3";
    
    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: containerRef.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${maplibreglAccessToken}`,
            center: [104.0354718802255, 1.1291339818308566],
            zoom: 11,
            attributionControl: false,
        });

        // Add Geolocate Control
        map.current.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            }),
            'bottom-right'
        );

        map.current.addControl(new maplibregl.NavigationControl(), 'bottom-right');
        map.current.touchZoomRotate.disableRotation();

        map.current.addControl(
            new maplibregl.AttributionControl({
                compact: true,
                customAttribution: "<span class=\"hidden md:inline\">Made with ❤️ by </span><span><a href='https://kelvin-dev.vercel.app/' target='_blank'>&copy; Kelvin</a></span>",
            }),
            "bottom-left"
        );
    }, [containerRef]);

    return map;
}
