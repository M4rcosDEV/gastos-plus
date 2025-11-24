import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarInset
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function Layout(){
 return (
<SidebarProvider>
      {/* Sidebar fixa */}
      <AppSidebar />

      {/* Área do conteúdo da página */}
      <SidebarInset>
        <header className="p-2 border-b flex items-center">
          <SidebarTrigger />
          <h1 className="text-xl font-bold ml-2">Gastos+</h1>
        </header>

        {/* Main content */}
        <main className="p-4">
            
            <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}