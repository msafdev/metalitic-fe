"use client";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email").min(5, "Required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const formik = useFormik({
    initialValues: {
      email: "",
      domain: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast("✔️ Berhasil", {
          description: `Account created for ${values.email}`,
        });

        resetForm();
      } catch (err) {
        toast("❌ Gagal", {
          description: "An unexpected error occurred.",
        });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome aboard</CardTitle>
          <CardDescription>Create a new account to progress.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-6">
              {/* Email */}
              <div className="grid gap-3">
                <Label>Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "animate-pulse"
                      : ""
                  }
                />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                  className={
                    formik.touched.password && formik.errors.password
                      ? "animate-pulse"
                      : ""
                  }
                />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  required
                  className={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "animate-pulse"
                      : ""
                  }
                />
              </div>

              <Button type="submit" className="w-full">
                Create account
              </Button>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
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
