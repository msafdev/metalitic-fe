"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getAiClasificationList } from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import { AiRecommendationResult } from "@/lib/types/ai-configuration.type";
import { AiModelClasification } from "@/lib/types/common-type";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Brain,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  User
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAIConfiguration } from "../context/ai-configuration-context";

type Props = {
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
  item: AiRecommendationResult & {
    useRecommendation: boolean;
  };
  aiModelClasification: AiModelClasification;
};

export default function DataAnotationItem({
  currentImage,
  item,
  setCurrentImage,
  aiModelClasification
}: Props) {
  const selectedItem = item;
  const { config, setConfig } = useAIConfiguration();

  const [useRecommendation, setUseRecommendation] = useState(
    selectedItem.useRecommendation
  );
  const [selectedClass, setSelectedClass] = useState<string>("not-set");

  const { data: aiClasificationList, isLoading: isLoadingAiClasificationList } =
    useQuery({
      queryFn: getAiClasificationList,
      queryKey: [QUERIES.AI_CLASIFICATION_LIST]
    });

  useEffect(() => {
    setUseRecommendation(selectedItem.useRecommendation);

    if (selectedItem.hasilKlasifikasiManual) {
      setSelectedClass(selectedItem.hasilKlasifikasiManual);
    } else {
      setSelectedClass("not-set");
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedClass !== "not-set") {
      setUseRecommendation(false);
    }
  }, [selectedClass]);

  const totalImages = config.aiRecommendationResult.length;
  const annotatedImages = config.aiRecommendationResult.filter(
    (result) => result.isAnotated
  ).length;

  const nextImage = () => {
    if (currentImage < totalImages) {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 1) {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleUpdate = () => {
    setConfig({
      aiRecommendationResult: config.aiRecommendationResult.map(
        (item, index) => {
          if (index + 1 !== currentImage) return item;

          return {
            ...item,
            isAnotated: true,
            mode: useRecommendation ? "AI" : "MANUAL",
            useRecommendation: useRecommendation,
            hasilKlasifikasiManual: useRecommendation ? null : selectedClass
          };
        }
      )
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Card className="md:basis-8/12">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <Eye className="w-6 h-6 text-primary" />
              <span>Anotasi Gambar</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevImage}
                disabled={currentImage === 1}
                className="w-8 h-8 p-0 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Badge variant="secondary" className="px-3 py-1">
                {currentImage}/{totalImages}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={nextImage}
                disabled={currentImage === totalImages}
                className="w-8 h-8 p-0 bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Display */}
          <div className="relative">
            <div className="relative aspect-[4/3] bg-gradient-to-b from-blue-200 to-green-300 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-lg">
              <Image
                src={selectedItem?.image || "/placeholder.svg"}
                alt="Landscape for annotation"
                className="w-full h-full object-cover"
                fill
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center space-x-4">
            <div>
              <Badge variant="primary-outline">
                {annotatedImages}/{totalImages} sudah teranotasi
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Sidebar - Recommendations & Validation */}
      <div className="md:basis-4/12 space-y-4">
        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg">Rekomendasi</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">
                  {selectedItem?.mode === "AI"
                    ? selectedItem?.hasilKlasifikasiAI
                    : selectedItem?.hasilKlasifikasiManual}
                </span>

                <div className="space-x-2">
                  <Badge
                    variant="primary-outline"
                    className={cn({
                      "bg-orange-50 text-orange-700 border-orange-200":
                        selectedItem?.mode === "MANUAL"
                    })}
                  >
                    {selectedItem?.mode}
                  </Badge>

                  {selectedItem?.mode === "AI" && (
                    <Badge variant="default">{selectedItem?.confidence}%</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>{selectedItem?.modelAI}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{selectedItem?.penguji}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(
                      new Date(selectedItem?.tanggalUpdate || ""),
                      "yyyy-MM-dd"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>Validasi</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Pakai Rekomendasi
              </label>
              <Switch
                checked={useRecommendation}
                onCheckedChange={setUseRecommendation}
              />
            </div>

            <Separator />

            {!useRecommendation && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Pilih Kelas{" "}
                  <span className="uppercase">{aiModelClasification}</span>
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Klasifikasi..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"not-set"}>
                      Pilih klasifikasi {aiModelClasification}
                    </SelectItem>
                    {aiClasificationList?.data[aiModelClasification].map(
                      (item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button className="w-full" onClick={handleUpdate}>
              Update
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
