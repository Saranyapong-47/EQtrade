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
<<<<<<< HEAD
import { useWallet } from "@/hooks/useWallet";


export function SelectAccount() {
  const { wallet } = useWallet();
  const accountMethods = wallet
    ? [
        {
          id: 1,
          name: wallet.walletNumber,
          value: wallet.walletNumber,
          icon: "/BankAccount1.svg",
        },
      ]
    : [];

  return (
    <Select defaultValue={accountMethods[0]?.value}>
=======

const accountMethods = [
  {
    id: 1,
    name: "123-163-4815",
    value: "Acc",
    icon: "/BankAccount1.svg",
  },
];

export function SelectAccount() {
  return (
    <Select defaultValue={accountMethods[0].value}>
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
      <SelectTrigger className="w-[250px] flex items-center">
        <SelectValue placeholder="Select Account"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="font-medium text-gray-600">
            Select Account
          </SelectLabel>
          {accountMethods.map((method) => (
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
