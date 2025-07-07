"use client";

import CreateProjectEvaluationForm from "@/components/forms/create-project-evaluation-form";
import CreateProjectForm from "@/components/forms/create-project-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  UserRoundX,
  Users
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
    <>
      <Card className="relative border border-gray-50">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4">
              {/* Project Title & Status */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold">{project.namaProject}</h1>
                  <Button size="icon" variant="ghost" onClick={openModalEdit}>
                    <Pencil />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-sm font-mono bg-gray-50 border-gray-200"
                  >
                    {project.idProject}
                  </Badge>
                  <div className="h-1 w-1 bg-gray-300 rounded-full" />
                  <span className="text-sm text-gray-500">
                    Dibuat {formatDate(project.createdAt)}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-gray-100">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{project.pemintaJasa}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-gray-100">
                  <CalendarDays className="w-4 h-4 text-green-500" />
                  <span>{formatDate(project.tanggalOrderMasuk)}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-gray-100">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>{project.penguji.length} Tim Penguji</span>
                </div>
              </div>
            </div>

            <Button size="lg" onClick={openModalProjectEvaluation}>
              <Plus className="w-5 h-5 mr-2" />
              Tambah Pengujian
            </Button>
          </div>

          {/* Tim Penguji */}
          <div className="mt-4 py-4 px-6 bg-white/60 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Tim Penguji
              </h3>
              <Badge variant="secondary" className="bg-gray-100">
                {project.penguji.length} Anggota
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.penguji.map((penguji, index) => (
                <div
                  key={penguji._id}
                  className="flex items-center gap-2 px-2 py-2 rounded-full border border-gray-200 shadow-sm transition-shadow"
                >
                  <Avatar className="size-8 border-2 border-slate-200">
                    <AvatarFallback className="text-[10px] bg-gradient-to-br from-slate-500 to-slate-600 text-white font-semibold">
                      {penguji.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">
                    {penguji.name}
                  </span>
                </div>
              ))}
            </div>
            {!project.penguji.length && (
              <div className="text-muted-foreground/70 text-center">
                <UserRoundX className="mx-auto mb-3" />
                <div>Belum ada penguji yang ditugaskan</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
              <Settings size={20} /> Tambah Pengujian Baru
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
    </>
  );
}
