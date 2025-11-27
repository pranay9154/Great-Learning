"use client";

import MenuBar from "@/components/pages/menuBar/menuBar";
import Filter from "../filter/filter";
import { ModeToggle } from "@/components/pages/theme/modeToggle";

export default function HomePage() {
    return (
        <div>
            <MenuBar />
            <Filter />
        </div>
    );
}