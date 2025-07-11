import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AiModelClasification } from "@/lib/types/common-type";
import { BrainCircuit, ChevronLeft, Loader2, Save } from "lucide-react";
import { ActiveStep } from "./stepper-navigation";
import { useTab } from "../context/tab-context";
import { useAIConfiguration } from "../context/ai-configuration-context";
import useAIConfigurationMutation from "@/mutation/use-ai-configuration-mutation";

type Props = {
  aiModelClasification: AiModelClasification;
};

export default function TrainingSection({ aiModelClasification }: Props) {
  const { setActiveTab } = useTab();
  const { config, setConfig } = useAIConfiguration();
  const { aiStartTrainingMutation, saveAiModelMutation } =
    useAIConfigurationMutation();

  const handleBack = () => {
    setActiveTab("dataset");
  };

  const handleStartTraining = () => {
    aiStartTrainingMutation.mutate({
      type: aiModelClasification,
      aiFileModelName: config.aiFileModelName,
      aiRecommendationResult: config.aiRecommendationResult,
      useOlderDatasetImage: config.useOlderDatasetImage
    });
  };

  const handleSaveModel = () => {
    saveAiModelMutation.mutate({
      type: aiModelClasification,
      aiFileModelName: config.aiFileModelName,
      aiRecommendationResult: config.aiRecommendationResult,
      useOlderDatasetImage: config.useOlderDatasetImage
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span>Training Model AI</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-10">
        <div>
          <h4 className="font-semibold mb-2">Proses Training</h4>

          <div>
            <div className="flex gap-4">
              <Input
                placeholder="Masukkan Nama File Model AI"
                value={config.aiFileModelName}
                onChange={(e) => setConfig({ aiFileModelName: e.target.value })}
              />
              {/* 
              // TODO === UBAH TOMBOL UNTUK INTEGRASI DENGAN AI
              // GUNAKAN TANSTACK-QUERY UNTUK MELAKUKAN REQUEST KE API
              */}
              <Button
                type="button"
                onClick={handleStartTraining}
                disabled={aiStartTrainingMutation.isPending}
              >
                {aiStartTrainingMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <BrainCircuit />
                Mulai Training
              </Button>
            </div>
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
              onClick={handleSaveModel}
              disabled={saveAiModelMutation.isPending}
            >
              {saveAiModelMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Save className="w-4 h-4" />
              <span>Simpan Model</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
