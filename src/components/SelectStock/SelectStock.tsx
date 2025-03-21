import * as React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StockName } from "@/data/Stock";

interface SelectSymbolProps {
  onChange?: (symbol: string) => void; // ✅ เปลี่ยน onChange เป็น optional props
}

export function SelectStock({ onChange = () => {} }: SelectSymbolProps) {
  return (
    <Select
      defaultValue={StockName[0].tradingViewSymbol}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-[250px] flex items-center">
        <SelectValue placeholder="Select Stock" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="font-medium text-gray-600">
            All Symbol methods
          </SelectLabel>
          {StockName.map((method) => (
            <SelectItem key={method.id} value={method.tradingViewSymbol}>
              <div className="flex items-center gap-2 text-black">
                <Image
                  src={method.icon}
                  alt={method.name}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                {method.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
