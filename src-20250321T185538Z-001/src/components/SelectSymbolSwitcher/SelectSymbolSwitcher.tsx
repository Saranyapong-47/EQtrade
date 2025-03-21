"use client";
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

import { CryptoName } from "@/data/Crypto";
import { StockName } from "@/data/Stock";

interface SelectSymbolProps {
  onChange?: (symbol: string) => void;
}

export function SelectSymbolSwitcher({ onChange = () => {} }: SelectSymbolProps) {
  const [type, setType] = React.useState<"crypto" | "stock" | "">("crypto"); // ✅ เลือกประเภท Crypto หรือ Stock
  const [selectedSymbol, setSelectedSymbol] = React.useState<string>(CryptoName[0].tradingViewSymbol); // ✅ สัญลักษณ์ที่เลือก

  // 🔄 ดึงข้อมูลที่ต้องการแสดงใน Select ที่สอง
  const currentOptions =
    type === "crypto" ? CryptoName : type === "stock" ? StockName : [];

  // ✅ ฟังก์ชันเปลี่ยนค่าของสัญลักษณ์
  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    onChange(symbol);
  };

  return (
    <div className="flex items-center gap-4">
      {/* 🏦 เลือกประเภท Crypto หรือ Stock */}
      <Select defaultValue={type} onValueChange={(val) => setType(val as "crypto" | "stock")}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select Type (Crypto/Stock)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="crypto">Crypto</SelectItem>
          <SelectItem value="stock">Stock</SelectItem>
        </SelectContent>
      </Select>

      {/* 📊 เลือกสัญลักษณ์จากประเภทที่เลือก */}
      {type && (
        <Select defaultValue={selectedSymbol} onValueChange={handleSymbolChange}>
          <SelectTrigger className="w-[250px] flex items-center">
            <SelectValue placeholder={`Select ${type === "crypto" ? "Crypto" : "Stock"} Symbol`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="font-medium text-gray-600">
                {type === "crypto" ? "Crypto Symbols" : "Stock Symbols"}
              </SelectLabel>
              {currentOptions.map((method) => (
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
      )}
    </div>
  );
}
