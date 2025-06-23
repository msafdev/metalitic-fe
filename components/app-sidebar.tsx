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

const data = {
  navMain: [
    {
      title: "User",
      url: "#",
      icon: User,
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
      items: [
        {
          title: "Upload",
          url: "/dashboard/data-upload"
        },
        {
          title: "Data Anotation",
          url: "/dashboard/data-anotation"
        },
        {
          title: "Dataset",
          url: "/dashboard/dataset"
        },
        {
          title: "Training",
          url: "/dashboard/training"
        }
      ]
    }
  ],
  recentProjects: [
    {
      name: "MTL-001",
      url: "#"
    },
    {
      name: "MTL-002",
      url: "#"
    },
    {
      name: "MTL-003",
      url: "#"
    },
    {
      name: "MTL-004",
      url: "#"
    },
    {
      name: "MTL-005",
      url: "#"
    },
    {
      name: "MTL-006",
      url: "#"
    },
    {
      name: "MTL-007",
      url: "#"
    },
    {
      name: "MTL-008",
      url: "#"
    },
    {
      name: "MTL-009",
      url: "#"
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();

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
        <NavMain items={data.navMain} />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter className="sticky bottom-0 z-auto bg-inherit">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
