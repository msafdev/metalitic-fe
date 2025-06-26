import DropzoneContainer from "@/components/input/dropzone-container";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getProjectEvaluationById } from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  BookCheck,
  BookMinus,
  BookOpenCheck,
  Camera,
  CheckCircle,
  FileText,
  FlaskConical,
  Microscope,
  MicroscopeIcon,
  NotepadText,
  User
} from "lucide-react";
import Image from "next/image";
import ImageResultCard from "./image-result-card";
import ProfileAvatar from "@/components/profile-avatar";
import { Button } from "@/components/ui/button";

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

  const projectEvaluation = data?.data;

  if (!projectEvaluation || isLoading) return null;

  const summaryResult = {
    strukturMikro: "Austenite",
    fiturMikroskopik: "Terdeteksi ada nya microcrack",
    damageClass: "Degradasi ERA 1",
    hardness: "...",
    rekomendasi: "REPAIRABLE (LIFE CONSUMED 80%, LIMITED SERVICE)",
    pemeriksa: "John Doe"
  };

  return (
    <div className="max-w-6xl mx-auto bg-background rounded-xl">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-emerald-600/90" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  Hasil Pengujian Keseluruhan
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-2">
                {projectEvaluation.nama}
              </h2>
              <div className="flex items-center space-x-2 text-green-100 mt-4">
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <FileText className="size-3" />
                  <span>{projectEvaluation.projectId}</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  {/* <Activity className="w-4 h-4" /> */}
                  <span>{projectEvaluation.id}</span>
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold mb-2">
                {projectEvaluation.progress}%
              </div>
              <div className="text-lg">Progress</div>
              <Badge
                variant="outline"
                className="bg-white/20 text-white border-white/30 mt-2"
              >
                {projectEvaluation.status}
              </Badge>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full" />
        </div>
      </div>

      <div>
        <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
            <FlaskConical className="size-5 text-purple-500" />
            <span>Detail Pengujian</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Peminta Jasa */}
            <div>
              <Label className="text-muted-foreground">Nama Peminta Jasa</Label>
              <div className="font-medium">
                {projectEvaluation.project.pemintaJasa}
              </div>
            </div>

            {/* Tanggal */}
            <div>
              <Label className="text-muted-foreground">Tanggal</Label>
              <div className="font-medium">{projectEvaluation.tanggal}</div>
            </div>

            {/* Lokasi */}
            <div>
              <Label className="text-muted-foreground">Lokasi</Label>
              <div className="font-medium">{projectEvaluation.lokasi}</div>
            </div>

            {/* Area */}
            <div>
              <Label className="text-muted-foreground">Area</Label>
              <div className="font-medium">{projectEvaluation.area}</div>
            </div>

            {/* Posisi */}
            <div>
              <Label className="text-muted-foreground">Posisi</Label>
              <div className="font-medium">{projectEvaluation.posisi}</div>
            </div>

            {/* Material */}
            <div>
              <Label className="text-muted-foreground">Material</Label>
              <div className="font-medium">{projectEvaluation.material}</div>
            </div>

            {/* Grit Sand Whell */}
            <div>
              <Label className="text-muted-foreground">Grit Sand Wheel</Label>
              <div className="font-medium">
                {projectEvaluation.gritSandWhell}
              </div>
            </div>

            {/* ETSA */}
            <div>
              <Label className="text-muted-foreground">ETSA</Label>
              <div className="font-medium">{projectEvaluation.etsa}</div>
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
            <div>
              <Label className="text-muted-foreground">Kamera</Label>
              <div className="font-medium">{projectEvaluation.kamera}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Merk Mikroskop */}
              <div>
                <Label className="text-muted-foreground">Merk Mikroskop</Label>
                <div className="font-medium">
                  {projectEvaluation.merkMikroskop}
                </div>
              </div>

              {/* Perbesaran Mikroskop */}
              <div>
                <Label className="text-muted-foreground">
                  Perbesaran Mikroskop
                </Label>
                <div className="font-medium">
                  {projectEvaluation.perbesaranMikroskop}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DropzoneContainer>
                  <Image
                    src={projectEvaluation.gambarKomponent1}
                    alt={`Gambar komponen 1`}
                    width={200}
                    height={200}
                    className="object-cover rounded overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square"
                    onClick={() =>
                      window.open(projectEvaluation.gambarKomponent1, "_blank")
                    }
                    tabIndex={0}
                    style={{ objectPosition: "top" }}
                  />
                </DropzoneContainer>

                <DropzoneContainer>
                  <Image
                    src={projectEvaluation.gambarKomponent2}
                    alt={`Gambar komponen 2`}
                    width={200}
                    height={200}
                    className="object-cover rounded overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square"
                    onClick={() =>
                      window.open(projectEvaluation.gambarKomponent2, "_blank")
                    }
                    tabIndex={0}
                    style={{ objectPosition: "top" }}
                  />
                </DropzoneContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50 mt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
            <Camera className="size-5 text-purple-500" />
            <span>Hasil Analisa Gambar</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {projectEvaluation.listGambarStrukturMikro.map((gambar, index) => (
              <ImageResultCard key={gambar} image={gambar} number={index + 1} />
            ))}
          </div>
        </div>

        <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50 mt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
            <BookMinus className="size-5 text-gray-500" />
            <span>Kesimpulan</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Stuktur Mikro</Label>
              <div className="font-medium">{summaryResult.strukturMikro}</div>
            </div>

            <div>
              <Label className="text-muted-foreground">Fitur Mikroskopik</Label>
              <div className="font-medium">
                {summaryResult.fiturMikroskopik}
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Damage Class</Label>
              <div className="font-medium">{summaryResult.damageClass}</div>
            </div>

            <div>
              <Label className="text-muted-foreground">Hardness</Label>
              <div className="font-medium">{summaryResult.hardness}</div>
            </div>

            <div>
              <Label className="text-muted-foreground">Rekomendasi</Label>
              <div className="font-medium">{summaryResult.rekomendasi}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
          <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50 mt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
              <BookOpenCheck className="size-5 text-green-500" />
              <span>Penguji</span>
            </h3>

            <div className="flex gap-2 flex-wrap">
              {projectEvaluation.project.penguji.map((penguji) => (
                <ProfileAvatar key={penguji} name={penguji} />
              ))}
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/50 mt-6">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-3">
              <BookCheck className="size-5 text-blue-500" />
              <span>Pemeriksa</span>
            </h3>

            <div className="flex gap-2 flex-wrap">
              <ProfileAvatar name={summaryResult.pemeriksa} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-end mt-4">
        <Button size="lg">
          <NotepadText />
          Buat Laporan Pengujian
        </Button>
      </div>
    </div>
  );
}
