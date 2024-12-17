
import { useEffect, useRef } from "react";

export function useDirections(map, shopDirection, startCoordinate, setStartCoordinate, setIsDirectionEnabled, onClickedShop, profile) {
    const profileRef = useRef(profile);

    async function getRoute(start, currentProfile) {
        console.log(currentProfile)
        let directionProfile;
        switch (currentProfile) {
            case "driving":
                directionProfile = "driving-car";
                break;
            case "walking":
                directionProfile = "foot-walking";
                break;
            case "cycling":
                directionProfile = "cycling-regular";
                break;
            default:
                break;
        }
        const query = await fetch(`https://api.openrouteservice.org/v2/directions/${directionProfile}?api_key=5b3ce3597851110001cf6248584d5528ebb1452ca4390f3e0f849215&start=${start[0]},${start[1]}&end=${shopDirection.longitude},${shopDirection.latitude}`, { method: "GET" });
        const json = await query.json();
    
        const route = json.features[0].geometry.coordinates;
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
    useEffect(() =>{
        profileRef.current = profile;
        if (startCoordinate) {
            getRoute(startCoordinate, profileRef.current)
        }
    }, [profile])

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

            getRoute(coords, profileRef.current);
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
