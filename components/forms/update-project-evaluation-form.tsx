"use client";

import useModal from "@/hooks/use-modal";
import { getProjectEvaluationById } from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import { cn } from "@/lib/utils";
import useProjectEvaluationMutation from "@/mutation/use-project-evaluation-mutation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useFormik } from "formik";
import {
  CalendarIcon,
  Camera,
  FlaskConical,
  ImageUp,
  Microscope,
  Save,
  TrashIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import DeleteAlertDialog from "../dialog/delete-alert-dialog";
import ComboboxGroup from "../input/combobox-group";
import DropzoneContainer from "../input/dropzone-container";
import ErrorInputMessage from "../input/error-input-message";
import FilesDropzone from "../input/files-dropzone";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  projectId: string;
  projectEvaluationId: string;
};

const projectEvaluationSchema = z.object({
  id: z.string().optional(),
  nama: z.string().optional(),
  tanggal: z.string().optional(),
  lokasi: z.string().optional(),
  area: z.string().optional(),
  posisi: z.string().optional(),
  material: z.string().optional(),
  gritSandWhell: z.string().optional(),
  etsa: z.string().optional(),
  kamera: z.string().optional(),
  merkMikroskop: z.string().optional(),
  perbesaranMikroskop: z.string().optional(),
  gambarKomponent1: z.any().optional(),
  gambarKomponent2: z.any().optional(),
  listGambarStrukturMikro: z.array(z.any()).optional(),
  aiModelFasa: z.string().optional(),
  aiModelCrack: z.string().optional(),
  aiModelDegradasi: z.string().optional()
});

