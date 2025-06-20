import { loginUser, logoutUser } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorHandling } from "@/lib/errorHandling";
import { deleteCookie } from "cookies-next";

export default function useAuthMutation() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      toast("Login successfull!", {
        description: `Welcome back ${variables.username}`,
        duration: 2000,
      });

      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data, variables) => {
      toast("Logout successfull!", {
        duration: 2000,
      });

      deleteCookie("token");
      deleteCookie("role");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorHandling.handle(error);
    },
  });

  return {
    loginMutation,
    logoutMutation,
  };
}
