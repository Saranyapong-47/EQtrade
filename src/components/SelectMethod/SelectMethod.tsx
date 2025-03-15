import * as React from "react"
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const depositMethods = [
    {
      id: 1,
      name: "Thai QR payments",
      value: "thai_qr",
      icon: "/QRPAS.png",
    },
    {
      id: 2,
      name: "BinancePay",
      value: "binance_pay",
      icon: "/binance-logo.svg",
    },
    {
      id: 3,
      name: "Bitcoin (BTC)",
      value: "bitcoin",
      icon: "/bitcoin.svg",
    },
    {
      id: 4,
      name: "Bank Transfer",
      value: "Bank",
      icon: "/kbank.svg",
    },
  ];


  export function PaymentMethodSelect() {
    return (
      <Select defaultValue={depositMethods[3].value}>
        <SelectTrigger className="w-[250px] flex items-center">
          <SelectValue placeholder="Select Payment Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-medium text-gray-600">All payment methods</SelectLabel>
            {depositMethods.map((method) => (
              <SelectItem key={method.id} value={method.value}>
                <div className="flex items-center gap-2">
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