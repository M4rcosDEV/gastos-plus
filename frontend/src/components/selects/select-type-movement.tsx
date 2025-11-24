import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectTypeMovementProps{
    onChange: (value:string) => void
}

export function SelectTypeMovement({onChange}:SelectTypeMovementProps) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value="INCOME">Renda</SelectItem>
                <SelectItem value="EXPENSE">Despesa</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
