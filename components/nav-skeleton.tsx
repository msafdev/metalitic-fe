import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

export function NavSkeleton() {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>
          <Skeleton className="w-16 h-6 mb-6" />
        </SidebarGroupLabel>
        <SidebarMenu className="px-2 mb-4">
          <Skeleton className="w-24 h-5" />
        </SidebarMenu>
        <SidebarMenu className="px-2 mb-4">
          <Skeleton className="w-20 h-5" />
        </SidebarMenu>
        <SidebarMenu className="px-2 mb-4">
          <Skeleton className="w-28 h-5" />
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>
          <Skeleton className="w-16 h-6 mb-6" />
        </SidebarGroupLabel>
        <SidebarMenu className="px-2 mb-4">
          <Skeleton className="w-20 h-5" />
        </SidebarMenu>
        <SidebarMenu className="px-2 mb-4">
          <Skeleton className="w-20 h-5" />
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
