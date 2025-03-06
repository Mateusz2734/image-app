import { useState } from "react";
import { Link } from "react-router";
import { FaCompressArrowsAlt, FaFileImage } from "react-icons/fa";

import { Sidebar, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";


export default function AppSidebar() {
    const [active, setActive] = useState<string>("home");

    const handleClick = (iconName: string) => {
        setActive(iconName);
    };

    return (
        <Sidebar collapsible="none">
            <SidebarMenu className="h-screen flex flex-col items-center justify-center">
                <Link to="/" onClick={() => handleClick("home")}>
                    <SidebarMenuButton asChild isActive={active === "home"} aria-label="Change Type">
                        <FaFileImage />
                    </SidebarMenuButton>
                </Link>

                {/* <Link to="/compress" onClick={() => handleClick("compress")}>
                    <SidebarMenuButton asChild isActive={active === "compress"} aria-label="Compress Images">
                        <FaCompressArrowsAlt />
                    </SidebarMenuButton>
                </Link> */}
            </SidebarMenu>
        </Sidebar>
    );
}