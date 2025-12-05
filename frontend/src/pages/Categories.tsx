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
import { DialogAddCategory } from "@/components/dialogs/categories/dialog-add-category";


export default function Categories() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
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
      console.log("Abrir modal/formulário para adicionar nova categoria.");
  };
    
  const data: Category[] = [
    { id: "1", name: "Alimentação", icon:"star", color:"#eb4034" , observacao: "expense" },
    { id: "2", name: "Transporte", icon:"shirt",  color:"#eb4034" , observacao: "expense" },
    { id: "3", name: "Moradia", icon:"car",  color:"#eb4034" , observacao: "expense" },
    { id: "4", name: "Salário", icon:"bone",  color:"#eb4034" , observacao: "income" },
    { id: "5", name: "Investimentos", icon:"star",  color:"#eb4034" , observacao: "income"},
  ]

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto"> 
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 gap-4">
    
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
          style={{
            backgroundColor: "var(--sidebar-accent)"
          }}
          className="hover:brightness-95 text-black shadow-sm w-full sm:w-auto"
          onClick={() => setOpenAddDialog(true)}
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

      <DialogAddCategory open={openAddDialog} onOpenChange={setOpenAddDialog} onCreated = {handleAddCategory}/>

    </div>
  );
}
