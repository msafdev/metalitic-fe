"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getProjectDetail } from "@/lib/api/project-api";
import { QUERIES } from "@/lib/constants/queries";
import {
  MissingFieldKey,
  ProjectEvaluationStatus
} from "@/lib/types/project-evaluation-type";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  FileText,
  FlaskConical,
  Settings,
  Trash2
} from "lucide-react";
import Link from "next/link";

type Props = {
  idProject: string;
};

export default function ProjectEvaluationList({ idProject }: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () => getProjectDetail(idProject),
    queryKey: [QUERIES.PROJECTS, idProject]
  });

  if (!data || isLoading) return null;

  const project = data.data;
  const projectEvaluations = project.pengujian;

  const getIncompleteStatusConfig = (status: ProjectEvaluationStatus) => {
    switch (status) {
      case "DRAFT":
        return {
          color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
          icon: <FileText className="w-3 h-3" />,
          text: "Draft"
        };
      default:
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
          icon: <AlertCircle className="w-3 h-3" />,
          text: status
        };
    }
  };

  const missingFieldMapping: Record<MissingFieldKey, string> = {
    tanggal: "Tanggal belum ditentukan",
    lokasi: "Lokasi belum ditentukan",
    area: "Area belum ditentukan",
    posisi: "Posisi belum ditentukan",
    material: "Material belum ditentukan",
    gritSandWhell: "Grit Sand Whell belum ditentukan",
    etsa: "ETSA belum ditentukan",
    kamera: "Kamera belum ditentukan",
    merkMikroskop: "Merk Mikrosop belum ditentukan",
    perbesaranMikroskop: "Perbesaran Mikroskop belum ditentukan",
    gambarKomponent1: "Gambar Komponent 1 belum diupload",
    gambarKomponent2: "Gambar Komponent 2 belum diupload",
    listGambarStrukturMikro: "Struktur Mikro belum diupload",
    aiModelFasa: "AI Model Fasa belum ditentukan",
    aiModelCrack: "AI Model Crack belum ditentukan",
    aiModelDegradasi: "AI Model Degradasi belum ditentukan"
  };

  return (
    <>
      {!projectEvaluations.length && (
        <div className="min-h-96 text-gray-400 flex flex-col gap-2 items-center justify-center">
          <FlaskConical size={60} />
          <span>Belum ada pengujian</span>
        </div>
      )}

      {projectEvaluations.map((evaluation) => (
        <Card
          key={evaluation.id}
          className="group cursor-pointer hover:shadow-xl hover:shadow-amber-300/30 transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl"
        >
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant="outline"
                  className="font-mono text-xs px-2 py-1 border-amber-300 text-amber-700 bg-amber-100"
                >
                  {evaluation.id}
                </Badge>
                <Badge
                  className={`${
                    getIncompleteStatusConfig(evaluation.status).color
                  } px-2 py-1 text-xs flex items-center space-x-1`}
                >
                  {getIncompleteStatusConfig(evaluation.status).icon}
                  <span>
                    {getIncompleteStatusConfig(evaluation.status).text}
                  </span>
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900">
                {evaluation.nama}
              </CardTitle>
              <CardDescription className="text-slate-600">
                Dibuat:{" "}
                {new Date(evaluation.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Setup Progress Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Setup Progress
                  </span>
                  <span className="text-sm font-bold text-amber-700">
                    {evaluation.progress}%
                  </span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2">
                  <div
                    style={{ width: `${evaluation.progress}%` }}
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                  ></div>
                </div>
              </div>

              {/* Missing Information Indicators */}
              <div className="space-y-2 text-sm mb-4">
                {evaluation.missingFields
                  .filter((_, index) => index < 3)
                  .map((field) => (
                    <div
                      key={field}
                      className="flex items-center space-x-2 text-slate-500"
                    >
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span className="italic">
                        {missingFieldMapping[field as MissingFieldKey]}
                      </span>
                    </div>
                  ))}

                {evaluation.missingFields.length > 3 && (
                  <div className="flex items-center space-x-2 text-slate-500">
                    <span className="italic">
                      {`+ ${evaluation.missingFields.length - 3} lainnya`}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-xl"
                >
                  <Link
                    href={`/dashboard/projects/${idProject}/evaluation/${evaluation.id}`}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Setup
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </>
  );
}
