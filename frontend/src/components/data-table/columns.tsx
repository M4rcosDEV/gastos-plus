import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Category } from "@/interfaces/Category"

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>
    },
    {
        accessorKey: "icone",
        header: "Ícone",
        cell: ({ row }) => {
            const color = row.getValue("icone") as string

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
                    onClick={() => navigator.clipboard.writeText(category.id)}
                    >
                    Copiar ID
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    onClick={() => alert(`Editar categoria ${category.name}`)}
                    >
                    Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    onClick={() => alert(`Excluir categoria ${category.name}`)}
                    >
                    Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
        }
    },
]
