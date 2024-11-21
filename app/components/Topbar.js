import React from "react";
import { TokelLogoBlue } from "../ui/tokel-logo";

export default function Topbar() {
    return (
        <div className="fixed w-full h-[54px] bg-white flex items-center justify-between p-4 top-0 left-0 right-0 shadow-md">
            <TokelLogoBlue />
            <button className="bg-blue-400 py-1 px-2 rounded-sm text-white text-xs hover:bg-blue-700 md:hidden block">Daftar</button>
        </div>
    );
}
