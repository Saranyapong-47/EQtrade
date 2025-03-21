"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Link from "next/link";

const WalletUser = [
  {
    id: 1,
    balance: 50000,
  },
];

export function WalletCard() {
  return (
    <>
      <Card className="w-full h-[130px] bg-gradient-to-r from-[#000046]  to-[#1E3A8A] text-white p-2 mt-3 rounded-xl shadow-lg">
        <CardHeader className="flex justify-between  p-0">
          <span className="text-sm font-light">Current Balance</span>
        </CardHeader>

        <CardContent className="p-0">
          <h2 className="text-2xl font-bold">
            ${WalletUser[0].balance.toLocaleString()}{" "}
          </h2>
        </CardContent>

        <CardFooter className="relative flex justify-between items-center mt-8 p-0">
          <div className="text-sm font-medium tracking-wider">
            4234 **** **** 6533
          </div>

          <Button className="w-8 h-8 bg-blue-700 text-white rounded-full shadow-lg absolute bottom-0 right-2">
            <Link href={"/asset"}>
              <Wallet size={16} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
