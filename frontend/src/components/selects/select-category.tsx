import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
import { categoryService } from "@/services/categoryService";
import type { Category } from "@/interfaces/Category";
import { categoryIcons } from "../icons/icons";

interface SelectCategoryProps{
    onChange: (value:string) => void
}

export function SelectCategory({onChange}:SelectCategoryProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadCategories = async () =>{
        setIsLoading(true);

        try {
            const result = await categoryService.getCategories();
            setCategories(result)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        loadCategories()
    }, [])

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full max-w-xs gap-2">
                {isLoading ? (
                <Spinner className="h-4 w-4 animate-spin" />
                ) : (
                <SelectValue placeholder="Selecione a categoria" />
                )}
            </SelectTrigger>
            {categories.length > 0 ?
                ( 
                <SelectContent>
                    <SelectGroup>
                        {categories.map((item, index) => {
                            const iconEntry = categoryIcons.find((i) => i.name === item.icon);
                            const IconComponent = iconEntry?.icon;

                            return (                            
                                <SelectItem key={index} value={item.id}>
                                    <div className="flex items-center gap-3">
                                    {IconComponent && <IconComponent size={18} color={item.color} />}
                                    {item.name}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
                ) : (
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem disabled value="none">Sem categoria</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                )

            }


        </Select>
    )
}
