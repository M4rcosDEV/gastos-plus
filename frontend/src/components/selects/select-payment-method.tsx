import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PaymentMethod } from "@/types/paymentMethod.enum"

interface SelectPaymentMethodProps{
    onChange: (value:PaymentMethod) => void
}

export function SelectPaymentMethod({onChange}:SelectPaymentMethodProps) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecione o método" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value={PaymentMethod.DINHEIRO}>Dinheiro</SelectItem>
                    <SelectItem value={PaymentMethod.CARTAO_CREDITO}>Cartão de crédito</SelectItem>
                    <SelectItem value={PaymentMethod.CARTAO_DEBITO}>Cartão de débito</SelectItem>
                    <SelectItem value={PaymentMethod.TRANSFERENCIA}>Transferência</SelectItem>
                    <SelectItem value={PaymentMethod.PIX}>PIX</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
