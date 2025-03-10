import { useState } from "react";
import { Link } from "react-router";
import { FaCompressArrowsAlt, FaFileImage } from "react-icons/fa";

import { Sidebar, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/tooltip";


export default function AppSidebar() {
    const [active, setActive] = useState<string>("home");

    const handleClick = (iconName: string) => {
        setActive(iconName);
    };

    return (
        <Sidebar collapsible="none">
            <TooltipProvider>
                <SidebarMenu className="h-screen flex flex-col items-center justify-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/" onClick={() => handleClick("home")}>
                                <SidebarMenuButton asChild isActive={active === "home"} aria-label="Change Type">
                                    <FaFileImage />
                                </SidebarMenuButton>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Convert images
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/compress" onClick={() => handleClick("compress")}>
                                <SidebarMenuButton asChild isActive={active === "compress"} aria-label="Compress Images">
                                    <FaCompressArrowsAlt />
                                </SidebarMenuButton>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Compress images
                        </TooltipContent>
                    </Tooltip>
                </SidebarMenu>
            </TooltipProvider>
        </Sidebar>
    );
}