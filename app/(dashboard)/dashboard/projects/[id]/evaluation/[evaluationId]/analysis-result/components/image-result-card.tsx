import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import useModal from "@/hooks/use-modal";
import {
  AlertCircle,
  BookCheck,
  EyeOff,
  Microscope,
  TrendingDown,
  User,
  Zap
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnalysisDialog } from "./image-analysis-dialog";
import { Label } from "@/components/ui/label";
import { ModelAnalyzedResult } from "@/lib/types/project-evaluation-type";
import { useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/lib/constants/queries";

type Props = {
  modelAnalyzedResult: ModelAnalyzedResult;
  modelAnalyzedResultList: ModelAnalyzedResult[];
  totalImage: number;
  number: number;
  projectEvaluationId: string;
};

export default function ImageResultCard({
  modelAnalyzedResult,
  modelAnalyzedResultList,
  totalImage,
  number,
  projectEvaluationId
}: Props) {
  const queryClient = useQueryClient();
  const { isOpen, openModal, setIsOpen } = useModal();
  const aiStatus = {
    fasa: modelAnalyzedResult.fasa.mode === "AI",
    crack: modelAnalyzedResult.crack.mode === "AI",
    degradasi: modelAnalyzedResult.degradasi.mode === "AI"
  };
  const [isIncludedInReport, setIsIncludedInReport] = useState(false);
  const [initialOrderListImage, setInitialOrderListImage] = useState(number);

  return (
    <>
      <div
        className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={openModal}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Microscope className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">
                Struktur Mikro {number}
              </h4>
              <p className="text-xs text-slate-500">Sample #{number}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-xs bg-green-50 text-green-700 border-green-200"
          >
            AI Analyzed
          </Badge>
        </div>

        {/* Image */}
        <div className="aspect-video flex items-center justify-center relative">
          <div className="w-full aspect-[16/12] relative">
            <Image
              src={modelAnalyzedResult.image}
              alt={`Gambar komponen ${number}`}
              className="object-cover overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square rounded-xl"
              fill
              tabIndex={0}
              style={{ objectPosition: "top" }}
            />
          </div>
        </div>

        <div>
          <pre>{JSON.stringify(aiStatus, null, 2)}</pre>
        </div>

        {/* Controls */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between p-2 bg-blue-50/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">FASA Austenite</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-orange-100 text-orange-700 text-xs"
              >
                {aiStatus.fasa ? "AI" : <User size={16} />}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-red-50/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">CRACK Terdeteksi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-orange-100 text-orange-700 text-xs"
              >
                {aiStatus.crack ? "AI" : <User size={16} />}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-amber-50/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium">Degradasi ERA 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-orange-100 text-orange-700 text-xs"
              >
                {aiStatus.degradasi ? "AI" : <User size={16} />}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div
          className="flex items-center justify-between py-4 px-6 bg-slate-50/50 rounded-lg cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <Label
            htmlFor={`isIncludedInReport-${number}`}
            className="flex items-center space-x-2 w-full"
          >
            {isIncludedInReport ? (
              <BookCheck className="w-4 h-4 text-green-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-600" />
            )}
            <span className="text-sm font-medium">
              {isIncludedInReport ? `Masuk Laporan` : `Tidak Masuk Laporan`}
            </span>
          </Label>
          <Switch
            id={`isIncludedInReport-${number}`}
            checked={isIncludedInReport}
            onCheckedChange={(checked) => setIsIncludedInReport(checked)}
          />
        </div>
      </div>

      <AnalysisDialog
        projectEvaluationId={projectEvaluationId}
        open={isOpen}
        onOpenChange={setIsOpen}
        modelAnalyzedResultList={modelAnalyzedResultList}
        initialOrderListImage={initialOrderListImage}
        totalImages={totalImage}
      />
    </>
  );
}
