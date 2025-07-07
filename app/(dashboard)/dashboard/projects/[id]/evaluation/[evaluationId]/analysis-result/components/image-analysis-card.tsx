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
  color = "bg-primary text-primary-foreground",
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
            src={image}
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
                {result.clasification}
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">
              Mode Klasifikasi
            </Label>
            <div className="bg-muted rounded p-3">
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
                    {typeMode === "AI" ? `${result.confidence}%` : "Manual"}
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
                      {result.model}
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
            <div className="bg-muted rounded p-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{result.tester}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">
              Tanggal Update
            </Label>
            <div className="bg-muted rounded p-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {result.lastUpdate}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-foreground">
              Input Hasil Manual
            </Label>
            <div className="bg-muted rounded p-3">
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
            </div>
          </div>

          <Button
            className={cn("w-full h-10 text-sm font-medium", color)}
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
