"use client";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { ChevronDown, CircleUserRound, School } from "lucide-react";
import UserOptions from "../userOptions/userOptions";
import { ModeToggle } from "../theme/modeToggle";

export default function MenuBar() {
    return (
        <Menubar className="p-10 flex flex-row justify-between sticky top-0 z-10">
            <div className="flex flex-row items-center gap-2">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    <School />
                </Button>
                <h1 className="font-sans text-xl">
                    Great Learning</h1>
            </div>
            <div className="flex flex-row items-center gap-2">
                <CircleUserRound />
                <p>Pranay Kasibhatta</p>
                <UserOptions></UserOptions>
            </div>
        </Menubar>
    )
}