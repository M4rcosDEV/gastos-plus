import { Outlet, useMatches } from "react-router-dom";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function Layout(){
  const routeHistory = useMatches() as {handle?: {title: string}}[];

  const currentRoute = routeHistory.find(route => route.handle);

  const title = currentRoute?.handle?.title || "Gastos+";

  return (
    <SidebarProvider>
      {/* Sidebar fixa */}
      <AppSidebar />

      {/* Área do conteúdo da página */}
      <SidebarInset>
        <header className="p-2 border-b flex items-center">
          <SidebarTrigger />
          <h1 className="text-xl font-bold ml-2">{title}</h1>
        </header>

        {/* Main content */}
        <main className="p-4">
            <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
    );
}