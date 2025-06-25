import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { missingFieldMapping } from "@/lib/types/project-evaluation-type";
import { ProjectEvaluationSummary } from "@/lib/types/project-type";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Clock,
  MapPin,
  Package,
  TriangleAlert
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  evaluation: ProjectEvaluationSummary;
};

export default function ProjectEvaluationCompleteCard({ evaluation }: Props) {
  const detail = useMemo(() => {
    switch (evaluation.status) {
      case "PENDING":
        return {
          color: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
          icon: <Clock className="w-3 h-3" />,
          text: evaluation.status
        };
      case "COMPLETED":
        return {
          color: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
          icon: <CheckCircle className="w-3 h-3" />,
          text: evaluation.status
        };
      default:
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
          icon: <AlertCircle className="w-3 h-3" />,
          text: evaluation.status
        };
    }
  }, [evaluation.status]);

  return (
    <Card className="relative group cursor-pointer hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 hover:scale-[1.02] border-0 bg-white/80 backdrop-blur-xl overflow-hidden group">
      <div className="relative bg-white rounded-2xl border border-slate-200/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="font-mono text-xs px-2 py-1">
              {evaluation.id}
            </Badge>
            <Badge
              className={cn(
                detail.color,
                "px-2 py-1 text-xs flex items-center space-x-1"
              )}
            >
              {detail.icon}
              <span>{detail.text}</span>
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
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Progress
              </span>
              <span className="text-sm font-bold text-slate-900">
                {evaluation.progress}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className={`h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500`}
                style={{ width: `${evaluation.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-slate-600">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{evaluation?.lokasi || missingFieldMapping.lokasi}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Package className="w-4 h-4 text-green-500" />
              <span>
                {evaluation?.material || missingFieldMapping.material}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link
              className="w-full hover:underline transition-all duration-300"
              href={`/dashboard/projects/${evaluation.projectId}/evaluation/${evaluation.id}`}
            >
              <div className="text-sm text-slate-500">Lihat detail</div>
            </Link>

            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </CardContent>
      </div>

      {evaluation.status === "PROCESSING" && (
        <div className="hidden group-hover:grid absolute inset-0 bg-gray-400/60 backdrop-blur-sm place-content-center text-center">
          <TriangleAlert className="mx-auto mb-2" size={80} />
          <div className="font-medium">
            Anda tidak bisa membuka pengujian ini. <br /> Pengujian sedang
            dikerjakan oleh penguji lain
          </div>
        </div>
      )}
    </Card>
  );
}
