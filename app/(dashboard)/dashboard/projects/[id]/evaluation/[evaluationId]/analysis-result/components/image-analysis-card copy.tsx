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
import { cn } from "@/lib/utils";
import useProjectEvaluationMutation from "@/mutation/use-project-evaluation-mutation";
import { format } from "date-fns";
import { Bot, Calendar, Save, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  projectEvaluationId: string;
  analysisDataId: string;
  type: "fasa" | "crack" | "degradasi";
  header: {
    icon: React.ElementType;
    title: string;
  };
  initialTypeMode?: TypeMode;
  image: string;
  result: {
    mode: "AI" | "MANUAL";
    aiClasification: string;
    manualClasification: string | null;
    confidence: number;
    model: string;
    tester: string;
    lastUpdate: string;
  };
  manualSelect: {
    placeholder: string;
    items: SelectItemType[];
  };
  color?: string;
};

type TypeMode = "AI" | "MANUAL";

export default function ImageAnalysisCard({
  projectEvaluationId,
  analysisDataId,
  type,
  header: { icon: Icon, title },
  image,
  initialTypeMode = "AI",
  result,
  color = "bg-gradient-to-r from-green-500 to-emerald-500",
  manualSelect
}: Props) {
  const { updateAnalyzedResultMutation } = useProjectEvaluationMutation();
  const [typeMode, setTypeMode] = useState<TypeMode>(initialTypeMode);
  const [analyzedResult, setAnalyzedResult] = useState(result);
  const [selectedManualResult, setSelectedManualResult] = useState<string>(
    analyzedResult.manualClasification || "not-set"
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
            aiClasification: selectedModelResult[type].hasilKlasifikasiAI,
            manualClasification:
              selectedModelResult[type].hasilKlasifikasiManual,
            confidence: selectedModelResult[type].confidence,
            model: selectedModelResult[type].modelAI,
            tester: selectedModelResult[type].penguji,
            lastUpdate: format(
              new Date(selectedModelResult[type].tanggalUpdate),
              "yyyy-MM-dd"
            ),
            mode: selectedModelResult[type].mode
          });
        }
      }
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg h-fit">
      <div className={cn("py-4 px-6 text-white", color)}>
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Image Section */}
      <div className="p-6">
        <div className="aspect-[16/12] rounded-2xl mb-6 flex items-center justify-center relative group">
          <Image
            src={image}
            alt={`Gambar ${title}`}
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div>
          <pre>{JSON.stringify(analyzedResult, null, 2)}</pre>
        </div>

        {/* Analysis Form */}
        <div className="space-y-4">
          {/* Hasil Klasifikasi */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-slate-700">
                Hasil Klasifikasi
              </Label>
              <Badge
                className={cn(
                  "text-white px-4 py-2 text-sm font-medium",
                  color
                )}
              >
                {analyzedResult.mode === "AI"
                  ? analyzedResult.aiClasification
                  : analyzedResult.manualClasification}
              </Badge>
            </div>
          </div>

          {/* Mode Klasifikasi */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-slate-700">
              Mode Klasifikasi
            </Label>

            <div className="bg-slate-50/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {typeMode === "AI" && (
                    <>
                      <Bot className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">
                        AI Mode
                      </span>
                    </>
                  )}

                  {typeMode === "MANUAL" && (
                    <>
                      <User className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">
                        Manual Mode
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={typeMode === "AI"}
                    onCheckedChange={(checked) =>
                      setTypeMode(checked ? "AI" : "MANUAL")
                    }
                  />

                  {typeMode === "AI" && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {analyzedResult.confidence}%
                    </Badge>
                  )}

                  {typeMode === "MANUAL" && (
                    <Badge
                      variant="outline"
                      className="bg-orange-50 text-orange-700 border-orange-200"
                    >
                      Manual
                    </Badge>
                  )}
                </div>
              </div>
              {typeMode === "AI" && (
                <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-slate-600">
                      Model AI
                    </Label>
                    <span className="text-sm font-semibold text-slate-800">
                      {analyzedResult.model}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Penguji */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-slate-700">
              Penguji
            </Label>
            <div className="bg-slate-50/80 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-800">
                  {analyzedResult.tester}
                </span>
              </div>
            </div>
          </div>

          {/* Tanggal Update */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-slate-700">
              Tanggal Update
            </Label>
            <div className="bg-slate-50/80 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-800">
                  {analyzedResult.lastUpdate}
                </span>
              </div>
            </div>
          </div>

          {/* Input Hasil Manual */}
          <div className="space-y-1">
            <Label className="text-sm font-semibold text-slate-700">
              Input Hasil Manual
            </Label>
            <div className="bg-slate-50/80 rounded-xl p-4">
              <Select
                onValueChange={(value) => setSelectedManualResult(value)}
                value={selectedManualResult}
              >
                <SelectTrigger className="border-0 h-10">
                  <SelectValue placeholder={manualSelect.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"not-set"}>
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

          {/* Update Button */}
          <Button
            variant="secondary"
            className={cn("w-full h-11", color)}
            onClick={handleUpdateAnalyzedResult}
            disabled={updateAnalyzedResultMutation.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            Update Analisis
          </Button>
        </div>
      </div>
    </div>
  );
}
