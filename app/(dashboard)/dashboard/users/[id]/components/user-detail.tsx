"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserDetail } from "@/lib/api/user-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Hash,
  Shield,
  CheckCircle,
  XCircle
} from "lucide-react";

type Props = {
  idUser: string;
};

export default function UserDetail({ idUser }: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserDetail(idUser),
    queryKey: [QUERIES.USERS, idUser]
  });

  if (!data || isLoading) return null;

  const user = data.data;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-6 py-4 justify-between border-y px-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 rounded">
            <AvatarImage
              src={`https://github.com/${user.username}.png`}
              alt={`${user.username}'s avatar`}
            />
            <AvatarFallback className="rounded capitalize">
              {user.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-base font-medium">{user.name}</p>
              <BadgeCheck
                className={`stroke-background ${
                  user.isVerify ? "fill-primary" : "fill-gray-400"
                }`}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>

        <Button className="" size={"sm"}>
          <Edit />
          Edit
        </Button>
      </div>

      <div className="px-4 grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold mb-4">
            <User className="h-5 w-5" />
            Informasi Personal
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nomor Induk</p>
                <p className="text-sm text-muted-foreground">
                  {user.nomorInduk}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">No. HP</p>
                <p className="text-sm text-muted-foreground">{user.noHp}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Alamat</p>
                <p className="text-sm text-muted-foreground">{user.alamat}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Briefcase className="h-5 w-5" />
            Informasi Pekerjaan
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Divisi</p>
                <p className="text-sm text-muted-foreground">{user.devisi}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Jabatan</p>
                <p className="text-sm text-muted-foreground">{user.jabatan}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="px-4">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Shield className="h-5 w-5" />
          Informasi Sistem
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">User ID</p>
            <p className="text-sm text-muted-foreground border font-mono bg-muted px-2 py-1 w-fit rounded">
              {user._id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
