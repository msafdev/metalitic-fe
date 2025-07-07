import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AiModelClasification } from "@/lib/types/common-type";
import { ArrowRight, ChevronLeft, Database } from "lucide-react";
import Image from "next/image";
import { useTab } from "../context/tab-context";
import { useAIConfiguration } from "../context/ai-configuration-context";

type Props = {
  aiModelClasification: AiModelClasification;
};

export default function DatasetSection({ aiModelClasification }: Props) {
  const { setActiveTab } = useTab();
  const { config, setConfig } = useAIConfiguration();

  const totalImages = config.aiRecommendationResult.length;
  const annotatedImages = config.aiRecommendationResult.filter(
    (result) => result.isAnotated
  ).length;

  const handleBack = () => {
    setActiveTab("data-annotation");
  };

  const handleNext = () => {
    setActiveTab("training");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span>Dataset Keseluruhan</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-10">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h4 className="font-semibold">Dataset Gambar Baru</h4>
            <Badge variant="primary-outline">
              {annotatedImages}/{totalImages} sudah teranotasi
            </Badge>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {config.imageList.map((item, index) => {
              const imageFile = item as File & { preview: string };

              return (
                <div
                  key={index}
                  className="aspect-[4/3] bg-muted-foreground/20 rounded-lg overflow-hidden relative"
                >
                  <Image
                    src={imageFile.preview}
                    alt={"Placeholder"}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h4 className="font-semibold">Dataset Gambar Lama</h4>
          </div>

          <div className="mt-4">
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
              <Checkbox
                id="toggle-2"
                checked={config.useOlderDatasetImage}
                onCheckedChange={(checked) =>
                  checked
                    ? setConfig({ useOlderDatasetImage: true })
                    : setConfig({ useOlderDatasetImage: false })
                }
                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Gunakan data gambar lama?
                </p>
                <p className="text-muted-foreground text-sm">
                  Centang opsi ini untuk menggunakan data gambar lama
                </p>
              </div>
            </Label>
          </div>
        </div>

        <div>
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
        </div>
      </CardContent>
    </Card>
  );
}
