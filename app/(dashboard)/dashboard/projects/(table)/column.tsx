"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Trash, MoreHorizontal, Download } from "lucide-react";
import { Project } from "@/lib/types/project-type";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "namaProject",
    header: "Name",
  },
  {
    accessorKey: "permintaanJasa",
    header: "Peminta",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.namaProject}</span>;
    },
  },
  {
    accessorKey: "sample",
    header: "Sample",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.sample}</span>;
    },
  },
  {
    accessorKey: "tglPengujian",
    header: "Issued At",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.tglPengujian}</span>;
    },
  },
  {
    accessorKey: "lokasiPengujian",
    header: "Location",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.lokasiPengujian}</span>;
    },
  },
  {
    accessorKey: "areaPengujian",
    header: "Area",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.areaPengujian}</span>;
    },
  },
  {
    accessorKey: "posisiPengujian",
    header: "Position",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.posisiPengujian}</span>;
    },
  },
    {
    accessorKey: "material",
    header: "Position",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.posisiPengujian}</span>;
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="size-3 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="size-3 mr-2" />
            Download
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <Trash className="size-3 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
