"use client";

import * as React from "react";
import {
  Award,
  LayoutDashboardIcon,
  // BarChartIcon,
  // CameraIcon,
  MessageSquare,
  RefreshCcw,
  UserPlus,
  Users,
  // FileCodeIcon,
  // FileTextIcon,
  // FolderIcon,
  // HelpCircleIcon,
  // LayoutDashboardIcon,
  // ListIcon,
  // SearchIcon,
  // SettingsIcon,
  // UsersIcon,
} from "lucide-react";

// import { NavDocuments } from "@/components/nav-documents"
// import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import MenuNav from "./menu-nav";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ],
  userManagement: [
    {
      name: "MENU.MENU-2.SUB-MENU.sub-menu-1",
      url: "/dashboard/user-management/users",
      icon: Users,
    },
  ],
  newStudentAdmissions: [
    {
      name: "MENU.MENU-3.SUB-MENU.sub-menu-1",
      url: "/dashboard/new-student-registration/registrations",
      icon: UserPlus,
    },
    {
      name: "MENU.MENU-3.SUB-MENU.sub-menu-2",
      url: "/dashboard/new-student-registration/re-registrations",
      icon: RefreshCcw,
    },
  ],
  studentAffairs: [
    {
      name: "MENU.MENU-4.SUB-MENU.sub-menu-1",
      url: "/dashboard/student-affairs/consultations",
      icon: MessageSquare,
    },
    {
      name: "MENU.MENU-4.SUB-MENU.sub-menu-2",
      url: "/dashboard/student-affairs/scholarship-registrations",
      icon: Award,
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link className="relative w-14 h-14" href={"/dashboard"}>
                <Image
                  src={"/assets/logo/horizon-univ-without-text-logo.svg"}
                  fill
                  alt="Horizon University Indonesia Logo"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {user.role === "USER" ? null : <MainNav items={data.navMain} />}
        {user.role === "SUPER_ADMIN" && (
          <MenuNav label="MENU.MENU-2.title" items={data.userManagement} />
        )}
        <MenuNav label="MENU.MENU-3.title" items={data.newStudentAdmissions} />
        <MenuNav label="MENU.MENU-4.title" items={data.studentAffairs} />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
