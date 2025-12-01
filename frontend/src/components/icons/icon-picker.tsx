import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import type { LucideIcon } from "lucide-react";
import { categoryIcons } from "./icons";

interface IconSelectorProps {
  value: string | null; 
  onChange: (iconName: string) => void; 
}
const DEFAULT_ICON = "star";

export default function IconSelector({ value, onChange }: IconSelectorProps) {
    const [open, setOpen] = useState(false);

    const iconNameToUse = value ?? DEFAULT_ICON;

    const IconCurrent = categoryIcons.find((i) => i.name === iconNameToUse)?.icon;
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <button className="p-2 rounded-xl border shadow-sm hover:bg-gray-100 flex items-center gap-2">
                {IconCurrent && <IconCurrent size={20} />}
            </button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-4">
            <div className="grid grid-cols-6 gap-3 max-h-60 overflow-y-auto">
            {categoryIcons.map(({ name, icon: Icon }) => (
                <button
                key={name}
                onClick={() => {
                    onChange(name);     
                    setOpen(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                >
                <Icon size={30} />
                </button>
            ))}
            </div>
        </PopoverContent>
        </Popover>
    );
}
