
import { useEffect } from "react";

export function useDirections(map, shopDirection, setStartCoordinate, setIsDirectionEnabled, onClickedShop) {
    async function getRoute(start) {
        // make a directions request using cycling profile
        // an arbitrary start will always be the same
        // only the end or destination will change
        const query = await fetch(`http://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${shopDirection.longitude},${shopDirection.latitude}?steps=true&geometries=geojson`, { method: "GET" });
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: route,
            },
        };
        // if the route already exists on the map, we'll reset it using setData
        if (map.current.getSource("route")) {
            map.current.getSource("route").setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
            map.current.addLayer({
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: geojson,
                },
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#3887be",
                    "line-width": 5,
                    "line-opacity": 0.75,
                },
            });
        }
        // add turn instructions here at the end
    }

    useEffect(() => {
        const handleMapClick = (e) => {
            const coords = Object.keys(e.lngLat).map((key) => e.lngLat[key]);

            setStartCoordinate(coords);

            const start = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: coords,
                        },
                    },
                ],
            };

            if (map.current.getSource("start")) {
                console.log("Sourcenya masih ada");
                map.current.getSource("start").setData(start);
            } else {
                map.current.addLayer({
                    id: "start",
                    type: "symbol",
                    source: {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [
                                {
                                    type: "Feature",
                                    properties: {},
                                    geometry: {
                                        type: "Point",
                                        coordinates: coords,
                                    },
                                },
                            ],
                        },
                    },
                    layout: {
                        "icon-image": "custom-marker-person",
                        "icon-size": 1, // Adjust size if needed
                        "icon-anchor": "bottom"
                    },
                });
            }

            getRoute(coords);
        };

        if (!shopDirection) {
            setIsDirectionEnabled(false);
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

            return;
        }

        onClickedShop(null);
        setStartCoordinate("");
        setIsDirectionEnabled(true);

        const canvas = map.current.getCanvas();

        const handleMouseEnter = () => {
            canvas.style.cursor = "pointer";
        };

        const handleMouseLeave = () => {
            canvas.style.cursor = "";
        };

        canvas.addEventListener("mouseenter", handleMouseEnter);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        map.current.on("click", handleMapClick);
        return () => {
            canvas.removeEventListener("mouseenter", handleMouseEnter);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            map.current.off("click", handleMapClick);
        };
    }, [shopDirection]);
}
