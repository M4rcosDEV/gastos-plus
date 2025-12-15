
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFx } from "@/components/dialogs/dialog-fx"
import { useEffect, useState } from "react"
import { ColorPickerCircle } from "../../color-picker/color-picker-circle"
import { accountService } from "@/services/accountService"
import { toast } from "sonner";
import type { Account } from "@/interfaces/Account"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface DialogAlterAccount{
    open: boolean
    data: Account | null
    onOpenChange: (open:boolean) => void
    onChange?: () => void
}

type AlterAccountPayload = {
  id: string;
  payload: Account;
};

interface ErrorValidate {
    accountName?: string;
    balance?: boolean;
}

export function DialogAlterAccount({ open, data , onOpenChange}: DialogAlterAccount) {
    const queryClient = useQueryClient();
    
    const [accountName, setAccountName] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [balance, setBalance] = useState<number>(0);
    const [color, setColor] = useState<string>("#000000");
    const [observation, setObservation] = useState<string>("");

    const [errorValidate, setErrorValidate] = useState<ErrorValidate>({});
    
    const alterAccountMutation = useMutation({
        mutationFn: ({id, payload}:AlterAccountPayload) => {
            return accountService.update(id, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            
            toast.success("Conta alterada com sucesso!");
            closeDialog();
        },
        onError: (error:any) => {
            console.log(error)
            toast.error(error.message || "Erro ao alterar conta.");
        }
    })

    
    const handleChange = async() =>{
        console.log(data)
        const errors: ErrorValidate = {};
        
        if (accountName.trim() === "") {
            errors.accountName = "required";
        } else if (accountName.length > 20) {
            errors.accountName = "max";
        }

        if (isNaN(balance)) {
            errors.balance = true;
        }

        setErrorValidate(errors);

        if (Object.keys(errors).length > 0) return;

        const payload = {
            accountName: accountName,
            balance: Number(balance),
            color: color || undefined,
            avatar: avatar || undefined,
            observation: observation || undefined,
        };

        alterAccountMutation.mutate({
            id: data!.id!,
            payload
        });
    }
    
    const closeDialog = () => {
        onOpenChange(false);
        resetForm();
    }

    const resetForm = () => {
        setAccountName("");
        setAvatar(""); 
        setBalance(0);
        setColor("#000000");  
        setErrorValidate({});
    }

    useEffect(() => {
    if (open && data) {
        setAccountName(data.accountName);
        setAvatar(data.avatar || "");
        setBalance(data.balance);
        setColor(data.color || "#000000");
    }
    }, [open, data]);


    return (
    <DialogFx
        open={open}
        onOpenChange={closeDialog}
        title={data?.accountName ? `Alterar Conta: ${data.accountName}` : "Alterar Conta"}
        description="Preencha os dados da nova conta."
        maxWidth="sm:max-w-xl"
        persist={true}
        footer={
            <>
            <Button variant="secondary" onClick={closeDialog}>
                Cancelar
            </Button>
            <Button type="button" onClick={handleChange}>Salvar alterações</Button>
            </>
        }
        >
        <div className="grid grid-cols-2 gap-6 py-4">

            {/* Nome da conta */}
            <div className="grid gap-2 col-span-2">
                <Label htmlFor="accountName">Nome da conta</Label>
                <Input 
                    id="accountName" 
                    type="text" 
                    placeholder="Ex: Nubank, Inter,  MercadoPago..." 
                    disabled = {data?.accountName === "Carteira"? true : false}
                    value={accountName}
                    onChange={e => setAccountName(e.target.value)}
                    className={errorValidate.accountName ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errorValidate.accountName === "required" && (
                    <p className="text-red-500 text-sm">
                    Este campo é obrigatório.
                    </p>
                )}

                {errorValidate.accountName === "max" && (
                    <p className="text-red-500 text-sm">
                    Nome da conta deve ter no máximo 20 caracteres.
                    </p>
                )}
            </div>

            {/* Avatar / Ícone */}
            <div className="grid gap-2 col-span-2">
            <Label htmlFor="avatar">Avatar (opcional)</Label>
            <Input 
                id="avatar" 
                type="text" 
                placeholder="URL da imagem ou emoji" 
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
            />
            </div>

            {/* Saldo*/}
            <div className="grid gap-2">
            <Label htmlFor="balance">Saldo</Label>
            <Input 
                id="balance" 
                type="number"
                disabled 
                placeholder="0,00" 
                value={balance}
                onChange={e => setBalance(Number(e.target.value))}
            />
            </div>

            {/* Cor */}
            <div className="grid gap-2 place-items-center">
            <Label htmlFor="color">Cor (opcional)</Label>
            <ColorPickerCircle
                value={color}
                onChange={setColor}
            />
            </div>

            {/* Observação */}
            <div className="grid gap-2 col-span-2">
            <Label htmlFor="obs">Observação (opcional)</Label>
            <Textarea 
                id="obs"
                placeholder="Informações adicionais sobre essa conta" 
                value={observation}
                onChange={e => setObservation(e.target.value)}
            />
            </div>

        </div>
        </DialogFx>
    )
}
