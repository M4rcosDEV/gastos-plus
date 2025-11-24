import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

import {
  IconDotsVertical,
  IconUserCircle,
  IconMoodCog,
  IconLogout
} from "@tabler/icons-react"

import { useSidebar } from "@/components/ui/sidebar"

export function NavFooter() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                hover:bg-sidebar-accent/60
                data-[state=open]:bg-sidebar-accent/80
                transition-colors
              "
            >
              <div className="flex flex-col text-left leading-none">
                <span className="truncate font-medium text-sm">
                  Gastos+
                </span>
                <span className="text-xs text-muted-foreground">
                  Configurações
                </span>
              </div>

              <IconDotsVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-48 rounded-xl p-1"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2">
                <IconUserCircle className="size-4" />
                Conta
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2">
                <IconMoodCog className="size-4" />
                Preferências
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
              <IconLogout className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
