import {
  createProjectEvaluation,
  deleteProjectEvaluation,
  deleteProjectEvaluationImageComponent1,
  deleteProjectEvaluationImageComponent2,
  deleteProjectEvaluationImageListMicroStructure,
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
      toast("✔️ Berhasil", {
        description: `Pengujian proyek berhasil disimpan`
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
      toast("✔️ Berhasil", {
        description: `Pengujian proyek berhasil diubah`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS_EVALUATION, variables.body.id]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const deleteProjectEvaluationMutation = useMutation({
    mutationFn: deleteProjectEvaluation,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Pengujian proyek berhasil dihapus`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS_EVALUATION, variables]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const deleteProjectEvaluationImageComponent1Mutation = useMutation({
    mutationFn: deleteProjectEvaluationImageComponent1,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Gambar Komponent 1 Pengujian proyek berhasil dihapus`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS_EVALUATION, variables]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const deleteProjectEvaluationImageComponent2Mutation = useMutation({
    mutationFn: deleteProjectEvaluationImageComponent2,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Gambar Komponent 2 Pengujian proyek berhasil dihapus`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS_EVALUATION, variables]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const deleteProjectEvaluationImageListMicroStructureMutation = useMutation({
    mutationFn: deleteProjectEvaluationImageListMicroStructure,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Gambar List Micro Struktur Pengujian proyek berhasil dihapus`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS_EVALUATION, variables]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  return {
    createProjectEvaluationMutation,
    updateProjectEvaluationMutation,
    deleteProjectEvaluationMutation,
    deleteProjectEvaluationImageComponent1Mutation,
    deleteProjectEvaluationImageComponent2Mutation,
    deleteProjectEvaluationImageListMicroStructureMutation
  };
}
