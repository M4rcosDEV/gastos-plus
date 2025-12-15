import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFx } from "@/components/dialogs/dialog-fx"
import { useState } from "react"
import { ColorPickerCircle } from "../../color-picker/color-picker-circle"
import IconSelector from "@/components/icons/icon-picker"
import { categoryService } from "@/services/categoryService"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Category } from "@/interfaces/Category"

interface DialogAddCategory{
    open: boolean
    onOpenChange: (open:boolean) => void
}

interface ErrorValidate {
    categoryName?: string;
}

export function DialogAddCategory({ open, onOpenChange}: DialogAddCategory) {
  const queryClient = useQueryClient();

  const [categoryName, setCategoryName] = useState<string>("")
  const [icon, setIcon] = useState<string | null>(null)
  const [color, setColor] = useState<string>("#000000")
  const [observacao, setObservacao] = useState<string>("")

  const createCategoryMutation = useMutation({
    mutationFn: (payload: Category) => {
        return categoryService.createCategory(payload)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
       
        toast.success("Categoria criada com sucesso!");
        closeDialog();
    },
    onError: (error:any) => {
        console.error("Error creating category:", error)
        toast.error(error.message || "Erro ao criar categoria.");
    }
  })

  const [errorValidate, setErrorValidate] = useState<ErrorValidate>({})
  
  const handleSave = async () => {
    const errors: ErrorValidate = {}

    if (categoryName.trim() === "") {
      errors.categoryName = "required"
    } else if (categoryName.length > 20) {
      errors.categoryName = "max"
    }

    setErrorValidate(errors)
    if (Object.keys(errors).length > 0) return

    const payload: Category = {
      name: categoryName,
      icon: icon || undefined,
      color: color || undefined,
      observacao: observacao || undefined,
    }

    createCategoryMutation.mutate(payload)
  }

  const closeDialog = () => {
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setCategoryName("")
    setColor("#000000")
    setObservacao("")
    setErrorValidate({})
  }

  return (
    <DialogFx
      open={open}
      onOpenChange={onOpenChange}
      title="Cadastrar Categoria"
      description="Preencha os dados da nova categoria."
      maxWidth="sm:max-w-xl"
      persist={true}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={closeDialog}>Cancelar</Button>
          <Button type="button" onClick={handleSave}>Salvar</Button>
        </div>
      }
    >

      <div className="grid gap-6 py-6">

        {/* NOME */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categoryName">Nome da categoria</Label>
          <Input 
            id="categoryName"
            type="text"
            placeholder="Ex: Mercado, Investimento, Lazer..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className={errorValidate.categoryName ? "border-red-500 ring-red-500" : ""}
          />

          {errorValidate.categoryName === "required" && (
            <span className="text-red-500 text-xs">Este campo é obrigatório.</span>
          )}

          {errorValidate.categoryName === "max" && (
            <span className="text-red-500 text-xs">Máximo de 20 caracteres.</span>
          )}
        </div>

        {/* Grade: ícone + cor */}
        <div className="grid grid-cols-2 gap-6">

        {/* Ícone */}
        <div className="flex flex-col items-center justify-center gap-3 border rounded-xl p-5 bg-muted/40 shadow-sm">
            <Label className="text-sm font-semibold">Ícone</Label>
            <IconSelector value={icon} onChange={setIcon} />
        </div>

        {/* Cor */}
        <div className="flex flex-col items-center justify-center gap-3 border rounded-xl p-5 bg-muted/40 shadow-sm">
            <Label className="text-sm font-semibold">Cor</Label>
            <ColorPickerCircle value={color} onChange={setColor} />
        </div>

        </div>

        {/* OBSERVAÇÃO */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="obs">Observação (opcional)</Label>
          <Textarea
            id="obs"
            placeholder="Informações adicionais sobre essa categoria"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </div>
      </div>

    </DialogFx>
  )
}
