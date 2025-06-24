"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Eye, Trash, MoreHorizontal, Download } from "lucide-react";
import { Project } from "@/lib/types/project-type";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import useProjectMutation from "@/mutation/use-project-mutation";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "idProject",
    header: "ID Project",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/projects/${row.original.idProject}`}
        className="font-medium hover:underline"
      >
        {row.original.idProject}
      </Link>
    )
  },
  {
    accessorKey: "namaProject",
    header: "Nama Project"
  },
  {
    accessorKey: "pemintaJasa",
    header: "Peminta Jasa"
  },
  {
    accessorKey: "tanggalOrderMasuk",
    header: "Tanggal Order Masuk",
    cell: ({ row }) => formatDate(row.original.tanggalOrderMasuk, false)
  },
  {
    accessorKey: "updatedAt",
    header: "Diupdate",
    cell: ({ row }) => formatDate(row.original.updatedAt)
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      const { deleteMutation } = useProjectMutation();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/projects/${row.original.idProject}`}
                className="cursor-pointer"
              >
                <Eye className="size-3 mr-2" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => {
                deleteMutation.mutate({
                  id: item._id
                });
              }}
              disabled={deleteMutation.isPending}
            >
              <Trash className="size-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
