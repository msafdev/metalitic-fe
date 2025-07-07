"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  TrendingDown,
  Zap,
  LogOut
} from "lucide-react";
import { useState } from "react";
import ImageAnalysisCard from "./image-analysis-card";

type AnalysisDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentImage: number;
  totalImages: number;
};

export function AnalysisDialog({
  open,
  onOpenChange,
  currentImage,
  totalImages
}: AnalysisDialogProps) {
  // TODO: STATIC DATA, USE ACTUAL TRAINING DATA AFTER
  const [analysisData] = useState({
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

  const handlePrevious = () => {};
  const handleNext = () => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto bg-background p-6 rounded-2xl border border-border shadow-xl">
        <DialogHeader className="pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                Hasil Pengujian Pergambar
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Analisa otomatis dan input manual per gambar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentImage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-sm font-medium text-foreground flex items-center gap-1">
                Gambar {currentImage}
                <Badge variant="secondary" className="text-xs">
                  {currentImage}/{totalImages}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentImage === totalImages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
          <ImageAnalysisCard
            color="bg-accent text-accent-foreground"
            header={{ icon: Zap, title: "Hasil Analisa FASA" }}
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
                { label: "Austenite", value: "austenite" },
                { label: "Martensite", value: "martensite" },
                { label: "Bainite", value: "bainite" },
                { label: "Ferrite", value: "ferrite" }
              ]
            }}
          />

          <ImageAnalysisCard
            color="bg-accent text-accent-foreground"
            header={{ icon: AlertCircle, title: "Hasil Deteksi CRACK" }}
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
                { label: "Terdeteksi", value: "detected" },
                { label: "Tidak Terdeteksi", value: "undetected" }
              ]
            }}
          />

          <ImageAnalysisCard
            color="bg-accent text-accent-foreground"
            header={{ icon: TrendingDown, title: "Hasil Analisa DEGRADASI" }}
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
                { label: "ERA A", value: "era-a" },
                { label: "ERA B", value: "era-b" },
                { label: "ERA C", value: "era-c" },
                { label: "ERA D", value: "era-d" }
              ]
            }}
          />
        </div>

        <div className="">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            <LogOut className="mr-2" />
            Selesai
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
