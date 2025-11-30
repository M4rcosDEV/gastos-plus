
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    photoUrl: string
  }
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
      <div className="flex items-center gap-3 p-2 rounded-lg">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.photoUrl} alt={user.name} />
            <AvatarFallback className="rounded-lg">AV</AvatarFallback>
          </Avatar>

          <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="text-muted-foreground truncate text-xs">
              {user.email}
          </span>
          </div>
      </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
