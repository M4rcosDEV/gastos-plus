
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
import { useMovementStore } from "@/stores/movementStore"
import { movementService } from "@/services/movementService"
import type { MovementType } from "@/types/movementType.enum"
import { toast } from "sonner"
import type { PaymentMethod } from "@/types/paymentMethod.enum"
import type { MovementPayload } from "@/interfaces/movement"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DialogAddMovements{
    open: boolean
    onOpenChange: (open:boolean) => void
}

export function DialogAddMovements({ open, onOpenChange }: DialogAddMovements) {
    const [description, setDescription] = useState<string>("");  
    const [account, setAccount] = useState<string>();
    const [observation, setObservation] = useState<string>("");

    const [value, setValue] = useState<number | null>(null);
    const [category, setCategory] = useState<number>();
    const [movementDate, setMovementDate] = useState<Date>()
    const [typeMovement, setTypeMovement] = useState<MovementType>();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();


    const refreshIncome = useMovementStore((state) => state.refreshIncome)
    const refreshExpense = useMovementStore((state) => state.refreshExpense)

    const handleSave = async() => {

        if (!value) {
            toast.error("Valor não preenchido");
            return;
        }

        if (!movementDate) {
            toast.error("Data não preenchida");
            return;
        }

        if (!typeMovement) {
            toast.error("Selecione o tipo do movimento");
            return;
        }

        if (!paymentMethod) {
            toast.error("Selecione o meio de pagamento");
            return;
        }

        if (!account) {
            toast.error("Conta não preenchida");
            return;
        }

        const payload: MovementPayload = {
            description,
            valueMov: value,
            dateMov: movementDate.toISOString(),
            typeMov: typeMovement,
            categoryId: category ? category : null,
            paymentMethods: paymentMethod,
            accountId: account,
            observation,
        };

        try {
            await movementService.createMovement(payload)

            if (typeMovement === 'INCOME') {
                refreshIncome()
                
            } else {
                refreshExpense()
            }

            toast.success("Movimentação registrada com sucesso")

            closeDialog();  

        } catch (error:any) {
            console.error("Erro ao salvar:", error)
            toast.error(error)
        }

        console.log(payload)
    }

    const closeDialog = () => {
        onOpenChange(false);
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
            <ScrollArea className="max-h-[60vh] md:max-h-fit pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">

                    <div className="grid gap-2 col-span-1 md:col-span-2">
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

                    <div className="grid gap-2 ">
                        <Label htmlFor="value">Valor</Label>
                        <Input 
                            className="w-full max-w-xs" 
                            id="valor" 
                            type="text" 
                            placeholder="0,00"
                            value={value ?? ""}
                            onChange={(e) => setValue(e.target.value ? Number(e.target.value) : null)}
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

                    <div className="grid gap-2 col-span-1 md:col-span-2">
                        <Label htmlFor="observation">Observação</Label>
                        <Textarea 
                            placeholder="Detalhes adicionais sobre a movimentação" 
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                        />
                    </div>
                </div>
            </ScrollArea>
        </DialogFx>
    )
}