export default function UpdateProjectEvaluationForm({
  projectId,
  projectEvaluationId
}: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () => getProjectEvaluationById(projectEvaluationId),
    queryKey: [QUERIES.PROJECTS_EVALUATION, projectEvaluationId]
  });

  const {
    updateProjectEvaluationMutation,
    deleteProjectEvaluationImageComponent1Mutation,
    deleteProjectEvaluationImageComponent2Mutation,
    deleteProjectEvaluationImageListMicroStructureMutation,
    updateProjectEvaluationStatusToProcessingMutation,
    updateProjectEvaluationStatusToPendingMutation
  } = useProjectEvaluationMutation();
  const [gambarKomponent1, setGambarKomponent1] = useState<
    (File & { preview: string })[]
  >([]);
  const [gambarKomponent2, setGambarKomponent2] = useState<
    (File & { preview: string })[]
  >([]);
  const [listGambarStrukturMikro, setListGambarStrukturMikro] = useState<
    (File & { preview: string })[]
  >([]);

  const {
    isOpen: isOpenDeleteGambarKomponen1,
    setIsOpen: setIsOpenDeleteGambarKomponen1,
    openModal: openModalDeleteGambarKomponen1
  } = useModal();

  const {
    isOpen: isOpenDeleteGambarKomponen2,
    setIsOpen: setIsOpenDeleteGambarKomponen2,
    openModal: openModalDeleteGambarKomponen2
  } = useModal();

  const {
    isOpen: isOpenDeleteGambarStrukturMikro,
    setIsOpen: setIsOpenDeleteGambarStrukturMikro,
    openModal: openModalDeleteGambarStrukturMikro
  } = useModal();

  const projectEvaluation = data?.data;

  const formik = useFormik({
    initialValues: {
      id: projectEvaluation?.id || "",
      nama: projectEvaluation?.nama || "",
      tanggal: projectEvaluation?.tanggal || "",
      lokasi: projectEvaluation?.lokasi || "",
      area: projectEvaluation?.area || "",
      posisi: projectEvaluation?.posisi || "",
      material: projectEvaluation?.material || "",
      gritSandWhell: projectEvaluation?.gritSandWhell || "",
      etsa: projectEvaluation?.etsa || "",
      kamera: projectEvaluation?.kamera || "",
      merkMikroskop: projectEvaluation?.merkMikroskop || "",
      perbesaranMikroskop: projectEvaluation?.perbesaranMikroskop || "",
      gambarKomponent1: projectEvaluation?.gambarKomponent1 || "",
      gambarKomponent2: projectEvaluation?.gambarKomponent2 || "",
      listGambarStrukturMikro: projectEvaluation?.listGambarStrukturMikro || [],
      aiModelFasa: projectEvaluation?.aiModelFasa || "",
      aiModelCrack: projectEvaluation?.aiModelCrack || "",
      aiModelDegradasi: projectEvaluation?.aiModelDegradasi || ""
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(projectEvaluationSchema),
    onSubmit: async (values) => {
      updateProjectEvaluationMutation.mutate({
        id: projectEvaluationId,
        body: {
          ...values,
          projectId: projectEvaluation?.projectId as string,
          gambarKomponent1: gambarKomponent1[0],
          gambarKomponent2: gambarKomponent2[0],
          listGambarStrukturMikro: listGambarStrukturMikro
        }
      });
    }
  });

  useEffect(() => {
    updateProjectEvaluationStatusToProcessingMutation.mutate(
      projectEvaluationId
    );

    return () => {
      if (projectEvaluation?.status === "COMPLETED") return;

      updateProjectEvaluationStatusToPendingMutation.mutate({
        projectId,
        projectEvaluationId
      });
    };
  }, []);

  if (!projectEvaluation || isLoading) return null;

  return (
    <div className="max-w-4xl mx-auto bg-background border border-slate-200/50 rounded-xl">
      <div className="rounded-t-xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {projectEvaluation.nama}
            </h2>
            <div className="flex items-center space-x-4 mt-4">
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10"
              >
                {projectEvaluation.projectId}
              </Badge>
              <Badge
                variant="outline"
                className="border-white/30 text-white bg-white/10"
              >
                {projectEvaluation.id}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-3">
              <Badge variant="secondary">{projectEvaluation.status}</Badge>
            </div>
            <div className="text-4xl font-bold mb-2">
              {projectEvaluation.progress}%
            </div>
            <div className="text-slate-200">Progress</div>
          </div>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="p-6">
          <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
              <FlaskConical className="size-5 text-purple-500" />
              <span>Detail Pengujian</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Tanggal */}
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-transparent",
                        !formik.values.tanggal && "text-muted-foreground"
                      )}
                    >
                      {formik.values.tanggal ? (
                        format(formik.values.tanggal, "dd/MM/yyyy")
                      ) : (
                        <span>Pilih Tanggal Pengujian</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(formik.values.tanggal)}
                      onSelect={(date) => {
                        if (date) {
                          formik.setFieldValue(
                            "tanggal",
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
                {formik.touched.tanggal && formik.errors.tanggal && (
                  <ErrorInputMessage>{formik.errors.tanggal}</ErrorInputMessage>
                )}
              </div>

              {/* Lokasi */}
              <div className="space-y-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  placeholder="Lokasi Pengujian"
                  id="lokasi"
                  name="lokasi"
                  onChange={formik.handleChange}
                  value={formik.values.lokasi}
                />
                {formik.touched.lokasi && formik.errors.lokasi && (
                  <ErrorInputMessage>{formik.errors.lokasi}</ErrorInputMessage>
                )}
              </div>

              {/* Area */}
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Input
                  placeholder="Area Pengujian"
                  id="area"
                  name="area"
                  onChange={formik.handleChange}
                  value={formik.values.area}
                />
                {formik.touched.area && formik.errors.area && (
                  <ErrorInputMessage>{formik.errors.area}</ErrorInputMessage>
                )}
              </div>

              {/* Posisi */}
              <div className="space-y-2">
                <Label htmlFor="posisi">Posisi</Label>
                <Input
                  placeholder="Posisi Pengujian"
                  id="posisi"
                  name="posisi"
                  onChange={formik.handleChange}
                  value={formik.values.posisi}
                />
                {formik.touched.posisi && formik.errors.posisi && (
                  <ErrorInputMessage>{formik.errors.posisi}</ErrorInputMessage>
                )}
              </div>

              {/* Material */}
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  placeholder="Material"
                  id="material"
                  name="material"
                  onChange={formik.handleChange}
                  value={formik.values.material}
                />
                {formik.touched.material && formik.errors.material && (
                  <ErrorInputMessage>
                    {formik.errors.material}
                  </ErrorInputMessage>
                )}
              </div>

              {/* Grit Sand Whell */}
              <div className="space-y-2">
                <Label htmlFor="gritSandWhell">Grit Sand Wheel</Label>
                <Input
                  placeholder="Grit Sand Wheel"
                  id="gritSandWhell"
                  name="gritSandWhell"
                  onChange={formik.handleChange}
                  value={formik.values.gritSandWhell}
                />
                {formik.touched.gritSandWhell &&
                  formik.errors.gritSandWhell && (
                    <ErrorInputMessage>
                      {formik.errors.gritSandWhell}
                    </ErrorInputMessage>
                  )}
              </div>

              {/* ETSA */}
              <div className="space-y-2">
                <Label htmlFor="etsa">ETSA</Label>
                <Input
                  placeholder="ETSA"
                  id="etsa"
                  name="etsa"
                  onChange={formik.handleChange}
                  value={formik.values.etsa}
                />
                {formik.touched.etsa && formik.errors.etsa && (
                  <ErrorInputMessage>{formik.errors.etsa}</ErrorInputMessage>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50 mt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
              <Camera className="size-5 text-blue-500" />
              <span>Kamera & Gambar</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Kamera */}
              <div className="space-y-2">
                <Label htmlFor="kamera">Kamera</Label>
                <Input
                  placeholder="Kamera"
                  id="kamera"
                  name="kamera"
                  onChange={formik.handleChange}
                  value={formik.values.kamera}
                />
                {formik.touched.kamera && formik.errors.kamera && (
                  <ErrorInputMessage>{formik.errors.kamera}</ErrorInputMessage>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Merk Mikroskop */}
                <div className="space-y-2">
                  <Label htmlFor="merkMikroskop">Merk Mikroskop</Label>
                  <Input
                    placeholder="Merk Mikroskop"
                    id="merkMikroskop"
                    name="merkMikroskop"
                    onChange={formik.handleChange}
                    value={formik.values.merkMikroskop}
                  />
                  {formik.touched.merkMikroskop &&
                    formik.errors.merkMikroskop && (
                      <ErrorInputMessage>
                        {formik.errors.merkMikroskop}
                      </ErrorInputMessage>
                    )}
                </div>

                {/* Perbesaran Mikroskop */}
                <div className="space-y-2">
                  <Label htmlFor="perbesaranMikroskop">
                    Perbesaran Mikroskop
                  </Label>
                  <Input
                    placeholder="Perbesaran Mikroskop"
                    id="perbesaranMikroskop"
                    name="perbesaranMikroskop"
                    onChange={formik.handleChange}
                    value={formik.values.perbesaranMikroskop}
                  />
                  {formik.touched.perbesaranMikroskop &&
                    formik.errors.perbesaranMikroskop && (
                      <ErrorInputMessage>
                        {formik.errors.perbesaranMikroskop}
                      </ErrorInputMessage>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="perbesaranMikroskop">Gambar Komponen</Label>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {projectEvaluation.gambarKomponent1 ? (
                    <DropzoneContainer>
                      <Image
                        src={projectEvaluation.gambarKomponent1}
                        alt={`Gambar komponen 1`}
                        width={200}
                        height={200}
                        className="object-cover rounded overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square"
                        onClick={() =>
                          window.open(
                            projectEvaluation.gambarKomponent1,
                            "_blank"
                          )
                        }
                        tabIndex={0}
                        style={{ objectPosition: "top" }}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={openModalDeleteGambarKomponen1}
                        className="absolute top-0 right-0 rounded-full"
                      >
                        <TrashIcon />
                      </Button>
                    </DropzoneContainer>
                  ) : (
                    <div>
                      <FilesDropzone
                        files={gambarKomponent1}
                        setFiles={setGambarKomponent1}
                      />
                      {formik.touched.gambarKomponent1 &&
                        formik.errors.gambarKomponent1 && (
                          <ErrorInputMessage>
                            {formik.errors.gambarKomponent1}
                          </ErrorInputMessage>
                        )}
                    </div>
                  )}

                  {projectEvaluation.gambarKomponent2 ? (
                    <DropzoneContainer>
                      <Image
                        src={projectEvaluation.gambarKomponent2}
                        alt={`Gambar komponen 2`}
                        width={200}
                        height={200}
                        className="object-cover rounded overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square"
                        onClick={() =>
                          window.open(
                            projectEvaluation.gambarKomponent2,
                            "_blank"
                          )
                        }
                        tabIndex={0}
                        style={{ objectPosition: "top" }}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={openModalDeleteGambarKomponen2}
                        className="absolute top-0 right-0 rounded-full"
                      >
                        <TrashIcon />
                      </Button>
                    </DropzoneContainer>
                  ) : (
                    <div>
                      <FilesDropzone
                        files={gambarKomponent2}
                        setFiles={setGambarKomponent2}
                      />
                      {formik.touched.gambarKomponent2 &&
                        formik.errors.gambarKomponent2 && (
                          <ErrorInputMessage>
                            {formik.errors.gambarKomponent2}
                          </ErrorInputMessage>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50 mt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
              <Microscope className="size-5 text-green-500" />
              <span>Struktur Mikro</span>
            </h3>

            <div>
              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-4">
                <Label>Data Gambar Keseluruhan</Label>

                <div className="flex gap-3 items-center">
                  <span className="text-sm text-muted-foreground">
                    {projectEvaluation.listGambarStrukturMikro.length ||
                      listGambarStrukturMikro.length}{" "}
                    Gambar
                  </span>

                  {projectEvaluation.listGambarStrukturMikro.length ? (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={openModalDeleteGambarStrukturMikro}
                    >
                      Hapus Semua
                    </Button>
                  ) : (
                    <Button asChild type="button">
                      <Label
                        htmlFor="listGambarStrukturMikro"
                        className="cursor-pointer"
                      >
                        Upload
                      </Label>
                    </Button>
                  )}
                </div>
                <Input
                  multiple
                  className="hidden"
                  type="file"
                  name="listGambarStrukturMikro"
                  id="listGambarStrukturMikro"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;

                    const fileArray = Array.from(files); // Sekarang jadi File[]

                    const filesWithPreview = fileArray.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file)
                      })
                    );

                    // const fileArray = Array.from(files).map((file) => ({
                    //   ...file,
                    //   preview: URL.createObjectURL(file)
                    // }));

                    setListGambarStrukturMikro((prev) => [
                      ...prev,
                      ...filesWithPreview
                    ]);
                  }}
                />
              </div>

              {projectEvaluation.listGambarStrukturMikro.length ? (
                <DropzoneContainer>
                  <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
                    {projectEvaluation.listGambarStrukturMikro.map(
                      (image, index) => (
                        <div
                          key={image}
                          className="relative min-w-[150px] min-h-[150px] overflow-hidden"
                        >
                          <Image
                            key={image}
                            src={image}
                            className="object-cover rounded-md"
                            alt={`Gambar struktur mikro ${index + 1}`}
                            fill
                          />
                        </div>
                      )
                    )}
                  </div>
                </DropzoneContainer>
              ) : (
                <>
                  {!listGambarStrukturMikro.length && (
                    <DropzoneContainer>
                      <ImageUp
                        size={50}
                        className="mx-auto text-muted-foreground mb-5"
                      />
                      <p className="text-sm text-muted-foreground">
                        Belum ada gambar yang di pilih
                      </p>
                    </DropzoneContainer>
                  )}

                  <div className="flex gap-5 overflow-x-auto">
                    {listGambarStrukturMikro.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <div className="relative w-[150px] h-[150px] overflow-hidden">
                          <Image
                            src={file.preview}
                            className="object-cover rounded-md"
                            alt={file.name}
                            fill
                          />

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1"
                            onClick={() => {
                              // Revoke URL to prevent memory leaks
                              URL.revokeObjectURL(file.preview);

                              // Remove file from state
                              setListGambarStrukturMikro((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <TrashIcon className="text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                <div className="space-y-2">
                  <Label htmlFor="aiModelFasa">AI Model Fasa</Label>
                  <div className="flex gap-2">
                    <ComboboxGroup
                      value={formik.values.aiModelFasa}
                      items={[
                        {
                          label: "Model 1",
                          value: "model-1"
                        }
                      ]}
                      onSelect={(value) =>
                        formik.setFieldValue("aiModelFasa", value)
                      }
                      noItemsFallbackText="Tidak Ditemukan"
                      placeholder="Pilih Model"
                    />
                  </div>
                  {formik.touched.aiModelFasa && formik.errors.aiModelFasa && (
                    <ErrorInputMessage>
                      {formik.errors.aiModelFasa}
                    </ErrorInputMessage>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aiModelCrack">AI Model Crack</Label>
                  <div className="flex gap-2">
                    <ComboboxGroup
                      value={formik.values.aiModelCrack}
                      items={[
                        {
                          label: "Model 1",
                          value: "model-1"
                        }
                      ]}
                      onSelect={(value) =>
                        formik.setFieldValue("aiModelCrack", value)
                      }
                      noItemsFallbackText="Tidak Ditemukan"
                      placeholder="Pilih Model"
                    />
                  </div>
                  {formik.touched.aiModelCrack &&
                    formik.errors.aiModelCrack && (
                      <ErrorInputMessage>
                        {formik.errors.aiModelCrack}
                      </ErrorInputMessage>
                    )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aiModelDegradasi">AI Model Degradasi</Label>
                  <div className="flex gap-2">
                    <ComboboxGroup
                      value={formik.values.aiModelDegradasi}
                      items={[
                        {
                          label: "Model 1",
                          value: "model-1"
                        }
                      ]}
                      onSelect={(value) =>
                        formik.setFieldValue("aiModelDegradasi", value)
                      }
                      noItemsFallbackText="Tidak Ditemukan"
                      placeholder="Pilih Model"
                    />
                  </div>
                  {formik.touched.aiModelDegradasi &&
                    formik.errors.aiModelDegradasi && (
                      <ErrorInputMessage>
                        {formik.errors.aiModelDegradasi}
                      </ErrorInputMessage>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-end mt-6">
            <Button type="submit" className="w-full" size="lg" asChild>
              <Link
                href={`/dashboard/projects/${projectId}/evaluation/${projectEvaluationId}/analysis-result`}
              >
                <Save />
                Analisa Keseluruhan
              </Link>
            </Button>
          </div>
        </div>
      </form>

      <DeleteAlertDialog
        title="Yakin ingin menghapus gambar komponen 1?"
        description="Gambar komponen 1 akan dihapus secara permanen."
        open={isOpenDeleteGambarKomponen1}
        setOpen={setIsOpenDeleteGambarKomponen1}
        data={projectEvaluation.gambarKomponent1}
        onDelete={(data) => {
          deleteProjectEvaluationImageComponent1Mutation.mutate(
            projectEvaluationId
          );
        }}
      />

      <DeleteAlertDialog
        title="Yakin ingin menghapus gambar komponen 2?"
        description="Gambar komponen 2 akan dihapus secara permanen."
        open={isOpenDeleteGambarKomponen2}
        setOpen={setIsOpenDeleteGambarKomponen2}
        data={projectEvaluation.gambarKomponent2}
        onDelete={(data) => {
          deleteProjectEvaluationImageComponent2Mutation.mutate(
            projectEvaluationId
          );
        }}
      />

      <DeleteAlertDialog
        title="Yakin ingin menghapus semua gambar struktur mikro?"
        description="Gambar list struktur mikro akan dihapus secara permanen."
        open={isOpenDeleteGambarStrukturMikro}
        setOpen={setIsOpenDeleteGambarStrukturMikro}
        data={projectEvaluation.listGambarStrukturMikro}
        onDelete={(data) => {
          deleteProjectEvaluationImageListMicroStructureMutation.mutate(
            projectEvaluationId
          );
        }}
      />
    </div>
  );
}
