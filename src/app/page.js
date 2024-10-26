"use client";

import { useRef, useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar";
import Map from "./components/Map";

export default function Home() {
    return (
        <>
            <div className="w-screen h-screen fixed top-0 left-0 right-0 flex">
                <Sidebar />
                <Map />
            </div>
            <Topbar />
        </>
    );
}