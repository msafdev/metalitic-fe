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
import { Eye, Trash, MoreHorizontal, Download, Check } from "lucide-react";
import { User } from "@/lib/types/user-type";
import useUserMutation from "@/mutation/use-user-mutation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUpload } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8 rounded">
            <AvatarImage
              src={getUpload(item.avatarUser)}
              alt={`${item.username}'s avatar`}
            />
            <AvatarFallback className="capitalize rounded">
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-nowrap font-medium">{item.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.email}</span>;
    }
  },
  {
    accessorKey: "noHp",
    header: "No. HP",
    cell: ({ row }) => {
      const item = row.original;
      return <span className="">{item.noHp}</span>;
    }
  },
  {
    accessorKey: "devisi",
    header: "Divisi",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="">
          <p className="text-nowrap font-medium text-foreground">
            {item.devisi}
          </p>
          <span className="text-nowrap text-xs text-muted-foreground">
            {item.jabatan}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "isVerify",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original;
      const isVerified = item.isVerify;

      return (
        <div
          className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium text-nowrap
          ${
            isVerified
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {isVerified ? "Sudah Verifikasi" : "Belum Verifikasi"}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      const { verifyMutation, deleteMutation } = useUserMutation();

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
                href={`/dashboard/users/${item._id}`}
                className="cursor-pointer"
              >
                <Eye className="size-3 mr-2" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                verifyMutation.mutate({
                  username: item.username,
                  isVerify: true
                });
              }}
              disabled={item.isVerify || verifyMutation.isPending}
            >
              <Check className="size-3 mr-2" />
              Verifikasi
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
