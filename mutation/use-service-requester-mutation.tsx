import {
  createServiceRequester,
  deleteServiceRequester
} from "@/lib/api/service-requester-api";
import { QUERIES } from "@/lib/constants/queries";
import { ErrorHandling } from "@/lib/error-handling";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useServiceRequesterMutation() {
  const queryClient = useQueryClient();

  const createServiceRequesterMutation = useMutation({
    mutationFn: createServiceRequester,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Peminta jasa ${variables.nama} berhasil disimpan`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.SERVICE_REQUESTER]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const deleteServiceRequesterMutation = useMutation({
    mutationFn: deleteServiceRequester,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Peminta jasa berhasil dihapus`
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.SERVICE_REQUESTER]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  return {
    createServiceRequesterMutation,
    deleteServiceRequesterMutation
  };
}
