"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import useModal from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import useProjectMutation from "@/mutation/use-project-mutation";
import { format } from "date-fns";
import { useFormik } from "formik";
import {
  CalendarIcon,
  CheckCircle,
  Plus,
  Save,
  UserIcon,
  UserRoundX,
  Users,
  X
} from "lucide-react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ComboboxGroup from "../input/combobox-group";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import CreateServiceRequesterForm from "./create-service-requester-form";
import useServiceRequesterDropdown from "@/queries/dropdown/use-service.query.dropdown";
import useUser from "@/queries/use-user.query";
import { useEffect, useState } from "react";
import { User } from "@/lib/types/user-type";
import ErrorInputMessage from "../input/error-input-message";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "@/lib/api/project-api";
import { QUERIES } from "@/lib/constants/queries";

const projectSchema = z.object({
  namaProject: z.string({ required_error: "Required" }),
  pemintaJasa: z.string({ required_error: "Required" }),
  tanggalOrderMasuk: z.string({ required_error: "Required" })
});

type EditProps = {
  isEditForm: true;
  projectId: string; // required
  closeProjectModal: () => void;
};

type CreateProps = {
  isEditForm?: false | undefined;
  projectId?: undefined; // optional / not needed
  closeProjectModal: () => void;
};

type Props = EditProps | CreateProps;

