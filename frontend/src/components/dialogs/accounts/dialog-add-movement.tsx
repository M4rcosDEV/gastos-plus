
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFx } from "@/components/dialogs/dialog-fx"
import { SelectTypeMovement } from "@/components/selects/select-type-movement"
import { useState } from "react"
import { DatePickerMovement } from "@/components/datepicker/datepicker-movement"
import { SelectCategory } from "@/components/selects/select-category"
import { SelectPaymentMethod } from "@/components/selects/select-payment-method"

interface DialogAddMovements{
    open: boolean
    onOpenChange: (open:boolean) => void
}

export function DialogAddMovements({ open, onOpenChange }: DialogAddMovements) {
 
  const [typeMovement, setTypeMovement] = useState("");
  const [category, setCategory] = useState("");

  return (
    <DialogFx
        open={open}
        onOpenChange={onOpenChange}
        title="Registrar Movimentação"
        description="Preencha os dados da movimentação."
        maxWidth="sm:max-w-2xl"
        persist={true}
        footer={
        <>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
            </Button>
            <Button type="button">Salvar</Button>
        </>
        }
    >
        <div className="grid grid-cols-2 gap-6 py-4">

            <div className="grid gap-2 col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input className="w-full" id="value" type="text" placeholder="Ex: Salário mensal, compra..." />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="value">Valor</Label>
                <Input className="w-full max-w-xs" id="value" type="text" placeholder="0,00" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="date">Data</Label>
                <DatePickerMovement/>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="type">Tipo de movimentação</Label>
                <SelectTypeMovement onChange={setTypeMovement} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <SelectCategory onChange={setCategory} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Meio de pagamento</Label>
                <SelectPaymentMethod onChange={setCategory} />
            </div>

            <div className="grid gap-2 col-span-2">
                <Label htmlFor="category">Observação</Label>
                <Textarea placeholder="Detalhes adicionais sobre a movimentação" />
            </div>
        </div>
    </DialogFx>
  )
}
