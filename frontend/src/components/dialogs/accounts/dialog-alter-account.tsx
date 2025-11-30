
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

interface DialogAlterAccount{
    open: boolean
    data: Account | null
    onOpenChange: (open:boolean) => void
    onChange?: () => void
}

interface ErrorValidate {
    accountName?: string;
    balance?: boolean;
}

export function DialogAlterAccount({ open, data , onOpenChange,  onChange }: DialogAlterAccount) {
    const [accountName, setAccountName] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [balance, setBalance] = useState<number>(0);
    const [color, setColor] = useState<string>("#000000");
    const [observacao, setObservacao] = useState<string>("");

    const [errorValidate, setErrorValidate] = useState<ErrorValidate>({});
    
    const handleChange = async() =>{
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
            observacao: observacao || undefined,
        };

        try {
            await accountService.update(data!.id!, payload);
            if(onChange){
                onChange?.();
            }

            toast.success("Conta alterada com sucesso!");
        } catch (error:any) {
            toast.error(error.message || "Erro ao alterar conta.");
        }

        closeDialog();
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
                value={observacao}
                onChange={e => setObservacao(e.target.value)}
            />
            </div>

        </div>
        </DialogFx>
    )
}
