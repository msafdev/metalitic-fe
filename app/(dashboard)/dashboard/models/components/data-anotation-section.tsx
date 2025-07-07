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
import { AiModelClasification } from "@/lib/types/common-type";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowRight,
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
import { useTab } from "../context/tab-context";
import DataAnotationItem from "./data-anotation.item";
import { AiRecommendationResult } from "@/lib/types/ai-configuration.type";

type Props = {
  aiModelClasification: AiModelClasification;
};

export default function DataAnotationSection({ aiModelClasification }: Props) {
  const { setActiveTab } = useTab();
  const { config } = useAIConfiguration();
  const [currentImage, setCurrentImage] = useState(1);

  const selectedItem = config.aiRecommendationResult.find(
    (item, index) => index + 1 === currentImage
  );

  const handleBack = () => {
    setActiveTab("upload");
  };

  const handleNext = () => {
    setActiveTab("dataset");
  };

  return (
    <>
      {/* <div className="flex flex-col md:flex-row gap-4"> */}
      {/* {config.aiRecommendationResult.map((result) => ( */}
      <DataAnotationItem
        aiModelClasification={aiModelClasification}
        currentImage={currentImage}
        item={
          selectedItem as AiRecommendationResult & {
            useRecommendation: boolean;
          }
        }
        setCurrentImage={setCurrentImage}
      />
      {/* ))} */}
      {/* </div> */}
      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <Button
          variant="outline"
          className="flex items-center space-x-1"
          size="lg"
          onClick={handleBack}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Button>

        <Button
          className="flex items-center space-x-1"
          size="lg"
          onClick={handleNext}
        >
          <span>Simpan dan Lanjut</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}
