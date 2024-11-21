"use client";
import { calculateDistribution } from "@/app/lib/utils";
import { fetchAllShops } from "@/app/lib/data";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { DistributionShopsChartSkeleton } from "../skeletons";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ShopDistributionPieChart() {
    const [data, setData] = useState(null); // State for chart data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shops = await fetchAllShops(); // Fetch the shop data from your API or database

                const distribution = calculateDistribution(shops); // Assumes you have this helper function defined

                if (!distribution || distribution.length === 0) {
                    setData(null);
                } else {
                    const colors = [
                        "#36A2EB", // blue
                        "#FFCE56", // yellow
                        "#FF6384", // pink
                        "#4BC0C0", // teal
                        "#9966FF", // purple
                        "#FF9F40", // orange
                        "#FF6384", // another pink shade for variety if more colors are needed
                    ];
                    // Prepare data for the chart
                    const chartData = {
                        labels: distribution.map((item) => item.subdistrict),
                        datasets: [
                            {
                                label: "Jumlah Toko",
                                data: distribution.map((item) => item.count),
                                backgroundColor: distribution.map((_, index) => colors[index % colors.length]), // Assigns color from predefined array
                                borderColor: "#ffffff",
                                borderWidth: 1,
                            },
                        ],
                    };

                    setData(chartData);
                }
            } catch (error) {
                console.error("Failed to fetch shops:", error);
                setData(null);
                setError(true);
            } finally {
                setLoading(false); // Stop loading indicator
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                // Show skeletons only while loading
                <DistributionShopsChartSkeleton />
            ) : error ? (
                // Show error if loading fails
                <div>Error: {error}</div>
            ) : (
                <div className="w-full md:col-span-4">
                    <div className="w-full">
                        <h2 className="mb-4 text-xl md:text-2xl">Distribusi Toko per Kecamatan</h2>
                    </div>

                    <div className="w-full h-[30rem] flex justify-center items-center rounded-xl bg-gray-50 p-4">
                        <Pie data={data} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
                    </div>
                </div>
            )}
        </>
    );
}
