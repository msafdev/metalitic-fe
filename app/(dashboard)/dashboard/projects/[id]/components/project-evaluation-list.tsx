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
  ProjectEvaluationStatus,
  missingFieldMapping
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
import ProjectEvaluationDraftCard from "./card/project-evaluation-draft-card";
import ProjectEvaluationCompleteCard from "./card/project-evaluation-complete-card";

type Props = {
  idProject: string;
};

export default function ProjectEvaluationList({ idProject }: Props) {
  const { data, isLoading } = useQuery({
    queryFn: () => getProjectDetail(idProject),
    queryKey: [QUERIES.PROJECTS, idProject],
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });

  if (!data || isLoading) return null;

  const project = data.data;
  const projectEvaluations = project.pengujian;

  const projectEvaluationsInProgress = projectEvaluations.filter(
    (evaluation) => evaluation.status !== "DRAFT"
  );
  const projectEvaluationsInDraft = projectEvaluations.filter(
    (evaluation) => evaluation.status === "DRAFT"
  );

  return (
    <>
      {!projectEvaluationsInProgress.length &&
        !projectEvaluationsInDraft.length && (
          <div className="min-h-96 text-gray-400 flex flex-col gap-2 items-center justify-center">
            <FlaskConical size={60} />
            <span>Belum ada pengujian</span>
          </div>
        )}

      {Boolean(projectEvaluationsInProgress.length) && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-green-600" />
            <span>Pengujian Aktif</span>
            <Badge variant="secondary" className="ml-2">
              {projectEvaluationsInProgress.length}
            </Badge>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projectEvaluationsInProgress.map((evaluation) => (
              <ProjectEvaluationCompleteCard
                key={evaluation.id}
                evaluation={evaluation}
              />
            ))}
          </div>
        </div>
      )}

      {Boolean(projectEvaluationsInDraft.length) && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-amber-600" />
            <span>Pengujian Belum Selesai Setup</span>
            <Badge
              variant="outline"
              className="ml-2 border-amber-200 text-amber-700 bg-amber-50"
            >
              {projectEvaluationsInDraft.length}
            </Badge>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projectEvaluationsInDraft.map((evaluation) => (
              <ProjectEvaluationDraftCard
                key={evaluation.id}
                evaluation={evaluation}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
