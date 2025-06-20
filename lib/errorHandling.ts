import { AxiosError } from "axios";
import { toast } from "sonner";

export const ERROR_MESSAGE = {
  GENERIC: "Something went wrong. Please try again later.",
};

export class ErrorHandling {
  static handle(error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return toast.error("Failed", {
          description: "Please login first , " + error.response?.data.message,
        });
      }

      if (error.code === "ERR_BAD_REQUEST") {
        return toast.error("Failed", {
          description: error.response?.data.message,
        });
      }

      toast.error("Failed", {
        description: ERROR_MESSAGE.GENERIC,
      });
    }
  }
}
