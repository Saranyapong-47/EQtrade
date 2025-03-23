"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ChartCandlestick,
  CircleDollarSign,
  Landmark,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";


const data = {
  user: {
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Chart",
      url: "/chart",
      icon: ChartCandlestick,
    },
    {
      title: "Asset",
      url: "/asset",
      icon: CircleDollarSign,
    },
    {
      title: "Finance",
      url: "/finance",
      icon: Landmark,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="w-55 h-screen">
      <SidebarHeader className="flex justify-center items-center w-55 ">
        <Image src="/EQ-Logo2.svg" alt="App Logo" width={200} height={100} />
      </SidebarHeader>
      <SidebarContent className ="-mt-12">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
