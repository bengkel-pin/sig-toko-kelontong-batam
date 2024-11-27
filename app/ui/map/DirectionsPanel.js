import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function DirectionsPanel({ startCoordinate, setStartCoordinate, shopDirection, setShopDirection, profile, setProfile }) {
    return (
        <div id="directions-container" className="absolute top-[10px] left-[10px] w-72 bg-white px-2 py-2 rounded-lg">
            <div className="text-lg font-bold mb-2 flex justify-between items-center">
                <p>Directions</p>
                <button
                    className="p-2 text-black rounded-full hover:bg-gray-200"
                    onClick={() => {
                        setShopDirection(false);
                    }}>
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="bg-white shadow-sm overflow-hidden mb-2">
                <div className="flex items-center border-b border-slate-400 shadow-sm">
                    <label className="flex-none font-bold bg-blue-400 text-white w-10 h-10 flex items-center justify-center" htmlFor="start">
                        A
                    </label>
                    <input className="flex-1 p-1 rounded-md outline-none" id="start" type="text" placeholder="Click a starting place on the map" value={startCoordinate} onChange={(e) => setStartCoordinate(e.target.value)} readOnly/>
                </div>
                <div className="flex items-center">
                    <label className="flex-none font-bold bg-red-600 text-white w-10 h-10 flex items-center justify-center" htmlFor="end">
                        B
                    </label>
                    <input className="flex-1 p-1 rounded-md outline-none bg-white text-gray-400" id="end" type="text" placeholder="Choose destination" disabled value={`${shopDirection.name}`} />
                </div>
            </div>
            <div className="bg-white rounded-full overflow-hidden">
                {!startCoordinate ? (
                    <div className="text-center">You need to click a place on the map!</div>
                ) : (
                    <div id="mode-container" className="flex justify-between px-[2px]">
                        <button
                            className={clsx(
                                "flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700", // Default styles
                                {
                                    "text-gray-700 bg-[#f1f1f1]": profile === "traffic", // Active styles
                                }
                            )}
                            data-mode="traffic"
                            onClick={() => setProfile("traffic")}>
                            Traffic
                        </button>
                        <button
                            className={clsx(
                                "flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700", // Default styles
                                {
                                    "text-gray-700 bg-[#f1f1f1]": profile === "driving", // Active styles
                                }
                            )}
                            data-mode="driving"
                            onClick={() => setProfile("driving")}>
                            Driving
                        </button>
                        <button
                            className={clsx(
                                "flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700", // Default styles
                                {
                                    "text-gray-700 bg-[#f1f1f1]": profile === "walking", // Active styles
                                }
                            )}
                            data-mode="walking"
                            onClick={() => setProfile("walking")}>
                            Walking
                        </button>
                        <button
                            className={clsx(
                                "flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700", // Default styles
                                {
                                    "text-gray-700 bg-[#f1f1f1]": profile === "cycling", // Active styles
                                }
                            )}
                            data-mode="cycling"
                            onClick={() => setProfile("cycling")}>
                            Cycling
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
