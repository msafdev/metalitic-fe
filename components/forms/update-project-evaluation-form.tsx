"use client";

import useProjectEvaluationMutation from "@/mutation/use-project-evaluation-mutation";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ErrorInputMessage from "../input/error-input-message";
import { Button } from "../ui/button";
import { CalendarIcon, Camera, FlaskConical, Save } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjectEvaluationById } from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import FilesDropzone from "../input/files-dropzone";

type Props = {
  projectEvaluationId: string;
};

const projectEvaluationSchema = z.object({
  id: z.string(),
  nama: z.string(),
  tanggal: z.string(),
  lokasi: z.string(),
  area: z.string(),
  posisi: z.string(),
  material: z.string(),
  gritSandWhell: z.string(),
  etsa: z.string(),
  kamera: z.string(),
  merkMikroskop: z.string(),
  perbesaranMikroskop: z.string(),
  gambarKomponent1: z.string(),
  gambarKomponent2: z.string(),
  listGambarStrukturMikro: z.array(z.string()),
  aiModelFasa: z.string(),
  aiModelCrack: z.string(),
  aiModelDegradasi: z.string()
});

export default function UpdateProjectEvaluationForm({
  projectEvaluationId
}: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () => getProjectEvaluationById(projectEvaluationId),
    queryKey: [QUERIES.PROJECTS_EVALUATION, projectEvaluationId]
  });

  const { updateProjectEvaluationMutation } = useProjectEvaluationMutation();

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
        body: values
      });
    }
  });

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

              {/* <FilesDropzone
                files={deedOfEstablishment}
                setFiles={setDeedOfEstablishment}
                acceptFile={APP_CONSTANT.MERCHANT_DOCUMENT_FILE_FORMAT_ALLOWED}
                messageHelper={
                  APP_CONSTANT.MERCHANT_DOCUMENT_FILE_FORMAT_ALLOWED_TEXT_HELPER
                }
              />
              {deedOfEstablishmentFormik.touched["file"] &&
                deedOfEstablishmentFormik.errors["file"] && (
                  <InputErrorMessage
                    message={deedOfEstablishmentFormik.errors["file"] as string}
                  />
                )} */}
            </div>
          </div>

          <div className="text-end mt-6">
            <Button type="submit">
              <Save />
              Simpan
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
