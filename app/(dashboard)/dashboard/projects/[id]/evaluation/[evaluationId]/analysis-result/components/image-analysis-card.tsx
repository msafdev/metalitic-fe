import ErrorInputMessage from "@/components/input/error-input-message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SelectItem as SelectItemType } from "@/lib/types/common-type";
import { ModelResult } from "@/lib/types/project-evaluation-type";
import { cn } from "@/lib/utils";
import useProjectEvaluationMutation from "@/mutation/use-project-evaluation-mutation";
import { format, formatDate } from "date-fns";
import { Bot, Calendar, Save, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  analysisDataId: string;
  projectEvaluationId: string;
  type: "fasa" | "crack" | "degradasi";
  modelAnalyzedResult: ModelResult;
  color?: string;
  header: {
    icon: React.ElementType;
    title: string;
  };
  manualSelect: {
    placeholder: string;
    items: SelectItemType[];
  };
};

type TypeMode = "AI" | "MANUAL";

export default function ImageAnalysisCard({
  projectEvaluationId,
  analysisDataId,
  modelAnalyzedResult,
  type,
  header: { icon: Icon, title },
  color = "bg-gradient-to-r from-green-500 to-emerald-500",
  manualSelect
}: Props) {
  const { updateAnalyzedResultMutation } = useProjectEvaluationMutation();
  const [typeMode, setTypeMode] = useState<TypeMode>(modelAnalyzedResult.mode);
  const [analyzedResult, setAnalyzedResult] =
    useState<ModelResult>(modelAnalyzedResult);
  const [selectedManualResult, setSelectedManualResult] = useState<string>(
    modelAnalyzedResult.hasilKlasifikasiManual || "not-set"
  );

  const [isErrorSelectedManualResult, setisErrorSelectedManualResult] =
    useState("");

  useEffect(() => {
    if (typeMode === "AI") {
      setSelectedManualResult("not-set");
      setisErrorSelectedManualResult("");
    }
  }, [typeMode]);

  useEffect(() => {
    if (selectedManualResult !== "not-set") {
      setTypeMode("MANUAL");
      setisErrorSelectedManualResult("");
    }
  }, [selectedManualResult]);

  useEffect(() => {
    setAnalyzedResult(modelAnalyzedResult);
    setTypeMode(modelAnalyzedResult.mode);
  }, [modelAnalyzedResult]);

  const handleUpdateAnalyzedResult = () => {
    if (typeMode === "MANUAL" && selectedManualResult === "not-set") {
      setisErrorSelectedManualResult("Pilih hasil jika memilih Manual Mode");
      return;
    }

    updateAnalyzedResultMutation.mutate(
      {
        id: projectEvaluationId,
        body: {
          type: type,
          mode: typeMode,
          modelAnalyzedResultId: analysisDataId,
          hasilKlasifikasiManual:
            selectedManualResult === "not-set" ? null : selectedManualResult
        }
      },
      {
        onSuccess: (data) => {
          const selectedModelResult = data.data.hasilAnalisa.find(
            (item) => item._id === analysisDataId
          );

          if (!selectedModelResult) return;

          setAnalyzedResult({
            confidence: selectedModelResult[type].confidence,
            hasilKlasifikasiAI: selectedModelResult[type].hasilKlasifikasiAI,
            hasilKlasifikasiManual:
              selectedModelResult[type].hasilKlasifikasiManual,
            modelAI: selectedModelResult[type].modelAI,
            penguji: selectedModelResult[type].penguji,
            tanggalUpdate: formatDate(
              new Date(selectedModelResult[type].tanggalUpdate),
              "yyyy-MM-dd"
            ),
            mode: selectedModelResult[type].mode,
            image: selectedModelResult[type].image
          });
        }
      }
    );
  };

  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-sm h-fit border">
      <div className={cn("py-2.5 px-4 text-primary-foreground", color)}>
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="aspect-[16/12] rounded-md mb-4 relative">
          <Image
            src={analyzedResult.image}
            alt={`Gambar ${title}`}
            fill
            className="rounded-md object-cover"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">
                Hasil Klasifikasi
              </Label>
              <Badge className={cn("text-xs px-3 py-1", color)}>
                {analyzedResult.mode === "AI"
                  ? analyzedResult.hasilKlasifikasiAI
                  : analyzedResult.hasilKlasifikasiManual}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">
              Mode Klasifikasi
            </Label>
            <div className="bg-muted/40 rounded p-3">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-2">
                  {typeMode === "AI" ? (
                    <>
                      <Bot className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">AI Mode</span>
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        Manual Mode
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={typeMode === "AI"}
                    onCheckedChange={(checked) =>
                      setTypeMode(checked ? "AI" : "MANUAL")
                    }
                  />
                  <Badge
                    variant={typeMode === "AI" ? "default" : "destructive"}
                    className="text-xs px-2"
                  >
                    {typeMode === "AI"
                      ? `${analyzedResult.confidence}%`
                      : "Manual"}
                  </Badge>
                </div>
              </div>
              {typeMode === "AI" && (
                <div className="bg-background rounded border border-border p-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Model AI
                    </Label>

                    <span className="text-sm font-semibold text-foreground">
                      {analyzedResult.modelAI}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">
              Penguji
            </Label>

            <div className="bg-muted/40 rounded p-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {analyzedResult.penguji}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">
              Tanggal Update
            </Label>

            <div className="bg-muted/40 rounded p-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {formatDate(
                    new Date(analyzedResult.tanggalUpdate),
                    "yyyy-MM-dd"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">
              Input Hasil Manual
            </Label>
            <div className="bg-muted/40 rounded p-2">
              <Select
                onValueChange={(value) => setSelectedManualResult(value)}
                value={selectedManualResult}
              >
                <SelectTrigger className="border-0 h-9">
                  <SelectValue placeholder={manualSelect.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-set">
                    {manualSelect.placeholder}
                  </SelectItem>
                  {manualSelect.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isErrorSelectedManualResult && (
                <ErrorInputMessage>
                  {isErrorSelectedManualResult}
                </ErrorInputMessage>
              )}
            </div>
          </div>

          <Button
            onClick={handleUpdateAnalyzedResult}
            disabled={updateAnalyzedResultMutation.isPending}
            className={cn("w-full h-10 text-sm font-medium", color)}
          >
            <Save className="w-4 h-4 mr-2" />
            Update Analisis
          </Button>
        </div>
      </div>
    </div>
  );
}
