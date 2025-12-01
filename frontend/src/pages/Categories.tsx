import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns"
import type { Category } from "@/interfaces/Category";
import { Button } from "@/components/ui/button";
import { PlusCircle, SearchIcon, type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import IconSelector from "@/components/icons/icon-picker";


export default function Categories() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [icon, setIcon] = useState<string | null>(null);
    
    // Pega o valor atual do filtro 'name' (se existir)
    const nameFilter = columnFilters.find((f: { id: string; }) => f.id === "name")?.value || "";

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue) {
            setColumnFilters([{ id: "name", value: newValue }]);
        } else {
            // Remove o filtro se o campo estiver vazio
            setColumnFilters(columnFilters.filter((f: { id: string; }) => f.id !== "name"));
        }
    };

    const handleClearSearch = () => {
        setColumnFilters(columnFilters.filter(f => f.id !== "name"));
    };

    const handleAddCategory = () => {
        alert("Abrir modal/formulário para adicionar nova categoria.");
    };
    
  const data: Category[] = [
    { id: "1", name: "Alimentação", color:"#eb4034" , type: "expense", icon: "🍔" },
    { id: "2", name: "Transporte", color:"#eb4034" , type: "expense", icon: "🚗" },
    { id: "3", name: "Moradia", color:"#eb4034" , type: "expense", icon: "🏠" },
    { id: "4", name: "Salário", color:"#eb4034" , type: "income", icon: "💰" },
    { id: "5", name: "Investimentos", color:"#eb4034" , type: "income", icon: "📈" },
  ]

return (
        <div className="p-8 space-y-6 max-w-7xl mx-auto">
            
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 gap-4">
            <IconSelector value={icon} onChange={setIcon} />

            {/* Grupo de busca */}
            <div className="flex flex-col sm:flex-row w-full sm:max-w-sm gap-2">
              <InputGroup>
                <InputGroupInput
                  placeholder="Search..."
                  
                />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton onClick={() => console.log("Pesquisar")}>
                    Search
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Botão nova categoria */}
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg w-full sm:w-auto"
              onClick={handleAddCategory}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Nova Categoria
            </Button>
          </div>


            {/* Componente principal da Tabela */}
            <DataTable 
                columns={columns} 
                data={data} 
            />
            
        </div>
    );
}
