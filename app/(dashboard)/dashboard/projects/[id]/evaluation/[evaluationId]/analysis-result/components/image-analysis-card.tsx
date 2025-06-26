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
import { Bot, Calendar, Save, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  header: {
    icon: React.ElementType;
    title: string;
  };
  initialTypeMode?: TypeMode;
  image: string;
  result: {
    clasification: string;
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
  header: { icon: Icon, title },
  image,
  initialTypeMode = "AI",
  result,
  color = "bg-gradient-to-r from-green-500 to-emerald-500",
  manualSelect
}: Props) {
  const [typeMode, setTypeMode] = useState<TypeMode>(initialTypeMode);
  const [selectedManualResult, setSelectedManualResult] = useState<string>();

  useEffect(() => {
    if (typeMode === "AI") {
      setSelectedManualResult("not-set");
    }
  }, [typeMode]);

  useEffect(() => {
    if (selectedManualResult !== "not-set") {
      setTypeMode("MANUAL");
    }
  }, [selectedManualResult]);

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
                {result.clasification}
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
                      {result.confidence}%
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
                      {result.model}
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
                  {result.tester}
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
                  {result.lastUpdate}
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
            </div>
          </div>

          {/* Update Button */}
          <Button
            variant="secondary"
            className={cn("w-full h-11", color)}
            onClick={() => {}}
          >
            <Save className="w-4 h-4 mr-2" />
            Update Analisis
          </Button>
        </div>
      </div>
    </div>
  );
}
