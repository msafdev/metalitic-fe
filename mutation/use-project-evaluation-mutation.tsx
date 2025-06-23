import { createProject } from "@/lib/api/project-api";
import {
  createProjectEvaluation,
  updateProjectEvaluation
} from "@/lib/api/project-evaluation-api";
import { QUERIES } from "@/lib/constants/queries";
import { ErrorHandling } from "@/lib/error-handling";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useProjectEvaluationMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createProjectEvaluationMutation = useMutation({
    mutationFn: createProjectEvaluation,
    onSuccess: (data, variables) => {
      toast("Success", {
        description: `Pengujian Project berhasil disimpan!`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS, variables.projectId]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const updateProjectEvaluationMutation = useMutation({
    mutationFn: updateProjectEvaluation,
    onSuccess: (data, variables) => {
      toast("Success", {
        description: `Pengujian Project berhasil diupdate!`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS, variables.body.projectId]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  return {
    createProjectEvaluationMutation,
    updateProjectEvaluationMutation
  };
}
