
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
import { Plus } from "lucide-react"
import { SelectAccount } from "@/components/selects/select-account"

interface DialogAddMovements{
    open: boolean
    onOpenChange: (open:boolean) => void
}

export function DialogAddMovements({ open, onOpenChange }: DialogAddMovements) {
    const [description, setDescription] = useState("");  
    const [value, setValue] = useState("");
    const [account, setAccount] = useState("");
    const [movementDate, setMovementDate] = useState<Date | undefined>(undefined)
    const [typeMovement, setTypeMovement] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [observation, setObservation] = useState("");

    const handleSave = async() => {
        const payload = {
            description: description,
            value: value,
            date: movementDate ? movementDate.toISOString() : null,
            type: typeMovement,
            category: category,
            paymentMethod: paymentMethod,
            account: account,
            observation: observation
        }

        console.log(payload)
    }

    const loadData = async () => {

    }

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
                <Button onClick={handleSave} type="button">Salvar</Button>
            </>
            }
        >
            <div className="grid grid-cols-2 gap-6 py-4">

                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input
                        className="w-full" 
                        id="descricao" 
                        type="text"
                        placeholder="Ex: Salário mensal, compra..." 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="value">Valor</Label>
                    <Input 
                        className="w-full max-w-xs" 
                        id="valor" 
                        type="text" 
                        placeholder="0,00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="date">Data</Label>
                    <DatePickerMovement value={movementDate} onChange={setMovementDate}/>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="type">Tipo de movimentação</Label>
                    <SelectTypeMovement onChange={setTypeMovement} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category">Categoria</Label>
                    
                    <div className="flex items-center gap-2">
                        <SelectCategory onChange={setCategory} />

                        <button
                        type="button"
                        className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => console.log("Criar nova categoria")}
                        >
                        <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category">Meio de pagamento</Label>
                    <SelectPaymentMethod onChange={setPaymentMethod} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="account">Conta</Label>

                    <div className="flex items-center gap-2">
                        <SelectAccount onChange={setAccount} />

                        <button
                        type="button"
                        className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => console.log("Criar nova conta")}
                        >
                        <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>


                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="observation">Observação</Label>
                    <Textarea 
                        placeholder="Detalhes adicionais sobre a movimentação" 
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                    />
                </div>
            </div>
        </DialogFx>
    )
}
