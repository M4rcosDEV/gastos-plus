import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Category } from "@/interfaces/Category"
import { categoryIcons } from "@/components/icons/icons"

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="ml-4"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="ml-4">{row.getValue("name")}</div>
    },
    {
        accessorKey: "icon",
        header: "Ícone",
        cell: ({ row }) => {
            const iconName = row.getValue("icon") as string;
            const iconEntry = categoryIcons.find((i) => i.name === iconName);
            const IconComponent = iconEntry?.icon;
            return IconComponent ? <IconComponent size={20} /> : null;

        }
    },
    
    {
        accessorKey: "color",
        header: "Cor",
        cell: ({ row }) => {
            const color = row.getValue("color") as string

            return (
            <div className="flex items-center gap-2">
                <div
                className="h-5 w-5 rounded-full"
                style={{ backgroundColor: color }}
                />
            </div>
            )
        }
    },
    {
        id: "actions",
        header: "Opções",
        enableHiding: false,
        cell: ({ row }) => {
        const category = row.original

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
    
                    <DropdownMenuItem
                    onClick={() => alert(`Editar ${category.name}`)}
                    >
                    Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    onClick={() => alert(`Desativar ${category.name}`)}
                    >
                    Arquivar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        }
    },
]
