import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorHandling } from "@/lib/error-handling";
import { updateUser, verifyUser } from "@/lib/api/user-api";
import { QUERIES } from "@/lib/constants/queries";
import { deleteUser } from "@/lib/api/auth-api";

export default function useUserMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Hapus akun dengan id: ${variables.id}`,
        duration: 2000
      });

      router.push("/dashboard/users");
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: "User berhasil diubah"
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.USERS, variables.id]
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const verifyMutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: (data, variables) => {
      toast("✔️ Berhasil", {
        description: `Verifikasi akun dengan username: ${variables.username}`,
        duration: 2000
      });

      router.push("/dashboard/users");
      queryClient.invalidateQueries({ queryKey: [QUERIES.USERS] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  return {
    verifyMutation,
    deleteMutation,
    updateMutation
  };
}
