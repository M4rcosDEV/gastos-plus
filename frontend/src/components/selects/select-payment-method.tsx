import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectPaymentMethodProps{
    onChange: (value:string) => void
}

export function SelectPaymentMethod({onChange}:SelectPaymentMethodProps) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecione o método" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="DINHEIRO">Dinheiro</SelectItem>
                    <SelectItem value="CARTAO_CREDITO">Cartão de crédito</SelectItem>
                    <SelectItem value="CARTAO_DEITO">Cartão de débito</SelectItem>
                    <SelectItem value="TRANSFERENCIA">Transferência</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
