"use client";

import * as React from "react";
import { Bot, Settings2, User } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { CompanyProfile } from "@/components/company-profile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import useMounted from "@/hooks/use-mounted";
import { Skeleton } from "./ui/skeleton";
import { NavSkeleton } from "./nav-skeleton";

const data = {
  navMain: [
    {
      title: "User",
      url: "#",
      icon: User,
      allowedRoles: ["supervisor", "superadmin"],
      items: [
        {
          title: "List",
          url: "/dashboard/users"
        }
      ]
    },
    {
      title: "Project",
      url: "#",
      icon: Settings2,
      allowedRoles: ["supervisor", "superadmin", "user"],
      items: [
        {
          title: "List",
          url: "/dashboard/projects"
        }
      ]
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      allowedRoles: ["supervisor", "superadmin"],
      items: [
        {
          title: "Upload",
          url: "/dashboard/models/data-upload"
        },
        {
          title: "Data Anotation",
          url: "/dashboard/models/data-anotation"
        },
        {
          title: "Dataset",
          url: "/dashboard/models/dataset"
        },
        {
          title: "Training",
          url: "/dashboard/models/training"
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  const { hasMounted } = useMounted();

  return (
    <Sidebar
      collapsible={isMobile ? "icon" : "none"}
      {...props}
      className="h-auto"
    >
      <SidebarHeader>
        <CompanyProfile />
      </SidebarHeader>
      <SidebarContent>
        {!hasMounted ? (
          <NavSkeleton />
        ) : (
          <>
            <NavMain items={data.navMain} />
            <NavProjects />
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="sticky bottom-0 z-auto bg-inherit">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
