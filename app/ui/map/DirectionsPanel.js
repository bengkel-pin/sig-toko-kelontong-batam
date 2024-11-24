import { XMarkIcon } from "@heroicons/react/24/outline";

export default function DirectionsPanel({
    startCoordinate,
    setStartCoordinate,
    shopDirection,
    setShopDirection,
}) {
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
                            <input className="flex-1 p-1 rounded-md outline-none" id="start" type="text" placeholder="Click a starting place on the map" value={startCoordinate} onChange={(e) => setStartCoordinate(e.target.value)} />
                        </div>
                        <div className="flex items-center">
                            <label className="flex-none font-bold bg-purple-400 text-white w-10 h-10 flex items-center justify-center" htmlFor="end">
                                B
                            </label>
                            <input className="flex-1 p-1 rounded-md outline-none bg-white text-gray-400" id="end" type="text" placeholder="Choose destination" disabled value={`${shopDirection.latitude}, ${shopDirection.longitude}`} />
                        </div>
                    </div>
                    <div className="bg-white rounded-full overflow-hidden">
                        <div id="mode-container" className="flex justify-between px-[2px]">
                            <button className="flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700 active:bg-[#f1f1f1]" data-mode="traffic">
                                Traffic
                            </button>
                            <button className="flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700 active:bg-[#f1f1f1]" data-mode="driving">
                                Driving
                            </button>
                            <button className="flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700 active:bg-[#f1f1f1]" data-mode="walking">
                                Walking
                            </button>
                            <button className="flex-1 my-[2px] p-1 rounded-full cursor-pointer text-xs hover:text-gray-700 active:bg-[#f1f1f1]" data-mode="cycling">
                                Cycling
                            </button>
                        </div>
                    </div>
                </div>
    );
}