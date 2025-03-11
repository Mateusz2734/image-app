import { FaCompressArrowsAlt, FaFileImage } from "react-icons/fa";
import { Link, useLocation } from "react-router";

import { Sidebar, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function AppSidebar() {
    const { pathname } = useLocation();

    return (
        <Sidebar collapsible="none">
            <TooltipProvider>
                <SidebarMenu className="h-screen flex flex-col items-center justify-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/">
                                <SidebarMenuButton asChild isActive={pathname === "/"} aria-label="Change Type">
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
                            <Link to="/compress">
                                <SidebarMenuButton asChild isActive={pathname === "/compress"} aria-label="Compress Images">
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