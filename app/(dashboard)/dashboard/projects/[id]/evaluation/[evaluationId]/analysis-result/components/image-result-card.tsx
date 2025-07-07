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
import { useState } from "react";
import { AnalysisDialog } from "./image-analysis-dialog";
import { Label } from "@/components/ui/label";

type Props = {
  image: string;
  number: number;
};

export default function ImageResultCard({ image, number }: Props) {
  const { isOpen, openModal, setIsOpen } = useModal();
  const [aiStatus, setAiStatus] = useState({
    fasa: true,
    crack: true,
    degradasi: true
  });
  const [isIncludedInReport, setIsIncludedInReport] = useState(false);

  return (
    <>
      <div
        key={image}
        className="bg-background/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border"
        onClick={openModal}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Microscope className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                Gambar Struktur Mikro {number}
              </h4>
              <p className="text-xs text-muted-foreground">Sample #{number}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-xs bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-600"
          >
            AI Analyzed
          </Badge>
        </div>

        {/* Image */}
        <div className="aspect-video flex items-center justify-center relative">
          <div className="w-full aspect-[16/12] relative">
            <Image
              src={image}
              alt={`Gambar komponen ${number}`}
              className="object-cover overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square"
              fill
              tabIndex={0}
              style={{ objectPosition: "top" }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 space-y-1">
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-foreground">
                FASA Austenite
              </span>
            </div>
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-700 text-xs border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-600"
            >
              {aiStatus.fasa ? "AI" : <User size={16} />}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-foreground">
                CRACK Terdeteksi
              </span>
            </div>
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-700 text-xs border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-600"
            >
              {aiStatus.crack ? "AI" : <User size={16} />}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-foreground">
                Degradasi ERA 1
              </span>
            </div>
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-700 text-xs border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-600"
            >
              {aiStatus.degradasi ? "AI" : <User size={16} />}
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-4 px-6 rounded-lg" onClick={(e)=>{e.stopPropagation()}}>
          <Label
            htmlFor="isIncludedInReport"
            className="flex items-center space-x-2 w-full"
          >
            {isIncludedInReport ? (
              <BookCheck className="w-4 h-4 text-green-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {isIncludedInReport ? `Masuk Laporan` : `Tidak Masuk Laporan`}
            </span>
          </Label>
          <Switch
            className="border-border"
            id="isIncludedInReport"
            checked={isIncludedInReport}
            onCheckedChange={(checked) => setIsIncludedInReport(checked)}
          />
        </div>
      </div>

      <AnalysisDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        currentImage={number}
        totalImages={10}
      />
    </>
  );
}
