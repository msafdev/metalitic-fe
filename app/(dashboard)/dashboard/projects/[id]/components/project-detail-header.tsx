"use client";

import CreateProjectEvaluationForm from "@/components/forms/create-project-evaluation-form";
import CreateProjectForm from "@/components/forms/create-project-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import useModal from "@/hooks/use-modal";
import { getProjectDetail } from "@/lib/api/project-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Pencil,
  Plus,
  Settings,
  Settings2,
  User,
  Users,
  FolderOpen,
  Building,
  UserRoundX
} from "lucide-react";

type Props = {
  idProject: string;
};

export default function ProjectDetailHeader({ idProject }: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () => getProjectDetail(idProject),
    queryKey: [QUERIES.PROJECTS, idProject]
  });

  const {
    isOpen: isOpenProjectEvaluation,
    openModal: openModalProjectEvaluation,
    setIsOpen: setIsOpenProjectEvaluation,
    closeModal: closeModalProjectEvaluation
  } = useModal();

  const {
    isOpen: isOpenEdit,
    openModal: openModalEdit,
    setIsOpen: setIsOpenEdit,
    closeModal: closeModalEdit
  } = useModal();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  if (!data || isLoading) return null;

  const project = data.data;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-6 py-4 px-4 border-y border-border">
        <div className="flex items-center gap-3">
          <Avatar className="size-16 rounded">
            <AvatarFallback className="rounded capitalize bg-muted text-foreground font-semibold">
              {project.namaProject.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <p className="text-base font-medium text-foreground">
                {project.namaProject}
              </p>
              <Badge variant="secondary" className="font-mono text-xs">
                {project.idProject}
              </Badge>
              <Button size="icon" variant="ghost" onClick={openModalEdit}>
                <Pencil />
              </Button>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Dibuat {formatDate(project.createdAt)}
            </span>
          </div>
        </div>
        <Button
          className="has-[>svg]:pl-2"
          onClick={openModalProjectEvaluation}
        >
          <Plus size={12} /> Tambah Pengujian
        </Button>
      </div>

      {/* Main Info Grid */}
      <div className="px-4 grid gap-6 md:grid-cols-2">
        {/* Informasi Proyek */}
        <div>
          <div className="flex items-center gap-3 text-lg font-semibold mb-4">
            <FolderOpen className="size-5 text-primary" />
            Informasi Proyek
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Peminta Jasa
                </p>
                <p className="text-sm text-muted-foreground">
                  {project.pemintaJasa}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Tanggal Order Masuk
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(project.tanggalOrderMasuk)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Tim Penguji
                </p>
                <p className="text-sm text-muted-foreground">
                  {project.penguji.length} Anggota
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tim Penguji */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <Users className="size-5 text-amber-500" />
            Tim Penguji
          </div>

          {!project.penguji.length ? (
            <div className="text-center bg-muted text-muted-foreground rounded-md p-4 border border-dashed">
              <UserRoundX className="mx-auto mb-2 text-foreground" />
              <p className="text-sm">Belum ada penguji yang ditugaskan</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  Anggota Tim
                </h3>
                <Badge variant="secondary">
                  {project.penguji.length} Anggota
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.penguji.map((penguji) => (
                  <div key={penguji._id} className="flex items-center gap-3">
                    <Avatar className="size-8 border">
                      <AvatarFallback className="text-[10px] bg-muted text-foreground font-semibold">
                        {penguji.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {penguji.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Informasi Sistem */}
      <div className="px-4">
        <div className="flex items-center gap-3 text-lg font-semibold mb-4">
          <Building className="size-5 text-purple-500" />
          Informasi Sistem
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-foreground">Project ID</p>
            <p className="text-sm text-muted-foreground border bg-muted px-2 py-1 w-fit rounded font-mono">
              {project._id}
            </p>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog
        open={isOpenProjectEvaluation}
        onOpenChange={setIsOpenProjectEvaluation}
      >
        <DialogContent
          aria-describedby="Modal Dialog untuk Buat Pengujian Baru"
          className="max-w-sm overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings size={18} /> Tambah Pengujian Baru
            </DialogTitle>
          </DialogHeader>
          <CreateProjectEvaluationForm
            projectId={idProject}
            closeModal={closeModalProjectEvaluation}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DialogContent
          aria-describedby="Modal Dialog untuk Edit Proyek"
          className="w-auto max-w-2xl h-[80vh] lg:h-auto max-h-[90svh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 size={20} /> Edit Proyek
            </DialogTitle>
          </DialogHeader>

          <CreateProjectForm
            isEditForm
            projectId={idProject}
            closeProjectModal={closeModalEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
