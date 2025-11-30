import { IconCoinFilled } from "@tabler/icons-react";
import { Card, CardContent } from "../ui/card";

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"

interface CardAccountProps {
  accountName?: string;
  balance?: string;
  avatar?: string;
  color?: string;

  onClick?: () => void;
}

export function CardAccount({accountName, balance, avatar, color, onClick }: CardAccountProps) {
  return (
    <Card 
      className="group h-40 cursor-pointer rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center h-full ">
        {avatar ? (
          <Avatar className="h-10 w-10 rounded-xl">
            <AvatarImage src={avatar} alt="avatar conta"/>
          </Avatar>
        ) : (
          <IconCoinFilled width={48} height={48} className="text-gray-600" style={{ color }}/>
        )}

        <div className={`mt-2 font-semibold`} style={{ color }}>
          {accountName}
        </div>
          
        <div className="mt-2 font-semibold text-gray-700">
          Saldo: ${balance}
        </div>

      </CardContent>
    </Card>
  )
}
