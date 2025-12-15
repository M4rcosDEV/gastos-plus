
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFx } from "@/components/dialogs/dialog-fx"
import { useState } from "react"
import { ColorPickerCircle } from "../../color-picker/color-picker-circle"
import { accountService } from "@/services/accountService"
import { toast } from "sonner";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/ui/input-group"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Account } from "@/interfaces/Account"

interface DialogAddAccount{
    open: boolean
    onOpenChange: (open:boolean) => void
}

interface ErrorValidate {
    accountName?: string;
    balance?: string;
}

export function DialogAddAccount({ open, onOpenChange}: DialogAddAccount) {
  const queryClient = useQueryClient();
  const [accountName, setAccountName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [observation, setObservation] = useState<string>("");

  const [errorValidate, setErrorValidate] = useState<ErrorValidate>({});
  
  const createAccountMutation = useMutation({
    mutationFn: (payload: Account) => {
      return accountService.create(payload)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
       
        toast.success("Conta criada com sucesso!");
        closeDialog();
    },
    onError: (error:any) => {
        toast.error(error.message || "Erro ao criar conta.");
    }
  })

  const handleSave = async() =>{
    
    const errors: ErrorValidate = {};

    if (accountName.trim() === "") {
      errors.accountName = "required";
    } else if (accountName.length > 20) {
      errors.accountName = "max";
    }

    if (isNaN(Number(balance)) ) {
      errors.balance = "invalid";
    }
    
    if (balance.trim() === "") {
      errors.balance = "required";
    }
    
    setErrorValidate(errors);

    if (Object.keys(errors).length > 0) return;

    const payload: Account = {
      accountName: accountName,
      balance: Number(balance),
      color: color || undefined,
      avatar: avatar || undefined,
      observation: observation || undefined,
    };

    createAccountMutation.mutate(payload)
  }

  const closeDialog = () => {
    onOpenChange(false);
    resetForm();
  }

  const resetForm = () => {
    setAccountName("");
    setAvatar(""); 
    setBalance("");
    setColor("#000000");  
    setObservation("");
    setErrorValidate({});
  }

  return (
  <DialogFx
      open={open}
      onOpenChange={onOpenChange}
      title="Cadastrar Conta"
      description="Preencha os dados da nova conta."
      maxWidth="sm:max-w-xl"
      persist={true}
      footer={
        <>
          <Button variant="secondary" onClick={closeDialog}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave}>Salvar</Button>
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

        {/* Saldo inicial */}
        <div className="grid gap-2">
          <Label htmlFor="balance">Saldo inicial</Label>
          <InputGroup>
            <InputGroupInput 
              id="balance" 
              placeholder="0,00" 
              type="number" 
              value={balance} 
              onChange={e => setBalance(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    aria-label="Info"
                    size="icon-xs"
                  >
                    <InfoIcon />
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Saldo inicial não pode ser alterado depois de criado.</p>
                </TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
          {errorValidate.balance === "required" && (
            <p className="text-red-500 text-sm">
              Este campo é obrigatório.
            </p>
          )}

          {errorValidate.balance === "invalid" && (
            <p className="text-red-500 text-sm">
              Saldo inicial inválido.
            </p>
          )}
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
