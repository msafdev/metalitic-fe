import { createProject } from "@/lib/api/project-api";
import { QUERIES } from "@/lib/constants/queries";
import { ErrorHandling } from "@/lib/errorHandling";
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
      toast("Success", {
        description: `Project berhasil disimpan!`
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
