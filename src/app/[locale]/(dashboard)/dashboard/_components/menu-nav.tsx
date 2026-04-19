/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const MenuNav = ({
  items,
  label,
}: {
  label: string;
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) => {
  const t = useTranslations("PAGE.DASHBOARD.SIDEBAR");

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t(label as any)}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{t(item.name as any)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default MenuNav;