export default function CreateProjectForm({
  isEditForm = false,
  projectId,
  closeProjectModal
}: Props) {
  const { isOpen, openModal, setIsOpen, closeModal } = useModal();
  const { createMutation, updateMutation } = useProjectMutation();
  const { serviceRequestersDropdownItems } = useServiceRequesterDropdown();
  const { data } = useUser();
  const [selectedTesters, setSelectedTesters] = useState<User[]>([]);

  const { data: projectDetail, isLoading } = useQuery({
    queryFn: () => getProjectDetail(projectId as string),
    queryKey: [QUERIES.PROJECTS, projectId],
    enabled: isEditForm && !!projectId
  });

  const getServiceRequesterById = (id: string) => {
    return serviceRequestersDropdownItems.find((item) => item.value === id);
  };

  const getServiceRequesterByName = (name: string) => {
    return serviceRequestersDropdownItems.find((item) => item.label === name);
  };

  useEffect(() => {
    if (!projectDetail || isLoading) return;

    setSelectedTesters(projectDetail.data.penguji as User[]);
  }, [projectDetail, isLoading]);

  const formik = useFormik({
    initialValues: projectDetail?.data
      ? {
          namaProject: projectDetail.data.namaProject,
          pemintaJasa: getServiceRequesterByName(projectDetail.data.pemintaJasa)
            ?.value as string,
          tanggalOrderMasuk: projectDetail.data.tanggalOrderMasuk
        }
      : {
          namaProject: "",
          pemintaJasa: "",
          tanggalOrderMasuk: ""
        },
    validationSchema: toFormikValidationSchema(projectSchema),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const pemintaJasa = getServiceRequesterById(values.pemintaJasa);

      if (isEditForm) {
        updateMutation.mutate(
          {
            id: projectId as string,
            body: {
              ...values,
              penguji: selectedTesters.map((tester) => tester._id),
              pemintaJasa: pemintaJasa?.label as string
            }
          },
          {
            onSuccess: () => {
              resetForm();
              closeProjectModal();
            },
            onError: () => console.error("Something wrong happened")
          }
        );
      } else {
        createMutation.mutate(
          {
            ...values,
            penguji: selectedTesters.map((tester) => tester._id),
            pemintaJasa: pemintaJasa?.label as string
          },
          {
            onSuccess: () => {
              resetForm();
              closeProjectModal();
            },
            onError: () => console.error("Something wrong happened")
          }
        );
      }
    }
  });

  const getPositionLabel = (jabatan: string) => {
    if (!jabatan || jabatan === "-") return "Tidak Ada Jabatan";
    return jabatan;
  };

  const addTester = (tester: User) => {
    if (selectedTesters.find((item) => item._id === tester._id)) return;

    setSelectedTesters((prev) => [...prev, tester]);
  };

  const removeTester = (tester: User) => {
    setSelectedTesters((prev) =>
      prev.filter((item) => item._id !== tester._id)
    );
  };

  const filteredTesters = data?.data?.filter(
    (user) =>
      !selectedTesters.find((item) => item._id === user._id) &&
      user.role === "user" &&
      user.isVerify
  );

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2 relative">
          <Label htmlFor="namaProject">Nama Project</Label>
          <Input
            placeholder="Nama Project"
            id="namaProject"
            name="namaProject"
            onChange={formik.handleChange}
            value={formik.values.namaProject}
          />
          {formik.touched.namaProject && formik.errors.namaProject && (
            <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 left-2">
              {formik.errors.namaProject}
            </ErrorInputMessage>
          )}
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="pemintaJasa">Peminta Jasa</Label>
          <div className="flex gap-2">
            <ComboboxGroup
              value={formik.values.pemintaJasa}
              items={serviceRequestersDropdownItems}
              onSelect={(value) => formik.setFieldValue("pemintaJasa", value)}
              noItemsFallbackText="Tidak Ditemukan"
              placeholder="Pilih Peminta Jasa"
            />

            <Button
              variant="outline"
              size="icon"
              onClick={openModal}
              type="button"
            >
              <Plus />
            </Button>
          </div>
          {formik.touched.pemintaJasa && formik.errors.pemintaJasa && (
            <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 left-2">
              {formik.errors.pemintaJasa}
            </ErrorInputMessage>
          )}
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="tanggalOrderMasuk">Tanggal Order Masuk</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !formik.values.tanggalOrderMasuk && "text-muted-foreground"
                )}
              >
                {formik.values.tanggalOrderMasuk ? (
                  format(formik.values.tanggalOrderMasuk, "dd/MM/yyyy")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(formik.values.tanggalOrderMasuk)}
                onSelect={(date) => {
                  if (date) {
                    formik.setFieldValue(
                      "tanggalOrderMasuk",
                      format(date, "yyyy-MM-dd")
                    );
                  }
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          {formik.touched.tanggalOrderMasuk &&
            formik.errors.tanggalOrderMasuk && (
              <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 left-2">
                {formik.errors.tanggalOrderMasuk}
              </ErrorInputMessage>
            )}
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Available Reviewers */}
        <div className="rounded-lg py-2 px-3.5 border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="size-9 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center">
                <Users className="size-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">
                  Penguji Tersedia
                </h3>
                <p className="text-xs text-muted-foreground">
                  Siap untuk ditugaskan
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="aspect-square w-8 grid place-content-center text-foreground/80 font-semibold"
            >
              {filteredTesters?.length ?? 0}
            </Badge>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {!filteredTesters ||
              (!filteredTesters.length && (
                <div className="grid place-content-center gap-4 text-sm text-muted-foreground/70 py-10">
                  <UserRoundX className="mx-auto" />
                  <p className="px-8 text-pretty text-center">
                    Tidak ada penguji yang tersedia
                  </p>
                </div>
              ))}
            {filteredTesters?.map((user, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 py-2 group"
              >
                <Avatar className="size-8 border-2 border-slate-200">
                  <AvatarFallback className="text-[10px] bg-gradient-to-br from-slate-500 to-slate-600 text-white font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground group-hover:text-foreground/80">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getPositionLabel(user.jabatan)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => addTester(user)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Reviewers */}
        <div className="rounded-lg py-2 px-3.5 border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="size-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="size-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-green-600">
                  Penguji Ditugaskan
                </h3>
                <p className="text-xs text-green-700">Sudah ditugaskan</p>
              </div>
            </div>
            <Badge className="aspect-square w-8 grid place-content-center bg-green-100 text-green-800 font-semibold border hover:bg-green-100  border-green-200">
              {selectedTesters.length}
            </Badge>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {!selectedTesters.length && (
              <div className="grid place-content-center gap-4 text-sm text-muted-foreground/70 py-10">
                <UserRoundX className="mx-auto" />
                <p className="px-8 text-pretty text-center">
                  Belum ada penguji yang ditugaskan
                </p>
              </div>
            )}
            {selectedTesters.map((user, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 py-2 group"
              >
                <Avatar className="size-9 border-2 border-green-200">
                  <AvatarFallback className="text-[10px] bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-700 group-hover:text-green-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-green-700">
                    {getPositionLabel(user.jabatan)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeTester(user)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-end">
        <Button type="submit">
          <Save />
          {isEditForm ? "Edit Proyek" : "Simpan Proyek"}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby="Modal Dialog untuk Menambahkan Peminta Jasa"
          className="lg:min-w-[700px] max-h-[80vh] lg:h-auto overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserIcon size={20} /> Tambah Peminta Jasa
            </DialogTitle>
          </DialogHeader>

          <CreateServiceRequesterForm />

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Selesai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
