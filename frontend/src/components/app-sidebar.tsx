import { useState } from "react";
import { FaCompressArrowsAlt, FaFileImage } from "react-icons/fa";

import { Sidebar, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";


export default function AppSidebar() {
    const [activeIcon, setActiveIcon] = useState<string>("home");

    const handleIconClick = (iconName: string) => {
        setActiveIcon(iconName);
    };

    return (
        <Sidebar collapsible="none">
            <SidebarMenu className="h-screen flex flex-col items-center justify-center">
                <SidebarMenuButton asChild
                    isActive={activeIcon === "home"}
                    onClick={() => handleIconClick("home")}
                    aria-label="Change Type"
                >
                    <FaFileImage />
                </SidebarMenuButton>

                <SidebarMenuButton asChild
                    isActive={activeIcon === "compress"}
                    onClick={() => handleIconClick("compress")}
                    aria-label="Compress Images"
                >
                    <FaCompressArrowsAlt />
                </SidebarMenuButton>
            </SidebarMenu>
        </Sidebar>
    );
}