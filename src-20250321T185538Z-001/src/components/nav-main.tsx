"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
  iconSize = 30,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
  iconSize?: number;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[16px] my-2">Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title} >
            <Link href={item.url} passHref>
              <SidebarMenuButton tooltip={item.title} className="w-full text-base py-4 px-4 min-h-[56px] flex items-center">
                {item.icon && <item.icon size={iconSize} className="mr-5 flex shrink-0 !w-auto !h-auto"/>}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
