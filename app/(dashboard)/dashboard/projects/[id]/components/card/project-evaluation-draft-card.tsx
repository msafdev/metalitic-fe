import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  MissingFieldKey,
  missingFieldMapping
} from "@/lib/types/project-evaluation-type";
import { ProjectEvaluationSummary } from "@/lib/types/project-type";
import { cn } from "@/lib/utils";
import { AlertCircle, FileText, Settings, Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  evaluation: ProjectEvaluationSummary;
};

export default function ProjectEvaluationDraftCard({ evaluation }: Props) {
  const detail = {
    color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    icon: <FileText className="w-3 h-3" />,
    text: "Draft"
  };

  return (
    <Card className="group cursor-pointer hover:shadow-xl hover:shadow-amber-300/30 transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl">
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
          {/* Setup Progress Indicator */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Progress
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
                href={`/dashboard/projects/${evaluation.projectId}/evaluation/${evaluation.id}`}
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
  );
}
