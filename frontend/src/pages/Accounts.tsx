import { CardAccount } from "@/components/cards/card-account";
import { DialogAddAccount } from "@/components/dialogs/accounts/dialog-add-account";
import { DialogAlterAccount } from "@/components/dialogs/accounts/dialog-alter-account";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import type { Account } from "@/interfaces/Account";
import { accountService } from "@/services/accountService";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

export default function Accounts() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openAlterDialog, setOpenAlterDialog] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    const handleCreacteAccount = async () => {
      await loadData(); 
    };

    const handleAlterAccount = async () => {
      await loadData(); 
    };

    const handleSelectAccount = async (account: Account) =>{
      setOpenAlterDialog(true);
      setSelectedAccount(account);
    }

    const loadData = async () => {
      try {
        const data = await accountService.getAllAccounts();
        setAccounts(data);
        
      } catch (error) {
        console.error("error loading accounts:", error)
      }
    };

    useEffect(() => {
        loadData();
    },[])


    const walletAccount = useMemo(() => {
      return accounts.find(account => account.accountName === "Carteira");
    },[accounts]);

    const filteredAccounts = useMemo(() => {
      return [...accounts]
        .filter((acc) => acc.accountName !== "Carteira")
        .sort((a, b) => a.accountName.localeCompare(b.accountName));
    }, [accounts]);


  return (
    <div className="flex flex-col gap-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Nova Conta */}
        <Card 
        onClick={() => setOpenAddDialog(true)}
        className="cursor-pointer transition hover:shadow-md"
        >
          <CardContent className="flex flex-col items-center justify-center h-full">
          
            <IconSquareRoundedPlusFilled 
              width={48} 
              height={48} 
              className="text-blue-600" 
            />
      
            <CardFooter className="mt-4 font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
              Nova Conta
            </CardFooter>
          </CardContent>
        </Card>

        {/* Carteira */}
        {walletAccount &&
          <CardAccount 
            onClick={() => handleSelectAccount(walletAccount)}
            accountName={walletAccount.accountName} 
            balance={walletAccount.balance.toString()}
            color={walletAccount.color}
            avatar={walletAccount.avatar}
          />
        }
   
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
        {filteredAccounts.map((acount, index) => (
              <CardAccount 
                onClick={() => handleSelectAccount(acount)}
                key={index}
                accountName={acount.accountName}
                balance={acount.balance.toString()}
                color={acount.color}
                avatar={acount.avatar}
              />
            )
          )
        }
      </div>

      <DialogAddAccount open={openAddDialog} onOpenChange={setOpenAddDialog} onCreated = {handleCreacteAccount}/>
      <DialogAlterAccount open={openAlterDialog} onOpenChange={setOpenAlterDialog} data={selectedAccount} onChange = {handleAlterAccount}/>
    </div>
  );
}
