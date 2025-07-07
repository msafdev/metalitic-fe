"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserDetail } from "@/lib/api/user-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Edit,
  Settings2,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Hash,
  Shield
} from "lucide-react";
import { getUpload } from "@/lib/utils";
import useModal from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import UpdateUserForm from "@/components/forms/update-user-form";
import Link from "next/link";

type Props = {
  idUser: string;
};

export default function UserDetail({ idUser }: Props) {
  const { isOpen, openModal, setIsOpen, closeModal } = useModal();

  const { data, isLoading } = useQuery({
    queryFn: () => getUserDetail(idUser),
    queryKey: [QUERIES.USERS, idUser]
  });

  if (!data || isLoading) return null;

  const user = data.data;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-6 px-4 py-4 border-y border-border">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 rounded">
            <AvatarImage src={getUpload(user.avatarUser)} alt={user.username} />
            <AvatarFallback className="rounded capitalize bg-muted text-foreground font-semibold">
              {user.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-base font-medium text-foreground">
                {user.name}
              </p>
              <BadgeCheck
                className={`w-4 h-4 ${
                  user.isVerify
                    ? "fill-primary stroke-background"
                    : "fill-muted stroke-border"
                }`}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>

        <Button className="has-[>svg]:pl-2" onClick={openModal}>
          <Edit size={12} /> Ubah User
        </Button>
      </div>

      {/* Info Grid */}
      <div className="px-4 grid gap-6 md:grid-cols-2">
        {/* Personal Info */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold mb-4">
            <User className="size-5 text-primary" />
            Informasi Personal
          </div>
          <div className="space-y-4">
            {[
              { icon: Hash, label: "Nomor Induk", value: user.nomorInduk },
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "No. HP", value: user.noHp },
              { icon: MapPin, label: "Alamat", value: user.alamat }
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex items-start gap-3">
                <Icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Info */}
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Briefcase className="size-5 text-green-500" />
            Informasi Pekerjaan
          </div>
          <div className="space-y-4">
            {[
              { icon: Building, label: "Divisi", value: user.devisi },
              { icon: Briefcase, label: "Jabatan", value: user.jabatan },
              { icon: Shield, label: "Role", value: user.role }
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="px-4">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Shield className="size-5 text-purple-500" />
          Informasi Sistem
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-foreground">User ID</p>
            <p className="text-sm text-muted-foreground border bg-muted font-mono px-2 py-1 rounded w-fit">
              {user._id}
            </p>
          </div>
        </div>
      </div>

      {/* Project Table */}
      {user.projects?.length > 0 && (
        <div className="px-4">
          <div className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Briefcase className="size-5 text-foreground" />
            Daftar Proyek
          </div>

          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">
                    ID Project
                  </th>
                  <th className="px-4 py-2 text-left font-medium">Nama</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Peminta Jasa
                  </th>
                  <th className="px-4 py-2 text-left font-medium">
                    Tanggal Order
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.projects.map((project: any, idx: number) => (
                  <tr
                    key={project._id}
                    className={`${
                      idx % 2 === 1 ? "bg-muted/30" : ""
                    } border-t hover:bg-muted/60 transition-colors`}
                  >
                    <td className="px-4 py-2 underline text-primary cursor-pointer">
                      <Link href={`/dashboard/projects/${project.idProject}`}>
                        {project.idProject}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-foreground">
                      {project.namaProject}
                    </td>
                    <td className="px-4 py-2 text-foreground">
                      {project.pemintaJasa}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {new Date(project.tanggalOrderMasuk).toLocaleDateString(
                        "id-ID",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby="Modal untuk ubah user"
          className="w-auto max-w-2xl h-[80vh] lg:h-auto max-h-[90svh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 size={20} /> Ubah User
            </DialogTitle>
          </DialogHeader>
          <UpdateUserForm userId={user._id} closeUserModal={closeModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
