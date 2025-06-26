"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  Bot,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Maximize2,
  RotateCcw,
  Save,
  Settings,
  TrendingDown,
  User,
  Zap
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ImageAnalysisCard from "./image-analysis-card";

type AnalysisDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentImage: number;
  totalImages: number;
};

type TypeMode = "AI" | "MANUAL";

export function AnalysisDialog({
  open,
  onOpenChange,
  currentImage,
  totalImages
}: AnalysisDialogProps) {
  const [typeFasaMode, setTypeFasaMode] = useState<TypeMode>("AI");
  const [typeCrackMode, setTypeCrackMode] = useState<TypeMode>("MANUAL");
  const [typeDegradationMode, setTypeDegradationMode] =
    useState<TypeMode>("AI");

  const [analysisData, setAnalysisData] = useState({
    fasa: {
      image: "http://localhost:1945/uploads/20250624_153939_0zz9t.jpg",
      classification: "Austenite",
      mode: "AI",
      confidence: 90.3,
      model: "Model_AI_FASA_12",
      tester: "Samwell Tarley",
      lastUpdate: "2025-01-15",
      manualInput: ""
    },
    crack: {
      image: "http://localhost:1945/uploads/20250624_153939_0zz9t.jpg",
      detection: "Terdeteksi",
      mode: "Manual",
      confidence: 0,
      model: "",
      tester: "Samwell Tarley",
      lastUpdate: "2025-01-15",
      manualInput: ""
    },
    degradation: {
      image: "http://localhost:1945/uploads/20250624_153939_0zz9t.jpg",
      classification: "ERA A",
      mode: "AI",
      confidence: 91.5,
      model: "Model_AI_DEGRAD",
      tester: "Samwell Tarley",
      lastUpdate: "2025-01-15",
      manualInput: ""
    }
  });

  const handlePrevious = () => {
    // Handle navigation to previous image
  };

  const handleNext = () => {
    // Handle navigation to next image
  };

  const handleUpdate = (section: string) => {
    // Handle update for specific section
    console.log(`Updating ${section}`);
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
                  disabled={currentImage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-slate-800">
                    Gambar Struktur Mikro {currentImage}
                  </span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {currentImage}/{totalImages}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentImage === totalImages}
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
            color="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            header={{
              icon: Zap,
              title: "Hasil Analisa FASA"
            }}
            image={analysisData.fasa.image}
            initialTypeMode="AI"
            result={{
              clasification: analysisData.fasa.classification,
              confidence: analysisData.fasa.confidence,
              model: analysisData.fasa.model,
              tester: analysisData.fasa.tester,
              lastUpdate: analysisData.fasa.lastUpdate
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
            color="bg-gradient-to-r from-red-500 to-orange-500 text-white"
            header={{
              icon: AlertCircle,
              title: "Hasil Deteksi CRACK"
            }}
            image={analysisData.crack.image}
            initialTypeMode="MANUAL"
            result={{
              clasification: analysisData.crack.detection,
              confidence: analysisData.crack.confidence,
              model: analysisData.crack.model,
              tester: analysisData.crack.tester,
              lastUpdate: analysisData.crack.lastUpdate
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
            color="bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
            header={{
              icon: TrendingDown,
              title: "Hasil Analisa DEGRADASI"
            }}
            image={analysisData.degradation.image}
            initialTypeMode="AI"
            result={{
              clasification: analysisData.degradation.classification,
              confidence: analysisData.degradation.confidence,
              model: analysisData.degradation.model,
              tester: analysisData.degradation.tester,
              lastUpdate: analysisData.degradation.lastUpdate
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
