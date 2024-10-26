const start = [104.0354718802255, 1.1291339818308566];

async function getRoute(end) {
    const query = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`, { method: "GET" });

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

    if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
    } else {
        map.addLayer({
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
                "line-color": "#ffff3f",
                "line-width": 2,
                "line-opacity": 0.75,
            },
        });
    }

    // const instructions = document.getElementById("instructions");
    // const steps = data.legs[0].steps;

    // let tripInstructions = "";
    // for (const step of steps) {
    //     tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    // }

    // instructions.innerHTML = `<p><strong>Trip durationi: ${Math.floor(data.duration / 60)} min 🗿 </strong></p><ol>${tripInstructions}</ol>`;
}

map.on("load", () => {
    getRoute(start);

    map.addLayer({
        id: "point",
        type: "circle",
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
                            coordinates: start,
                        },
                    },
                ],
            },
        },
        paint: {
            "circle-radius": 10,
            "circle-color": "#80ffdb",
        },
    });

    map.on("click", (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        const end = {
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
        if (map.getLayer("end")) {
            map.getSource("end").setData(end);
        } else {
            map.addLayer({
                id: "end",
                type: "circle",
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
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#fe6d73",
                },
            });
        }
        getRoute(coords);
    });
});
