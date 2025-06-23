import { loginUser, logoutUser, registerUser } from "@/lib/api/auth-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorHandling } from "@/lib/error-handling";
import { deleteCookie } from "cookies-next";
import { QUERIES } from "@/lib/constants/queries";

export default function useAuthMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      toast("Login successfull!", {
        description: `Welcome back ${variables.username}`,
        duration: 2000
      });

      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data, variables) => {
      toast("Logout successfull!", {
        duration: 2000
      });

      deleteCookie("token");
      deleteCookie("role");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    }
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      toast("Berhasil tambah user", {
        description: `Username ${variables.body.username}`,
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
    loginMutation,
    logoutMutation,
    registerMutation
  };
}
