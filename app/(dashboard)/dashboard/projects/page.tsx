"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Project } from "@/lib/types/project-type";
import useProject from "@/queries/use-project.query";
import { columns } from "./(table)/column";
import { DataTable } from "./(table)/table";

export default function Page() {
  const { data, isLoading, isError } = useProject();

  const projects = data?.data || ([] as Project[]);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Proyek</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex-1 flex flex-col py-4 pt-0 gap-4">
        <div className="space-y-2 px-4">
          <h2 className="text-2xl font-semibold">Daftar Proyek</h2>
        </div>
        <div className="space-y-3.5">
          <DataTable
            columns={columns}
            data={projects}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
    </>
  );
}
