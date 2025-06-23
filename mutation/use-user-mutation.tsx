import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorHandling } from "@/lib/errorHandling";
import { verifyUser } from "@/lib/api/user-api";

export default function useUserMutation() {
  const router = useRouter();

  const verifyMutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: (data, variables) => {
      toast("Berhasil verifikasi", {
        description: `Verifikasi akun dengan username: ${variables.username}`,
        duration: 2000,
      });

      router.push("/dashboard/users");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    },
  });

  return {
    verifyMutation,
  };
}
