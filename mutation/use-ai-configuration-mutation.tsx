import {
  aiModelUploadImage,
  aiStartTraining,
  saveAiCompletedModel,
  saveAiModel
} from "@/lib/api/ai-configuation.api";
import { ErrorHandling } from "@/lib/error-handling";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useAIConfigurationMutation() {
  const aiModelUploadImageMutation = useMutation({
    mutationFn: aiModelUploadImage,
    onSuccess: (data, variables) => {},
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const aiStartTrainingMutation = useMutation({
    mutationFn: aiStartTraining,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: "Proses data training telah selesai"
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const saveAiModelMutation = useMutation({
    mutationFn: saveAiModel,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: "Model AI telah berhasil disimpan"
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const saveAiCompletedModelMutation = useMutation({
    mutationFn: saveAiCompletedModel,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: "Model AI telah berhasil disimpan"
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  return {
    aiModelUploadImageMutation,
    aiStartTrainingMutation,
    saveAiModelMutation,
    saveAiCompletedModelMutation
  };
}
