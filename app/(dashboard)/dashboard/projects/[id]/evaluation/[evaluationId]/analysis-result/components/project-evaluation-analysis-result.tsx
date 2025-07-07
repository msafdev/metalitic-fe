"use client";

import DropzoneContainer from "@/components/input/dropzone-container";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProjectEvaluationById } from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import {
  BookMinus,
  BookCheck,
  BookOpenCheck,
  Camera,
  CheckCircle,
  FileText,
  FlaskConical,
  NotepadText
} from "lucide-react";
import Image from "next/image";
import ImageResultCard from "./image-result-card";
import ProfileAvatar from "@/components/profile-avatar";

type Props = {
  projectId: string;
  projectEvaluationId: string;
};

export default function ProjectEvaluationAnalysisResult({
  projectId,
  projectEvaluationId
}: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () => getProjectEvaluationById(projectEvaluationId),
    queryKey: [QUERIES.PROJECTS_EVALUATION, projectEvaluationId]
  });

  if (!data || isLoading) return null;

  const projectEvaluation = data.data;

  const summaryResult = {
    strukturMikro: "Austenite",
    fiturMikroskopik: "Terdeteksi adanya microcrack",
    damageClass: "Degradasi ERA 1",
    hardness: "...",
    rekomendasi: "REPAIRABLE (LIFE CONSUMED 80%, LIMITED SERVICE)",
    pemeriksa: "John Doe"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative rounded-xl p-8 text-primary-foreground bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 to-emerald-700/90" />
        <div className="relative z-10 flex justify-between items-center flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="size-4" />
              <span className="text-base font-semibold">
                Hasil Pengujian Keseluruhan
              </span>
            </div>
            <h2 className="text-3xl font-bold text-primary-foreground">
              {projectEvaluation.nama}
            </h2>
            <div className="flex items-center gap-2 text-sm text-white/80 mt-3 flex-wrap">
              <Badge variant="secondary" className="bg-white/10 text-white">
                <FileText className="size-3 mr-1" />
                {projectEvaluation.projectId}
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white">
                ID: {projectEvaluation.id}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-primary-foreground">
              {projectEvaluation.progress}%
            </div>
            <div className="text-sm text-foreground/80">Progress</div>
          </div>
        </div>
      </div>

      {/* Detail Pengujian */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <FlaskConical className="size-4 text-purple-500" />
          Detail Pengujian
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Nama Peminta Jasa", projectEvaluation.project.pemintaJasa],
            ["Tanggal", projectEvaluation.tanggal],
            ["Lokasi", projectEvaluation.lokasi],
            ["Area", projectEvaluation.area],
            ["Posisi", projectEvaluation.posisi],
            ["Material", projectEvaluation.material],
            ["Grit Sand Wheel", projectEvaluation.gritSandWhell],
            ["ETSA", projectEvaluation.etsa]
          ].map(([label, value]) => (
            <div key={label}>
              <Label className="text-muted-foreground">{label}</Label>
              <div className="font-medium text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kamera & Mikroskop */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Camera className="size-4 text-blue-500" />
          Kamera & Gambar
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Kamera</Label>
            <div className="font-medium text-foreground">
              {projectEvaluation.kamera}
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Merk Mikroskop</Label>
            <div className="font-medium text-foreground">
              {projectEvaluation.merkMikroskop}
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">
              Perbesaran Mikroskop
            </Label>
            <div className="font-medium text-foreground">
              {projectEvaluation.perbesaranMikroskop}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            projectEvaluation.gambarKomponent1,
            projectEvaluation.gambarKomponent2
          ].map((src, i) => (
            <DropzoneContainer key={i}>
              <Image
                src={src || "/placeholder.png"}
                alt={`Gambar komponen ${i + 1}`}
                width={200}
                height={200}
                className="object-cover rounded border min-w-14 aspect-square cursor-pointer bg-muted"
                onClick={() => src && window.open(src, "_blank")}
                style={{ objectPosition: "top" }}
              />
            </DropzoneContainer>
          ))}
        </div>
      </section>

      {/* Gambar Analisa */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Camera className="size-4 text-purple-500" />
          Hasil Analisa Gambar
        </h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectEvaluation.listGambarStrukturMikro.map((gambar, index) => (
            <ImageResultCard key={gambar} image={gambar} number={index + 1} />
          ))}
        </div>
      </section>

      {/* Kesimpulan */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <BookMinus className="size-4 text-primary" />
          Kesimpulan
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(summaryResult).map(([key, value]) => {
            if (key === "pemeriksa") return null;
            return (
              <div key={key}>
                <Label className="text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </Label>
                <div className="font-medium text-foreground">{value}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Penguji & Pemeriksa */}
      <div className="grid md:grid-cols-2 gap-4">
        <section className="border rounded-xl p-6 bg-background">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground mb-4">
            <BookOpenCheck className="size-4 text-green-500" />
            Tim Penguji
          </h3>
          <div className="flex flex-wrap gap-2">
            {projectEvaluation.project.penguji.map((penguji) => (
              <ProfileAvatar key={penguji} name={penguji} />
            ))}
          </div>
        </section>

        <section className="border rounded-xl p-6 bg-background">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground mb-4">
            <BookCheck className="size-4 text-blue-500" />
            Pemeriksa
          </h3>
          <div className="flex flex-wrap gap-2">
            <ProfileAvatar name={summaryResult.pemeriksa} />
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-4">
        <Button className="w-full" size={"lg"}>
          <NotepadText className="mr-2" />
          Buat Laporan
        </Button>
      </div>
    </div>
  );
}
