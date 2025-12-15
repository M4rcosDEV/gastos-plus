import type { Category } from "@/interfaces/Category";
import { Button } from "@/components/ui/button";
import { PlusCircle, SearchIcon} from "lucide-react";
import { useEffect, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { DialogAddCategory } from "@/components/dialogs/categories/dialog-add-category";
import { categoryService } from "@/services/categoryService";
import DataTableCategories from "@/components/data-table/data-table-categories";
import { useQuery } from "@tanstack/react-query";


export default function Categories() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [search, setSearch] = useState<string>("")

  const categoriesQuery = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories
  });

  const categories = categoriesQuery.data || [];

  const isLoading = categoriesQuery.isLoading;

  const isError = categoriesQuery.isError;

  if(isError) console.log(isError)
  
  const filteredCategories = categories.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Texto digitado (debounced):", search);

    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto"> 
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 gap-4">
    
        {/* Grupo de busca */}
        <div className="flex flex-col sm:flex-row w-full sm:max-w-sm gap-2">
          <InputGroup>
            <InputGroupInput
              value={search}
              onChange={
                (e) => setSearch(e.target.value)
              }
              placeholder="Search..."
              
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton>
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

      <DataTableCategories categories={filteredCategories} isLoading={isLoading} openCreate={() => setOpenAddDialog(true)}/>
      
      <DialogAddCategory open={openAddDialog} onOpenChange={setOpenAddDialog}/>

    </div>
  );
}
