import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconListDetails,
  IconCategory,
  IconTransfer
} from "@tabler/icons-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { NavFooter } from "@/components/sidebar/nav-footer"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Marcos Vinicius",
    email: "marcos@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Contas",
      url: "/account",
      icon: IconListDetails,
    },
    {
      title: "Categorias",
      url: "/category",
      icon: IconCategory,
    },
    {
      title: "Transferências",
      url: "#",
      icon: IconTransfer,
    },
    {
      title: "Relatórios",
      url: "#",
      icon: IconChartBar,
    },
    
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser user={data.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter/>
      </SidebarFooter>
    </Sidebar>
  )
}