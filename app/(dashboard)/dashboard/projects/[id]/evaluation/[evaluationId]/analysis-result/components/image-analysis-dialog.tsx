"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ModelAnalyzedResult } from "@/lib/types/project-evaluation-type";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import ImageAnalysisCard from "./image-analysis-card";

type AnalysisDialogProps = {
  projectEvaluationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialOrderListImage: number;
  modelAnalyzedResultList: ModelAnalyzedResult[];
  totalImages: number;
};

type TypeMode = "AI" | "MANUAL";

export function AnalysisDialog({
  projectEvaluationId,
  open,
  onOpenChange,
  initialOrderListImage,
  modelAnalyzedResultList,
  totalImages
}: AnalysisDialogProps) {
  const [modelAnalyzedResultOrder, setModelAnalyzedResultOrder] =
    useState<number>(initialOrderListImage);

  const getSelectedModelAnalyzedResult = (): ModelAnalyzedResult => {
    return modelAnalyzedResultList.find(
      (item, index) => index + 1 === modelAnalyzedResultOrder
    ) as ModelAnalyzedResult;
  };

  const [analysisData, setAnalysisData] = useState<ModelAnalyzedResult>(
    getSelectedModelAnalyzedResult()
  );

  useEffect(() => {
    const selectedModelAnalyzedResult = getSelectedModelAnalyzedResult();
    setAnalysisData(selectedModelAnalyzedResult);
  }, [modelAnalyzedResultOrder]);

  const handlePrevious = () => {
    if (modelAnalyzedResultOrder > 1) {
      setModelAnalyzedResultOrder(modelAnalyzedResultOrder - 1);
    }
  };

  const handleNext = () => {
    if (modelAnalyzedResultOrder < totalImages) {
      setModelAnalyzedResultOrder(modelAnalyzedResultOrder + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
        <DialogHeader className="border-b border-slate-200 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-800">
                Hasil Pengujian Pergambar
              </DialogTitle>
              <p className="text-slate-600 mt-1">
                Detailed analysis results and manual adjustments
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={modelAnalyzedResultOrder === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-slate-800">
                    Struktur Mikro {modelAnalyzedResultOrder}
                  </span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {modelAnalyzedResultOrder}/{totalImages}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={modelAnalyzedResultOrder === totalImages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
          {/* FASA Analysis Section */}
          <ImageAnalysisCard
            analysisDataId={analysisData._id}
            projectEvaluationId={projectEvaluationId}
            modelAnalyzedResult={analysisData.fasa}
            type="fasa"
            color="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            header={{
              icon: Zap,
              title: "Hasil Analisa FASA"
            }}
            manualSelect={{
              placeholder: "Pilih Kelas FASA",
              items: [
                {
                  label: "Austenite",
                  value: "austenite"
                },
                {
                  label: "Martensite",
                  value: "martensite"
                },
                {
                  label: "Bainite",
                  value: "bainite"
                },
                {
                  label: "Ferrite",
                  value: "ferrite"
                }
              ]
            }}
          />

          {/* CRACK Detection Section */}
          <ImageAnalysisCard
            analysisDataId={analysisData._id}
            projectEvaluationId={projectEvaluationId}
            modelAnalyzedResult={analysisData.crack}
            type="crack"
            color="bg-gradient-to-r from-red-500 to-orange-500 text-white"
            header={{
              icon: AlertCircle,
              title: "Hasil Deteksi CRACK"
            }}
            manualSelect={{
              placeholder: "Pilih Deteksi CRACK",
              items: [
                {
                  label: "Terdeteksi",
                  value: "detected"
                },
                {
                  label: "Tidak Terdeteksi",
                  value: "undetected"
                }
              ]
            }}
          />

          {/* DEGRADATION Analysis Section */}
          <ImageAnalysisCard
            analysisDataId={analysisData._id}
            projectEvaluationId={projectEvaluationId}
            modelAnalyzedResult={analysisData.degradasi}
            type="degradasi"
            color="bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
            header={{
              icon: TrendingDown,
              title: "Hasil Analisa DEGRADASI"
            }}
            manualSelect={{
              placeholder: "Pilih Kelas DEGRADASI",
              items: [
                {
                  label: "ERA A",
                  value: "era-a"
                },
                {
                  label: "ERA B",
                  value: "era-b"
                },
                {
                  label: "ERA C",
                  value: "era-c"
                },
                {
                  label: "ERA D",
                  value: "era-d"
                }
              ]
            }}
          />
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 pt-6 flex justify-end">
          <Button
            size="lg"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Selesai
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
