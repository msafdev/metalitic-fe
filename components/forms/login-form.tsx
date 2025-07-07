"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import useAuthMutation from "@/mutation/use-auth-mutation";
import { useFormik } from "formik";
import { toast } from "sonner";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const loginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { loginMutation } = useAuthMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values, { resetForm }) => {
      loginMutation.mutate(values, {
        onSuccess: () => resetForm(),
        onError: () =>
          toast("❌ Error", {
            description: `Terjadi kesalahan saat login`,
            duration: 2000
          })
      });
    }
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your credentials below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-6">
              {/* username */}
              <div className="grid gap-3">
                <Label>Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  placeholder="m@example.com"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.username && formik.errors.username
                      ? "animate-pulse"
                      : ""
                  }
                />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <PasswordInput
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
