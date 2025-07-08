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
    if (evaluation.progress === 100) {
      return {
        color: "bg-primary text-primary-foreground",
        icon: <Clock className="w-3 h-3" />,
        text: evaluation.status
      };
    } else if (evaluation.progress < 100) {
      return {
        color: "bg-secondary border border-border text-secondary-foreground",
        icon: <CheckCircle className="w-3 h-3" />,
        text: evaluation.status
      };
    } else {
      return {
        color: "bg-destructive text-destructive-foreground",
        icon: <AlertCircle className="w-3 h-3" />,
        text: evaluation.status
      };
    }
  }, [evaluation.status, evaluation.progress]);

  const isStillActive = useMemo(() => {
    if (!evaluation.lastActive) return false;

    const lastActiveDate = new Date(evaluation.lastActive).getTime();
    const now = Date.now();

    const diffInMs = now - lastActiveDate;
    return diffInMs < 5 * 60 * 1000; // kurang dari 5 menit
  }, [evaluation.lastActive]);

  return (
    <Link
      href={`/dashboard/projects/${evaluation.projectId}/evaluation/${evaluation.id}`}
    >
      <Card className="relative group cursor-pointer transition-all duration-300 border hover:scale-[1.02] bg-background/80 backdrop-blur-sm overflow-hidden">
        <div className="relative">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="font-mono text-xs px-2 py-1">
                {evaluation.id}
              </Badge>
              <Badge
                className={cn(
                  detail.color,
                  "px-2 py-1 text-xs flex items-center gap-1"
                )}
              >
                {detail.icon}
                <span>{detail.text}</span>
              </Badge>
            </div>

            <CardTitle className="text-lg font-bold text-primary">
              {evaluation.nama}
            </CardTitle>

            <CardDescription className="text-muted-foreground">
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
            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Progress
                </span>
                <span className="text-sm font-bold text-primary">
                  {evaluation.progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${evaluation.progress}%` }}
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{evaluation?.lokasi || missingFieldMapping.lokasi}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="w-4 h-4 text-green-600" />
                <span>
                  {evaluation?.material || missingFieldMapping.material}
                </span>
              </div>
            </div>

            {/* Link CTA */}
            <div className="flex items-center justify-between mt-4">
              <Link
                className="w-full hover:underline transition-all duration-300 text-sm text-muted-foreground"
                href={`/dashboard/projects/${evaluation.projectId}/evaluation/${evaluation.id}`}
              >
                Lihat detail
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </CardContent>
        </div>

        {/* Lock Overlay */}
        {evaluation.status === "PROCESSING" && isStillActive && (
          <div className="hidden group-hover:grid absolute inset-0 bg-muted/70 backdrop-blur-sm place-content-center text-center text-primary">
            <TriangleAlert className="mx-auto mb-2" size={80} />
            <div className="font-medium">
              Anda tidak bisa membuka pengujian ini. <br />
              Pengujian sedang dikerjakan oleh penguji lain.
            </div>
          </div>
        )}
      </Card>
    </Link>
  );
}
