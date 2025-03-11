import { Outlet } from "react-router";
import { toast } from "sonner";

import { EventsOn } from "@wails/runtime";
import Sidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

EventsOn("error", (data: string) => {
    toast.error(data);
});

EventsOn("success", (data: string) => {
    toast.success(data);
});

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