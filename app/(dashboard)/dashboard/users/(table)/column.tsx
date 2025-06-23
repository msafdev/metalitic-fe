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
import { Eye, Trash, MoreHorizontal, Download, Check } from "lucide-react";
import { User } from "@/lib/types/user-type";
import useAuthMutation from "@/mutation/use-auth-mutation";
import useUserMutation from "@/mutation/use-user-mutation";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.name}</span>;
    },
  },
  {
    accessorKey: "nomorInduk",
    header: "NIK",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.nomorInduk}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.email}</span>;
    },
  },
  {
    accessorKey: "noHp",
    header: "No. HP",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.noHp}</span>;
    },
  },
  {
    accessorKey: "devisi",
    header: "Divisi",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.devisi}</span>;
    },
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.jabatan}</span>;
    },
  },
  {
    accessorKey: "isVerify",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original;
      const isVerified = item.isVerify;

      return (
        <div
          className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium
          ${
            isVerified
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {isVerified ? "Sudah Verifikasi" : "Belum Verifikasi"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
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
              <Check className="size-3 mr-2" />
              Verifikasi
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash className="size-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
