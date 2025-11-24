import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectCategoryProps{
    onChange: (value:string) => void
}

export function SelectCategory({onChange}:SelectCategoryProps) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value="salario">Salário</SelectItem>
                <SelectItem value="investimentos">Investimentos</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
