
import type { Category } from "@/interfaces/Category";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Archive, Layers2, MoreHorizontal, Pencil, PlusCircle, Star } from "lucide-react";
import { Button } from "../ui/button";
import { categoryIcons } from "../icons/icons";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { Spinner } from "../ui/spinner";

interface DataTableCategoriesProps{
    categories: Category[]
    isLoading: boolean

    openCreate: () => void
}

export default function DataTableCategories({categories, isLoading, openCreate}:DataTableCategoriesProps){
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    
    const totalPages = Math.ceil(categories.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = categories.slice(startIndex, endIndex)

    useEffect(()=>{
        console.log(categories.length)
    },[categories])
    
    return(
        <div className="container mx-auto py-10">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Ícone</TableHead>
                            <TableHead>Cor</TableHead>
                            <TableHead className="w-[70px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                            <TableCell colSpan={4} className="p-8 text-center">
                                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                                <Button variant="outline" disabled size="sm">
                                    <Spinner />
                                    Carregando...
                                </Button>
                                </div>
                            </TableCell>
                            </TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="p-8 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4 py-12">
                                        <Layers2 size={30} />
                                        <h3 className="text-xl font-bold">Nenhuma Categoria Encontrada</h3>

                                        <button
                                            style={{
                                                backgroundColor: "var(--sidebar-accent)"
                                            }}
                                            className="flex font-semibold py-2 px-4 rounded-lg transition-colors shadow-md"
                                            onClick={openCreate}
                                        >
                                            <PlusCircle className="mr-2 h-5 w-5" />
                                            Criar Nova Categoria
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item) => {
                            const iconEntry = categoryIcons.find((i) => i.name === item.icon);
                            const IconComponent = iconEntry?.icon ?? Star;

                            return (
                                <TableRow
                                key={item.id}
                                onClick={() => alert(item.id)}
                                className="cursor-pointer"
                                >
                                <TableCell className="font-medium">{item.name}</TableCell>

                                <TableCell>
                                    <IconComponent size={20} color={item.color} />
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2">
                                    <div
                                        className="h-6 w-6 rounded border"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        {item.color}
                                    </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Abrir menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                        <Archive className="mr-2 h-4 w-4" />
                                        Arquivar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                </TableRow>
                            );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
            {totalPages > 1 && (
                <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i + 1}>
                        <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                            className="cursor-pointer"
                        >
                            {i + 1}
                        </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                    </PaginationContent>
                </Pagination>
                </div>
            )}
        </div>
    );
}