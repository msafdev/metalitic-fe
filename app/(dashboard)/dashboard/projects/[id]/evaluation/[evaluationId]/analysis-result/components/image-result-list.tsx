import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import useModal from "@/hooks/use-modal";
import {
  getAiClasificationList,
  getAnalyzedResult
} from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import { ModelAnalyzedResult } from "@/lib/types/project-evaluation-type";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  BookCheck,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Microscope,
  TrendingDown,
  User,
  Zap
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import ImageAnalysisCard from "./image-analysis-card";
import { SelectItem } from "@/lib/types/common-type";
import { toast } from "sonner";

type Props = {
  projectEvaluationId: string;
  includedResultIds: string[];
  setIncludedResultIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ImageResultList({
  projectEvaluationId,
  includedResultIds,
  setIncludedResultIds
}: Props) {
  const { isOpen, openModal, setIsOpen, closeModal } = useModal();
  const [initialOrderListImage, setInitialOrderListImage] = useState(1);

  const { data, isLoading } = useQuery({
    queryFn: () => getAnalyzedResult(projectEvaluationId),
    queryKey: [QUERIES.ANALYZED_RESULT, projectEvaluationId]
  });

  const { data: aiClasificationList, isLoading: isLoadingAiClasificationList } =
    useQuery({
      queryFn: getAiClasificationList,
      queryKey: [QUERIES.AI_CLASIFICATION_LIST]
    });

  const totalImage = data?.data.hasilAnalisa.length || 0;
  const modelAnalyzedResultList = data?.data.hasilAnalisa;

  const aiClasificationFasaList: SelectItem[] = useMemo(() => {
    return aiClasificationList?.data.fasa.map((item) => ({
      label: item,
      value: item
    })) as SelectItem[];
  }, [aiClasificationList]);

  const aiClasificationCrackList: SelectItem[] = useMemo(() => {
    return aiClasificationList?.data.crack.map((item) => ({
      label: item,
      value: item
    })) as SelectItem[];
  }, [aiClasificationList]);

  const aiClasificationDegradasiList: SelectItem[] = useMemo(() => {
    return aiClasificationList?.data.degradasi.map((item) => ({
      label: item,
      value: item
    })) as SelectItem[];
  }, [aiClasificationList]);

  const getSelectedModelAnalyzedResult = (
    order: number
  ): ModelAnalyzedResult => {
    return modelAnalyzedResultList?.find(
      (item, index) => index + 1 === order
    ) as ModelAnalyzedResult;
  };

  // const analysisData = useMemo(() => {
  //   return getSelectedModelAnalyzedResult(initialOrderListImage);
  // }, [initialOrderListImage, data]);

  const [analysisData, setAnalysisData] = useState<ModelAnalyzedResult>(
    getSelectedModelAnalyzedResult(initialOrderListImage)
  );

  useEffect(() => {
    const selectedModelAnalyzedResult = getSelectedModelAnalyzedResult(
      initialOrderListImage
    );
    setAnalysisData(selectedModelAnalyzedResult);
  }, [initialOrderListImage, data]);

  const handlePrevious = () => {
    if (initialOrderListImage > 1) {
      setInitialOrderListImage(initialOrderListImage - 1);
    }
  };

  const handleNext = () => {
    if (initialOrderListImage < totalImage) {
      setInitialOrderListImage(initialOrderListImage + 1);
    }
  };

  return (
    <>
      {modelAnalyzedResultList?.map((modelAnalyzedResult, index) => {
        const order = index + 1;
        const isIncludedInReport = includedResultIds.includes(
          modelAnalyzedResult._id
        );

        const handleToggle = (checked: boolean) => {
          if (checked) {
            if (includedResultIds.length >= 2) {
              toast.error("Batas Maksimum", {
                description:
                  "Hanya boleh memilih maksimal 2 gambar untuk laporan."
              });
              return;
            }
            setIncludedResultIds((prev) => [...prev, modelAnalyzedResult._id]);
          } else {
            setIncludedResultIds((prev) =>
              prev.filter((id) => id !== modelAnalyzedResult._id)
            );
          }
        };

        return (
          <div
            key={modelAnalyzedResult._id}
            className="backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border"
            onClick={() => {
              setInitialOrderListImage(order);
              openModal();
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <Microscope className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Struktur Mikro {order}</h4>
                  <p className="text-xs text-slate-500">Sample #{order}</p>
                </div>
              </div>
              <Badge variant="primary-outline">AI Analyzed</Badge>
            </div>

            {/* Image */}
            <div className="aspect-video flex items-center justify-center relative">
              <div className="w-full aspect-[16/12] relative">
                <Image
                  src={modelAnalyzedResult.image}
                  alt={`Gambar komponen ${order}`}
                  className="object-cover overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square rounded-xl"
                  fill
                  tabIndex={0}
                  style={{ objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between p-2 bg-blue-50/50 dark:bg-blue-950/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    FASA{" "}
                    {modelAnalyzedResult.fasa.mode === "AI"
                      ? modelAnalyzedResult.fasa.hasilKlasifikasiAI
                      : modelAnalyzedResult.fasa.hasilKlasifikasiManual}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-100 text-orange-700 text-xs"
                  >
                    {modelAnalyzedResult.fasa.mode === "AI" ? (
                      "AI"
                    ) : (
                      <User size={16} />
                    )}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-red-50/50 dark:bg-red-950/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium">
                    CRACK{" "}
                    {modelAnalyzedResult.crack.mode === "AI"
                      ? modelAnalyzedResult.crack.hasilKlasifikasiAI
                      : modelAnalyzedResult.crack.hasilKlasifikasiManual}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-100 text-orange-700 text-xs"
                  >
                    {modelAnalyzedResult.crack.mode === "AI" ? (
                      "AI"
                    ) : (
                      <User size={16} />
                    )}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-amber-50/50 dark:bg-amber-950/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium">
                    Degradasi{" "}
                    {modelAnalyzedResult.degradasi.mode === "AI"
                      ? modelAnalyzedResult.degradasi.hasilKlasifikasiAI
                      : modelAnalyzedResult.degradasi.hasilKlasifikasiManual}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-100 text-orange-700 text-xs"
                  >
                    {modelAnalyzedResult.degradasi.mode === "AI" ? (
                      "AI"
                    ) : (
                      <User size={16} />
                    )}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div
              className="flex items-center justify-between py-4 px-6 rounded-lg cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <Label
                htmlFor={`isIncludedInReport-${order}`}
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
                id={`isIncludedInReport-${order}`}
                checked={isIncludedInReport}
                onCheckedChange={handleToggle}
              />
            </div>
          </div>
        );
      })}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b border-slate-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  Hasil Pengujian Pergambar
                </DialogTitle>
                <p className="text-muted-foreground mt-1">
                  Detailed analysis results and manual adjustments
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={initialOrderListImage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">
                      Gambar Struktur Mikro {initialOrderListImage}
                    </span>
                    <Badge variant="primary-outline">
                      {initialOrderListImage}/{totalImage}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={initialOrderListImage === totalImage}
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
                placeholder: "Pilih Analisa FASA",
                items: aiClasificationFasaList
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
                items: aiClasificationCrackList
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
                items: aiClasificationDegradasiList
              }}
            />
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border pt-6 flex justify-end">
            <Button size="lg" variant="outline" onClick={closeModal}>
              Selesai
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
