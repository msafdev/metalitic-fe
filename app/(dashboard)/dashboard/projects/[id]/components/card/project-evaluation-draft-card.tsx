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
    color:
      "bg-gradient-to-r from-amber-500 to-orange-500 text-white dark:opacity-80",
    icon: <FileText className="w-3 h-3" />,
    text: "Draft"
  };

  return (
    <Link
      href={`/dashboard/projects/${evaluation.projectId}/evaluation/${evaluation.id}`}
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:scale-[1.02] border-0",
          "bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-xl",
          "dark:bg-gradient-to-br dark:from-amber-500/40 dark:to-orange-500/30"
        )}
      >
        <div className="relative rounded-2xl border border-amber-200/50 dark:border-amber-700/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <Badge
                variant="outline"
                className={cn(
                  "font-mono text-xs px-2 py-1",
                  "border-amber-300 text-amber-700 bg-amber-100",
                  "dark:border-amber-700 dark:text-amber-400 dark:bg-amber-900"
                )}
              >
                {evaluation.id}
              </Badge>
              <Badge
                className={cn(
                  "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
                  "px-2 py-1 text-xs flex items-center space-x-1",
                  "dark:from-amber-700 dark:to-orange-700"
                )}
              >
                <FileText className="w-3 h-3" />
                <span>Draft</span>
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
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Progress
                </span>
                <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  {evaluation.progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-amber-100 dark:bg-amber-950">
                <div
                  style={{ width: `${evaluation.progress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-600 transition-all duration-500"
                />
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              {evaluation.missingFields.slice(0, 3).map((field) => (
                <div
                  key={field}
                  className="flex items-center space-x-2 text-muted-foreground"
                >
                  <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="italic">
                    {missingFieldMapping[field as MissingFieldKey]}
                  </span>
                </div>
              ))}
              {evaluation.missingFields.length > 3 && (
                <div className="flex items-center space-x-2 text-muted-foreground">
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
                className={cn(
                  "bg-gradient-to-r from-amber-600 to-orange-600 text-white",
                  "hover:from-amber-700 hover:to-orange-700",
                  "dark:from-amber-700 dark:to-orange-700"
                )}
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
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
