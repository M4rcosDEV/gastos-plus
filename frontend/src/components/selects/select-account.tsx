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
import type { Account } from "@/interfaces/Account";
import { accountService } from "@/services/accountService";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";

interface SelectAccountProps{
    onChange: (value:string) => void
}

export function SelectAccount({onChange}:SelectAccountProps) {
    const accountsQuery = useQuery<Account[]>({
      queryKey: ["accounts"],
      queryFn: accountService.getAllAccounts
    })

    const account = accountsQuery.data || []
    const isLoading = accountsQuery.isLoading;

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full max-w-xs gap-2">
                {isLoading ? (
                <Spinner className="h-4 w-4 animate-spin" />
                ) : (
                <SelectValue placeholder="Selecione a conta" />
                )}
            </SelectTrigger>
            {account.length > 0 ?
                ( 
                <SelectContent>
                <SelectGroup>
                    {account.map((item, index) => (
                    <SelectItem key={index} value={String(item.id)}>
                        <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={item.avatar} alt={item.accountName} />
                            <AvatarFallback>
                            {item.accountName?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <span>{item.accountName}</span>
                        </div>
                    </SelectItem>
                    ))}
                </SelectGroup>
                </SelectContent>
                ) : (
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem disabled value="none">Sem conta</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                )

            }
        </Select>
    )
}
