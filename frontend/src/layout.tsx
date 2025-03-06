import { Outlet } from "react-router";

import Sidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout() {
    return (
        <SidebarProvider className="h-full w-full">
            <Sidebar />
            <main className="flex flex-col items-center justify-center h-screen w-full bg-background/0">
                <Outlet />
            </main>
        </SidebarProvider>
    );
}