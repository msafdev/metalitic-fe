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
import ServiceRequesterForm from "./service-requester-form";
import useServiceRequesterDropdown from "@/queries/dropdown/use-service.query.dropdown";
import useUser from "@/queries/use-user.query";
import { useState } from "react";
import { User } from "@/lib/types/user-type";
import ErrorInputMessage from "../input/error-input-message";

const projectSchema = z.object({
  namaProject: z.string({ required_error: "Required" }),
  pemintaJasa: z.string({ required_error: "Required" }),
  tanggalOrderMasuk: z.string({ required_error: "Required" })
});

export default function ProjectForm() {
  const { isOpen, openModal, setIsOpen, closeModal } = useModal();
  const { createProjectMutation } = useProjectMutation();
  const { serviceRequestersDropdownItems } = useServiceRequesterDropdown();
  const { data } = useUser();
  const [selectedTesters, setSelectedTesters] = useState<User[]>([]);

  const getServiceRequesterById = (id: string) => {
    return serviceRequestersDropdownItems.find((item) => item.value === id);
  };

  const formik = useFormik({
    initialValues: {
      namaProject: "",
      pemintaJasa: "",
      tanggalOrderMasuk: ""
    },
    validationSchema: toFormikValidationSchema(projectSchema),
    onSubmit: async (values) => {
      const pemintaJasa = getServiceRequesterById(values.pemintaJasa);

      createProjectMutation.mutate({
        ...values,
        penguji: selectedTesters.map((tester) => tester.name),
        pemintaJasa: pemintaJasa?.label as string
      });
    }
  });

  // Get nama jabatan
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

  // filter tester that already selected
  const filteredTesters = data?.data?.filter(
    (user) => !selectedTesters.find((item) => item._id === user._id)
  );

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="namaProject">Nama Project</Label>
          <Input
            placeholder="Nama Project"
            id="namaProject"
            name="namaProject"
            onChange={formik.handleChange}
            value={formik.values.namaProject}
          />
          {formik.touched.namaProject && formik.errors.namaProject && (
            <ErrorInputMessage>{formik.errors.namaProject}</ErrorInputMessage>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pemintaJasa">Peminta Jasa</Label>
          <div className="flex gap-2">
            <ComboboxGroup
              value={formik.values.pemintaJasa}
              items={serviceRequestersDropdownItems}
              onSelect={(value) => formik.setFieldValue("pemintaJasa", value)}
              noItemsFallbackText="Tidak Ditemukan"
              placeholder="Pilih Peminta Jasa"
            />

            <Button variant="outline" onClick={openModal}>
              <Plus />
            </Button>
          </div>
          {formik.touched.pemintaJasa && formik.errors.pemintaJasa && (
            <ErrorInputMessage>{formik.errors.pemintaJasa}</ErrorInputMessage>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tanggalOrderMasuk">Tanggal Order Masuk</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
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
              <ErrorInputMessage>
                {formik.errors.tanggalOrderMasuk}
              </ErrorInputMessage>
            )}
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Reviewers */}
        <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Penguji Tersedia</h3>
                <p className="text-sm text-slate-600">Siap untuk ditugaskan</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-slate-100 text-slate-700 font-semibold"
            >
              {filteredTesters?.length ?? 0}
            </Badge>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {!filteredTesters ||
              (!filteredTesters.length && (
                <div className="grid place-content-center gap-4 text-sm text-muted-foreground/70 py-10">
                  <UserRoundX className="mx-auto" />
                  <div>Tidak ada penguji tersedia</div>
                </div>
              ))}
            {filteredTesters?.map((user, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 py-2 px-4 hover:bg-slate-50 rounded-2xl transition-all duration-300 cursor-pointer group"
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
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {getPositionLabel(user.jabatan)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
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
        <div className="bg-gradient-to-br from-blue-50/80 to-sky-50/80 rounded-xl p-4 border border-blue-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900">Penguji Ditugaskan</h3>
                <p className="text-sm text-blue-700">
                  Sedang mengerjakan proyek
                </p>
              </div>
            </div>
            <Badge className="px-3 py-1 bg-blue-100 text-blue-800 font-semibold border border-blue-200">
              {selectedTesters.length}
            </Badge>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {!selectedTesters.length && (
              <div className="grid place-content-center gap-4 text-sm text-muted-foreground/70 py-10">
                <UserRoundX className="mx-auto" />
                <div>Belum ada penguji yang ditugaskan</div>
              </div>
            )}
            {selectedTesters.map((user, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 py-2 px-4 hover:bg-white/60 rounded-2xl transition-all duration-300 cursor-pointer group"
              >
                <Avatar className="size-8 border-2 border-blue-200">
                  <AvatarFallback className="text-[10px] bg-gradient-to-br from-blue-500 to-sky-600 text-white font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 group-hover:text-blue-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-blue-600">
                    {getPositionLabel(user.jabatan)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
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
          Simpan Proyek
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

          <ServiceRequesterForm />

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
