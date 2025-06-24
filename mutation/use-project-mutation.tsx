import { createProject } from "@/lib/api/project-api";
import { QUERIES } from "@/lib/constants/queries";
import { ErrorHandling } from "@/lib/error-handling";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useProjectMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Proyek ${variables.namaProject} berhasil disimpan`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.PROJECTS]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  return {
    createProjectMutation
  };
}
