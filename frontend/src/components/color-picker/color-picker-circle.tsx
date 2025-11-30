import { useState } from "react";
import { CirclePicker } from "react-color";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface ColorPickerCircleProps {
    value?: string;
    onChange?: (color:string) => void;
}

export function ColorPickerCircle({value , onChange}: ColorPickerCircleProps) {
  const [color, setColor] = useState(value);

  const handleChange = (c: any) => {
    setColor(c.hex);
    if (onChange) onChange(c.hex);
  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-8 h-8 rounded-full border cursor-pointer"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>

      <PopoverContent className="p-2">
        <CirclePicker
          color={color}
          onChange={handleChange}
        />
      </PopoverContent>
    </Popover>
  );
}
