import DropzoneContainer from "@/components/input/dropzone-container";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getProjectEvaluationById } from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import { useQuery } from "@tanstack/react-query";
import {
  Camera,
  FlaskConical,
  Microscope,
  MicroscopeIcon,
  User
} from "lucide-react";
import Image from "next/image";

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

  return (
    <div className="max-w-4xl mx-auto bg-background border border-slate-200/50 rounded-xl">
      <div className="rounded-t-xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium mb-2">
              Hasil Pengujian Keseluruhan
            </h3>
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

      <div className="p-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projectEvaluation.listGambarStrukturMikro.map((gambar, index) => (
              <div
                key={gambar}
                className="rounded-xl border border-border p-4 max-w-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MicroscopeIcon
                    size={30}
                    className="p-1 text-purple-500 bg-purple-100 rounded-sm"
                  />
                  <span className="font-semibold text-sm">
                    Gambar Struktur Mikro {index + 1}
                  </span>
                </div>
                <div className="w-full aspect-[16/12] relative">
                  <Image
                    src={gambar}
                    alt={`Gambar komponen 1`}
                    className="object-cover overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square rounded-xl"
                    onClick={() => window.open(gambar, "_blank")}
                    fill
                    tabIndex={0}
                    style={{ objectPosition: "top" }}
                  />
                </div>

                <div className="space-y-2 py-4">
                  <div className="flex gap-2 justify-between">
                    <Badge className="text-base" variant="outline">
                      FASA Austenite
                    </Badge>
                    <Badge className="text-base" variant="outline">
                      AI
                    </Badge>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <Badge className="text-base" variant="outline">
                      CRACK Terdeteksi
                    </Badge>
                    <Badge className="text-base" variant="outline">
                      <User size={15} />
                    </Badge>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <Badge className="text-base" variant="outline">
                      Degradasi ERA 1
                    </Badge>
                    <Badge className="text-base" variant="outline">
                      AI
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between p-4 rounded-xl">
                    <span className="font-medium">Tidak Masuk Laporan</span>
                    <Switch />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
