"use client";
import * as React from "react";
<<<<<<< HEAD
import { useEffect } from "react";
=======
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
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
<<<<<<< HEAD
  value?: string;
  type?: "crypto" | "stock";
  onChange?: (symbol: string) => void;
  onTypeChange?: (type: "crypto" | "stock") => void;
}


export function SelectSymbolSwitcher({
  value,
  type,
  onChange = () => {},
  onTypeChange = () => {},
}: SelectSymbolProps) {
  const [currentType, setCurrentType] = React.useState<"crypto" | "stock">(
    type || "crypto"
  );
  const [selectedSymbol, setSelectedSymbol] = React.useState<string>(
    value || CryptoName[0].tradingViewSymbol
  );

  // Sync external props
  useEffect(() => {
    if (type) setCurrentType(type);
  }, [type]);

  useEffect(() => {
    if (value) setSelectedSymbol(value);
  }, [value]);

  const currentOptions =
    currentType === "crypto" ? CryptoName : currentType === "stock" ? StockName : [];

=======
  onChange?: (symbol: string) => void;
}

export function SelectSymbolSwitcher({ onChange = () => {} }: SelectSymbolProps) {
  const [type, setType] = React.useState<"crypto" | "stock" | "">("crypto"); // ✅ เลือกประเภท Crypto หรือ Stock
  const [selectedSymbol, setSelectedSymbol] = React.useState<string>(CryptoName[0].tradingViewSymbol); // ✅ สัญลักษณ์ที่เลือก

  // 🔄 ดึงข้อมูลที่ต้องการแสดงใน Select ที่สอง
  const currentOptions =
    type === "crypto" ? CryptoName : type === "stock" ? StockName : [];

  // ✅ ฟังก์ชันเปลี่ยนค่าของสัญลักษณ์
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    onChange(symbol);
  };

<<<<<<< HEAD
  const handleTypeChange = (val: string) => {
    const newType = val as "crypto" | "stock";
    setCurrentType(newType);
    onTypeChange(newType);

    // reset symbol when type changes
    const defaultSymbol =
      newType === "crypto" ? CryptoName[0].tradingViewSymbol : StockName[0].tradingViewSymbol;
    setSelectedSymbol(defaultSymbol);
    onChange(defaultSymbol);
  };

  return (
    <div className="flex items-center gap-4">
      <Select value={currentType} onValueChange={handleTypeChange}>
=======
  return (
    <div className="flex items-center gap-4">
      {/* 🏦 เลือกประเภท Crypto หรือ Stock */}
      <Select defaultValue={type} onValueChange={(val) => setType(val as "crypto" | "stock")}>
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select Type (Crypto/Stock)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="crypto">Crypto</SelectItem>
          <SelectItem value="stock">Stock</SelectItem>
        </SelectContent>
      </Select>

<<<<<<< HEAD
      <Select value={selectedSymbol} onValueChange={handleSymbolChange}>
        <SelectTrigger className="w-[250px] flex items-center">
          <SelectValue placeholder={`Select ${currentType === "crypto" ? "Crypto" : "Stock"} Symbol`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-medium text-gray-600">
              {currentType === "crypto" ? "Crypto Symbols" : "Stock Symbols"}
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
=======
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
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
    </div>
  );
}
